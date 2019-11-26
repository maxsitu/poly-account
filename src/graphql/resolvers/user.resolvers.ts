import * as bcrypt from 'bcryptjs';

import { User } from 'src/entity/User';
import { IAppContext } from 'src/types';
import { IAuthUser, IAuthPayload, ILogoutResult, mapUserToIAuthUser } from 'src/graphql/interface';
import getLogger from 'src/logging';

const logger = getLogger(module);

interface IGetUserArgs {
  email: string;
}

interface ISignupArgs {
  email: string;
  password: string;
}

type ILoginArgs = ISignupArgs;

async function getUser(
  _: any,
  { email }: IGetUserArgs,
  context: IAppContext,
): Promise<IAuthUser | null> {
  const user = await context.userController.getUser(email);
  return user && mapUserToIAuthUser(user);
}

async function signup(
  _: any,
  { email, password }: ISignupArgs,
  context: IAppContext,
): Promise<IAuthPayload> {
  const currUser = await context.userController.getUser(email);
  if (currUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = await context.userController.createUser(
    email,
    passwordHash,
  );

  return {
    user: mapUserToIAuthUser(user),
  };
}

async function login(
  _: any,
  {email, password}: ILoginArgs,
  context: IAppContext,
): Promise<IAuthPayload> {
  if (context.session.currUser) {
    throw new Error('User is already logged in');
  }

  const user = await context.userController.getUser(email);
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  context.session.regenerate((err) => {
    if (err) {
      logger.error('User session regenerate failed', err);
      throw err;
    }
  });

  const authUser: IAuthUser = mapUserToIAuthUser(user);
  context.session.currUser = authUser;

  context.session.save((err) => {
    if (err) {
      logger.error('User session save failed', err);
      throw err;
    }
  });

  return {
    user: authUser,
  };
}

async function logout(_: any, args: object, context: IAppContext): Promise<ILogoutResult> {
  if (!context.session.currUser) {
    throw new Error('User need to login');
  }
  context.session.destroy((error) => {
    if (error) {
      logger.error('User session destroy failed', error);
      throw error;
    }
  });

  return {
    message: 'User logout success',
  };
}

export { IGetUserArgs, ISignupArgs, ILoginArgs };

export default {
  Query: {
    user: getUser,
  },
  Mutation: {
    login,
    signup,
    logout,
  },
};

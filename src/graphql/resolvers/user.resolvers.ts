import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/entity/User';
import { IAppContext } from 'src/types';
import { IAuthUser, IAuthPayload, mapUserToIAuthUser } from 'src/graphql/interface';

const APP_SECRET = 'GraphQL-is-aw3some';

interface IGetUserArgs {
  email: string;
}

interface ISignupArgs {
  email: string;
  password: string;
}

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
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = await context.userController.createUser(
    email,
    passwordHash,
  );
  const token = jwt.sign({ userId: user.email }, APP_SECRET);

  return {
    token,
    user: mapUserToIAuthUser(user),
  };
}

export { IGetUserArgs, ISignupArgs };

export default {
  Query: {
    User: getUser,
  },
  Mutation: {
    signup,
  },
};

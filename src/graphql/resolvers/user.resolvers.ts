import { IUserInput } from 'src/controller/UserController';
import { User } from 'src/entity/User';
import { IAppContext } from 'src/types';

interface IGetUserArgs {
  id: string;
}

async function getUser(
  _: any,
  { id }: IGetUserArgs,
  context: IAppContext,
): Promise<User | null> {
  return await context.userController.getUser(id);
}

interface ICreateUserArgs {
  userInput: IUserInput;
}

async function createUser(
  _: any,
  { userInput }: ICreateUserArgs,
  context: IAppContext,
): Promise<User> {
  return await context.userController.createUser(userInput);
}

export {
    IGetUserArgs,
    ICreateUserArgs,
};

export default {
    Query: {
        User: getUser,
    },
    Mutation: {
        createUser,
    },
};

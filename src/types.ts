import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
import { IAuthUser } from './graphql/interface';

interface ISession extends Express.Session {
    currUser: IAuthUser;
}

interface IAppContext {
    userController: UserController;
    authController: AuthController;
    session: ISession;
}

export {
    IAppContext,
};

import UserController from './controller/UserController';
import { IAuthUser } from './graphql/interface';

interface ISession extends Express.Session {
    currUser: IAuthUser;
}

interface IAppContext {
    userController: UserController;
    session: ISession;
}

export {
    IAppContext,
};

import UserController from './controller/UserController';
import { User } from './entity/User';

interface ISession extends Express.Session {
    currUser: User;
}

interface IAppContext {
    userController: UserController;
    session: ISession;
}

export {
    IAppContext,
};

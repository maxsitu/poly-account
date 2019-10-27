import { Connection, Repository } from 'typeorm';
import { v1 as uuidv1 } from 'uuid';

import { User, userValidationSchema } from 'src/entity/User/User';
import getLogger from 'src/logging';

const logger = getLogger(module);

interface IUserInput {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

class UserController {
  public userRepo: Repository<User>;

  constructor(connection: Connection) {
    this.userRepo = connection.getRepository(User);
  }

  public async getUser(id: string): Promise<User | null> {
    const user: User | undefined = await this.userRepo.findOne(id);
    logger.info(`validating result ${JSON.stringify(user)}`);
    return user || null;
  }

  public async createUser(userInput: IUserInput) {
    const userToCreate: User = {
      id: uuidv1(),
      ...userInput,
      roles: [],
    };
    logger.debug(`validating userToCreate:`, JSON.stringify(userToCreate));
    const result = await userValidationSchema.validate(userToCreate);

    logger.debug(`creating user`);
    const user: User = this.userRepo.create(userToCreate);

    return this.userRepo.save(user);
  }
}

export { IUserInput, UserController, UserController as default };

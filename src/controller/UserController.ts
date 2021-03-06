import { Connection, Repository } from 'typeorm';

import { User, userValidationSchema } from '../entity/User/User';
import getLogger from '../logging';

const logger = getLogger(module);

class UserController {
  public userRepo: Repository<User>;

  constructor(connection: Connection) {
    this.userRepo = connection.getRepository(User);
  }

  public async getUser(email: string): Promise<User | null> {
    const user: User | undefined = await this.userRepo.findOne(email, { relations: ['roles']});
    logger.debug(`validating result ${JSON.stringify(user)}`);
    return user || null;
  }

  public async createUser(email: string, password: string) {
    const userToCreate = {
      email,
      password,
      roles: [],
    };
    logger.debug(`validating userToCreate:`, JSON.stringify(userToCreate));
    const result = await userValidationSchema.validate(userToCreate);

    logger.debug(`creating user`);
    const user: User = this.userRepo.create(userToCreate);

    return this.userRepo.save(user);
  }
}

export { UserController, UserController as default };

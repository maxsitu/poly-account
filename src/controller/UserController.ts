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
    logger.info(`validating userInput: ${JSON.stringify(userInput)}`);
    const result = await userValidationSchema.validate(userInput);
    logger.info(`validating result ${JSON.stringify(result)}`);

    logger.info(`creating user with input ${JSON.stringify(userInput)}`);
    const {
      username,
      email,
      phone,
      firstName,
      middleName,
      lastName,
    } = userInput;

    const user: User = this.userRepo.create({
      id: uuidv1(),
      username,
      email,
      phone,
      firstName,
      middleName,
      lastName,
    });

    logger.info(`user.username: ${user.username}`);
    logger.info(`userInput.username: ${userInput.username}`);
    logger.info(`creating user with user ${JSON.stringify(user)}`);
    return this.userRepo.save(user);
  }
}

export { IUserInput, UserController, UserController as default };

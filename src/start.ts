import { createConnection } from 'typeorm';
import express, {Request as ExpressRequest} from 'express';
import graphqlHTTP from 'express-graphql';
import session from 'express-session';
import 'reflect-metadata';

import { createSessionMiddleware } from './middleware/session';
import {IAppContext} from './types';
import {executableSchema} from './graphql';
import getLogger from './logging';
import UserController from './controller/UserController';

const logger = getLogger(module);

async function main() {
  try {
    const connection = await createConnection();
    const app = express();
    const isDev = process.env.NODE_ENV === 'development';
    const port = 8088;

    app.use(createSessionMiddleware('localhost', 6379, 'redis-secret'));

    const userController = new UserController(connection);

    const context: IAppContext = {
      userController,
    };

    logger.debug(`dev: ${isDev}`);

    app.use(
      '/graphql',
      graphqlHTTP((request) => ({
        schema: executableSchema,
        graphiql: isDev,
        context: Object.assign({}, context, {session: (request as ExpressRequest).session}),
      })),
    );

    app.listen(port, () => {
      logger.info(`\n\nExpress instance listen at ${port}\n`);
    });
  } catch (error) {
    logger.error('Database connection error', error);
  }
}

main();

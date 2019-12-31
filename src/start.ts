// Configure env variables
import * as dotenv from 'dotenv';
dotenv.config();
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import 'reflect-metadata';

import { createSessionMiddleware } from './middleware/session';
import { executableSchema } from './graphql';
import getLogger from './logging';
import CacheConstant from './constant/CacheConstant';
import UserController from './controller/UserController';
import AuthController from './controller/AuthController';

const logger = getLogger(module);

async function prepareDatabase(): Promise<Connection> {
  const connection = await createConnection();
  return connection;
}

async function main() {
  try {
    const connection = await prepareDatabase();
    const app = express();
    const useGraphiql = process.env.USE_GRAPHIQL === 'true';
    const port = process.env.PORT || 80;

    app.use(
      createSessionMiddleware(
        CacheConstant.redisUrl,
        CacheConstant.redisSecret,
        CacheConstant.redisCookieMaxAge,
      ),
    );

    const userController = new UserController(connection);
    const authController = new AuthController(connection);

    app.use(
      '/graphql',
      graphqlHTTP((request) => ({
        schema: executableSchema,
        graphiql: useGraphiql,
        context: {
          session: (request as Express.Request).session,
          userController,
          authController,
        },
      })),
    );

    app.listen(port, () => {
      logger.info(`\n\n Express instance listen at ${port}\n`);
    });
  } catch (error) {
    logger.error('Database connection error', error);
  }
}

main();

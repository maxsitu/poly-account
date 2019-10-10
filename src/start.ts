import { createConnection } from 'typeorm';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import 'reflect-metadata';

import schema from './graphql/schema';
import rootValue from './graphql/root';
import logger from './logging';

createConnection().then(async (connection) => {
    const app = express();
    const dev = process.env.NODE_ENV === 'development';
    const port = 8088;

    logger.info(`dev: ${dev}`);

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: dev,
        rootValue,
    }));

    app.listen(port, () => {
        logger.info(`\n\nExpress instance listen at ${port}\n`);
    });
}).catch((error) => logger.error('Database connection error', error));

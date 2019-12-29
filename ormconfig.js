require('dotenv').config();

const database = {
    url: process.env.DATABASE_URL,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    logging: Boolean(process.env.DATABASE_LOGGING),
    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
};

const config = {
    type: 'postgres',
    url: database.url,
    synchronize: database.synchronize,
    logging: database.logging,
    entities: [
        'src/entity/**/*.ts',
    ],
    migrations: [
        'src/migration/**/*.js',
    ],
    subscribers: [
        'src/subscriber/**/*.js',
    ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
    extra: {
        ssl: (process.env.NODE_ENV === 'production' ? true : false),
        connectionLimit: database.connectionLimit,
    },
};

module.exports = config;

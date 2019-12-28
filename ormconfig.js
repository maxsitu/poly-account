require('dotenv').config();

const database = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    logging: Boolean(process.env.DATABASE_LOGGING),
    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
};

const config = {
    type: 'postgres',
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.database,
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

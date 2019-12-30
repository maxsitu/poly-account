require('dotenv').config();

const database = {
    url: process.env.DATABASE_URL,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    logging: Boolean(process.env.DATABASE_LOGGING),
    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
};

const isDist = !process.env.TS_NODE;
const rootEntityDir = isDist ? 'dist' : 'src';
const config = {
    type: 'postgres',
    url: database.url,
    synchronize: database.synchronize,
    logging: database.logging,
    entities: [
        isDist ? `${rootEntityDir}/entity/**/*.js` : `${rootEntityDir}/entity/**/*.ts`,
    ],
    migrations: [
        `${rootEntityDir}/migration/**/*.js`,
    ],
    subscribers: [
        `${rootEntityDir}/subscriber/**/*.js`,
    ],
    cli: {
        entitiesDir: `${rootEntityDir}/entity`,
        migrationsDir: `${rootEntityDir}/migration`,
        subscribersDir: `${rootEntityDir}/subscriber`,
    },
    extra: {
        ssl: (process.env.NODE_ENV === 'production' ? true : false),
        connectionLimit: database.connectionLimit,
    },
};

module.exports = config;

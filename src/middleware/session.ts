import * as redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

function prepareRedisClient(host: string, port: number) {
    const client = redis.createClient({
        host,
        port,
    });

    return client;
}

function createRedisStore(host: string, port: number) {
    const client = prepareRedisClient(host, port);
    const redisStore = connectRedis(session);
    return new redisStore({ client });
}

export function createSessionMiddleware(host: string, port: number, secret: string) {
    return session({
        store: createRedisStore(host, port),
        secret,
        resave: false,
    });
}

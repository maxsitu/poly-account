import * as redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

function prepareRedisClient(redisUrl: string) {
  const client = redis.createClient(redisUrl);

  return client;
}

function createRedisStore(redisUrl: string) {
  const client = prepareRedisClient(redisUrl);
  const redisStore = connectRedis(session);
  return new redisStore({ client });
}

export function createSessionMiddleware(
  redisUrl: string,
  secret: string,
  cookieMaxAge: number,
) {
  return session({
    store: createRedisStore(redisUrl),
    secret,
    resave: false,
    cookie: { maxAge: cookieMaxAge },
  });
}

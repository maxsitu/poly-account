const cacheConstant = {
  redisHost: process.env.REDIS_HOST || '',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  redisSecret: process.env.REDIS_SECRET || '',
  redisCookieMaxAge: Number(process.env.REDIS_COOKIE_MAX_AGE) || 60000,
};

export {
  cacheConstant as default,
};

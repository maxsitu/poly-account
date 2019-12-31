const cacheConstant = {
  redisUrl: process.env.REDIS_URL || '',
  redisSecret: process.env.REDIS_SECRET || '',
  redisCookieMaxAge: Number(process.env.REDIS_COOKIE_MAX_AGE) || 60000,
};

export {
  cacheConstant as default,
};

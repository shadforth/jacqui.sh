import Redis from "ioredis"

declare global {
  var _redis: Redis | undefined
}

function getRedis(): Redis {
  if (!global._redis) {
    global._redis = new Redis(process.env.REDIS_URL!)
    global._redis.on("error", (err) => console.error("Redis error:", err))
  }
  return global._redis
}

export const redis = getRedis()

import createRedisStore from "connect-redis";
import session from "express-session";
import redis from "redis";

const RedisStore = createRedisStore(session);
const redisClient = redis.createClient();

export const initialize = () =>
  session({
    secret: process.env.SESSION_SECRET!,
    name: "cid",
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 7, // 7 days
    },
    store: new RedisStore({ client: redisClient, ttl: 86400 }),
    resave: false,
  });

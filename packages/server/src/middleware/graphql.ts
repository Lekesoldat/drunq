import { PrismaClient } from "@prisma/client";
import {
  ApolloServer,
  GetMiddlewareOptions,
  PubSub,
} from "apollo-server-express";
import { schema } from "../graphql/schema";

const prisma = new PrismaClient();
const pubsub = new PubSub();

export const initialize = async (options?: GetMiddlewareOptions) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      prisma,
      pubsub,
      session: req.session,
      userId: req.session.user?.id,
    }),
    tracing: true,
  });

  await server.start();

  return server.getMiddleware({ path: "/", ...options });
};

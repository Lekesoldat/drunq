import { PrismaClient } from "@prisma/client";
import {
  ApolloServer,
  GetMiddlewareOptions,
  PubSub,
} from "apollo-server-express";
import { schema } from "../schema";

const prisma = new PrismaClient();
const pubsub = new PubSub();

export const initialize = async (options?: GetMiddlewareOptions) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      console.log("Context Request: ", req.session);
      return { prisma, pubsub, req };
    },
    tracing: true,
  });

  await server.start();

  return server.getMiddleware(options);
};

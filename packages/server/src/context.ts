import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { PubSub } from "graphql-subscriptions";

export interface Context {
  prisma: PrismaClient;
  pubsub: PubSub;
  userId: string;
  req: Request;
}

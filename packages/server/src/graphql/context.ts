import { PrismaClient } from "@prisma/client";
import { Session, SessionData } from "express-session";
import { PubSub } from "graphql-subscriptions";
export interface Context {
  prisma: PrismaClient;
  pubsub: PubSub;
  userId: string;
  session: Session & Partial<SessionData>;
}

import { PrismaClient } from ".prisma/client";
import { ApolloServer, PubSub } from "apollo-server";
import "dotenv/config";
import { schema } from "./schema";

const prisma = new PrismaClient();
const pubsub = new PubSub();
const server = new ApolloServer({
  schema,
  context: { prisma, pubsub },
  tracing: true,
});

(async () => {
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

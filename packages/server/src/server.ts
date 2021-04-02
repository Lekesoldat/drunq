import { PrismaClient } from "@prisma/client";
import { ApolloServer, PubSub } from "apollo-server";
import "dotenv/config";
import { verify } from "jsonwebtoken";
import { schema } from "./schema";

const prisma = new PrismaClient();
const pubsub = new PubSub();

interface Payload {
  userId: string;
}

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const authorization = req.headers.authorization || "";

    const [_, token] = authorization.split(" ");

    try {
      const { userId } = verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET!
      ) as Payload;

      return { prisma, pubsub, userId };
    } catch (error) {
      // Do something here
    }

    return { prisma, pubsub };
  },
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

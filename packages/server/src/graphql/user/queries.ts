import { list, queryField } from "nexus";
import { User } from "./typeDefs";

export const allUsers = queryField("allUsers", {
  type: list(User),
  resolve: async (_, __, ctx) => {
    console.log(ctx);
    return await ctx.prisma.user.findMany();
  },
});

export const me = queryField("me", {
  type: User,
  resolve: async (_, __, ctx) => {
    if (!ctx.userId) throw new Error("You are currently not logged in.");

    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    if (!user) throw new Error("User not found.");
    return user;
  },
});

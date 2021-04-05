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
  authorize: (_, __, ctx) => !!ctx.userId,
  resolve: async (_, __, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    if (!user) throw new Error("User not found.");
    return user;
  },
});

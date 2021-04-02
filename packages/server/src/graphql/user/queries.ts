import { list, queryField } from "nexus";
import { GetUserResult } from "./index";
import { User } from "./typeDefs";
export const allUsers = queryField("allUsers", {
  type: list(User),
  resolve: async (_, __, ctx) => {
    console.log(ctx);
    return await ctx.prisma.user.findMany();
  },
});

export const me = queryField("me", {
  type: GetUserResult,
  resolve: async (_, __, ctx) => {
    // TODO: Use GraphQl-shield to handle these errors
    if (!ctx.userId) throw new Error("No authentication header found");

    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    if (!user) {
      return {
        __typename: "UserNotFoundError",
        message: "No user found.",
      };
    }
    return { __typename: "User", ...user };
  },
});

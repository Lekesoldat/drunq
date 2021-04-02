import { idArg, list, nonNull, queryField } from "nexus";
import { Session } from "./index";

export const allSessions = queryField("allSessions", {
  type: list(Session),
  resolve: async (_, __, ctx) => await ctx.prisma.session.findMany(),
});

export const findSession = queryField("findSession", {
  type: Session,
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, ctx) =>
    await ctx.prisma.session.findUnique({ where: { id } }),
});

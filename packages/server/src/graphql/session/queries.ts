import { list, queryField } from "nexus";
import { Session } from "./index";

export const MySessions = queryField("mySessions", {
  type: list(Session),
  authorize: (_, __, ctx) => !!ctx.userId,
  resolve: async (_, __, ctx) => {
    const sessions = ctx.prisma.session.findMany({ where: { id: ctx.userId } });
    return sessions;
  },
});

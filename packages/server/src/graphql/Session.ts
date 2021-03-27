import { Session as SessionModel } from "@prisma/client";
import { extendType, idArg, list, nonNull, objectType } from "nexus";
import { Participant } from "./Participant";
import { User } from "./User";

export const Session = objectType({
  name: "Session",
  definition: (t) => {
    t.id("id");
    t.string("name");
    t.string("code");
    t.field("owner", {
      type: User,
      resolve: async (parent, __, ctx) => {
        const { ownerId } = parent as SessionModel;
        const owner = await ctx.prisma.user.findUnique({
          where: { id: ownerId },
        });

        return owner;
      },
    });
    t.field("participants", {
      type: list(Participant),
      resolve: (parent, __, ctx) => {
        const { id } = parent as SessionModel;
        return ctx.prisma.participant.findMany({
          where: { sessionId: id },
        });
      },
    });
  },
});

export const SessionQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("allSessions", {
      type: list(Session),
      resolve: async (_, __, ctx) => await ctx.prisma.session.findMany(),
    });

    t.field("findSession", {
      type: Session,
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, { id }, ctx) =>
        await ctx.prisma.session.findUnique({ where: { id } }),
    });
  },
});

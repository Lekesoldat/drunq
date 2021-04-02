import { Session as SessionModel } from "@prisma/client";
import { list, objectType } from "nexus";
import { Participant } from "../participant";
import { User } from "../user";

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

import { Participant as ParticipantModel } from "@prisma/client";
import { list, objectType } from "nexus";
import { Consumption } from "./Consumption";
import { User } from "./User";

export const Participant = objectType({
  name: "Participant",
  definition: (t) => {
    t.model.joinedDate();

    t.field("user", {
      type: User,
      resolve: async (parent, __, ctx) => {
        const { userId } = parent as ParticipantModel;
        return await ctx.prisma.user.findUnique({ where: { id: userId } });
      },
    });

    t.field("consumptions", {
      type: list(Consumption),
      resolve: async (parent, __, ctx) => {
        const { userId, sessionId } = parent as ParticipantModel;
        return await ctx.prisma.consumption.findMany({
          where: { participantSessionId: sessionId, participantUserId: userId },
        });
      },
    });
  },
});

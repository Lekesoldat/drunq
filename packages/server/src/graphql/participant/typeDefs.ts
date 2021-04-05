import { Participant as ParticipantModel } from "@prisma/client";
import { list, objectType } from "nexus";
import { calculateBACofDrink } from "../../utils/calculations";
import { Consumption } from "../consumption";
import { User } from "../user";

// TODO: Implement Data Loader, have a look at Ben Awad N+1

export const Participant = objectType({
  name: "Participant",
  definition: (t) => {
    t.datetime("joinedDate");

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

    t.field("currentBAC", {
      type: "Float",
      resolve: async (parent, __, ctx) => {
        const { userId, sessionId } = parent as ParticipantModel;
        const { gender, weight } = await ctx.prisma.user.findUnique({
          where: { id: userId },
          rejectOnNotFound: true,
        });

        const drinks = await ctx.prisma.consumption.findMany({
          where: { participantUserId: userId, participantSessionId: sessionId },
          include: { drink: true },
        });

        const BAC = drinks.reduce(
          (acc, consumption) =>
            acc +
            calculateBACofDrink({
              gender,
              weight,
              volume: consumption.drink.volume,
              consumedAt: consumption.time.getHours(),
              percentage: consumption.drink.percentage,
            }),
          0
        );
        return +BAC.toPrecision(1);
      },
    });
  },
});

import { extendType, list } from "nexus";
import { Consumption } from "./index";

export const ConsumptionQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("allConsumptions", {
      type: list(Consumption),
      resolve: async (_, __, ctx) => await ctx.prisma.consumption.findMany(),
    });
  },
});

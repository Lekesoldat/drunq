import { list, queryField } from "nexus";
import { Consumption } from "./index";

export const ConsumptionQuery = queryField("allConsumptions", {
  type: list(Consumption),
  resolve: async (_, __, ctx) => await ctx.prisma.consumption.findMany(),
});

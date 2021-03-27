import { Consumption as ConsumptionModel } from "@prisma/client";
import { extendType, list, objectType } from "nexus";
import { Drink } from "./Drink";

export const Consumption = objectType({
  name: "Consumption",
  definition: (t) => {
    t.id("id");
    t.model.time();
    t.field("drink", {
      type: Drink,
      resolve: async (parent, __, ctx) => {
        const { drinkId } = parent as ConsumptionModel;
        return ctx.prisma.drink.findUnique({ where: { id: drinkId } });
      },
    });
  },
});

export const ConsumptionQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("allConsumptions", {
      type: list(Consumption),
      resolve: async (_, __, ctx) => await ctx.prisma.consumption.findMany(),
    });
  },
});

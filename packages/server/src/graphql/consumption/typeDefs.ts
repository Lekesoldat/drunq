import { objectType } from "nexus";
import { Consumption as ConsumptionModel } from "@prisma/client";
import { Drink } from "../drink";

export const Consumption = objectType({
  name: "Consumption",
  definition: (t) => {
    t.id("id");
    t.datetime("time");
    t.field("drink", {
      type: Drink,
      resolve: async (parent, __, ctx) => {
        const { drinkId } = parent as ConsumptionModel;
        return ctx.prisma.drink.findUnique({ where: { id: drinkId } });
      },
    });
  },
});

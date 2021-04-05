import { list, queryField } from "nexus";
import { Drink } from "./index";

export const AllDrinks = queryField("allDrinks", {
  type: list(Drink),
  resolve: async (_, __, ctx) => await ctx.prisma.drink.findMany(),
});

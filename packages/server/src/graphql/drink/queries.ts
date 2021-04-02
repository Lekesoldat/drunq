import { extendType, list, nonNull, intArg } from "nexus";
import { Drink } from "./index";

export const DrinkQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("allDrinks", {
      type: list(Drink),
      resolve: async (_, __, ctx) => await ctx.prisma.drink.findMany(),
    });

    t.field("findDrink", {
      type: Drink,
      args: {
        drinkId: nonNull(intArg()),
      },
      resolve: async (_, args, ctx) =>
        await ctx.prisma.drink.findUnique({ where: { id: args.drinkId } }),
    });
  },
});

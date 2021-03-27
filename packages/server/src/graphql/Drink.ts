import { extendType, intArg, list, nonNull, objectType } from "nexus";

export const Drink = objectType({
  name: "Drink",
  definition: (t) => {
    t.model.id();
    t.string("name");
    t.float("percentage");
    t.float("volume");
  },
});

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

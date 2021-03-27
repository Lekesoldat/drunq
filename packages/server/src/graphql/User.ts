import {
  enumType,
  extendType,
  floatArg,
  list,
  nonNull,
  objectType,
  stringArg,
  subscriptionField,
} from "nexus";
import { NexusGenObjects } from "src/generated/nexus-typegen";

const Gender = enumType({
  name: "Gender",
  members: ["MALE", "FEMALE"],
  description: "The available genders.",
});

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.id("id");
    t.string("name");
    t.model.birthDate();
    t.float("weight");
    t.field("gender", { type: Gender });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("allUsers", {
      type: list(User),
      resolve: async (_, __, ctx) => await ctx.prisma.user.findMany(),
    });

    t.field("findUser", {
      type: User,
      args: {
        uuid: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) =>
        ctx.prisma.user.findUnique({ where: { id: args.uuid } }),
    });
  },
});

enum Triggers {
  NEW_USER = "NEW_USER",
}

export const UserMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createUser", {
      type: User,
      args: {
        name: nonNull(stringArg()),
        birthDate: nonNull(stringArg()),
        weight: nonNull(floatArg()),
        gender: nonNull(Gender),
      },
      resolve: async (_, args, ctx) => {
        const newUser = ctx.prisma.user.create({
          data: { ...args, birthDate: new Date(args.birthDate) },
        });
        ctx.pubsub.publish(Triggers.NEW_USER, newUser);
        return newUser;
      },
    });
  },
});

export const UserSubscription = subscriptionField("newUser", {
  type: User,
  subscribe: (_, __, ctx) => {
    return ctx.pubsub.asyncIterator<NexusGenObjects["User"]>(Triggers.NEW_USER);
  },
  resolve: async (payload: NexusGenObjects["User"]) => payload,
});

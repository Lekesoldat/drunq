import { AuthenticationError } from "apollo-server-errors";
import { compare, hash } from "bcryptjs";
import { inputObjectType, mutationField, nonNull } from "nexus";

export const SignUpInput = inputObjectType({
  name: "SignUpInput",
  definition: (t) => {
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("birthDate");
    t.nonNull.float("weight");
    t.nonNull.field("gender", { type: "Gender" });
  },
});

export const signUp = mutationField("signUp", {
  type: "Boolean",
  args: { user: nonNull(SignUpInput) },
  resolve: async (_, { user }, ctx) => {
    try {
      const hashedPassword = await hash(user.password, 10);

      const newUser = await ctx.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
          birthDate: new Date(user.birthDate),
        },
      });

      ctx.session.user = {
        id: newUser.id,
      };

      return true;
    } catch (err) {
      return false;
    }
  },
});

export const SignInInput = inputObjectType({
  name: "SignInInput",
  definition: (t) => {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const signIn = mutationField("signIn", {
  type: "Boolean",
  args: { credentials: nonNull(SignInInput) },
  resolve: async (_, { credentials: { email, password } }, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new AuthenticationError("Bad login.");

    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new AuthenticationError("Bad login.");

    ctx.session.user = { id: user.id };

    return true;
  },
});

export const signOut = mutationField("signOut", {
  type: "Boolean",
  resolve: async (_, __, ctx) => {
    try {
      ctx.session.destroy(() => {});
      return true;
    } catch (err) {
      return false;
    }
  },
});

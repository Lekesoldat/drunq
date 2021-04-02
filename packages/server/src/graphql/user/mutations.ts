import { compare, hash } from "bcryptjs";
import { inputObjectType, mutationField, nonNull } from "nexus";
import { createAccessToken } from "../../utils/auth";
import { User } from "./index";

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
  type: User,
  args: { user: nonNull(SignUpInput) },
  resolve: async (_, { user }, ctx) => {
    const hashedPassword = await hash(user.password, 10);

    const newUser = ctx.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
        birthDate: new Date(user.birthDate),
      },
    });

    return newUser;
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
  type: "SignInResult",
  args: { credentials: nonNull(SignInInput) },
  resolve: async (_, { credentials: { email, password } }, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return {
        __typename: "UserNotFoundError",
        message: `${email} is not registered`,
      };

    const valid = await compare(password, user.password);

    if (!valid)
      return {
        __typename: "InvalidPasswordError",
        message: `Password is incorrect.`,
      };

    return { __typename: "AccessToken", accessToken: createAccessToken(user) };
  },
});

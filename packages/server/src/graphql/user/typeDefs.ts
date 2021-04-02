import { enumType, objectType, unionType } from "nexus";

export const AccessToken = objectType({
  name: "AccessToken",
  definition: (t) => t.string("accessToken"),
});

const Gender = enumType({
  name: "Gender",
  members: ["MALE", "FEMALE"],
  description: "The available genders.",
});

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.id("id");
    t.string("email");
    t.string("name");
    t.model.birthDate();
    t.float("weight");
    t.field("gender", { type: Gender });
  },
});

export const UserNotFoundError = objectType({
  name: "UserNotFoundError",
  definition: (t) => {
    t.nonNull.string("message");
  },
});

export const InvalidPasswordError = objectType({
  name: "InvalidPasswordError",
  definition: (t) => {
    t.nonNull.string("message");
  },
});

export const GetUserResult = unionType({
  name: "GetUserResult",
  definition: (t) => {
    t.members("User", "UserNotFoundError");
  },
});

export const SignInResult = unionType({
  name: "SignInResult",
  definition: (t) => {
    t.members("AccessToken", "UserNotFoundError", "InvalidPasswordError");
  },
});

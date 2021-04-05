import { enumType, objectType } from "nexus";

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
    t.datetime("birthDate");
    t.float("weight");
    t.field("gender", { type: Gender });
  },
});

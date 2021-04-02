import { objectType } from "nexus";

export const Drink = objectType({
  name: "Drink",
  definition: (t) => {
    t.model.id();
    t.string("name");
    t.float("percentage");
    t.float("volume");
  },
});

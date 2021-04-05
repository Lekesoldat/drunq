import { fieldAuthorizePlugin, makeSchema } from "nexus";
import { join } from "path";
import * as types from "./index";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "../__generated__", "nexus-typegen.ts"),
    schema: join(__dirname, "../__generated__", "schema.graphql"),
  },
  plugins: [fieldAuthorizePlugin()],
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  },
  features: {
    abstractTypeStrategies: {
      __typename: true,
    },
  },
});

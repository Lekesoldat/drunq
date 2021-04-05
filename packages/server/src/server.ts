import "dotenv/config";
import express from "express";
import * as graphql from "./middleware/graphql";
import * as session from "./middleware/session";

(async () => {
  const app = express();

  // * if you run behind a proxy (e.g. nginx)
  // * app.set('trust proxy', 1);

  app.use(session.initialize());
  app.use(await graphql.initialize());

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at *:${process.env.PORT}`);
  });
})();

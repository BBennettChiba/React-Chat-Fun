import { createConnection } from "typeorm";
require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import * as express from "express";

const { createUser } = require("./db/dbActions");

(async () => {
  const app = express();
  await createConnection();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: true });

  app.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
  });
})();

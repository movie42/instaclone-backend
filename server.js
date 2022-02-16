require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import morgan from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
      };
    },
  });

  await server.start();
  const app = express();
  app.use(morgan("tiny"));
  app.use(express.static("uploads"));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.listen(
    { port: PORT },
    console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`),
  );
};

startServer();

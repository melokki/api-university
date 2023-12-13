import path from "path";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

export type UniversityContext = {
  db: any;
};

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const typesArray = loadFilesSync(path.join(__dirname, "./graphql/schema"), {
    extensions: ["gql"],
    recursive: true,
  });

  const resolversArray = loadFilesSync(
    path.join(__dirname, "./graphql/resolvers"),
    {
      recursive: true,
    }
  );

  const resolvers = mergeResolvers(resolversArray);

  const typeDefs = mergeTypeDefs(typesArray);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    "/api",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        return { db: "" };
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/api`);
};

startServer();

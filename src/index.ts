import { ApolloServer } from "apollo-server";
import wilderService from "./services/wilderService";
import * as skillService from "./services/skillsService";
import { dataSource } from "./tools/utils";
import typeDefs from "./typeDefs";

const resolvers = {
  Query: {
    getAllWilders: async () => {
      return await wilderService.getAll();
    },
  },
  Mutation: {
    createSkill: async (_: any, args: any) => {
      return await skillService.create(args.name);
    },
  },
};

const port = 5002;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`Server ready at ${url}`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();

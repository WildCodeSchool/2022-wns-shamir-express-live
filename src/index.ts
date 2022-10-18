import { ApolloServer } from "apollo-server";
import { dataSource } from "./tools/utils";
import { buildSchema } from "type-graphql";
import { WilderResolver } from "./resolvers/wilderResolver";
import { SkillResolver } from "./resolvers/skillResolver";

const port = 5002;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver],
  });
  const server = new ApolloServer({ schema });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`Server ready at ${url}`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();

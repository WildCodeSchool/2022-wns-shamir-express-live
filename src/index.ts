import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { dataSource } from "./tools/utils";
import { buildSchema } from "type-graphql";
import { WilderResolver } from "./resolvers/wilderResolver";
import { SkillResolver } from "./resolvers/skillResolver";
import { UserResolver } from "./resolvers/userResolver";
import authService from "./services/authService";

dotenv.config();

const port = 5002;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver, UserResolver],
    authChecker: ({ context }, roles) => {
      console.log("CONTEXT", context);
      console.log("ROLES", roles);

      if (context.user === undefined) {
        return false;
      }
      if (roles.length === 0 || roles.includes(context.user.role)) {
        return true;
      }

      return false;
    },
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization.split("Bearer ")[1];
          const userPayload = authService.verifyToken(bearer);

          return { user: userPayload };
        } catch (e) {
          console.log(e);
          return {};
        }
      }
    },
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`Server ready at ${url}`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();

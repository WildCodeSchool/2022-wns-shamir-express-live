import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { SkillResolver } from "../resolvers/skillResolver";
import { UserResolver } from "../resolvers/userResolver";
import { WilderResolver } from "../resolvers/wilderResolver";
import authService from "../services/authService";
import { dataSource } from "./utils";
import * as dotenv from "dotenv";

async function createServer(): Promise<ApolloServer> {
  dotenv.config();
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
  return new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req?.headers.authorization === undefined ||
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
}

export default createServer;

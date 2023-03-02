import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should create a user", async () => {
    const createUserMutation = gql`
      mutation CreateUser($password: String!, $email: String!) {
        createUser(password: $password, email: $email) {
          email
        }
      }
    `;

    const response = await server.executeOperation({
      query: createUserMutation,
      variables: {
        password: "1234",
        email: "mael@vincent.fr",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createUser).toBeDefined();
    expect(response.data?.createUser.email).toBe("mael@vincent.fr");
  });

  it("should retrieve a token", async () => {
    const getTokenMutation = gql`
      mutation GetToken($password: String!, $email: String!) {
        getToken(password: $password, email: $email)
      }
    `;

    const response = await server.executeOperation({
      query: getTokenMutation,
      variables: {
        password: "1234",
        email: "mael@vincent.fr",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.getToken).toBeDefined();
  });

  it("should not retrieve a token", async () => {
    const getTokenMutation = gql`
      mutation GetToken($password: String!, $email: String!) {
        getToken(password: $password, email: $email)
      }
    `;

    const response = await server.executeOperation({
      query: getTokenMutation,
      variables: {
        password: "dkqsgdqjky",
        email: "mael@vincent.fr",
      },
    });

    expect(response.errors).toBeDefined();
  });
});

import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../models/User";
import authService from "../services/authService";
import userService from "../services/userService";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const userFromDB = await userService.create(email, password);
    return userFromDB;
  }

  @Mutation(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    try {
      // Récupérer l'utilisateur dans la bdd suivant l'email
      const userFromDB = await userService.getByEmail(email);

      // Vérifier que ce sont les même mots de passe
      if (
        await authService.verifyPassword(password, userFromDB.hashedPassword)
      ) {
        // Créer un nouveau token => signer un token
        const token = authService.signJwt({
          email: userFromDB.email,
          role: userFromDB.role,
        });

        // Renvoyer le token
        return token;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new Error("Invalid Auth");
    }
  }
}

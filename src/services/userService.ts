import { Repository } from "typeorm";
import { User } from "../models/User";
import { dataSource } from "../tools/utils";
import * as argon2 from "argon2";

const repository: Repository<User> = dataSource.getRepository(User);

export default {
  /**
   * Return the user relative to the given email
   * @param email user email
   * @returns
   */
  getByEmail: async (email: string) => {
    return await repository.findOneByOrFail({ email });
  },

  /**
   * Create a new user in the database.
   * @param email user email
   * @param password user password
   * @returns
   */
  create: async (email: string, password: string): Promise<User> => {
    const newUser = new User();
    newUser.email = email;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = "USER";
    return await repository.save(newUser);
  },
};

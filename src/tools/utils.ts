import { DataSource } from "typeorm";
import Grade from "../models/Grade";
import Skill from "../models/Skill";
import { User } from "../models/User";
import Wilder from "../models/Wilder";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "wilderDB",
  password: "example",
  database: "wilder",
  synchronize: true,
  entities: [Wilder, Skill, Grade, User],
});

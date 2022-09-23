import { DataSource } from "typeorm";
import Grade from "../models/Grade";
import Skill from "../models/Skill";
import Wilder from "../models/Wilder";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill, Grade],
});

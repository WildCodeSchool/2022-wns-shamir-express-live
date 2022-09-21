import { DataSource } from "typeorm";
import Skill from "../models/Skill";
import Wilder from "../models/Wilder";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill],
});

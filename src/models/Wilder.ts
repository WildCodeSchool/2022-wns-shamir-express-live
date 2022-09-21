import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Skill from "./Skill";

@Entity()
export default class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];
}

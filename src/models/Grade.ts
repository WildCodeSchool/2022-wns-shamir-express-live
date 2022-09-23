import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Skill from "./Skill";
import Wilder from "./Wilder";

@Entity()
export default class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  votes: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  wilder: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades, {
    eager: true,
  })
  skill: Skill;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Skill from "./Skill";
import Wilder from "./Wilder";

@ObjectType()
@Entity()
export default class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  votes: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  wilder: Wilder;

  @Field(() => Skill)
  @ManyToOne(() => Skill, (skill) => skill.grades, {
    eager: true,
  })
  skill: Skill;
}

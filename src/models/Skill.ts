import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Grade from "./Grade";

@ObjectType()
@Entity()
export default class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  grades: Grade[];
}

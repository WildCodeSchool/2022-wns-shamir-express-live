import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Grade from "./Grade";
@ObjectType()
@Entity()
export default class Wilder {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.wilder)
  grades?: Grade[];
}

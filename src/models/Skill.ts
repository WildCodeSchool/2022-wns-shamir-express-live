import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

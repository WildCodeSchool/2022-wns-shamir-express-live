import { InputType, Field } from "type-graphql";

@InputType()
export class CreateWilderInput {
  @Field()
  name: string;
}

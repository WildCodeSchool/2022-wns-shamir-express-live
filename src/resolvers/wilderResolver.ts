import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateWilderInput } from "../inputs/createWilderInput";
import Wilder from "../models/Wilder";
import wilderService from "../services/wilderService";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    return await wilderService.getAll();
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("wilder") wilder: CreateWilderInput
  ): Promise<Wilder> {
    return await wilderService.create(wilder);
  }
}

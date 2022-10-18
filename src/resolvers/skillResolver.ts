import { Resolver, Arg, Mutation } from "type-graphql";
import Skill from "../models/Skill";
import * as skillService from "../services/skillsService";

@Resolver(Skill)
export class SkillResolver {
  @Mutation(() => Skill)
  async createSkill(@Arg("name") name: string): Promise<Skill> {
    return await skillService.create(name);
  }
}

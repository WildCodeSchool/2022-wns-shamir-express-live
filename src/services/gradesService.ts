import { Repository } from "typeorm";
import Grade from "../models/Grade";
import Skill from "../models/Skill";
import Wilder from "../models/Wilder";
import { dataSource } from "../tools/utils";

const gradeRepository: Repository<Grade> = dataSource.getRepository(Grade);
const wilderRepository: Repository<Wilder> = dataSource.getRepository(Wilder);
const skillRepository: Repository<Skill> = dataSource.getRepository(Skill);

/**
 * Create a grade or update an existing one for the wilder and skill
 * in parameter.
 * @param wilderId wilder id
 * @param skillId skill id
 * @param votes grade votes
 * @returns the wilder with the updated grade
 */
export const save = async (
  wilderId: number,
  skillId: number,
  votes: number
): Promise<Grade> => {
  const wilder: Wilder | null = await wilderRepository.findOneBy({
    id: wilderId,
  });

  const skill: Skill | null = await skillRepository.findOneBy({
    id: skillId,
  });

  if (wilder === null || skill === null) {
    throw new Error("Wilder or skill not found");
  }

  console.log("wilder", wilder);

  return await gradeRepository.save({
    votes,
    wilder,
    skill,
  });
};

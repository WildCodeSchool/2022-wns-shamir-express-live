import { Repository } from "typeorm";
import Skill from "../models/Skill";
import Wilder from "../models/Wilder";
import { dataSource } from "../tools/utils";

const wilderRepository: Repository<Wilder> = dataSource.getRepository(Wilder);
const skillRepository: Repository<Skill> = dataSource.getRepository(Skill);

export default {
  /**
   * Retrieve all wilders from db.
   * @returns wilders array
   */
  getAll: async (): Promise<Wilder[]> => {
    return await wilderRepository.find();
  },

  /**
   * Create a new wilder
   * @param wilderRequest wilder params
   * @returns the created wilder
   */
  create: async (wilderRequest: Wilder): Promise<Wilder> => {
    return await wilderRepository.save(wilderRequest);
  },

  /**
   * Update an existing wilder.
   * @param wilderRequest new wilder data
   * @param wilderId existing wilder id
   * @returns updated wilder
   */
  update: async (
    wilderRequest: Wilder,
    wilderId: number
  ): Promise<Wilder | null> => {
    await wilderRepository.update(wilderId, wilderRequest);
    return await wilderRepository.findOneBy({
      id: wilderId,
    });
  },

  /**
   * Delete an existing wilder.
   * @param wilderId wilder id to delete
   * @returns
   */
  delete: async (wilderId: number): Promise<any> => {
    return await wilderRepository.delete(wilderId);
  },

  addSkill: async (skillId: number, wilderId: number): Promise<Wilder> => {
    const wilder: Wilder | null = await wilderRepository.findOneBy({
      id: wilderId,
    });

    const skill: Skill | null = await skillRepository.findOneBy({
      id: skillId,
    });

    if (wilder === null || skill === null) {
      throw new Error("Wilder or skill not found");
    }

    if (
      wilder.skills.find((wilderSkill) => wilderSkill.id === skill.id) !== null
    ) {
      return wilder;
    }

    wilder.skills.push(skill);
    return await wilderRepository.save(wilder);
  },
};

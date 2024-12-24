import { Skill } from "./skill.model";

export const getExistingSkillById = async (id: string) => {
  const result = await Skill.findOne({ _id: id, isActive: true });

  return result;
};

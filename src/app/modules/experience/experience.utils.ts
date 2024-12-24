import { Experience } from "./experience.model";

export const getExistingExperienceById = async (id: string) => {
  const result = await Experience.findOne({ _id: id, isActive: true });

  return result;
};

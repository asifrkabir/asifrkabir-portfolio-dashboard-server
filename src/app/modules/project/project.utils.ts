import { Project } from "./project.model";

export const getExistingProjectById = async (id: string) => {
  const result = await Project.findOne({ _id: id, isActive: true });

  return result;
};

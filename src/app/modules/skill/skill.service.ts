import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TSkill } from "./skill.interface";
import { Skill } from "./skill.model";
import { skillSearchableFields } from "./skill.constant";
import { getExistingSkillById } from "./skill.utils";
import { TImageFiles } from "../../interface/image.interface";

const getSkillById = async (id: string) => {
  const result = await Skill.findOne({ _id: id, isActive: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }
  return result;
};

const getAllSkills = async (query: Record<string, unknown>) => {
  const skillQuery = new QueryBuilder(Skill.find({ isActive: true }), query)
    .search(skillSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await skillQuery.modelQuery;
  const meta = await skillQuery.countTotal();

  return { meta, result };
};

const createSkill = async (payload: TSkill, images: TImageFiles) => {
  const { logos } = images;

  if (logos && logos.length > 0) {
    payload.logo = logos[0]?.path;
  }

  const result = await Skill.create(payload);
  return result;
};

const updateSkill = async (
  id: string,
  payload: Partial<TSkill>,
  images: TImageFiles
) => {
  const existingSkill = await getExistingSkillById(id);

  if (!existingSkill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }

  const { logos } = images;

  // New Logo
  if (logos && logos.length > 0) {
    payload.logo = logos[0]?.path;
  } else if (payload.logo === null) {
    // Remove Logo
    payload.logo = "";
  }

  const result = await Skill.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteSkill = async (id: string) => {
  const existingSkill = await getExistingSkillById(id);

  if (!existingSkill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }

  const result = await Skill.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  return result;
};

export const SkillService = {
  getSkillById,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};

import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TExperience } from "./experience.interface";
import { Experience } from "./experience.model";
import { getExistingExperienceById } from "./experience.utils";
import { experienceSearchableFields } from "./experience.constant";

const getExperienceById = async (id: string) => {
  const result = await Experience.findOne({ _id: id, isActive: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }
  return result;
};

const getAllExperiences = async (query: Record<string, unknown>) => {
  const experienceQuery = new QueryBuilder(
    Experience.find({ isActive: true }),
    query
  )
    .search(experienceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await experienceQuery.modelQuery;
  const meta = await experienceQuery.countTotal();

  return { meta, result };
};

const createExperience = async (payload: TExperience) => {
  const result = await Experience.create(payload);
  return result;
};

const updateExperience = async (id: string, payload: Partial<TExperience>) => {
  const existingExperience = await getExistingExperienceById(id);

  if (!existingExperience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }

  const result = await Experience.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteExperience = async (id: string) => {
  const existingExperience = await getExistingExperienceById(id);

  if (!existingExperience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }

  const result = await Experience.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  return result;
};

export const ExperienceService = {
  getExperienceById,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};

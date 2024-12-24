import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { projectSearchableFields } from "./project.constant";
import { TProject } from "./project.interface";
import { Project } from "./project.model";
import { getExistingProjectById } from "./project.utils";
import { TImageFiles } from "../../interface/image.interface";

const getProjectById = async (id: string) => {
  const result = await Project.findOne({ _id: id, isActive: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  return result;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const projectQuery = new QueryBuilder(Project.find({ isActive: true }), query)
    .search(projectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await projectQuery.modelQuery;
  const meta = await projectQuery.countTotal();

  return { meta, result };
};

const createProject = async (payload: TProject, images: TImageFiles) => {
  const { projectImages } = images;

  if (projectImages && projectImages.length > 0) {
    payload.images = projectImages.map((image) => image.path);
  }

  const result = await Project.create(payload);
  return result;
};

const updateProject = async (
  id: string,
  payload: Partial<TProject>,
  images: TImageFiles
) => {
  const existingProject = await getExistingProjectById(id);

  if (!existingProject) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  let existingImageUrls: string[] = [];
  let newImageUrls: string[] = [];

  if (payload.images && payload.images.length > 0) {
    existingImageUrls = payload.images;
  }

  const { projectImages } = images;

  if (projectImages && projectImages.length > 0) {
    newImageUrls = projectImages.map((image) => image.path);
  }

  const finalImageUrls = [...existingImageUrls, ...newImageUrls];
  payload.images = finalImageUrls;

  const result = await Project.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteProject = async (id: string) => {
  const existingProject = await getExistingProjectById(id);

  if (!existingProject) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  const result = await Project.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  return result;
};

export const ProjectService = {
  getProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};

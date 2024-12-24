import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import { TImageFiles } from "../../interface/image.interface";

const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProjectService.getProjectById(id);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project retrieved successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
  }
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjects(req.query);

  if (result?.result?.length <= 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: "No Data Found",
      meta: result.meta,
      data: result?.result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Projects retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
});

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProject(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProjectService.updateProject(
    id,
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProjectService.deleteProject(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  getProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};

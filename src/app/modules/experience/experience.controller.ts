import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExperienceService } from "./experience.service";

const getExperienceById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExperienceService.getExperienceById(id);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Experience retrieved successfully",
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

const getAllExperiences = catchAsync(async (req, res) => {
  const result = await ExperienceService.getAllExperiences(req.query);

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
      message: "Experiences retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
});

const createExperience = catchAsync(async (req, res) => {
  const result = await ExperienceService.createExperience(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExperienceService.updateExperience(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExperienceService.deleteExperience(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceController = {
  getExperienceById,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillService } from "./skill.service";
import { TImageFiles } from "../../interface/image.interface";

const getSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SkillService.getSkillById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillService.getAllSkills(req.query);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Skills retrieved successfully",
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

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillService.createSkill(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Skill created successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SkillService.updateSkill(
    id,
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SkillService.deleteSkill(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill deleted successfully",
    data: result,
  });
});

export const SkillController = {
  getSkillById,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};

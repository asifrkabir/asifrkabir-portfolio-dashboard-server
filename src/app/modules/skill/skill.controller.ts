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
      message: "Skills retrieved successfully",
      meta: result.meta,
      data: result.result,
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

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { InquiryService } from "./inquiry.service";

const getInquiryById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const inquiry = await InquiryService.getInquiryById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiry retrieved successfully",
    data: inquiry,
  });
});

const getAllInquiries = catchAsync(async (req, res) => {
  const result = await InquiryService.getAllInquiries(req.query);

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
      message: "Inquiries retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
});

const createInquiry = catchAsync(async (req, res) => {
  const inquiry = await InquiryService.createInquiry(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Inquiry created successfully",
    data: inquiry,
  });
});

const deleteInquiry = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await InquiryService.deleteInquiry(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Inquiry deleted successfully",
    data: result,
  });
});

export const InquiryController = {
  getInquiryById,
  getAllInquiries,
  createInquiry,
  deleteInquiry,
};

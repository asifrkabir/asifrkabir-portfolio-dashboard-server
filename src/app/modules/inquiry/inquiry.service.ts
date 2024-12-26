// inquiry.service.ts
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { inquirySearchableFields } from "./inquiry.constant";
import { TInquiry } from "./inquiry.interface";
import { Inquiry } from "./inquiry.model";
import { getExistingInquiryById } from "./inquiry.utils";

const getInquiryById = async (id: string) => {
  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    throw new AppError(httpStatus.NOT_FOUND, "Inquiry not found");
  }
  return inquiry;
};

const getAllInquiries = async (query: Record<string, unknown>) => {
  const inqueryQuery = new QueryBuilder(Inquiry.find({ isActive: true }), query)
    .search(inquirySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await inqueryQuery.modelQuery;
  const meta = await inqueryQuery.countTotal();

  return { meta, result };
};

const createInquiry = async (payload: TInquiry) => {
  const inquiry = await Inquiry.create(payload);
  return inquiry;
};

const deleteInquiry = async (id: string) => {
  const existingInquiry = await getExistingInquiryById(id);

  if (!existingInquiry) {
    throw new AppError(httpStatus.NOT_FOUND, "Inquiry not found");
  }

  const result = await Inquiry.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  return result;
};

export const InquiryService = {
  getInquiryById,
  getAllInquiries,
  createInquiry,
  deleteInquiry,
};

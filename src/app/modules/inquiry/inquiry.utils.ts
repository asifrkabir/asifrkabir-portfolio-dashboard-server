import { Inquiry } from "./inquiry.model";

export const getExistingInquiryById = async (id: string) => {
  const result = await Inquiry.findOne({ _id: id, isActive: true });

  return result;
};

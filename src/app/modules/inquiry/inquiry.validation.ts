import { z } from "zod";

const createInquiryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(1, { message: "Message is required" }),
  }),
});

export const InquiryValidations = {
  createInquiryValidationSchema,
};

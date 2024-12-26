import { model, Schema } from "mongoose";
import { TInquiry } from "./inquiry.interface";

const inquirySchema = new Schema<TInquiry>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = model<TInquiry>("Inquiry", inquirySchema);

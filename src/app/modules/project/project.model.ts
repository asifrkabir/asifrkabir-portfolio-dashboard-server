import mongoose, { Schema } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
    },
    repositoryUrls: {
      type: [String],
    },
    liveDemoUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<TProject>("Project", projectSchema);

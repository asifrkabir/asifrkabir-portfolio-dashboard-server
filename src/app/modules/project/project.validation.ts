import { z } from "zod";

const technologyArraySchema = z.array(
  z.string().min(1, { message: "Technology cannot be empty" })
);

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    technologies: technologyArraySchema.min(1, {
      message: "At least one technology is required",
    }),
    repositoryUrls: z
      .array(z.string().url("Each repository URL must be valid"))
      .optional(),
    liveDemoUrl: z.string().url("Live demo URL must be valid").optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .optional(),
    technologies: technologyArraySchema.optional(),
    repositoryUrls: z
      .array(z.string().url("Each repository URL must be valid"))
      .optional(),
    liveDemoUrl: z.string().url("Live demo URL must be valid").optional(),
  }),
});

export const ProjectValidationSchemas = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};

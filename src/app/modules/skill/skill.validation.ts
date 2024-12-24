import { z } from "zod";

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
  }),
});

const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
  }),
});

export const SkillValidations = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
};

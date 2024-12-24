import { z } from "zod";

const createExperienceValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    company: z.string().min(1, { message: "Company is required" }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    description: z.string().min(1).optional(),
    technologies: z.array(z.string()).optional().default([]),
    isActive: z.boolean().default(true),
  }),
});

const updateExperienceValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    company: z.string().min(1).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const ExperienceValidations = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
};

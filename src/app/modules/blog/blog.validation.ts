import { z } from "zod";

const tagArraySchema = z.array(
  z.string().min(1, { message: "Tag cannot be empty" })
);

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    tags: tagArraySchema.optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    content: z.string().min(1, { message: "Content is required" }).optional(),
    tags: tagArraySchema.optional(),
  }),
});

export const BlogValidationSchemas = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

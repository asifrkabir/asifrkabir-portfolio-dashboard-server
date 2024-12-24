import { Blog } from "./blog.model";

export const getExistingBlogById = async (id: string) => {
  const result = await Blog.findOne({ _id: id, isActive: true });

  return result;
};

import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { TImageFiles } from "../../interface/image.interface";
import { getExistingBlogById } from "./blog.utils";

const getBlogById = async (id: string) => {
  const result = await Blog.findOne({ _id: id, isActive: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find({ isActive: true }), query)
    .search(["title", "content", "tags"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  const meta = await blogQuery.countTotal();

  return { meta, result };
};

const createBlog = async (payload: TBlog, images: TImageFiles) => {
  const { blogImages } = images;

  if (blogImages && blogImages.length > 0) {
    payload.images = blogImages.map((image) => image.path);
  }

  const result = await Blog.create(payload);
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<TBlog>,
  images: TImageFiles
) => {
  const existingBlog = await getExistingBlogById(id);

  if (!existingBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  let existingImageUrls: string[] = [];
  let newImageUrls: string[] = [];

  if (payload.images && payload.images.length > 0) {
    existingImageUrls = payload.images;
  }

  const { blogImages } = images;

  if (blogImages && blogImages.length > 0) {
    newImageUrls = blogImages.map((image) => image.path);
  }

  const finalImageUrls = [...existingImageUrls, ...newImageUrls];
  payload.images = finalImageUrls;

  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBlog = async (id: string) => {
  const existingBlog = await getExistingBlogById(id);

  if (!existingBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  return result;
};

export const BlogService = {
  getBlogById,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};

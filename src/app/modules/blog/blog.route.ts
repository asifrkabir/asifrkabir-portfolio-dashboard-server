import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { BlogController } from "./blog.controller";
import { BlogValidationSchemas } from "./blog.validation";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFilesArrayZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";

const router = Router();

router.get("/:id", BlogController.getBlogById);

router.get("/", BlogController.getAllBlogs);

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  multerUpload.fields([{ name: "blogImages" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(BlogValidationSchemas.createBlogValidationSchema),
  BlogController.createBlog
);

router.put(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  multerUpload.fields([{ name: "blogImages" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(BlogValidationSchemas.updateBlogValidationSchema),
  BlogController.updateBlog
);

router.delete("/:id", auth(USER_ROLE_ENUM.admin), BlogController.deleteBlog);

export const BlogRoutes = router;

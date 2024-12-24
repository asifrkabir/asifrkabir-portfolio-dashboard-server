import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { ProjectController } from "./project.controller";
import { ProjectValidationSchemas } from "./project.validation";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFilesArrayZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";

const router = Router();

router.get("/:id", ProjectController.getProjectById);

router.get("/", ProjectController.getAllProjects);

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  multerUpload.fields([{ name: "projectImages" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(ProjectValidationSchemas.createProjectValidationSchema),
  ProjectController.createProject
);

router.put(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  multerUpload.fields([{ name: "projectImages" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(ProjectValidationSchemas.updateProjectValidationSchema),
  ProjectController.updateProject
);

router.delete(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;

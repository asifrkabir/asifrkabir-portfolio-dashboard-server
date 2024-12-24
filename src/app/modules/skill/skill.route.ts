import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { SkillController } from "./skill.controller";
import { SkillValidations } from "./skill.validation";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFilesArrayZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";

const router = Router();

router.get("/:id", SkillController.getSkillById);

router.get("/", SkillController.getAllSkills);

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  multerUpload.fields([{ name: "logos" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(SkillValidations.createSkillValidationSchema),
  SkillController.createSkill
);

router.put(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  multerUpload.fields([{ name: "logos" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(SkillValidations.updateSkillValidationSchema),
  SkillController.updateSkill
);

router.delete("/:id", auth(USER_ROLE_ENUM.admin), SkillController.deleteSkill);

export const SkillRoutes = router;

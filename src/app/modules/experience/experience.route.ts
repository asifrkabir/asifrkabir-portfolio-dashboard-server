import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { ExperienceController } from "./experience.controller";
import { ExperienceValidations } from "./experience.validation";

const router = Router();

router.get("/:id", ExperienceController.getExperienceById);

router.get("/", ExperienceController.getAllExperiences);

router.post(
  "/",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(ExperienceValidations.createExperienceValidationSchema),
  ExperienceController.createExperience
);

router.put(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  validateRequest(ExperienceValidations.updateExperienceValidationSchema),
  ExperienceController.updateExperience
);

router.delete(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  ExperienceController.deleteExperience
);

export const ExperienceRoutes = router;

import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { InquiryController } from "./inquiry.controller";
import { InquiryValidations } from "./inquiry.validation";

const router = Router();

router.get("/:id", InquiryController.getInquiryById);

router.get("/", InquiryController.getAllInquiries);

router.post(
  "/",
  validateRequest(InquiryValidations.createInquiryValidationSchema),
  InquiryController.createInquiry
);

router.delete(
  "/:id",
  auth(USER_ROLE_ENUM.admin),
  InquiryController.deleteInquiry
);

export const InquiryRoutes = router;

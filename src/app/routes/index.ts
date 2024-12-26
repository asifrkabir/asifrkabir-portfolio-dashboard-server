import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ExperienceRoutes } from "../modules/experience/experience.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { SkillRoutes } from "../modules/skill/skill.route";
import { UserRoutes } from "../modules/user/user.route";
import { InquiryRoutes } from "../modules/inquiry/inquiry.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/experiences",
    route: ExperienceRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/inquiries",
    route: InquiryRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

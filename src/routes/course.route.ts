import { Router } from "express";
import { courseController } from "../controllers";
import { validateSchema, validateToken, verifyPermission } from "../middlewares";
import { courseSchema, courseUpdateSchema } from "../schemas";

const courseRouter = Router();

courseRouter.get("/courses", validateToken, courseController.readAll);
courseRouter.post(
  "/courses",
  validateToken,
  verifyPermission,
  validateSchema(courseSchema),
  courseController.createCourse
);
courseRouter.patch(
  "/courses/:id",
  validateToken,
  verifyPermission,
  validateSchema(courseUpdateSchema),
  courseController.updateCourse
);
courseRouter.post(
  "/courses/:id/users",
  validateToken,
  validateSchema(courseUpdateSchema),
  courseController.addUserToCourse
);

export default courseRouter;

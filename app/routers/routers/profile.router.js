import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import * as profileController from "../../controllers/profile.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import profileSchema from "../../schemas/profile.schema.js";

const router = Router();

router.route("/:pseudo")
  .patch(
    validationMiddleware("body", profileSchema),
    controllerWrapper(profileController.usernameModification),
  );

router.route("/:id/password")
  .patch(
    validationMiddleware("body", profileSchema),
    controllerWrapper(profileController.passwordModification),
  );

export default router;
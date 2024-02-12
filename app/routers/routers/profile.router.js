import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import * as profileController from "../../controllers/profile.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import profileSchema from "../../schemas/profile.schema.js";

const router = Router();
// route pour modifier le pseudo et le slug
router.route("/:pseudo")
  .patch(
    // vérifie la conformité du pseudo avec JOI
    validationMiddleware("body", profileSchema),
    // gére le try and catch dans le controller
    controllerWrapper(profileController.usernameModification),
  );

// route pour modifier le password
router.route("/:id/password")
  .patch(
    validationMiddleware("body", profileSchema),
    controllerWrapper(profileController.passwordModification),
  );

// route pour modifier l'email
router.route("/:id/email")
  .patch(
    validationMiddleware("body", profileSchema),
    controllerWrapper(profileController.emailModification),
  );
export default router;
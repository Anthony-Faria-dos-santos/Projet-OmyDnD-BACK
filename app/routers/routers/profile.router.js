import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import * as profileController from "../../controllers/profile.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import * as profileSchema from "../../schemas/profile.schema.js";

const router = Router();
// route pour modifier le pseudo et le slug

router.route("/:userId/profile")
  .get(
    controllerWrapper(profileController.getUser),
  );

router.route("/:usersId/profile/pseudo")
  .patch(
  // vérifie la conformité du pseudo avec JOI
    validationMiddleware("body", profileSchema.pseudoValidation),
    // gére le try and catch dans le controller
    controllerWrapper(profileController.usernameModification),
  );

// route pour modifier le password
router.route("/:userId/profile/password")
  .patch(
    validationMiddleware("body", profileSchema.passwordValidation),
    controllerWrapper(profileController.passwordModification),
  );

// route pour modifier l'email
router.route("/:userId/profile/email")
  .patch(
    validationMiddleware("body", profileSchema.emailValidation),
    controllerWrapper(profileController.emailModification),
  );
export default router;
import { Router } from "express";
import {
  getUser, usernameModification, passwordModification, emailModification,
} from "../../controllers/profile.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import * as profileSchema from "../../schemas/profile.schema.js";

const router = Router();
// route pour modifier le pseudo et le slug

router.route("/:userId/profile")
  .get(
    controllerWrapper(getUser),
  );

router.route("/:userId/profile/pseudo")
  .patch(
  // vérifie la conformité du pseudo avec JOI
    validationMiddleware("body", profileSchema.pseudoValidation),
    // gére le try and catch dans le controller
    controllerWrapper(usernameModification),
  );

// route pour modifier le password
router.route("/:userId/profile/password")
  .patch(
    validationMiddleware("body", profileSchema.passwordValidation),
    controllerWrapper(passwordModification),
  );

// route pour modifier l'email
router.route("/:userId/profile/email")
  .patch(
    validationMiddleware("body", profileSchema.emailValidation),
    controllerWrapper(emailModification),
  );
export default router;
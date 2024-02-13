import { Router } from "express";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import usersController from "../../controllers/users.controller.js";
import charactersController from "../../controllers/characters.controller.js";
import {
  getUser,
  usernameModification,
  passwordModification,
  emailModification,
} from "../../controllers/profile.controller.js";

import validateFactory from "../../middlewares/validation.middleware.js";

import signinSchema from "../../schemas/signin.schema.js";
import signupSchema from "../../schemas/signup.schema.js";
import * as profileSchema from "../../schemas/profile.schema.js";

const router = Router();

router
  .route("/signin")
  .post(
    validateFactory("body", signinSchema),
    controllerWrapper(usersController.signIn),
  );

router
  .route("/signup")
  .post(
    validateFactory("body", signupSchema),
    controllerWrapper(usersController.signUp),
  );

router
  .route("/:id(\\d+)/delete")
  .delete(controllerWrapper(usersController.deleteUserAccount));

router
  .route("/:id(\\d+)/characters")
  .get(controllerWrapper(charactersController.getAll));

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)")
  .get(controllerWrapper(charactersController.getByPk))
  .patch(controllerWrapper(charactersController.updateOne))
  .delete(controllerWrapper(charactersController.deleteOneByPk));

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/skills/:skillId(\\d+)")
  .post(controllerWrapper(charactersController.postSkill))
  .delete(controllerWrapper(charactersController.deleteSkill));

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/")
  .post(controllerWrapper(charactersController.postNote));

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/:noteId(\\d+)")
  .patch(controllerWrapper(charactersController.updateNote))
  .delete(controllerWrapper(charactersController.deleteNote));

router.route("/:userId(\\d+)/profile").get(controllerWrapper(getUser));

router.route("/:userId(\\d+)/profile/pseudo").patch(
  // vérifie la conformité du pseudo avec JOI
  validateFactory("body", profileSchema.pseudoValidation),
  // gére le try and catch dans le controller
  controllerWrapper(usernameModification),
);

// route pour modifier le password
router
  .route("/:userId(\\d+)/profile/password")
  .patch(
    validateFactory("body", profileSchema.passwordValidation),
    controllerWrapper(passwordModification),
  );

// route pour modifier l'email
router
  .route("/:userId(\\d+)/profile/email")
  .patch(
    validateFactory("body", profileSchema.emailValidation),
    controllerWrapper(emailModification),
  );

export default router;
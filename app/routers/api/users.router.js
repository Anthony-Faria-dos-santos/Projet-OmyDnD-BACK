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
import dbCheck from "../../middlewares/database.check.middleware.js";

const router = Router();

router
  .route("/signin")
  .post([
    validateFactory("body", signinSchema),
    controllerWrapper(usersController.signIn),
  ]);

router
  .route("/signup")
  .post([
    validateFactory("body", signupSchema),
    controllerWrapper(usersController.signUp),
  ]);

router
  .route("/:userId(\\d+)/delete")
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(usersController.deleteUserAccount),
  ]);

router
  .route("/:userId(\\d+)/characters")
  .get([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.getAll),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)")
  .get([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.getByPk),
  ])
  .patch([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.updateOne),
  ])
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.deleteOneByPk),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/skills/:skillId(\\d+)")
  .post([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.postSkill),
  ])
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.deleteSkill),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/")
  .post([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.postNote),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/:noteId(\\d+)")
  .patch([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.updateNote),
  ])
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.deleteNote),
  ]);

router.route("/:userId(\\d+)/profile")
  .get([controllerWrapper(dbCheck), controllerWrapper(getUser)]);

router.route("/:userId(\\d+)/profile/pseudo")
  .patch([
    validateFactory("body", profileSchema.pseudoValidation),
    controllerWrapper(dbCheck),
    controllerWrapper(usernameModification),
  ]);

// route pour modifier le password
router
  .route("/:userId(\\d+)/profile/password")
  .patch([
    validateFactory("body", profileSchema.passwordValidation),
    controllerWrapper(dbCheck),
    controllerWrapper(passwordModification),
  ]);

// route pour modifier l'email
router
  .route("/:userId(\\d+)/profile/email")
  .patch([
    validateFactory("body", profileSchema.emailValidation),
    controllerWrapper(dbCheck),
    controllerWrapper(emailModification),
  ]);

export default router;
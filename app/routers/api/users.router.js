import { Router } from "express";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import usersController from "../../controllers/users.controller.js";
import charactersController from "../../controllers/characters.controller.js";

import validateFactory from "../../middlewares/validation.middleware.js";

import signinSchema from "../../schemas/signin.schema.js";
import signupSchema from "../../schemas/signup.schema.js";

const router = Router();

router.route("/signin")
  .post(
    validateFactory("body", signinSchema),
    controllerWrapper(usersController.signIn),
  );

router.route("/signup")
  .post(
    validateFactory("body", signupSchema),
    controllerWrapper(usersController.signUp),
  );

router.route("/:id(\\d+)/delete")
  .delete(
    controllerWrapper(usersController.deleteUserAccount),
  );

router.route("/:id(\\d+)/characters")
  .get(
    controllerWrapper(charactersController.getAll),
  );

router.route("/:userId(\\d+)/characters/:characterId(\\d+)")
  .get(
    controllerWrapper(charactersController.getByPk),
  )
  .patch(
    controllerWrapper(charactersController.updateOne),
  )
  .delete(
    controllerWrapper(charactersController.deleteOneByPk),
  );

router.route("/:userId(\\d+)/characters/:characterId(\\d+)/skills/:skillId(\\d+)")
  .post(
    controllerWrapper(charactersController.postSkill),
  )
  .delete(
    controllerWrapper(charactersController.deleteSkill),
  );

router.route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/")
  .post(
    controllerWrapper(charactersController.postNote),
  );

router.route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/:noteId(\\d+)")
  .patch(
    controllerWrapper(charactersController.updateNote),
  )
  .delete(
    controllerWrapper(charactersController.deleteNote),
  );

export default router;
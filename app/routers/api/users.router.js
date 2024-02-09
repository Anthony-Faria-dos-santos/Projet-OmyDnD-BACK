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

router.route("/delete")
  .delete(
    controllerWrapper(usersController.deleteUserAccount),
  );

router.route("/:id/characters")
  .get(
    controllerWrapper(charactersController.getAll)
  );

router.route("/:userId/characters/:characterId")
  .get(
    controllerWrapper(charactersController.getByPk)
  )
  .patch(
    controllerWrapper(charactersController.updateOne)
  )
  .delete(
    controllerWrapper(charactersController.deleteOneByPk)
  )

export default router;
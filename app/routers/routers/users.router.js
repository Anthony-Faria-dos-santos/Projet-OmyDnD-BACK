import { Router } from "express";
import usersController from "../../controllers/users.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";
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

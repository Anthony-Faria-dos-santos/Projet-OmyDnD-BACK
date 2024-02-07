import { Router } from "express";
import usersController from "../../controllers/users.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/signIn")
  .post(controllerWrapper(usersController.signIn));

router.route("/signOff")
  .post(controllerWrapper(usersController.signOff));

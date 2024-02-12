import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import * as profileController from "../../controllers/profile.controller.js";

const router = Router();

router.route("/:pseudo")
  .patch(
    controllerWrapper(profileController.usernameModification),
  );

export default router;
import { Router } from "express";
import classesController from "../../controllers/classes.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/characterCreator")
  .get(
    controllerWrapper(classesController.sendClasses),
  );

export default router;

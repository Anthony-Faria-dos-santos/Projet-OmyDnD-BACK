import { Router } from "express";
import classesController from "../../controllers/classes.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/classes")
  .get(
    controllerWrapper(classesController.sendClasses),
  );

export default router;

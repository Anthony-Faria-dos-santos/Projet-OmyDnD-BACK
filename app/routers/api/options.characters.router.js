import { Router } from "express";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import optionsController from "../../controllers/options.controller.js";

const router = Router();

router.route("/skills")
  .get(
    controllerWrapper(optionsController.getAllSkills),
  );

export default router;
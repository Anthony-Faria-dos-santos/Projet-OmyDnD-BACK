import { Router } from "express";
import backgroundsController from "../../controllers/backgrounds.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/characterCreator/backgrounds")
  .get(
    controllerWrapper(backgroundsController.sendBackgrounds),
  );

export default router;

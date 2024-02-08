import { Router } from "express";
import racesController from "../../controllers/races.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/characterCreator")
  .get(
    controllerWrapper(racesController.sendRaces),
  );

export default router;

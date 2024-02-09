import { Router } from "express";
import characterCreatorController from "../../controllers/character.creator.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/creator")
  .post(characterCreatorController.createCharacter);

router.route("/races")
  .get(
    controllerWrapper(characterCreatorController.sendRaces),
  );

router.route("/backgrounds")
  .get(
    controllerWrapper(characterCreatorController.sendBackgrounds),
  );

router.route("/classes")
  .get(
    controllerWrapper(characterCreatorController.sendClasses),
  );

export default router;
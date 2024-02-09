import { Router } from "express";
import characterCreatorController from "../../controllers/character.creator.controller.js";
import controllerWrapper from "../../helpers/controller.wrapper.js";

const router = Router();

router.route("/creator")
  .post(
    controllerWrapper(characterCreatorController.createCharacter),
  );

export default router;
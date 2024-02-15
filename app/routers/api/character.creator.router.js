import { Router } from "express";
import characterCreatorController from "../../controllers/character.creator.controller.js";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import validateFactory from "../../middlewares/validation.middleware.js";

import characterCreatorSchema from "../../schemas/character.creator.schema.js";

const router = Router();

router.route("/creator")
/**
 * POST /api/charactercreator/creator
 * @summary Create a new character
 * @tags Character Creator
 * @param {object} request.body.required necessary for the character
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .post(
    validateFactory("body", characterCreatorSchema),
    controllerWrapper(characterCreatorController.createCharacter),
  );

router.route("/races")
/**
 * GET /api/charactercreator/races
 * @summary Get all races
 * @tags Character Creator
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(
    controllerWrapper(characterCreatorController.sendRaces),
  );

router.route("/backgrounds")
/**
 * GET /api/charactercreator/backgrounds
 * @summary Get all backgrounds
 * @tags Character Creator
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(
    controllerWrapper(characterCreatorController.sendBackgrounds),
  );

router.route("/classes")
/**
 * GET /api/charactercreator/classes
 * @summary Get all classes
 * @tags Character Creator
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(
    controllerWrapper(characterCreatorController.sendClasses),
  );

export default router;
import { Router } from "express";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import optionsController from "../../controllers/options.controller.js";

const router = Router();

router.route("/skills")
/**
 * GET /options/skills
 * @summary Get all skills
 * @tags Character Creator
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(
    controllerWrapper(optionsController.getAllSkills),
  );

export default router;
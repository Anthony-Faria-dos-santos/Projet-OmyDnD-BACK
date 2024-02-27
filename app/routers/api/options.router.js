import { Router } from "express";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import optionsController from "../../controllers/options.controller.js";

const router = Router();

router.route("/skills")
  /**
 * GET /api/skills
 * @summary Get all skills from database
 * @tags Options
 * @return {Skill[]} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(
    controllerWrapper(optionsController.getAllSkills),
  );

router.route("/spells")
  /**
 * GET /api/spells/?type={type}&value={value}
 * @summary returns the spells matching the search
 * @tags Options
 * @param {string} type.path.required index name
 * @param {string} value.path.required value of search
 * @return {Spell[]} 200 - success response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(
    controllerWrapper(optionsController.getSpells),
  );

export default router;
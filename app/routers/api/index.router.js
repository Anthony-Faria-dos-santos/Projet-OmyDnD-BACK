import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import ApiError from "../../errors/api.error.js";
import CoreController from "../../controllers/core.controller.js";

// * Ligne suivante a décommenter si utilisation de Joi validate('sourceProperty', schema)
// import validateMiddleware from "../middlewares/validation.middleware.js";
// Mw a ajouter dans les routes avec la validations des données entrantes

const apiRouter = Router();

export default apiRouter;
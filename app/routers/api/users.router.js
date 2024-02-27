import { Router } from "express";

import controllerWrapper from "../../helpers/controller.wrapper.js";

import usersController from "../../controllers/users.controller.js";
import charactersController from "../../controllers/characters.controller.js";
import {
  getUser,
  usernameModification,
  passwordModification,
  emailModification,
} from "../../controllers/profile.controller.js";

import validateFactory from "../../middlewares/validation.middleware.js";

import signinSchema from "../../schemas/signin.schema.js";
import signupSchema from "../../schemas/signup.schema.js";
import * as profileSchema from "../../schemas/profile.schema.js";
import dbCheck from "../../middlewares/database.check.middleware.js";

const router = Router();

router
  .route("/signin")
  /**
   * POST /api/users/signin
   * @summary add a token to authenticate user
   * @tags Authentification
   * @param {Login} request.body.required
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .post([
    validateFactory("body", signinSchema),
    controllerWrapper(usersController.signIn),
  ]);

router
  .route("/signup")
  /**
   * POST /api/users/signup
   * @summary register user informations in database
   * @tags Authentification
   * @param {Signup} request.body.required
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .post([
    validateFactory("body", signupSchema),
    controllerWrapper(usersController.signUp),
  ]);

router
  .route("/:userId(\\d+)/delete")
  /**
   * DELETE /api/users/{userId}/delete
   * @summary delete user information from database
   * @tags Users
   * @param {number} id.path.required  user id
   * @param {UpdateEmail} request.body.required
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 401 - Unauthorized - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(usersController.deleteUserAccount),
  ]);

router
  .route("/:userId(\\d+)/characters")
  /**
   * GET /api/users/{userId}/characters
   * @summary get all characters of one user
   * @tags Users All Characters
   * @param {number} userId.path.required  user id
   * @return {Characters[]} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 404 - Unauthorized - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .get([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.getAll),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)")
  /**
   * GET /api/users/{userId}/characters/{characterId}
   * @summary get one character of one user with all relations (look at character schema)
   * @tags Users One Character
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @return {Character} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .get([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.getByPk),
  ])
  /**
   * PATCH /api/users/{userId}/characters/{characterId}
   * @summary update one character of one user
   * @tags Users One Character
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @param {UpdateCharacter} request.body
   * @return {UpdateCharacter} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .patch([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.updateOne),
  ])
  /**
   * DELETE /api/users/{userId}/characters/{characterId}
   * @summary update one character of one user
   * @tags Users One Character
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.deleteOneByPk),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/skills/:skillId(\\d+)")
  /**
   * POST /api/users/{userId}/characters/{characterId}/skills/{skillId}
   * @summary associates one skill to one character of a user
   * @tags Users One Character Skill
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @param {number} skillId.path.required  skill id
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .post([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.postSkill),
  ])
  /**
   * DELETE /api/users/{userId}/characters/{characterId}/skills/{skillId}
   * @summary disassociates one skill to one character of a user
   * @tags Users One Character Skill
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @param {number} skillId.path.required  skill id
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.deleteSkill),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/notes")
  /**
   * POST /api/users/{userId}/characters/{characterId}/notes
   * @summary create one note associated to one character of a user
   * @tags Users One Character Note
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @param {Note} request.body.required
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .post([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.postNote),
  ]);

router
  .route("/:userId(\\d+)/characters/:characterId(\\d+)/notes/:noteId(\\d+)")
  /**
   * PATCH /api/users/{userId}/characters/{characterId}/notes/{noteId}
   * @summary update one note associated to one character of a user
   * @tags Users One Character Note
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @param {number} noteId.path.required  note id
   * @param {UpdateNote} request.body.required
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .patch([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.updateNote),
  ])
  /**
   * DELETE /api/users/{userId}/characters/{characterId}/notes/{noteId}
   * @summary delete one note associated to one character of a user
   * @tags Users One Character Note
   * @param {number} userId.path.required  user id
   * @param {number} characterId.path.required  character id
   * @param {number} noteId.path.required  note id
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad Request response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
  */
  .delete([
    controllerWrapper(dbCheck),
    controllerWrapper(charactersController.deleteNote),
  ]);

router.route("/:userId(\\d+)/profile")
  /**
   * GET /api/users/{userId}/profile/
   * @summary get user informations
   * @tags Users profile
   * @param {number} userId.path.required user id
   * @return {User} 200 - success response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .get([
    controllerWrapper(dbCheck),
    controllerWrapper(getUser),
  ]);

router.route("/:userId(\\d+)/profile/pseudo")
  /**
   * PATCH /api/users/{userId}/profile/pseudo
   * @summary Modify user pseudo
   * @tags Users profile
   * @param {number} userId.path.required user id
   * @param {UpdatePseudo} request.body
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .patch([
    validateFactory("body", profileSchema.pseudoValidation),
    controllerWrapper(dbCheck),
    controllerWrapper(usernameModification),
  ]);

// route pour modifier le password
router
  .route("/:userId(\\d+)/profile/password")
/**
   * PATCH /api/users/{userId}/profile/password
   * @summary Modify user password
   * @tags Users profile
   * @param {number} userId.path.required user id
   * @param {UpdatePassword} request.body
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .patch([
    validateFactory("body", profileSchema.passwordValidation),
    controllerWrapper(dbCheck),
    controllerWrapper(passwordModification),
  ]);

// route pour modifier l'email
router
  .route("/:userId(\\d+)/profile/email")
  /**
   * PATCH /api/users/{userId}/profile/email
   * @summary Modify user email
   * @tags Users profile
   * @param {number} userId.path.required user id
   * @param {UpdateEmail} request.body
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .patch([
    validateFactory("body", profileSchema.emailValidation),
    controllerWrapper(dbCheck),
    controllerWrapper(emailModification),
  ]);

export default router;
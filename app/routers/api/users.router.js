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
   * @param {object} request.body.required  email, password
   * @param {object} request.body {email: myemail@test.com, password: MyBestPassword}
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
   * @param {object} request.body.required  pseudo, email, password, passwordConfirm
   * @param {object} request.body {pseudo: itsMe, email: myemail@test.com,
   *  password: MyBestPassword, passwordConfirm: MyBestPassword}
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
   * DELETE /api/users/{id}/delete
   * @summary delete user information from database
   * @tags Users
   * @param {number} id.path.required  user id
   * @param {object} request.body.required  email
   * @param {object} request.body {email: myEmail@test.fr}
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
   * GET /api/users/{id}/characters
   * @summary get all characters of one user
   * @tags Users characters
   * @param {number} id.path.required  user id
   * @return {object} 200 - success response - application/json
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
   * @summary get one character of one user
   * @tags Users Character
   * @param {number} id.path.required  user id and character id
   * @return {object} 200 - success response - application/json
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
   * @tags Users Character
   * @param {number} id.path.required  user id and character id
   * @param {object} request.body character modifications
   * @return {object} 200 - success response - application/json
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
   * @tags Users Character
   * @param {number} id.path.required  user id and character id
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
   * @tags Users Character Skill
   * @param {number} id.path.required  user id, character id and skill id
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
   * @tags Users Character Skill
   * @param {number} id.path.required  user id, character id and skill id
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
   * @tags Users Character Note
   * @param {number} id.path.required  user id and character id
   * @param {object} request.body add title and content for notes
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
   * PATCH /api/users/{userId}/characters/{characterId}/notes
   * @summary update one note associated to one character of a user
   * @tags Users Character Note
   * @param {number} id.path.required user id, character id and note id
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
   * DELETE /api/users/{userId}/characters/{characterId}/notes
   * @summary delete one note associated to one character of a user
   * @tags Users Character Note
   * @param {number} id.path.required  user id, character id and note id
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
   * GET /api/users/{id}/profile/
   * @summary get user informations
   * @tags Users profile
   * @param {number} id.path.required user id
   * @return {object} 200 - success response - application/json
   * @return {ApiJsonError} 403 - Forbidden - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  
  .get([controllerWrapper(dbCheck), controllerWrapper(getUser)]);

router.route("/:userId(\\d+)/profile/pseudo")
  /**
   * PATCH /api/users/{id}/profile/pseudo
   * @summary Modify user pseudo
   * @tags Users profile
   * @param {number} id.path.required user id
   * @param {object} request.body  {pseudo: myNewPseudo}
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
   * PATCH /api/users/{id}/profile/password
   * @summary Modify user password
   * @tags Users profile
   * @param {number} id.path.required user id
   * @param {object} request.body {password: MyNewPassword, oldPassword: MyOldPassword}
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
   * PATCH /api/users/{id}/profile/email
   * @summary Modify user email
   * @tags Users profile
   * @param {number} id.path.required user id
   * @param {object} request.body  {email: myNewEmail@test.fr}
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
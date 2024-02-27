import { Router } from "express";
import usersRouter from "./users.router.js";
import characterCRouter from "./character.creator.router.js";
import optionsRouter from "./options.router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/charactercreator", characterCRouter);
router.use("/options", optionsRouter);

export default router;

// Schemas for api doc

/**
 * @typedef {object} CreatorCharacter
 * @property {number} user_id - characters' owner's id
 * @property {number} classe_id - characters' classe's id
 * @property {number} background_id - characters' background's id
 * @property {number} race_id - characters' race's id
 * @property {string} name - characters name
 * @property {number} strength - characters' strength
 * @property {number} dexterity - characters' dexterity
 * @property {number} constitution - characters' constitution
 * @property {number} inteligence - characters' inteligence
 * @property {number} wisdom - characters' wisdom
 * @property {number} charisma - characters' charisma
 * @property {string} alignment - characters' alignment
*/

/**
 * @typedef {object} UpdateCharacter
 * @property {number} user_id - characters' owner's id
 * @property {number} classe_id - characters' classe's id
 * @property {number} background_id - characters' background's id
 * @property {number} race_id - characters' race's id
 * @property {string} name - characters name
 * @property {number} level - characters' level
 * @property {number} experience - characters' experience
 * @property {number} strength - characters' strength
 * @property {number} dexterity - characters' dexterity
 * @property {number} constitution - characters' constitution
 * @property {number} inteligence - characters' inteligence
 * @property {number} wisdom - characters' wisdom
 * @property {number} charisma - characters' charisma
 * @property {number} inspiration - characters' inspiration
 * @property {string} status - characters' status
 * @property {number} armor_class - characters' armor_class
 * @property {number} health - characters' health
 * @property {number} bonus_health - characters' bonus_health
 * @property {string} alignment - characters' alignment
*/

/**
 * @typedef {object} Character
 * @property {number} id - characters' id
 * @property {number} user_id - characters' owner's id
 * @property {number} race_id - characters' race id
 * @property {number} classe_id - characters' classe id
 * @property {number} background_id - characters' background id
 * @property {string} name - characters' name
 * @property {number} level - characters' level
 * @property {number} experience - characters' experience
 * @property {number} strength - characters' strength
 * @property {number} dexterity - characters' dexterity
 * @property {number} constitution - characters' constitution
 * @property {number} inteligence - characters' inteligence
 * @property {number} wisdom - characters' wisdom
 * @property {number} charisma - characters' charisma
 * @property {number} inspiration - characters' inspiration
 * @property {number} armor_class - characters' armor class
 * @property {number} health - characters health
 * @property {number} bonus_health - characters' bonus health
 * @property {string} alignment - characters' alignment
 * @property {string} status - characters' status
 * @property {string} race_name - characters' race name
 * @property {string} race_speed - characters' race speed
 * @property {number} race_strength_bonus - characters' race strength bonus
 * @property {number} race_dexterity_bonus - characters' race dexterity bonus
 * @property {number} race_constitution_bonus - characters' race constitution bonus
 * @property {number} race_inteligence_bonus - characters' race inteligence bonus
 * @property {number} race_wisdom_bonus - characters' race wisdom bonus
 * @property {number} race_charisma_bonus - characters' race charisma bonus
 * @property {string} race_languages - characters' race languages
 * @property {string} race_traits - characters' race traits
 * @property {string} classe_name - characters' classe name
 * @property {string} classe_health_dice - characters' classe health dice
 * @property {number} classe_starting_health - characters' classe starting health
 * @property {string} classe_starting_equipment_options - characters' classe starting equipment
 * @property {string} background_name - characters' background name
 * @property {string} background_mastered_tools - characters' background mastered tools
 * @property {string} background_starting_equipment - characters' background starting equipment
 * @property {string} background_feature - characters' background feature
 * @property {number[]} skills
 * @property {object[]} notes - {note_id, note_content}
*/

/**
 * @typedef {object} Races
 * @property {number} id - Races' id
 * @property {string} name - Races' name
 * @property {string} speed - Races' speed
 * @property {number} strength_bonus - Races' strength_bonus
 * @property {number} dexterity_bonus - Races' dexterity_bonus
 * @property {number} constitution_bonus - Races' constitution_bonus
 * @property {number} inteligence_bonus - Races' inteligence_bonus
 * @property {number} wisdom_bonus - Races' wisdom_bonus
 * @property {number} charisma_bonus - Races' charisma_bonus
 * @property {string} languages - Races' languages
 * @property {string} traits - Races' traits
*/

/**
 * @typedef {object} Classes
 * @property {number} id - Classes' id
 * @property {string} name - Classes' name
 * @property {string} health_dice - Classes' health_dice
 * @property {number} starting_health - Classes' starting_health
 * @property {string} starting_equipment_options - Classes' starting_equipment_options
*/

/**
 * @typedef {object} Backgrounds
 * @property {number} id - Backgrounds' id
 * @property {string} name - Backgrounds' name
 * @property {string} mastered_tools - Backgrounds' mastered_tools
 * @property {string} starting_equipment - Backgrounds' starting_equipment
 * @property {string} feature - Backgrounds' feature
*/

/**
 * @typedef {object} Login
 * @property {string} email - user's email
 * @property {string} password - user's password
*/

/**
 * @typedef {object} LoginResponse
 * @property {string} id - user's id
 * @property {string} pseudo - user's pseudo
 * @property {string} slug - user's slug
 * @property {string} email - user's email
 * @property {string} token - user's JWT
*/

/**
 * @typedef {object} Signup
 * @property {number} pseudo - user's pseudo
 * @property {string} email - user's email
 * @property {string} password - user's password
 * @property {string} passwordConfirm - user's passwordConfirm
*/

/**
 * @typedef {object} Characters
 * @property {number} id - Characters' id
 * @property {string} name - Characters' name
 * @property {number} level - Characters' level
 * @property {string} status - Characters' status
*/

/**
 * @typedef {object} Note
 * @property {string} content - note's content
 * @property {number} user_id - user's id
*/

/**
 * @typedef {object} UpdateNote
 * @property {string} content - new note's content
*/

/**
 * @typedef {object} UpdatePseudo
 * @property {string} pseudo - user new pseudo
*/

/**
 * @typedef {object} UpdateEmail
 * @property {string} email - user new email
*/

/**
 * @typedef {object} UpdatePassword
 * @property {string} password - user new password
 * @property {string} oldPassword - user actual password
*/

/**
 * @typedef {object} Skill
 * @property {number} id - Skill's id
*/

/**
 * @typedef {object} Spell
 * @property {number} id - Spell's id
 * @property {string} name - Spell's name
 * @property {string} description - Spell's description
 * @property {string} range - Spell's range
 * @property {string} components - Spell's components
 * @property {string} material - Spell's material
 * @property {string} ritual - Spell's ritual
 * @property {string} duration - Spell's duration
 * @property {string} concentration - Spell's concentration
 * @property {string} casting_time - Spell's casting_time
 * @property {string} level - Spell's level
 * @property {string} school - Spell's school
 * @property {string} class - Spell's class
 * @property {string} higher_level - Spell's higher_level
 * @property {string} archetype - Spell's archetype
 * @property {string} domains - Spell's domains
 * @property {string} oaths - Spell's oaths
 * @property {string} circles - Spell's circles
 * @property {string} patrons - Spell's patrons
*/

/**
 * @typedef {object} User
 * @property {number} id - User's id
 * @property {string} pseudo - User's pseudo
 * @property {string} slug - User's slug
 * @property {string} email - User's email
*/
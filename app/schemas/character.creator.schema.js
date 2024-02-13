import Joi from "joi";

export default Joi.object({
  user_id: Joi.number()
    .integer()
    .required(),
  classe_id: Joi.number()
    .integer()
    .required(),
  background_id: Joi.number()
    .integer()
    .required(),
  race_id: Joi.number()
    .integer()
    .required(),
  name: Joi.string()
    .max(30)
    .required(),
  level: Joi.number()
    .integer()
    .required(),
  strength: Joi.number()
    .integer()
    .max(20)
    .required(),
  dexterity: Joi.number()
    .integer()
    .max(20)
    .required(),
  constitution: Joi.number()
    .integer()
    .max(20)
    .required(),
  inteligence: Joi.number()
    .integer()
    .max(20)
    .required(),
  wisdom: Joi.number()
    .integer()
    .max(20)
    .required(),
  charisma: Joi.number()
    .integer()
    .max(20)
    .required(),
  inspiration: Joi.number()
    .integer(),
  armor_class: Joi.number()
    .integer()
    .required(),
  alignment: Joi.string()
    .max(20)
    .required(),
});
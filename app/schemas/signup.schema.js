import Joi from "joi";

const pattern = /^[a-zA-Z0-9_]*$/;
// on vérifie les entrées utilisateur du signup avant de les utiliser
export default Joi.object({
  pseudo: Joi.string()
    .pattern(pattern)
    .min(3)
    .max(15)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  passwordConfirm: Joi.ref("password"),
});
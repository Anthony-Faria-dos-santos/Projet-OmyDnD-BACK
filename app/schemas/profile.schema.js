import Joi from "joi";
// regex qui vérifie que le pseudo comprend uniquement :
// des lettre minuscules/majuscules, des chiffres, ou des underscores
const pattern = /^[a-zA-Z0-9_]*$/;
// on vérifie les entrées utilisateur du signup avant de les utiliser

const pseudoValidation = Joi.object({
  pseudo: Joi.string()
    .pattern(pattern)
    .min(3)
    .max(15)
    .required(),
});

const passwordValidation = Joi.object({
  password: Joi.string()
    .min(8)
    .required(),
  passwordConfirm: Joi.ref("password"),
  oldPassword: Joi.string()
    .min(8)
    .required(),
});

const emailValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .required(),
});

export { pseudoValidation, passwordValidation, emailValidation };
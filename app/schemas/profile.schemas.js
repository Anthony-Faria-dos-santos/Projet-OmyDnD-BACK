import Joi from "joi";
// regex qui vérifie que le pseudo comprend uniquement :
// des lettre minuscules/majuscules, des chiffres, ou des underscores
const pattern = /^[a-zA-Z0-9_]*$/;
// on vérifie les entrées utilisateur du signup avant de les utiliser
export default Joi.object({
  pseudo: Joi.string()
    .pattern(pattern)
    .min(3)
    .max(15)
    .required(),

});
import Joi from "joi";

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
});

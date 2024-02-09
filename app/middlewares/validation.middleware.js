import ApiError from "../errors/api.error.js";

export default (dataProp, schema) => async (request, response, next) => {
  try {
    await schema.validateAsync(request[dataProp]);
    next();
  } catch (err) {
    next(new ApiError(err.details[0].message, { httpStatus: 400 }));
  }
};
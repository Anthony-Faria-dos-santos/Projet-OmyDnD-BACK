import ApiError from "../errors/api.error.js";

export default (controllerMdw) => async (request, response, next) => {
  try {
    await controllerMdw(request, response, next);
  } catch (err) {
    next(new ApiError(err.message, { httpStatus: 500 }));
  }
};
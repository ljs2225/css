import { ApiError } from '../utils/ApiError.js';

export function validateStudentInput(req, res, next) {
  const { firstName, lastName, tutoringSite, days, times } = req.body;

  if (!firstName || typeof firstName !== 'string') {
    return next(new ApiError(400, 'firstName is required'));
  }
  if (!lastName || typeof lastName !== 'string') {
    return next(new ApiError(400, 'lastName is required'));
  }
  if (!tutoringSite || typeof tutoringSite !== 'string') {
    return next(new ApiError(400, 'tutoringSite is required'));
  }
  if (!days || typeof days !== 'string') {
    return next(new ApiError(400, 'days is required'));
  }
  if (!times || typeof times !== 'string') {
    return next(new ApiError(400, 'times is required'));
  }

  next();
}

import { ApiError } from '../utils/ApiError.js';

export function validateSessionInput(req, res, next) {
  const { studentId, sessionDate, hours } = req.body;

  if (!studentId || !Number.isInteger(studentId)) {
    return next(new ApiError(400, 'studentId is required and must be an integer'));
  }
  if (!sessionDate || Number.isNaN(Date.parse(sessionDate))) {
    return next(new ApiError(400, 'sessionDate is required and must be a valid date'));
  }
  if (typeof hours !== 'number' || Number.isNaN(hours) || hours < 0) {
    return next(new ApiError(400, 'hours is required and must be a non-negative number'));
  }

  next();
}

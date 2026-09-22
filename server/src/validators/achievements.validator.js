import { ApiError } from '../utils/ApiError.js';

export function validateAchievementInput(req, res, next) {
  const { studentId, sessionDate, achievement } = req.body;

  if (!studentId || !Number.isInteger(studentId)) {
    return next(new ApiError(400, 'studentId is required and must be an integer'));
  }
  if (!sessionDate || Number.isNaN(Date.parse(sessionDate))) {
    return next(new ApiError(400, 'sessionDate is required and must be a valid date'));
  }
  if (!Number.isInteger(achievement) || achievement < 1 || achievement > 18) {
    return next(new ApiError(400, 'achievement is required and must be an integer from 1 to 18'));
  }

  next();
}

import { pool } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';
import { DEFAULT_TUTOR_EMAIL } from '../config/constants.js';

export async function listAchievements(req, res, next) {
  try {
    const { studentId } = req.query;
    const params = [DEFAULT_TUTOR_EMAIL];
    let studentFilter = '';
    if (studentId) {
      studentFilter = 'AND student_id = ?';
      params.push(studentId);
    }

    const [rows] = await pool.query(
      `SELECT student_id, achievement, other
       FROM achievements
       WHERE tutor_id = ? ${studentFilter}`,
      params,
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function createAchievement(req, res, next) {
  try {
    const { studentId, sessionDate, achievement, other } = req.body;
    await pool.query(
      `INSERT INTO achievements (tutor_id, student_id, session_date, achievement, other)
       VALUES (?, ?, ?, ?, ?)`,
      [DEFAULT_TUTOR_EMAIL, studentId, sessionDate, achievement, other ?? null],
    );
    res.status(201).json({ studentId, achievement });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return next(new ApiError(409, 'That achievement is already recorded for this student'));
    }
    next(err);
  }
}

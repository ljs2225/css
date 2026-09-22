import { pool } from '../db/pool.js';
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

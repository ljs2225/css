import { pool } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';
import { DEFAULT_TUTOR_EMAIL } from '../config/constants.js';

export async function getCurrentTutor(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT email, first_name, last_name FROM tutors WHERE email = ?',
      [DEFAULT_TUTOR_EMAIL],
    );
    if (!rows[0]) {
      throw new ApiError(404, 'No tutor configured');
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

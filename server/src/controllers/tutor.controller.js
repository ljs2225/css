import { pool } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';
import { DEFAULT_TUTOR_ID } from '../config/constants.js';

export async function getCurrentTutor(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT id, name, email FROM tutors WHERE id = ?', [
      DEFAULT_TUTOR_ID,
    ]);
    if (!rows[0]) {
      throw new ApiError(404, 'No tutor configured');
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

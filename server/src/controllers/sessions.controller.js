import { pool } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';
import { DEFAULT_TUTOR_EMAIL } from '../config/constants.js';

export async function listSessions(req, res, next) {
  try {
    const { studentId } = req.query;
    const params = [DEFAULT_TUTOR_EMAIL];
    let studentFilter = '';
    if (studentId) {
      studentFilter = 'AND s.student_id = ?';
      params.push(studentId);
    }

    const [rows] = await pool.query(
      `SELECT s.student_id, s.session_date, s.hours, s.special,
              CONCAT(st.first_name, ' ', st.last_name) AS student_name
       FROM sessions s
       JOIN students st ON st.id = s.student_id
       WHERE s.tutor_id = ? ${studentFilter}
       ORDER BY s.session_date DESC`,
      params,
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function createSession(req, res, next) {
  try {
    const { studentId, sessionDate, hours, special } = req.body;
    await pool.query(
      `INSERT INTO sessions (tutor_id, student_id, session_date, hours, special)
       VALUES (?, ?, ?, ?, ?)`,
      [DEFAULT_TUTOR_EMAIL, studentId, sessionDate, hours, special ?? null],
    );
    res.status(201).json({ studentId, sessionDate });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return next(new ApiError(409, 'A session for this student on this date has already been logged.'));
    }
    next(err);
  }
}

export async function deleteSession(req, res, next) {
  try {
    const { studentId, sessionDate } = req.params;
    const [result] = await pool.query(
      'DELETE FROM sessions WHERE tutor_id = ? AND student_id = ? AND session_date = ?',
      [DEFAULT_TUTOR_EMAIL, studentId, sessionDate],
    );
    if (result.affectedRows === 0) {
      throw new ApiError(404, 'Session not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

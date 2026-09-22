import { pool } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';
import { DEFAULT_TUTOR_ID } from '../config/constants.js';

export async function listSessions(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.session_date, s.hours, s.notes, st.name AS student_name
       FROM sessions s
       JOIN students st ON st.id = s.student_id
       WHERE s.tutor_id = ?
       ORDER BY s.session_date DESC`,
      [DEFAULT_TUTOR_ID],
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function createSession(req, res, next) {
  try {
    const { studentId, sessionDate, hours, notes } = req.body;
    const [result] = await pool.query(
      `INSERT INTO sessions (tutor_id, student_id, session_date, hours, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [DEFAULT_TUTOR_ID, studentId, sessionDate, hours, notes ?? null],
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
}

export async function deleteSession(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM sessions WHERE id = ? AND tutor_id = ?', [
      id,
      DEFAULT_TUTOR_ID,
    ]);
    if (result.affectedRows === 0) {
      throw new ApiError(404, 'Session not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

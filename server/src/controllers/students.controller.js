import { pool } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';

export async function listStudents(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, tutoring_site, days, times, ended, end_date
       FROM students
       ORDER BY last_name, first_name`,
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getStudent(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, tutoring_site, days, times, ended, end_date
       FROM students
       WHERE id = ?`,
      [id],
    );
    if (!rows[0]) {
      throw new ApiError(404, 'Student not found');
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function endTutoring(req, res, next) {
  try {
    const { id } = req.params;
    const { endDate } = req.body;

    if (!endDate || Number.isNaN(Date.parse(endDate))) {
      throw new ApiError(400, 'endDate is required and must be a valid date');
    }

    const [result] = await pool.query(
      'UPDATE students SET ended = TRUE, end_date = ? WHERE id = ?',
      [endDate, id],
    );
    if (result.affectedRows === 0) {
      throw new ApiError(404, 'Student not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function createStudent(req, res, next) {
  try {
    const { firstName, lastName, tutoringSite, days, times } = req.body;
    const [result] = await pool.query(
      `INSERT INTO students (first_name, last_name, tutoring_site, days, times)
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, tutoringSite, days, times],
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
}

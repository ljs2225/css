import { pool } from '../db/pool.js';

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

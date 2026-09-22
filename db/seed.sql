-- MVP: single tutor, always id 1 (see server/src/config/constants.js), no login.
INSERT INTO tutors (name, email) VALUES
  ('Test Tutor', 'tutor@example.com');

INSERT INTO students (name) VALUES
  ('Alex Morgan'),
  ('Jamie Lee');

INSERT INTO sessions (tutor_id, student_id, session_date, hours, notes) VALUES
  (1, 1, CURDATE() - INTERVAL 7 DAY, 1.5, 'Reviewed fractions'),
  (1, 2, CURDATE() - INTERVAL 2 DAY, 1.0, 'Reading comprehension practice');

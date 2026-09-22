-- MVP: single tutor, no login.
INSERT INTO tutors (email, first_name, last_name) VALUES
  ('ljs2225@columbia.edu', 'Lauren', 'Song');

INSERT INTO students (first_name, last_name, tutoring_site, days, times, ended, end_date) VALUES
  ('David', 'Li', 'Zoom', 'Mondays, Wednesdays', '4:00pm - 5:30pm', null, null),
  ('Catherine', 'Su', 'Google Meets', 'Tuesdays', '8:00pm - 10:00pm', 1, '2026-09-22');

-- special number indicates TA (1), SA (2), and H (3)
INSERT INTO sessions (tutor_id, student_id, session_date, hours, special) VALUES
  ('ljs2225@columbia.edu', 1, '2026-09-14', 1.5, null),
  ('ljs2225@columbia.edu', 2, '2026-09-15', 0, 2),
  ('ljs2225@columbia.edu', 2, '2026-09-08', 2, null);

-- achivement number indicates which achievement has been achieved
INSERT INTO achievements (tutor_id, student_id, session_date, achievement, other) VALUES
	('ljs2225@columbia.edu', 1, '2026-09-14', 8),
	('ljs2225@columbia.edu', 1, '2026-09-14', 11),
	('ljs2225@columbia.edu', 2, '2026-09-08', 4),
	('ljs2225@columbia.edu', 2, '2026-09-08', 18, 'Other example');

-- MVP: single tutor, no login. This table exists so sessions have a stable
-- tutor_id to reference and stays easy to extend if real auth gets added later.
CREATE TABLE IF NOT EXISTS tutors (
	email VARCHAR(255) PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL
);

-- Students tutors meet with
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  tutoring_site VARCHAR(255) NOT NULL,
  days VARCHAR(255) NOT NULL,
  times VARCHAR(255) NOT NULL,
  ended BOOLEAN,
  end_date DATE
);

-- Individual tutoring sessions logged by a tutor
CREATE TABLE IF NOT EXISTS sessions (
  tutor_id VARCHAR(255) NOT NULL,
  student_id INT NOT NULL,
  session_date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL,
  special INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tutor_id, student_id, session_date),
  FOREIGN KEY (tutor_id) REFERENCES tutors(email) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Achievements from each session
CREATE TABLE IF NOT EXISTS achievements (
	tutor_id VARCHAR(255) NOT NULL,
	student_id INT NOT NULL,
	session_date DATE NOT NULL,
	achievement INT NOT NULL,
	other VARCHAR(255),
	PRIMARY KEY (student_id, achievement),
	FOREIGN KEY (tutor_id, student_id, session_date) REFERENCES sessions(tutor_id, student_id, session_date) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_tutor_date ON sessions (tutor_id, session_date);

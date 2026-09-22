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
  last_name VARCHAR(255) NOT NULL
);

-- Individual tutoring sessions logged by a tutor
CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tutor_id INT NOT NULL,
  student_id INT NOT NULL,
  session_date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_tutor_date ON sessions (tutor_id, session_date);

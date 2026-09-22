CREATE TABLE IF NOT EXISTS tutors (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tutoring_sessions (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  tutor_id       INT NOT NULL,
  student_name   VARCHAR(255) NOT NULL,
  session_date   DATE NOT NULL,
  hours          DECIMAL(4,2) NOT NULL,
  notes          TEXT NULL,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sessions_tutor
    FOREIGN KEY (tutor_id) REFERENCES tutors(id)
    ON DELETE CASCADE,
  CONSTRAINT chk_hours_positive CHECK (hours > 0)
);

-- Supports "this tutor's hours in a given month" report queries
CREATE INDEX idx_sessions_tutor_date ON tutoring_sessions (tutor_id, session_date);
-- Supports "all tutors' hours in a given month" report queries
CREATE INDEX idx_sessions_date ON tutoring_sessions (session_date);

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionForm } from '../components/SessionForm.jsx';
import { api } from '../api/client.js';

export function NewSessionPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/students')
      .then((data) => setStudents(data.filter((student) => !student.ended)))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit({ studentId, sessionDate, hours, special, newAchievements }) {
    await api.post('/sessions', { studentId, sessionDate, hours, special });
    await Promise.all(
      newAchievements.map((achievement) =>
        api.post('/achievements', { studentId, sessionDate, achievement }),
      ),
    );
    navigate('/');
  }

  return (
    <div>
      <Link to="/" className="button button-secondary back-button">
        ← Back to dashboard
      </Link>
      <h1>Log a session</h1>
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No active students to log a session for.</p>
      ) : (
        <SessionForm students={students} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export function MySessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/sessions')
      .then(setSessions)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>My sessions</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Hours</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.session_date}</td>
              <td>{session.student_name}</td>
              <td>{session.hours}</td>
              <td>{session.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

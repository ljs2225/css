import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/students')
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <h1>Students</h1>
        <div className="dashboard-actions">
          <Link to="/students/new" className="button">
            Add Student
          </Link>
          <Link to="/sessions/new" className="button">
            Add Session
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Site</th>
              <th>Days</th>
              <th>Times</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.tutoring_site}</td>
                <td>{student.days}</td>
                <td>{student.times}</td>
                <td>{student.ended ? 'Ended' : 'Active'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

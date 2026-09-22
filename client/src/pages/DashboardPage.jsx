import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

function StudentListItem({ student }) {
  const initials = `${student.first_name[0]}${student.last_name[0]}`;
  return (
    <li>
      <Link to={`/students/${student.id}`} className="student-list-item">
        <div className="tutor-avatar">{initials}</div>
        <span className="student-list-name">
          {student.first_name} {student.last_name}
        </span>
      </Link>
    </li>
  );
}

export function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/students')
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  const activeStudents = students.filter((student) => !student.ended);
  const archivedStudents = students.filter((student) => student.ended);

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
        <>
          <ul className="student-list">
            {activeStudents.map((student) => (
              <StudentListItem key={student.id} student={student} />
            ))}
          </ul>

          {archivedStudents.length > 0 && (
            <>
              <h2 className="section-heading">Archived</h2>
              <ul className="student-list student-list--archived">
                {archivedStudents.map((student) => (
                  <StudentListItem key={student.id} student={student} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

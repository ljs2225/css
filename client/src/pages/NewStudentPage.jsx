import { Link, useNavigate } from 'react-router-dom';
import { StudentForm } from '../components/StudentForm.jsx';
import { api } from '../api/client.js';

export function NewStudentPage() {
  const navigate = useNavigate();

  async function handleSubmit(student) {
    await api.post('/students', student);
    navigate('/');
  }

  return (
    <div>
      <Link to="/">← Back to dashboard</Link>
      <h1>Add a student</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
}

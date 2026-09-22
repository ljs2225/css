import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { StudentForm } from '../components/StudentForm.jsx';
import { api } from '../api/client.js';

export function NewStudentPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(student) {
    setError('');
    try {
      await api.post('/students', student);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Link to="/" className="button button-secondary back-button">
        ← Back to dashboard
      </Link>
      <h1>Add a student</h1>
      {error && <p className="form-error">{error}</p>}
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
}

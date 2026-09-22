import { Link, useNavigate } from 'react-router-dom';
import { SessionForm } from '../components/SessionForm.jsx';
import { api } from '../api/client.js';

export function NewSessionPage() {
  const navigate = useNavigate();

  async function handleSubmit(session) {
    await api.post('/sessions', session);
    navigate('/');
  }

  return (
    <div>
      <Link to="/" className="button button-secondary back-button">
        ← Back to dashboard
      </Link>
      <h1>Log a session</h1>
      <SessionForm onSubmit={handleSubmit} />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export function NavBar() {
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    api.get('/tutor').then(setTutor).catch(() => setTutor(null));
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">My Sessions</Link>
      <Link to="/new">Log Session</Link>
      {tutor && <span>{tutor.name}</span>}
    </nav>
  );
}

import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client.js';

export function NavBar() {
  const [tutor, setTutor] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    api.get('/tutor').then(setTutor).catch(() => setTutor(null));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowCard(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = tutor ? `${tutor.first_name[0]}${tutor.last_name[0]}` : '';

  return (
    <nav className="navbar">
      <span className="navbar-brand">LVAEP Tutoring</span>

      {tutor && (
        <div className="tutor-menu" ref={menuRef}>
          <button
            type="button"
            className="tutor-trigger"
            aria-haspopup="true"
            aria-expanded={showCard}
            onClick={() => setShowCard((prev) => !prev)}
          >
            <span className="tutor-avatar tutor-avatar--small">{initials}</span>
            Hi, {tutor.first_name}
          </button>

          {showCard && (
            <div className="tutor-card">
              <div className="tutor-avatar">{initials}</div>
              <p className="tutor-name">
                {tutor.first_name} {tutor.last_name}
              </p>
              <p className="tutor-email">{tutor.email}</p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

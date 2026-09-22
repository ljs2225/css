import { useState } from 'react';

export function StudentForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tutoringSite, setTutoringSite] = useState('');
  const [days, setDays] = useState('');
  const [times, setTimes] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ firstName, lastName, tutoringSite, days, times });
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <label>
        First name
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last name
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </label>
      <label>
        Tutoring site
        <input
          value={tutoringSite}
          onChange={(e) => setTutoringSite(e.target.value)}
          placeholder="Zoom"
          required
        />
      </label>
      <label>
        Days
        <input
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Mondays, Wednesdays"
          required
        />
      </label>
      <label>
        Times
        <input
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          placeholder="4:00pm - 5:30pm"
          required
        />
      </label>
      <button type="submit" className="button">
        Save student
      </button>
    </form>
  );
}

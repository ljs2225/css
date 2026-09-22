import { useState } from 'react';

export function SessionForm({ onSubmit }) {
  const [studentId, setStudentId] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [hours, setHours] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      studentId: Number(studentId),
      sessionDate,
      hours: Number(hours),
      notes,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <label>
        Student ID
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
      </label>
      <label>
        Date
        <input
          type="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          required
        />
      </label>
      <label>
        Hours
        <input
          type="number"
          step="0.25"
          min="0"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
      </label>
      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <button type="submit">Save session</button>
    </form>
  );
}

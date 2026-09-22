import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { ACHIEVEMENT_CATEGORIES } from '../constants/achievements.js';
import { todayLocalDate } from '../utils/date.js';

const SPECIAL_OPTIONS = [
  { value: '', label: 'None' },
  { value: '1', label: 'Tutor Absent' },
  { value: '2', label: 'Student Absent' },
  { value: '3', label: 'Holiday' },
];

export function SessionForm({ students, onSubmit }) {
  const [studentId, setStudentId] = useState(String(students[0]?.id ?? ''));
  const [sessionDate, setSessionDate] = useState(todayLocalDate());
  const [hours, setHours] = useState('');
  const [special, setSpecial] = useState('');
  const [achievedNumbers, setAchievedNumbers] = useState(new Set());
  const [newlyChecked, setNewlyChecked] = useState(new Set());

  useEffect(() => {
    if (!studentId) {
      setAchievedNumbers(new Set());
      return;
    }
    api
      .get(`/achievements?studentId=${studentId}`)
      .then((rows) => setAchievedNumbers(new Set(rows.map((row) => row.achievement))));
    setNewlyChecked(new Set());
  }, [studentId]);

  function toggleAchievement(number) {
    setNewlyChecked((prev) => {
      const next = new Set(prev);
      if (next.has(number)) {
        next.delete(number);
      } else {
        next.add(number);
      }
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      studentId: Number(studentId),
      sessionDate,
      hours: Number(hours),
      special: special ? Number(special) : null,
      newAchievements: Array.from(newlyChecked),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <label>
        Student
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
          <option value="" disabled>
            Select a student
          </option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date
        <input
          type="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          onClick={(e) => e.target.showPicker?.()}
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
        <select value={special} onChange={(e) => setSpecial(e.target.value)}>
          {SPECIAL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="achievements-fieldset">
        <legend>Achievements</legend>
        {ACHIEVEMENT_CATEGORIES.map((category) => (
          <div key={category.name} className="achievement-category">
            <h3>{category.name}</h3>
            <ul className="achievement-list">
              {category.achievements.map(({ number, label }) => {
                const alreadyAchieved = achievedNumbers.has(number);
                const checked = alreadyAchieved || newlyChecked.has(number);
                return (
                  <li key={number} className="achievement-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={alreadyAchieved}
                        onChange={() => toggleAchievement(number)}
                      />
                      {label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </fieldset>

      <button type="submit">Save session</button>
    </form>
  );
}

import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';
import { ACHIEVEMENT_CATEGORIES } from '../constants/achievements.js';
import { todayLocalDate } from '../utils/date.js';

const SPECIAL_LABELS = {
  1: 'Tutor Absent',
  2: 'Student Absent',
  3: 'Holiday',
};

// session_date arrives as an ISO string (e.g. "2026-09-14T04:00:00.000Z") for what is
// really just a calendar date. Read the Y-M-D digits directly instead of letting the
// browser's local timezone shift midnight-UTC into the wrong day.
function dateParts(isoDateString) {
  const [year, month, day] = isoDateString.slice(0, 10).split('-').map(Number);
  return { year, month, day };
}

function formatDate(isoDateString) {
  const { year, month, day } = dateParts(isoDateString);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatNotes(special) {
  if (!special) return '—';
  return SPECIAL_LABELS[special] ?? `Unknown (${special})`;
}

function monthlyAggregates(sessions) {
  const byMonth = new Map();

  for (const session of sessions) {
    const { year, month } = dateParts(session.session_date);
    const key = `${year}-${String(month).padStart(2, '0')}`;
    if (!byMonth.has(key)) {
      byMonth.set(key, {
        key,
        label: new Date(year, month - 1, 1).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
        hours: 0,
        sessionCount: 0,
      });
    }
    const entry = byMonth.get(key);
    entry.hours += Number(session.hours);
    entry.sessionCount += 1;
  }

  return Array.from(byMonth.values()).sort((a, b) => (a.key < b.key ? 1 : -1));
}

export function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sessions');
  const [endingTutoring, setEndingTutoring] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/students/${id}`),
      api.get(`/sessions?studentId=${id}`),
      api.get(`/achievements?studentId=${id}`),
    ])
      .then(([studentData, sessionsData, achievementsData]) => {
        setStudent(studentData);
        setSessions(sessionsData);
        setAchievements(achievementsData);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const aggregates = useMemo(() => monthlyAggregates(sessions), [sessions]);
  const achievedNumbers = useMemo(
    () => new Set(achievements.map((a) => a.achievement)),
    [achievements],
  );
  const otherTextByAchievement = useMemo(
    () => new Map(achievements.map((a) => [a.achievement, a.other])),
    [achievements],
  );

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Student not found.</p>;

  const initials = `${student.first_name[0]}${student.last_name[0]}`;

  async function handleStopTutoring() {
    const confirmed = window.confirm(
      `Stop tutoring ${student.first_name} ${student.last_name}? This marks them as ended as of today.`,
    );
    if (!confirmed) return;

    const endDate = todayLocalDate();
    setError('');
    setEndingTutoring(true);
    try {
      await api.patch(`/students/${id}/end`, { endDate });
      setStudent((prev) => ({ ...prev, ended: true, end_date: endDate }));
      window.alert(
        'Please notify the office ASAP that this student is no longer being tutored, along with the reason.',
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setEndingTutoring(false);
    }
  }

  return (
    <div>
      <Link to="/" className="button button-secondary back-button">
        ← Back to dashboard
      </Link>

      {error && <p className="form-error">{error}</p>}

      <div className="profile-header">
        <div className="profile-identity">
          <div className="tutor-avatar">{initials}</div>
          <div>
            <h1>
              {student.first_name} {student.last_name}
            </h1>
            <p className="tutor-email">
              {student.tutoring_site} · {student.days} · {student.times}
            </p>
          </div>
        </div>

        {student.ended ? (
          <span className="status-badge status-ended">
            Tutoring ended {formatDate(student.end_date)}
          </span>
        ) : (
          <button
            type="button"
            className="button button-danger"
            onClick={handleStopTutoring}
            disabled={endingTutoring}
          >
            {endingTutoring ? 'Stopping…' : 'Stop Tutoring'}
          </button>
        )}
      </div>

      <div className="profile-layout">
        <div className="profile-main">
          <div className="tabs">
            <button
              type="button"
              className={`tab${activeTab === 'sessions' ? ' tab-active' : ''}`}
              onClick={() => setActiveTab('sessions')}
            >
              Sessions
            </button>
            <button
              type="button"
              className={`tab${activeTab === 'aggregates' ? ' tab-active' : ''}`}
              onClick={() => setActiveTab('aggregates')}
            >
              Monthly
            </button>
          </div>

          {activeTab === 'sessions' &&
            (sessions.length === 0 ? (
              <p>No sessions logged yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.session_date}>
                      <td>{formatDate(session.session_date)}</td>
                      <td>{session.hours}</td>
                      <td>{formatNotes(session.special)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}

          {activeTab === 'aggregates' &&
            (aggregates.length === 0 ? (
              <p>No sessions logged yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Total Hours</th>
                    <th>Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregates.map((month) => (
                    <tr key={month.key}>
                      <td>{month.label}</td>
                      <td>{month.hours}</td>
                      <td>{month.sessionCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
        </div>

        <aside className="achievements-panel">
          <h2>Achievements</h2>
          {ACHIEVEMENT_CATEGORIES.map((category) => (
            <div key={category.name} className="achievement-category">
              <h3>{category.name}</h3>
              <ul className="achievement-list">
                {category.achievements.map(({ number, label }) => {
                  const achieved = achievedNumbers.has(number);
                  const note = otherTextByAchievement.get(number);
                  return (
                    <li key={number} className="achievement-item">
                      <label>
                        <input type="checkbox" checked={achieved} readOnly />
                        {label}
                        {achieved && note ? ` — ${note}` : ''}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

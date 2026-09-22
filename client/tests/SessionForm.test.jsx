import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionForm } from '../src/components/SessionForm.jsx';

vi.mock('../src/api/client.js', () => ({
  api: { get: vi.fn().mockResolvedValue([]) },
}));

const students = [
  { id: 1, first_name: 'David', last_name: 'Li' },
  { id: 2, first_name: 'Catherine', last_name: 'Su' },
];

describe('SessionForm', () => {
  test('calls onSubmit with form values', () => {
    const handleSubmit = vi.fn();
    render(<SessionForm students={students} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/^student$/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2026-09-01' } });
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: '1.5' } });
    fireEvent.click(screen.getByRole('button', { name: /save session/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      studentId: 2,
      sessionDate: '2026-09-01',
      hours: 1.5,
      special: null,
      newAchievements: [],
    });
  });
});

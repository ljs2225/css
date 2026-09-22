import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionForm } from '../src/components/SessionForm.jsx';

describe('SessionForm', () => {
  test('calls onSubmit with form values', () => {
    const handleSubmit = vi.fn();
    render(<SessionForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/student id/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2026-09-01' } });
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: '1.5' } });
    fireEvent.click(screen.getByRole('button', { name: /save session/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      studentId: 1,
      sessionDate: '2026-09-01',
      hours: 1.5,
      notes: '',
    });
  });
});

import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import RefreshMonitor from '../src/components/RefreshMonitor';

beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); });
const tick = () => act(() => { vi.advanceTimersByTime(2000); });

test('automatically stops after exactly three retries beyond the initial failure', () => {
  render(<RefreshMonitor />);
  fireEvent.click(screen.getByRole('button', { name: 'Simulate refresh failure' }));
  expect(screen.getByLabelText('Retries used')).toHaveTextContent('0 / 3');
  for (let i = 1; i <= 3; i++) {
    tick();
    expect(screen.getByLabelText('Retries used')).toHaveTextContent(`${i} / 3`);
  }
  expect(screen.getByText('Failed · retry limit reached')).toBeInTheDocument();
  expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(4);
  act(() => { vi.advanceTimersByTime(60000); });
  expect(screen.getByLabelText('Retries used')).toHaveTextContent('3 / 3');
  expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(4);
});

test('stops retrying after a successful refresh', () => {
  render(<RefreshMonitor />);
  fireEvent.change(screen.getByLabelText('Demo refresh outcome'), { target: { value: 'recovery' } });
  fireEvent.click(screen.getByRole('button', { name: 'Simulate refresh failure' }));
  tick(); tick();
  expect(screen.getByText('Refresh succeeded')).toBeInTheDocument();
  act(() => { vi.advanceTimersByTime(60000); });
  expect(screen.getByLabelText('Retries used')).toHaveTextContent('2 / 3');
  expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(3);
});

test('pausing cancels scheduled retries and resuming preserves the budget', () => {
  render(<RefreshMonitor />);
  fireEvent.click(screen.getByRole('button', { name: 'Simulate refresh failure' }));
  tick();
  fireEvent.click(screen.getByRole('checkbox', { name: 'Auto retry' }));
  act(() => { vi.advanceTimersByTime(60000); });
  expect(screen.getByLabelText('Retries used')).toHaveTextContent('1 / 3');
  fireEvent.click(screen.getByRole('checkbox', { name: 'Auto retry' }));
  tick(); tick();
  expect(screen.getByLabelText('Retries used')).toHaveTextContent('3 / 3');
  expect(screen.getByText('Failed · retry limit reached')).toBeInTheDocument();
});

test('unmount cancels retries; a new run starts with a fresh budget', () => {
  const { unmount } = render(<RefreshMonitor />);
  fireEvent.click(screen.getByRole('button', { name: 'Simulate refresh failure' }));
  expect(vi.getTimerCount()).toBe(1);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
  render(<RefreshMonitor />);
  fireEvent.click(screen.getByRole('button', { name: 'Simulate refresh failure' }));
  tick(); tick(); tick();
  fireEvent.click(screen.getByRole('button', { name: 'Start new demo run' }));
  expect(screen.getByLabelText('Retries used')).toHaveTextContent('0 / 3');
});

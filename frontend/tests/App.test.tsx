import { render, screen, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test } from 'vitest';
import App from '../src/App';

afterEach(cleanup);

test('shows the demo dashboard and filters workloads by status and search', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Your data, one step ahead.' })).toBeInTheDocument();
  expect(screen.getByText(/Actions simulate recovery/)).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText('Filter by status'), 'Blocked');
  expect(screen.getByRole('button', { name: 'Profitability' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Delphi Sales' })).not.toBeInTheDocument();
  await user.type(screen.getByLabelText('Search workloads'), 'unknown');
  expect(screen.getByText('No workloads match your search and filter.')).toBeInTheDocument();
});

test('simulates recovery, updates diagnostics and activity, and resets the demo', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Inspect Profitability' }));
  const dialog = screen.getByRole('dialog');
  expect(within(dialog).getByText('Blocked')).toBeInTheDocument();
  expect(within(dialog).getByText(/● Critical/)).toBeInTheDocument();
  expect(within(dialog).getByText('10 / 25')).toBeInTheDocument();
  await user.click(within(dialog).getByRole('button', { name: 'Simulate recovery & revalidate' }));
  expect(within(dialog).getByText('Ready')).toBeInTheDocument();
  expect(within(dialog).getByText(/● Healthy/)).toBeInTheDocument();
  expect(within(dialog).getByText('25 / 25')).toBeInTheDocument();
  await user.click(within(dialog).getByRole('button', { name: 'Close workload details' }));
  expect(screen.getByRole('status')).toHaveTextContent('No external systems were changed');
  expect(screen.getByRole('heading', { name: 'Profitability demo recovery complete' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Reset demo/ }));
  await user.click(screen.getByRole('button', { name: 'Inspect Profitability' }));
  expect(within(screen.getByRole('dialog')).getByText('Blocked')).toBeInTheDocument();
});

test('shows imported Key Vault records and filters unknown access without claiming healthy secrets', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /Access guardian/ }));
  const table = screen.getByRole('table', { name: 'Azure Key Vault sample records' });
  expect(within(table).getAllByRole('row')).toHaveLength(64);
  expect(screen.getByText('Secrets without expiry')).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText('Filter Key Vault risk'), 'Unknown');
  expect(within(table).getAllByRole('row')).toHaveLength(14);
  expect(within(table).getAllByText('Access denied')).toHaveLength(13);
  expect(within(table).queryByText('Healthy')).not.toBeInTheDocument();
  await user.click(within(table).getAllByRole('button', { name: /Review demo-vault/ })[0]);
  expect(screen.getByRole('dialog')).toHaveTextContent('Secret health is unknown');
  await user.click(screen.getByRole('button', { name: 'Close Key Vault recommendation' }));
  await user.selectOptions(screen.getByLabelText('Filter Key Vault risk'), 'Warning');
  expect(within(table).getAllByRole('row')).toHaveLength(47);
  await user.selectOptions(screen.getByLabelText('Filter Key Vault risk'), 'Healthy');
  expect(within(table).getAllByRole('row')).toHaveLength(5);
  expect(within(table).getAllByText('OK in uploaded snapshot')).toHaveLength(4);
  await user.selectOptions(screen.getByLabelText('Filter Key Vault risk'), 'Critical');
  expect(screen.getByText('No Key Vault records match this filter.')).toBeInTheDocument();
});

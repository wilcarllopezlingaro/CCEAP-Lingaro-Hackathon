import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders App Starting Template', () => {
  render(<App />);
  const linkElement = screen.getByText(/App Starting Template/i);
  expect(linkElement).toBeInTheDocument();
});
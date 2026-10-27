/**
 * Test utilities for LingarIAn Citizen Apps
 * Provides reusable testing helpers for Material-UI and common patterns
 */

import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { vi } from 'vitest';
import { theme } from '../../src/theme';

// Extend render options to include theme provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withTheme?: boolean;
}

/**
 * Custom render function that wraps components with Material-UI theme
 * Use this instead of the default render for components that use Material-UI
 */
export const renderWithTheme = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { withTheme = true, ...renderOptions } = options;

  if (!withTheme) {
    return render(ui, renderOptions);
  }

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Mock user data for testing
 */
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  roles: ['user'],
};

/**
 * Mock API responses for consistent testing
 */
export const mockApiResponses = {
  success: <T,>(data: T) => ({
    ok: true,
    json: () => Promise.resolve(data),
    headers: new Headers({ 'content-type': 'application/json' }),
  }),
  error: (status: number, message: string) => ({
    ok: false,
    status,
    statusText: 'Error',
    text: () => Promise.resolve(JSON.stringify({ detail: message })),
    headers: new Headers(),
  }),
};

/**
 * Utility to create mock fetch responses
 */
export const createMockFetch = (responses: unknown[]) => {
  let callCount = 0;
  return vi.fn(() => {
    const response = responses[callCount] || responses[responses.length - 1];
    callCount++;
    return Promise.resolve(response);
  });
};

// Re-export common testing utilities (specific exports to avoid ESLint issues)
export { render, screen, waitFor, fireEvent } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
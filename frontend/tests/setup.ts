// Import jest-dom matchers for Vitest
// Note: @testing-library/jest-dom works with Vitest despite the name
import '@testing-library/jest-dom';

// Setup for Vitest testing environment with Material-UI support
// This file is automatically loaded before each test file

// Mock ResizeObserver which is not available in jsdom
(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver which is not available in jsdom
(globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia for responsive Material-UI components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock getComputedStyle to return consistent values for Material-UI testing
// This helps avoid issues with "color: white" vs "color: rgb(255, 255, 255)"
const originalGetComputedStyle = window.getComputedStyle;
Object.defineProperty(window, 'getComputedStyle', {
  value: (element: Element) => {
    const styles = originalGetComputedStyle(element);
    return new Proxy(styles, {
      get(target, prop) {
        // Convert common color names to rgb values for consistent testing
        if (prop === 'color') {
          const colorValue = target[prop as keyof CSSStyleDeclaration];
          if (colorValue === 'white') return 'rgb(255, 255, 255)';
          if (colorValue === 'black') return 'rgb(0, 0, 0)';
          return colorValue;
        }
        return target[prop as keyof CSSStyleDeclaration];
      },
    });
  },
});

// Suppress console warnings during tests (optional)
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  // Suppress specific Material-UI warnings in tests
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Material-UI') || args[0].includes('MUI') || args[0].includes('emotion'))
  ) {
    return;
  }
  originalWarn.apply(console, args);
};
/**
 * Material-UI Testing Utilities for LingarIAn Citizen Apps
 * Generic template utilities for common MUI component testing scenarios
 */


/**
 * CSS assertion helpers for consistent MUI testing
 * These handle browser computed style variations
 */
export const cssAssertions = {
  /**
   * Assert background color accounting for browser differences
   */
  expectBackgroundColor: (element: HTMLElement, expectedColor: string) => {
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;

    // Handle different color formats
    const colorMappings: Record<string, string[]> = {
      white: ['white', 'rgb(255, 255, 255)', '#ffffff'],
      black: ['black', 'rgb(0, 0, 0)', '#000000'],
      primary: ['rgb(25, 118, 210)', '#1976d2'], // MUI primary.main
      secondary: ['rgb(156, 39, 176)', '#9c27b0'], // MUI secondary.main
      error: ['rgb(244, 67, 54)', '#f44336'], // MUI error.main
    };

    const acceptableColors = colorMappings[expectedColor] || [expectedColor];
    expect(acceptableColors.some(color =>
      bgColor.includes(color) || color.includes(bgColor)
    )).toBe(true);
  },

  /**
   * Assert box shadow exists (helpful for elevation/focus states)
   */
  expectBoxShadow: (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const boxShadow = computedStyle.boxShadow;
    expect(boxShadow).not.toBe('none');
    expect(boxShadow).toBeTruthy();
  },

  /**
   * Assert element has Material-UI elevation classes or styles
   */
  expectElevation: (element: HTMLElement, level?: number) => {
    if (level) {
      // Check for MUI elevation class
      expect(element.classList.toString()).toMatch(new RegExp(`elevation-${level}`));
    } else {
      // Check for any elevation styling
      const hasElevationClass = Array.from(element.classList).some(cls => cls.includes('elevation'));
      const hasBoxShadow = window.getComputedStyle(element).boxShadow !== 'none';
      expect(hasElevationClass || hasBoxShadow).toBe(true);
    }
  },
};

/**
 * Common test patterns for MUI components
 */
export const muiTestPatterns = {
  /**
   * Test that a component renders with proper MUI theme integration
   */
  testThemeIntegration: (component: HTMLElement) => {
    // Should have MUI theme classes or styles
    const hasThemeClasses = Array.from(component.classList).some(cls =>
      cls.includes('Mui') || cls.includes('css-')
    );
    const hasThemeStyles = window.getComputedStyle(component).fontFamily.includes('Roboto');

    expect(hasThemeClasses || hasThemeStyles).toBe(true);
  },

  /**
   * Test accessibility attributes for MUI components
   */
  testAccessibility: (component: HTMLElement, expectedRole?: string) => {
    if (expectedRole) {
      expect(component).toHaveAttribute('role', expectedRole);
    }

    // Check for common accessibility attributes
    const accessibilityAttributes = [
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'role',
      'tabIndex'
    ];

    const hasAccessibilityAttribute = accessibilityAttributes.some(attr =>
      component.hasAttribute(attr)
    );

    expect(hasAccessibilityAttribute).toBe(true);
  },

  /**
   * Test that form components handle validation states properly
   */
  testFormValidation: (component: HTMLElement, hasError: boolean = false) => {
    if (hasError) {
      const hasErrorClass = Array.from(component.classList).some(cls =>
        cls.includes('error') || cls.includes('Error')
      );
      const hasErrorAttribute = component.hasAttribute('aria-invalid');

      expect(hasErrorClass || hasErrorAttribute).toBe(true);
    }

    // Should be properly labeled for screen readers
    expect(
      component.hasAttribute('aria-label') ||
      component.hasAttribute('aria-labelledby')
    ).toBe(true);
  },
};

/**
 * Helper function to simulate keyboard events on MUI components
 */
export const simulateKeyboard = {
  enter: (element: HTMLElement) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter' }));
  },

  escape: (element: HTMLElement) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape' }));
  },

  tab: (element: HTMLElement) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', code: 'Tab' }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', code: 'Tab' }));
  },

  delete: (element: HTMLElement) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', code: 'Delete' }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Delete', code: 'Delete' }));
  },
};
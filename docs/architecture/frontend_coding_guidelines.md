# Frontend Coding Guidelines

## Purpose and Scope

This document provides detailed coding guidelines for frontend development in LingarIAn applications. It defines mandatory architecture patterns, coding standards, and implementation requirements that all AI agents must follow when generating React TypeScript frontend code.

**Target Audience:** AI Development Agents
**Technology Focus:** React, TypeScript, Material-UI
**Integration:** Part of LingarIAn Shell ecosystem

## Development Commands (MANDATORY)

**CRITICAL**: This project uses standardized npm scripts. See `scripts/help.js` for all available commands.

## Frontend Architecture Standards

This section defines mandatory frontend architecture patterns and implementation requirements for AI agents generating React applications.

### TypeScript Import Standards

**Import Type Guidelines (Mandatory):**

With `verbatimModuleSyntax: true` enabled, proper import syntax is critical for build success:

```typescript
// ✅ CORRECT - Type-only imports (for interfaces, types, enums used only as types)
import type { User, ApiResponse } from '../types/api';
import type { ComponentProps } from 'react';

// ✅ CORRECT - Regular imports (for values, functions, components)
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { apiService } from '../services/api';

// ❌ WRONG - Mixed imports that cause verbatimModuleSyntax errors
import { User, apiService } from '../api'; // User is type, apiService is value

// ✅ CORRECT - Separate type and value imports
import type { User } from '../api/types';
import { apiService } from '../api/service';

// ✅ CORRECT - Default imports with type annotation
import UserComponent from '../components/User';
import type { UserProps } from '../components/User';
```

**Common Import Patterns:**

```typescript
// Component with props interface
import type { FC } from 'react';
import type { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({ loading, ...props }) => {
  // Implementation
};
```

### React Component Standards

**Component Architecture (Mandatory):**
- **Functional Components:** All components must be functional components using React hooks
- **TypeScript Integration:** Every component must have proper TypeScript interfaces and prop types
- **Material-UI Compliance:** All UI components must use Material-UI components and theming
- **Accessibility:** Components must meet WCAG 2.1 AA accessibility standards
- **Responsive Design:** All components must be responsive using Material-UI's grid system

**Component Organization (Required):**
```typescript
// Component file structure (mandatory)
interface ComponentNameProps {
  // All props must have TypeScript interfaces
  title: string;
  data?: DataType;
  onAction?: (item: DataType) => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  data,
  onAction
}) => {
  // Implementation following Material-UI patterns
};
```

### Required UI Pattern Implementations

**Data Display Patterns (AI Must Generate):**
- **DataTable:** Sortable, filterable tables with pagination using Material-UI DataGrid
- **CardList:** Grid-based card layouts for data collections
- **DetailView:** Comprehensive detail pages with edit capabilities
- **DashboardWidgets:** Metric cards, charts, and summary components
- **SearchInterface:** Search bars with filtering and sorting controls

**Form Patterns (AI Must Generate):**
- **CreateForm:** Step-by-step forms for data creation with validation
- **EditForm:** Inline and modal edit forms with optimistic updates
- **FilterForm:** Advanced filtering interfaces for data tables
- **WizardForm:** Multi-step processes with progress indicators

### State Management Architecture

**Context-Based State Management (Mandatory Pattern):**
AI agents must implement state management using React Context API with the following standardized structure:

```typescript
// State management pattern (AI must follow exactly)
interface AppState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  data: Record<string, any>;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Specific action methods
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateData: (key: string, value: any) => void;
}
```

**Required State Categories:**
- **Authentication State:** User session, permissions, and authentication status
- **Application Data:** Business entities, form data, and cached API responses
- **UI State:** Loading states, error messages, modal visibility, and navigation state
- **User Preferences:** Theme settings, language preferences, and personalization data

**State Synchronization Requirements:**
- **API Integration:** All state changes must sync with backend APIs using service layer
- **Error Handling:** Implement optimistic updates with rollback on API failures
- **Caching Strategy:** Cache frequently accessed data with appropriate invalidation logic
- **Performance:** Use React.memo and useMemo for expensive computations

### Routing Architecture

#### Route Organization

```
/                          # Public landing page
/login                     # SSO login initiation
/auth/callback             # SSO callback handler
/dashboard                 # Protected: Main application dashboard
/{{business-entity}}       # Protected: Main business entity pages
/{{business-entity}}/:id   # Protected: Individual entity details
/404                       # Error page
/unauthorized             # Access denied page
```

#### Protected Route Pattern

```typescript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = []
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};
```

### Frontend Services Layer

#### API Client Setup

```typescript
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh or redirect to login
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Additional HTTP methods...
}

export const apiClient = new ApiClient();
```

#### Service Example

```typescript
import { apiClient } from './api.client';
import { User } from './types';

export class AuthService {
  static async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/users/me');
  }

  static async updateProfile(userData: Partial<User>): Promise<User> {
    return apiClient.put<User>('/users/me', userData);
  }

  static async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('accessToken');
  }

  static initiateLogin(): void {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
  }
}
```

## Mandatory Architecture Patterns

### Frontend Architecture (Required)

**Component-Based Architecture:**
- **Component Structure:** Use functional components with hooks following Material-UI patterns
- **State Management:** Implement context-based state management for application data
- **Routing:** Use protected route patterns with role-based access control
- **API Integration:** Follow service layer patterns for all backend communication
- **Form Handling:** Use Material-UI form components with validation patterns

## Frontend Testing Patterns

### Frontend Component Test Template

```typescript
// tests/components/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../src/theme';
import { ComponentName } from '../../src/components/ComponentName';

// Test utility for Material-UI theme wrapper
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ComponentName', () => {
  it('renders with title', () => {
    renderWithTheme(<ComponentName title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles user interactions correctly', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<ComponentName title="Test" onClick={mockOnClick} />);

    await user.click(screen.getByText('Test'));
    expect(mockOnClick).toHaveBeenCalledOnce();
  });

  it('applies Material-UI theme styles', () => {
    renderWithTheme(<ComponentName title="Test" variant="primary" />);
    const element = screen.getByText('Test');

    // Test computed CSS values for Material-UI components
    const styles = window.getComputedStyle(element);
    expect(element).toBeInTheDocument();
    // Note: Test actual computed values, not CSS property names
  });
});
```

### Vitest Configuration (Frontend)

**⚠️ Important:** This template uses **Vitest**, not Jest. AI agents must use Vitest syntax.

```typescript
// frontend/vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/setup.ts',
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },
  },
})
```

**Key Vitest vs Jest Differences for AI Agents:**

```typescript
// ❌ WRONG - Jest syntax (do not use)
jest.mock('./api/service');
const mockFn = jest.fn();
jest.spyOn(object, 'method');

// ✅ CORRECT - Vitest syntax (always use)
import { vi } from 'vitest';
vi.mock('./api/service');
const mockFn = vi.fn();
vi.spyOn(object, 'method');
```

**Common Migration Issues and Solutions:**

```typescript
// ❌ WRONG - Jest global objects
global.ResizeObserver = MockResizeObserver;
global.fetch = jest.fn();

// ✅ CORRECT - Vitest requires globalThis
globalThis.ResizeObserver = MockResizeObserver;
global.fetch = vi.fn(); // or globalThis.fetch = vi.fn();

// ❌ WRONG - Jest timer mocking
jest.useFakeTimers();
jest.advanceTimersByTime(1000);

// ✅ CORRECT - Vitest timer mocking
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
```

**Important Note:** The import `import '@testing-library/jest-dom'` is correct for Vitest. Despite the "jest-dom" name, this package provides DOM matchers that work with both Jest and Vitest.

### Material-UI Component Testing

**Essential MUI Testing Patterns:**

```typescript
import { renderWithTheme } from '../utils/testUtils';
import { cssAssertions, simulateKeyboard, muiTestPatterns } from '../utils/muiTestUtils';

describe('MUI Component Tests', () => {
  it('renders with theme integration', () => {
    renderWithTheme(<MuiButton variant="primary">Click me</MuiButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('Click me');

    // Use helper functions for consistent testing
    cssAssertions.expectBackgroundColor(button, 'primary');
    muiTestPatterns.testThemeIntegration(button);
  });

  it('handles keyboard interactions', () => {
    const mockOnClick = vi.fn();
    renderWithTheme(<MuiButton onClick={mockOnClick}>Test</MuiButton>);

    const button = screen.getByRole('button');
    simulateKeyboard.enter(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
```

**Common MUI Testing Issues and Solutions:**

| Problem | Solution |
|---------|----------|
| CSS assertions inconsistent | Use `cssAssertions.expectBackgroundColor()` helpers |
| Theme not applied | Always use `renderWithTheme()` instead of `render()` |
| Accessibility testing | Use `muiTestPatterns.testAccessibility()` |
| Keyboard events | Use `simulateKeyboard.enter()` for consistent behavior |

**Pre-configured utilities are available in `tests/utils/muiTestUtils.tsx`**

### API Service Testing Template

```typescript
// tests/services/apiService.test.ts
import { vi } from 'vitest';
import { ApiService, ApiError } from '../../src/services/apiService';

// Mock fetch globally
global.fetch = vi.fn();

describe('ApiService', () => {
  const apiService = new ApiService('http://localhost:8000/api');
  const mockFetch = fetch as vi.MockedFunction<typeof fetch>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('handles successful GET requests', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData),
      headers: new Headers({ 'content-type': 'application/json' })
    } as any);

    const result = await apiService.get('/test');

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/test',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toEqual(mockData);
  });

  it('handles API errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: vi.fn().mockResolvedValueOnce('{"detail": "Not found"}'),
    } as any);

    await expect(apiService.get('/not-found')).rejects.toThrow(ApiError);
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(apiService.get('/test')).rejects.toThrow(ApiError);
    await expect(apiService.get('/test')).rejects.toThrow('Network error or service unavailable');
  });
});
```

### E2E Test Template

```typescript
// e2e/tests/auth/login-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('complete SSO login flow', async ({ page }) => {
    // Navigate to login
    await page.goto('/login');
    await expect(page.getByText('Login with SSO')).toBeVisible();

    // Click login button
    await page.getByRole('button', { name: 'Login with SSO' }).click();

    // Should redirect to SSO provider (mock in test environment)
    await expect(page).toHaveURL(/sso-provider/);

    // Complete SSO flow (mocked)
    await page.getByRole('textbox', { name: 'email' }).fill('test@company.com');
    await page.getByRole('textbox', { name: 'password' }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should redirect back to app and show dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('handles authentication error', async ({ page }) => {
    // Test error handling in auth flow
    await page.goto('/auth/callback?error=access_denied');
    await expect(page.getByText('Authentication failed')).toBeVisible();
  });
});
```

## Deployment Configuration

### Frontend Deployment

**Frontend Deployment:**
- **Platform:** LingarIAn Shell (containerized)
- **Build Command:** `npm run build`
- **Output Directory:** `frontend/dist`
- **CDN/Edge:** LingarIAn Shell-managed static asset serving

#### Required Environment Variables (Frontend)

```bash
# Frontend (.env.local) - Vite Environment Variables
VITE_API_URL=https://api.{{ENVIRONMENT}}.company.com/api
VITE_SSO_PROVIDER_URL={{SSO_PROVIDER_URL}}
VITE_ENVIRONMENT={{ENVIRONMENT}}
```

## Performance and Security (Frontend)

### Security Requirements

**Automated Security Implementation:**
- **CSP Headers:** Automatically configured by LingarIAn Shell with enterprise security policies
- **XSS Prevention:** AI agents generate input sanitization and validation automatically
- **Secure Storage:** LingarIAn Shell manages secure token storage with enterprise-grade encryption

### Performance Optimization

**Frontend Performance (AI Agent Managed):**
- **Bundle Optimization:** AI agents automatically implement code splitting and lazy loading
- **Asset Optimization:** LingarIAn Shell CDN provides automatic image optimization and caching
- **Loading Strategy:** AI agents generate optimal component loading patterns
- **Caching Strategy:** Platform-managed service workers and API caching

**Performance Targets (Platform Guaranteed):**
- < 500KB initial bundle (AI agents optimize automatically)

## Code Quality Standards

### Mandatory Code Quality Checks

**Frontend Quality Requirements:**
- **Type Safety:** All TypeScript code must pass strict type checking with no any types
- **Linting:** Code must pass ESLint with zero warnings using project configurations
- **Testing:** Minimum 90% code coverage for frontend components
- **Security:** All generated code must pass security scanning with no high/critical vulnerabilities
- **Performance:** Frontend bundles under 500KB

**AI Agent Responsibilities for Code Maintenance:**
- **Dependency Management:** Keep all dependencies up-to-date with security patches
- **Code Refactoring:** Continuously improve code quality while maintaining functionality
- **Pattern Updates:** Update generated code when template patterns are revised
- **Documentation:** Maintain accurate inline documentation
- **Performance Optimization:** Continuously optimize bundle size and loading performance

## Implementation Guidelines

### Code Generation Workflow (Frontend Focus)

**Phase 2: Core Infrastructure Generation**
1. **Frontend Foundation:** Generate React app structure with routing and context providers
2. **Testing Framework:** Create comprehensive test suites for all generated components

**Phase 3: Business Logic Implementation**
1. **UI Components:** Generate React components using Material-UI patterns and templates
2. **Integration:** Connect frontend components to backend APIs with proper error handling

### Architectural Constraints

**Mandatory Architectural Constraints:**
- **Component-Based UI:** Reusable React components with TypeScript and Material-UI
- **Role-Based Security:** All features must implement proper authorization controls
- **Platform Integration:** Full integration with LingarIAn Shell services and monitoring

**Design Principles for AI Agents:**
- **Simplicity First:** Always choose the simplest solution that meets requirements
- **Consistency Over Cleverness:** Follow established patterns rather than innovative approaches
- **Security by Default:** Implement security controls automatically in all generated code
- **Performance Awareness:** Generate efficient code with proper caching and optimization
- **Maintainability Focus:** Generate clean, readable code with comprehensive documentation

## Technology Stack (Frontend)

**Definitive Frontend Technology Selection:**

| Category | Technology | Version | Purpose | AI Agent Role |
|----------|------------|---------|---------|---------------|
| Frontend Framework | React | 19.x | UI component framework | AI agents generate components based on user requirements |
| UI Components | Material-UI (MUI) | 5.x | Pre-built UI components | AI agents select and configure components from library |
| Frontend Language | TypeScript | 5.x | Type-safe development | AI agents handle all TypeScript complexity |
| Authentication | LingarIAn SSO | N/A | User management | Provided by LingarIAn Shell, zero configuration |
| Deployment | LingarIAn Shell | N/A | Automated deployment | Fully managed, triggered by Git commits |
| Monitoring | LingarIAn Shell | N/A | Application monitoring | Built-in, zero configuration required |

### React 19+ Compatible Dependencies

**Optional packages available when needed (install with `npm install <package>`):**

| Use Case | Package | Version | React 19 | Install Command | Notes |
|----------|---------|---------|----------|-----------------|-------|
| **Date/Time** | @mui/x-date-pickers | ^7.0.0 | ✅ | `npm install @mui/x-date-pickers dayjs` | Requires dayjs |
| **Drag & Drop** | @dnd-kit/core | ^6.1.0 | ✅ | `npm install @dnd-kit/core @dnd-kit/sortable` | Modern, accessible |
| **Routing** | react-router-dom | ^6.20.0 | ✅ | `npm install react-router-dom` | Client-side routing |
| **HTTP Client** | axios | ^1.6.0 | ✅ | `npm install axios` | API requests |

**❌ Avoid these packages (React 19 incompatible):**
- `react-beautiful-dnd` → Use `@dnd-kit/core` instead
- `@mui/styles` → Use `@mui/material` styled components
- `react-router` v5.x → Use `react-router-dom` ^6.x

**Template Compliance Requirements:**
- **Frontend Components:** Must use exact React component patterns following Material-UI design system
- **Component Structure:** Functional components with hooks and proper TypeScript interfaces
- **Authentication:** JWT token-based authentication flow with external SSO provider integration
- **Form Handling:** Material-UI form components with comprehensive validation patterns

**Locked Decisions (No User Choice):**
- All testing frameworks and configurations are predefined
- Build tools and bundlers are standardized across all applications
- Security and performance optimizations are built into the platform

## Development Best Practices

### Build Validation Process

**Mandatory Build Checks During Development:**

Run these commands frequently during development to catch issues early:

```bash
# Run after significant code changes (every 15-20 minutes)
npm run build        # Catch TypeScript compilation errors
npm run lint         # Catch code style issues
npm test            # Ensure tests still pass

# Run before committing changes
npm run lint:fix     # Auto-fix linting issues
npm run test:coverage # Ensure test coverage requirements
```

**Common Build Issues and Solutions:**

```typescript
// Issue: "verbatimModuleSyntax" compilation errors
// ❌ Problem: Mixed type and value imports
import { User, createUser } from './api';

// ✅ Solution: Separate imports
import type { User } from './types';
import { createUser } from './api';

// Issue: ESLint react-refresh violations
// ❌ Problem: Exporting both component and constants from same file
export const TimeGrid = () => { /* component */ };
export const GRID_SIZE = 24;

// ✅ Solution: Move constants to separate file
// constants.ts: export const GRID_SIZE = 24;
// TimeGrid.tsx: export const TimeGrid = () => { /* component */ };
```

**Development Workflow Recommendations:**

1. **Run builds early and often** - Don't wait until the end of development
2. **Fix TypeScript errors immediately** - They compound quickly
3. **Use type-only imports** - When in doubt, prefer `import type`
4. **Separate concerns** - Keep components, types, and constants in appropriate files
5. **Test incrementally** - Write tests as you develop, not after

**Continuous Integration Checks:**

The following checks must pass before merging:
- `npm run build` - No TypeScript compilation errors
- `npm run lint` - No ESLint errors or warnings
- `npm test` - All tests pass with ≥90% coverage
- `npm run test:backend` - Backend tests pass
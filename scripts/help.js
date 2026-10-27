#!/usr/bin/env node

console.log(`
🚀 Development:
  npm run dev:full     - Start development dependencies, backend, and frontend
  npm run dev:backend  - Start only the backend server
  npm run dev:frontend - Start only the frontend server

🐳 Podman Containers:
  npm run podman:up    - Start full application with Podman (auto-detects platform)
  npm run podman:down  - Stop Podman containers

� Development Dependencies:
  npm run dev:dependencies:up    - Start development database
  npm run dev:dependencies:down  - Stop development database
  npm run dev:dependencies:logs  - Show database logs
  npm run dev:dependencies:reset - Reset database (removes all data!)

📦 Dependencies:
  npm run install:backend  - Install only backend dependencies
  npm run install:frontend - Install only frontend dependencies

🔨 Build:
  npm run build        - Build the frontend for production
  npm run build:check  - Build and verify both frontend and backend

🧪 Testing:
  npm test             - Run all tests (backend + frontend)
  npm run test:backend - Run backend tests
  npm run test:frontend - Run frontend tests
  npm run test:coverage - Run frontend tests with coverage

🔍 Code Quality:
  npm run lint         - Lint all code (backend + frontend)
  npm run lint:fix     - Fix linting issues (backend + frontend)

🛠️  Utilities:
  npm run backend:shell - Open shell in backend environment
  npm run clean        - Remove node_modules and virtual environment
`);
# App context

This application is a Citizen App operating within the LingarIAn Cockpit environment. The documentation is divided into two parts:

- `.lingarian-core/citizen-app-docs`: Shared documentation for all Citizen Apps. This section should not be modified. It serves as a reference during development, unless the user decides otherwise.
- `docs/`: Application-specific documentation. All documents related to this particular app should be placed here. AI agents are expected to update and maintain this documentation as the application evolves.

## Citizen App

Citizen App is a modular application designed to run within the LingarIAn Cockpit environment. It delivers user-facing functionality, such as citizen services, workflows, or data access, leveraging the Cockpit’s infrastructure for authentication, deployment, and integration. Each Citizen App operates as an independent module but adheres to Cockpit standards for security, API communication, and UI consistency.

**Key Features:**
- Runs as a managed module inside LingarIAn Cockpit
- Provides specific user services or workflows
- Integrates with Cockpit APIs for authentication, data, and configuration
- Follows Cockpit’s UI and security guidelines

## LingarIAn Cockpit

LingarIAn Cockpit is the central platform for managing, deploying, and operating modular applications within the LingarIAn ecosystem. It provides a unified interface for administrators and users to access various services, monitor system health, and orchestrate application lifecycles. The Cockpit ensures consistent integration, security, and configuration management across all hosted applications.

**Key Features:**
- Centralized dashboard for system and application management
- Unified authentication and authorization (SSO)
- Application deployment and lifecycle orchestration
- Monitoring and logging of system components
- Secure environment configuration

## LingarIAn Shell

LingarIAn Shell is the system component responsible for launching and managing Citizen Apps within the Cockpit. It handles core platform services such as Single Sign-On (SSO), user authentication, application deployment, and runtime orchestration. The Shell abstracts infrastructure concerns, enabling Citizen Apps to focus on business logic while relying on the Shell for secure access, session management, and operational consistency.

**Key Features:**
- Launches and manages Citizen Apps in the Cockpit environment
- Provides SSO and centralized authentication
- Handles application deployment and runtime orchestration
- Manages user sessions and access control
- Ensures secure, consistent integration of all modules

## Citizen Developer

A Citizen Developer is a non-technical user with deep business knowledge who leverages the LingarIAn platform to create applications. Citizen Developers do not require advanced programming skills; instead, they use intuitive tools and guided workflows provided by LingarIAn Cockpit and Shell to design, configure, and deploy business solutions. Their focus is on solving domain-specific problems and improving organizational processes through application development, while technical complexities are abstracted by the platform.

**Key Characteristics:**
- Non-technical background, strong business expertise
- Uses LingarIAn tools to build and deploy applications
- Focuses on business logic and user experience
- Relies on platform-provided security, integration, and deployment features

# Project Structure Overview

This template follows a specific structure that separates immutable core documentation from application-specific files. Understanding this structure is crucial for proper development and maintenance.

## Complete Directory Structure

```
├── .lingarian-core/                          # 🔒 PROTECTED - Core framework files
│   ├── agents/                               # AI agent configurations and workflows
│   ├── checklists/                           # Development and deployment checklists
│   ├── data/                                 # Core framework data files
│   ├── scripts/                              # Framework automation scripts
│   ├── tasks/                                # Framework task definitions
│   ├── templates/                            # Document generation templates
│   └── workflows/                            # CI/CD and automation workflows
├── docs/                                     # ✅ MODIFIABLE - Application documentation
│   ├── architecture.md                       # ✅ MODIFIABLE - Application-specific architecture documentation
│   ├── tasks/                                # ✅ MODIFIABLE - Task definitions and to-do items for the project
│   ├── done_tasks/                           # ✅ MODIFIABLE - Archive of completed tasks and project milestones
│   ├── app-context.md                        # 🔒 PROTECTED - This file - project overview and structure guide
│   ├── base-architecture.md                  # 🔒 PROTECTED - High-level application architecture documentation
│   ├── architecture/                         # 🔒 PROTECTED - Development guidelines by technology
│   │   ├── backend_coding_guidelines.md      # 🔒 PROTECTED - Python/FastAPI coding standards and best practices
│   │   └── frontend_coding_guidelines.md     # 🔒 PROTECTED - React/TypeScript coding standards and best practices
│   └── user-interface/                       # 🔒 PROTECTED - UI component specifications
│       ├── 00_app_structure.md               # 🔒 PROTECTED - Application layout and navigation structure
│       ├── 01_top_app_bar.md                 # 🔒 PROTECTED - Top navigation bar component specifications
│       ├── 02_tabs.md                        # 🔒 PROTECTED - Tab component design and usage
│       ├── 03_buttons.md                     # 🔒 PROTECTED - Button styles and interaction patterns
│       ├── 04_text_fields.md                 # 🔒 PROTECTED - Input field components and validation
│       ├── 05_chips_badges.md                # 🔒 PROTECTED - Small UI elements for tags and status
│       ├── 06_cards.md                       # 🔒 PROTECTED - Card component layouts and content
│       ├── 07_cards_expanded.md              # 🔒 PROTECTED - Expandable card variations
│       ├── 08_tables.md                      # 🔒 PROTECTED - Data table components and formatting
│       ├── 09_dialogs.md                     # 🔒 PROTECTED - Modal and dialog specifications
│       ├── 10_stepper_progress.md            # 🔒 PROTECTED - Progress indicators and workflow steps
│       ├── 11_callouts_banners.md            # 🔒 PROTECTED - Alert and notification components
│       ├── 12_divider.md                     # 🔒 PROTECTED - Section separator components
│       ├── 13_tooltips.md                    # 🔒 PROTECTED - Tooltip and help text specifications
│       └── 14_popup_messages.md              # 🔒 PROTECTED - Toast and popup message components
├── scripts/                                  # ✅ MODIFIABLE - Application-specific scripts
│   └── help.js                               # Helper scripts for development
├── backend/                                  # Backend application
│   ├── Dockerfile                            # 🔒 PROTECTED - Container build configuration
│   ├── alembic.ini                           # 🔒 PROTECTED - Database migration settings
│   ├── main.py                               # ✅ MODIFIABLE - FastAPI application entry point
│   ├── start.sh                              # 🔒 PROTECTED - Application startup script
│   ├── pyproject.toml                        # ✅ MODIFIABLE - Python dependencies and project config
│   ├── uv.lock                               # ✅ AUTO-GENERATED - Dependency lock file
│   ├── alembic/                              # ✅ MODIFIABLE - Database migration management
│   ├── app/                                  # ✅ MODIFIABLE - Main application code
│   │   ├── config.py                         # Application configuration and environment variables
│   │   ├── database.py                       # Database connection and session management
│   │   ├── main.py                           # FastAPI application factory and setup
│   │   ├── middleware/                       # HTTP middleware components
│   │   ├── models/                           # SQLAlchemy database models
│   │   ├── repositories/                     # Data access layer and database queries
│   │   ├── routers/                          # API endpoints and request handlers
│   │   ├── schemas/                          # Pydantic models for API request/response
│   │   ├── services/                         # Business logic and service layer
│   │   └── utils/                            # Utility functions and helpers
│   ├── htmlcov/                              # ✅ AUTO-GENERATED - Test coverage reports
│   └── tests/                                # ✅ MODIFIABLE - Backend test suite
├── frontend/                                 # Frontend application
│   ├── Dockerfile                            # 🔒 PROTECTED - Container build configuration
│   ├── nginx.conf                            # 🔒 PROTECTED - Web server configuration
│   ├── index.html                            # ✅ MODIFIABLE - HTML entry point
│   ├── package.json                          # ✅ MODIFIABLE - npm dependencies and scripts
│   ├── package-lock.json                     # ✅ AUTO-GENERATED - npm dependency lock file
│   ├── tsconfig.json                         # ✅ MODIFIABLE - TypeScript compiler configuration
│   ├── vite.config.ts                        # ✅ MODIFIABLE - Vite build tool configuration
│   ├── eslint.config.js                      # ✅ MODIFIABLE - Code linting rules
│   ├── public/                               # ✅ MODIFIABLE - Static assets served directly
│   ├── src/                                  # ✅ MODIFIABLE - React application source code
│   │   ├── App.css                           # Main application stylesheet
│   │   ├── App.tsx                           # Root React component
│   │   ├── index.css                         # Global CSS styles
│   │   ├── main.tsx                          # React application entry point
│   │   ├── theme.ts                          # 🔒 PROTECTED - Material-UI theme configuration
│   │   ├── vite-env.d.ts                     # Vite environment type definitions
│   │   ├── assets/                           # Static assets imported in components
│   │   └── components/                       # Reusable React components
│   └── tests/                                # ✅ MODIFIABLE - Frontend test suite
├── package.json                              # ✅ MODIFIABLE - Root package configuration
├── package-lock.json                         # ✅ AUTO-GENERATED - Root dependency lock file
├── README.md                                 # ✅ MODIFIABLE - Project documentation
├── shellApp.config.json                      # ✅ MODIFIABLE - Shell application configuration
├── podman-compose.yml                        # 🔒 PROTECTED - Production container orchestration
├── podman-compose.dev.yml                    # 🔒 PROTECTED - Development container orchestration
```

## Development Guidelines

1. **When documenting**: Always update `docs/` with application-specific information
2. **When coding**: Focus modifications on `backend/app/` and `frontend/src/` directories
3. **When testing**: Create and maintain tests in the `tests/` directories for both backend and frontend 
4. **When configuring**: Modify application configs, not infrastructure configs

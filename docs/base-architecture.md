# LingarIAn Application Architecture Standards

## Purpose and Scope

**Target Audience:** AI Development Agents
**Document Type:** Technical Architecture and Coding Standards
**Scope:** Complete full-stack application template for Citizen App in LingarIAn ecosystem

This document serves as the definitive technical specification for AI development agents creating LingarIAn applications. It defines mandatory architecture patterns, coding standards, technology stack decisions, and implementation guidelines that all AI agents must follow when generating code.

**Key Objectives:**
- Ensure consistent code generation across all AI development agents
- Define locked technology choices and architecture patterns
- Establish quality standards and best practices for generated code
- Enable seamless integration with LingarIAn Shell platform capabilities

### AI Agent Code Generation Standards

**Mandatory Requirements for AI Agents:**
- **Consistency Enforcement:** Follow naming conventions, file structure, and coding patterns precisely
- **Quality Standards:** Generated code must pass automated testing and security validation
- **Platform Integration:** Ensure seamless integration with LingarIAn Shell services and SSO
- **Documentation:** Auto-generate appropriate inline documentation and API specifications

**Code Generation Constraints:**
- **Simplicity Focus:** Generate straightforward CRUD applications, forms, and dashboards
- **No Complex Patterns:** Avoid advanced architectural patterns
- **Performance Optimization:** Follow established patterns for database queries and API responses
- **Security Compliance:** Implement all security patterns defined in this specification

### LingarIAn Shell Integration

This application will be run as part of LingarIAn Shell which provides basic functionalities like GitOps deployment and SSO. The architecture follows containerized deployment principles using LingarIAn Shell framework with GitOps methodology, enabling automated deployment workflows and infrastructure consistency.

## High Level Architecture

### Technical Summary

This template defines a modern full-stack web application architecture featuring a Python-based REST API backend with PostgreSQL database, React frontend with Material-UI components, and external SSO integration for user management. Key integration points include REST API communication between frontend and backend, JWT token-based authentication flow with external SSO provider, and database connection pooling for optimal performance. This architecture achieves enterprise-grade security, developer productivity, and operational simplicity suitable for teams of varying experience levels.

### Platform and Infrastructure Choice

**Platform:** LingarIAn Shell Framework
**Deployment Method:** Automated CI/CD pipelines managed by LingarIAn Shell
**Key Services Provided by LingarIAn Shell:** 
- Automated container orchestration and deployment
- Managed PostgreSQL database instances
- Built-in load balancing and ingress management
- Integrated SSO and user management system
- Centralized monitoring, logging, and alerting
- Automated backup and disaster recovery
- Security scanning and compliance monitoring

**Deployment Approach:** LingarIAn Shell handles all infrastructure concerns automatically. Applications are deployed through simple Git pushes, with the platform managing containerization, scaling, and environment provisioning without developer intervention.

## Tech Stack

This is the DEFINITIVE technology selection for the entire project. This table serves as the single source of truth - all development must use these exact versions and technologies.

### Technology Stack Table

| Category | Technology | Version | Purpose | Decision Rationale |
|----------|------------|---------|---------|-------------------|
| Frontend Framework | React | 18.x | UI component framework | Industry standard, excellent tooling, easy to understand and maintain |
| UI Components | Material-UI (MUI) | 5.x | Pre-built UI components | AI agent component library, accessibility built-in |
| Frontend Language | TypeScript | 5.x | Type-safe development | Maintainability, consistency, and rapid development |
| Backend Framework | FastAPI | Latest | REST API framework | AI agent-friendly, automatic API documentation |
| Backend Language | Python | 3.11+ | Server-side development | Simple syntax, AI-friendly, extensive ecosystem |
| Database | PostgreSQL | 15+ | Data storage | LingarIAn Shell managed, AI-friendly schema generation |
| Authentication | LingarIAn SSO | N/A | User management | Zero-config enterprise authentication |
| Deployment | LingarIAn Shell | N/A | Automated deployment | Full infrastructure automation |
| Monitoring | LingarIAn Shell | N/A | Application monitoring | Built-in, zero configuration required |
| File Storage | LingarIAn Shell | N/A | File and media storage | Managed service, seamless integration |

## AI Agent Implementation Requirements

This section defines mandatory implementation standards that all AI development agents must follow when generating LingarIAn applications.

### Implementation Requirements

**Frontend & Backend Architecture:**
Complete implementation details are available in dedicated coding guidelines:
- **[Frontend Coding Guidelines](./architecture/frontend_coding_guidelines.md)** - React, TypeScript, Material-UI patterns, state management, routing, testing
- **[Backend Coding Guidelines](./architecture/backend_coding_guidelines.md)** - FastAPI layered architecture, SQLAlchemy, authentication, API standards, testing

These documents provide the detailed coding standards, patterns, and examples that AI agents must follow when generating LingarIAn applications.

## Deployment Architecture

This section defines the deployment strategy using LingarIAn Shell framework with GitOps methodology, establishing patterns for automated and reliable deployments.

### Deployment Strategy

**Development Commands Reference:**
AI agents must use the standardized development commands defined in the project's `scripts/help.js` file. These commands provide a consistent development workflow across all LingarIAn applications.

**Deployment Configuration (Do Not Modify):**
AI agents must **never modify** deployment-related configuration files. These are pre-configured for LingarIAn Cockpit integration:
- **`podman-compose.yml`** - Production container orchestration (LingarIAn Cockpit managed)
- **`podman-compose.dev.yml`** - Development dependencies configuration
- **Port configurations** - Standardized ports for LingarIAn Cockpit integration
- **Container configurations** - Podman settings optimized for LingarIAn Shell

**Rationale:** These configurations ensure seamless integration with LingarIAn Cockpit infrastructure. Modifications can break platform compatibility and deployment automation.

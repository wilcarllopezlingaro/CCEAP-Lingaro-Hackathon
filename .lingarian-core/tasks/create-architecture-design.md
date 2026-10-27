# Create Architecture Design

## Task Description

Analyze the project brief and create a comprehensive system architecture document that defines the technical foundation for the application. This architecture serves as the blueprint that guides project planning and ensures all development follows consistent patterns aligned with LingarIAn standards.

## Architecture Design Process

### Phase 1: Requirements Analysis
- **Load Project Brief** - Read and analyze `docs/project_brief.md` to understand business requirements
- **Identify Core Entities** - Extract primary business objects and their relationships from requirements
- **Map User Flows** - Understand key user journeys and interaction patterns
- **Define Scope** - Clarify MVP features and technical boundaries

### Phase 2: Data Model Design
- **Entity Identification** - Define all database tables needed for the application
- **Relationship Mapping** - Document foreign keys, indexes, and data constraints
- **Field Specifications** - Define field types, validations, and business rules
- **Data Integrity** - Ensure referential integrity and data consistency patterns

### Phase 3: API Design
- **Endpoint Planning** - Define REST endpoints for all business operations
- **Resource Grouping** - Organize endpoints by domain/resource areas
- **Authentication Strategy** - Specify auth requirements per endpoint
- **Request/Response Contracts** - Document payload structures for complex operations
- **Authorization Rules** - Define role-based access control patterns

### Phase 4: Frontend Architecture
- **Page Structure** - Define application pages, routes, and navigation
- **Component Hierarchy** - Identify reusable components and their organization
- **State Management** - Plan state management approach for complex features
- **User Experience Flow** - Map user interactions to backend API calls

### Phase 5: Technical Decisions
- **Design Decisions** - Document key architectural choices and rationale
- **Business Logic** - Define application-specific rules and workflows
- **Integration Points** - Identify LingarIAn Shell services and external integrations
- **Security & Performance** - Address security requirements and performance considerations
- **Extensibility Planning** - Note future capabilities and extension points

### Phase 6: Documentation & Validation
- **Complete Documentation** - Fill all sections of the architecture template comprehensively
- **LingarIAn Compliance** - Ensure alignment with LingarIAn framework standards
- **Clarity Check** - Verify documentation is clear and actionable for downstream agents
- **Checklist Validation** - Validate architecture against `.lingarian-core/checklists/architecture-design-checklist.md`
- **File Generation** - Save architecture document to `docs/architecture.md`

## Output Requirements

1. **Architecture Document** - Create `docs/architecture.md` following `architecture-template.yaml` structure
2. **Template Compliance** - All sections must be thoroughly completed with actionable details
3. **Technical Completeness** - Include sufficient detail for project manager to create user stories
4. **Standards Alignment** - Reference and comply with LingarIAn architecture standards
5. **Clear Rationale** - Document reasoning for key architectural decisions

## Quality Validation

After creating the architecture design, the agent must validate the work using the checklist in `.lingarian-core/checklists/architecture-design-checklist.md`. This includes:

1. **Pre-Design Validation** - Verify requirements understanding and LingarIAn standards review
2. **Data Model Validation** - Ensure complete entities, fields, relationships, and constraints
3. **API Design Validation** - Verify all endpoints, auth requirements, and request/response specs
4. **Frontend Architecture Validation** - Confirm page structure, components, and state management
5. **Technical Decisions Validation** - Check design decisions, business logic, and integrations
6. **Architecture Quality Standards** - Validate completeness, LingarIAn compliance, and clarity
7. **Final Output Validation** - Ensure document generation and handoff readiness

The validation must be completed before considering the task finished.

## Architectural Principles

Apply these principles during architecture design:
- **Simplicity First** - Choose straightforward solutions over complex patterns
- **Database-Driven Design** - Start with data models, derive APIs and UI
- **Security by Default** - Embed security patterns into core architecture
- **Standards Compliance** - Strictly follow LingarIAn tech stack and conventions
- **Testability** - Design for comprehensive automated testing
- **Maintainability** - Prioritize code clarity and standard patterns

## Files to Load

- `docs/project_brief.md` (input from Business Analyst)
- `.lingarian-core/templates/architecture-template.yaml` (output structure)
- `.lingarian-core/checklists/architecture-design-checklist.md` (quality validation)
- `docs/base-architecture.md`
- `docs/architecture/backend_coding_guidelines.md` (backend patterns)
- `docs/architecture/frontend_coding_guidelines.md` (frontend patterns)

## Success Criteria

The architecture design is complete when:
1. All template sections are thoroughly documented with actionable details
2. Data models include complete entity definitions with fields and relationships
3. API endpoints are fully specified with auth, request/response structures
4. Frontend pages and components are clearly defined with hierarchy
5. Key design decisions are documented with clear rationale
6. All checklist items in `architecture-design-checklist.md` are validated and passed
7. Document is saved to `docs/architecture.md` and ready for project planning phase
8. Architecture enables the Project Manager to break work into clear, implementable user stories

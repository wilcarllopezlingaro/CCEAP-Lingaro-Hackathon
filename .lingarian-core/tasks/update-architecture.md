# Update Architecture

## Task Description

Analyze change requests and update system architecture documentation to reflect new requirements, design decisions, and technical specifications. Ensure architectural consistency, maintainability, and alignment with change request objectives while preserving existing system integrity.

## Architecture Update Process

### Phase 1: Change Request Analysis & Requirements Analysis
- **Load Change Requests** - Read and analyze all change requests from `docs/change-requests/` directory
- **Impact Assessment** - Evaluate architectural impact of each change request:
  - Identify affected system components and layers
  - Assess integration points and data flow changes
  - Evaluate scalability and performance implications
  - Identify security and compliance considerations
- **Dependency Analysis** - Map dependencies between change requests and existing architecture
- **Technical Feasibility Validation** - Verify proposed changes align with architectural principles

### Phase 2: Data Model Updates
- **Entity Analysis** - Review and update database entities affected by change requests
- **Relationship Updates** - Modify foreign keys, indexes, and data constraints as needed
- **Field Modifications** - Update field types, validations, and business rules
- **Data Integrity** - Ensure referential integrity and data consistency patterns are maintained

### Phase 3: API Design Updates
- **Endpoint Analysis** - Review and update REST endpoints for affected business operations
- **Resource Modifications** - Update endpoint grouping and resource organization
- **Authentication Updates** - Modify auth requirements per updated endpoints
- **Contract Updates** - Update request/response payload structures
- **Authorization Updates** - Modify role-based access control patterns as needed

### Phase 4: Frontend Architecture Updates
- **Page Structure Updates** - Modify application pages, routes, and navigation as needed
- **Component Updates** - Update reusable components and their organization
- **State Management Updates** - Modify state management approach for new features
- **User Experience Updates** - Update user interaction flows and backend API integrations

### Phase 5: Technical Decisions & Integration
- **Design Decision Updates** - Document updated architectural choices and rationale
- **Business Logic Updates** - Update application-specific rules and workflows
- **Integration Updates** - Modify LingarIAn Shell services and external integrations
- **Security & Performance Updates** - Address updated security requirements and performance considerations
- **Extensibility Updates** - Update future capabilities and extension points

### Phase 6: Documentation Updates & Validation
- **Complete Documentation** - Update all sections of the architecture document comprehensively
- **LingarIAn Compliance** - Ensure alignment with LingarIAn framework standards
- **Clarity Check** - Verify documentation is clear and actionable for downstream agents
- **Checklist Validation** - Validate architecture against `.lingarian-core/checklists/architecture-design-checklist.md`
- **File Updates** - Update architecture document in `docs/architecture.md`

## Output Requirements

1. **Updated Architecture Document** - Update `docs/architecture.md` following existing structure and patterns
2. **Template Compliance** - All affected sections must be thoroughly updated with actionable details
3. **Technical Completeness** - Include sufficient detail for project manager to plan change implementation
4. **Standards Alignment** - Reference and comply with LingarIAn architecture standards
5. **Clear Rationale** - Document reasoning for key architectural modifications

## Quality Validation

After updating the architecture design, the agent must validate the work using the checklist in `.lingarian-core/checklists/architecture-design-checklist.md`. This includes:

1. **Pre-Update Validation** - Verify change request understanding and current architecture analysis
2. **Data Model Validation** - Ensure updated entities, fields, relationships, and constraints
3. **API Design Validation** - Verify updated endpoints, auth requirements, and request/response specs
4. **Frontend Architecture Validation** - Confirm updated page structure, components, and state management
5. **Technical Decisions Validation** - Check updated design decisions, business logic, and integrations
6. **Architecture Quality Standards** - Validate completeness, LingarIAn compliance, and clarity
7. **Final Output Validation** - Ensure document updates and handoff readiness

The validation must be completed before considering the task finished.

## Architectural Principles

Apply these principles during architecture updates:
- **Consistency First** - Maintain consistency with existing architectural patterns
- **Incremental Changes** - Make minimal necessary changes to accommodate requirements
- **Security by Default** - Embed security patterns into updated architecture
- **Standards Compliance** - Strictly follow LingarIAn tech stack and conventions
- **Backward Compatibility** - Preserve existing functionality when possible
- **Maintainability** - Prioritize code clarity and standard patterns

## Files to Load

- `docs/change-requests/*.md` (input change requests to process)
- `docs/architecture.md` (main architecture document to update)
- `docs/base-architecture.md` (foundational patterns reference)
- `docs/app-context.md` (application context reference)
- `docs/architecture/` (component-specific documentation)
- `.lingarian-core/checklists/architecture-design-checklist.md` (validation criteria)

## Success Criteria

The architecture update is complete when:
1. All change requests are thoroughly analyzed and integrated into architecture documentation
2. Updated data models include complete entity definitions with fields and relationships
3. API endpoints are fully updated with auth, request/response structures for new/modified functionality
4. Frontend pages and components are clearly updated with hierarchy changes
5. Key architectural modifications are documented with clear rationale
6. All checklist items in `architecture-design-checklist.md` are validated and passed
7. Document is updated in `docs/architecture.md` and ready for change planning phase
8. Updated architecture enables the Project Manager to plan change implementation into clear, implementable user stories
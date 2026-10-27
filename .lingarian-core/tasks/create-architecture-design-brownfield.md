# Create Architecture Design - Brownfield

## Task Description

Analyze the existing codebase to create a comprehensive system architecture document that documents the current technical foundation, identifies architectural patterns, and provides insights for future development. This reverse-engineered architecture serves as documentation for the existing system and guides future development decisions.

### Implementation Steps

This task uses an automated approach to analyze the existing codebase and create detailed architecture documentation:

1. **Flatten Repository**: Use `python .lingarian-core/scripts/flatten.py` to create a flattened view of the current repository

2. **Analyze Existing Architecture**: Review the flattened repository to understand:
   - Current data models and database schema
   - Existing API endpoints and their structure
   - Frontend components and page organization
   - Technology stack and dependencies
   - Integration patterns and external services
   - Security and authentication mechanisms

3. **Generate Architecture Documentation**: Create comprehensive architecture documentation that includes:
   - Current system architecture overview
   - Data model analysis from existing code
   - API endpoint documentation from route definitions
   - Frontend architecture from component structure
   - Technical decisions and patterns in use
   - Areas for improvement and modernization

4. **Update Base Architecture Documentation (if absolutely necessary)**: Review and potentially update core architecture documentation if the analysis reveals:
   - **`docs/base-architecture.md`**: Update only if there are fundamental changes to:
     - Technology stack versions that differ significantly from documented standards
     - New platform integration requirements discovered in the codebase
     - Critical architectural patterns that deviate from Template standards
   - **`docs/architecture/`**: Update coding guidelines only if there are:
     - New coding patterns discovered that should become standards
     - Significant deviations from documented best practices that need clarification
     - Technology-specific implementations that require guideline updates
   
   **Critical Warning**: These files contain protected Template standards. Only update them if the brownfield analysis reveals fundamental architectural differences that must be documented.

## Deliverable

When all analysis is complete, save the completed architecture document in `docs/architecture.md` following the exact structure and requirements defined in `architecture-template.yaml`.


## Quality Validation

After creating the architecture document, validate the work using the checklist in `.lingarian-core/checklists/architecture-design-checklist.md`. The validation must be completed before considering the task finished.

## Template Compliance

The agent must analyze the codebase to gather information for ALL sections specified in `architecture-template.yaml`. Use the automated analysis approach to extract this information from the existing implementation, ensuring complete coverage of the template requirements.

## Files to Load

- `.lingarian-core/templates/architecture-template.yaml`
- `.lingarian-core/checklists/architecture-design-checklist.md`
- `docs/base-architecture.md` (for reference and potential critical updates only)
- `docs/architecture/` (for reference and potential updates)


## Automated Execution

This task should be executed automatically without user interaction, using the flattened repository as the primary source of information for architectural analysis.
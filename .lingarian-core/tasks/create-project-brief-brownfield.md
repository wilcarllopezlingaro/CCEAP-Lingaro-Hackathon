# Create Project Brief - Brownfield

## Task Description

Create a comprehensive project brief for the current brownfield project by analyzing the existing codebase and documenting the current state, architecture, and potential areas for improvement or development.

### Implementation Steps

This task uses an automated approach to analyze the existing codebase and create a detailed project brief:

1. **Flatten Repository**: Use `python .lingarian-core/scripts/flatten.py` to create a flattened view of the current repository

2. **Analyze Codebase**: Review the flattened repository to understand:
   - Current architecture and technology stack
   - Existing features and functionality
   - Project structure and organization
   - Database models and configuration
   - API endpoints and services
   - Dependencies and configurations

3. **Generate Project Brief**: Create a detailed project brief that includes:
   - Current project overview and state
   - Technology stack analysis
   - Existing architecture and features
   - Project structure documentation
   - Potential areas for improvement
   - Development opportunities and recommendations

4. **Update App Context (if necessary)**: Review and update `docs/app-context.md` if the analysis reveals:
   - Changes in project structure that affect the directory documentation
   - New application-specific documentation files that need to be referenced
   - Updates to the project overview that better reflect the current state
   - Additional modifiable areas that developers should be aware of

## Deliverable

When all analysis is complete, save the completed brief in `docs/project_brief.md` following the exact structure and requirements defined in `project-brief-template.yaml`. The brief should be adapted for a brownfield context by analyzing the existing codebase.

## Quality Validation

After creating the project brief, validate the work using the checklist in `.lingarian-core/checklists/project-brief-checklist.md`.

## Template Compliance

The agent must analyze the codebase to gather information for ALL sections specified in `project-brief-template.yaml`. Use the automated analysis approach to extract this information from the existing implementation, ensuring complete coverage of the template requirements.

## Files to Load

- `.lingarian-core/templates/project-brief-template.yaml`
- `.lingarian-core/checklists/project-brief-checklist.md`
- `docs/app-context.md` (for reference and potential updates to modifiable sections)

## Automated Execution

This task should be executed automatically without user interaction, using the flattened repository as the primary source of information for analysis.
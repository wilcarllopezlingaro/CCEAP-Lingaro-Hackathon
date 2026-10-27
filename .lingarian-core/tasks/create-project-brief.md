# Create Project Brief

## Task Description

Guide the user through creating a simple but comprehensive project brief using a conversational approach. Focus on understanding their business needs, users, and desired outcomes without getting into technical complexities.

### Simple 3-Step Process

**Step 1: Understanding the Idea (5-10 minutes)**
- What the application should do
- What problem it solves  
- Who will use it

**Step 2: Defining Key Features (10-15 minutes)**
- Main functions users need
- What's most important vs. nice-to-have
- Simple user stories in plain language

**Step 3: Visual & Experience Preferences (5 minutes)**
- How it should look and feel
- Any specific style preferences
- Basic branding considerations

## Deliverable

When all required information is collected, save the completed brief in `docs/project_brief.md` following the exact structure and requirements defined in `project-brief-template.yaml`.

## Quality Validation

After creating the project brief, the agent must validate the work using the checklist in `.lingarian-core/checklists/project-brief-checklist.md`. This includes:

1. **Information Completeness Check** - Verify all required sections are populated with sufficient detail
2. **Template Compliance Validation** - Ensure the brief follows the exact structure and meets quality standards
3. **Success Criteria Verification** - Confirm the brief enables autonomous downstream processing
4. **Missing Information Protocol** - Identify and address any gaps before finalizing

The validation must be completed before considering the task finished.

## Template Compliance

The agent must gather information for ALL sections specified in `project-brief-template.yaml`. Use the 3-step process to naturally collect this information through conversation, ensuring complete coverage of the template requirements.

## Files to Load

- `.lingarian-core/templates/project-brief-template.yaml`
- `.lingarian-core/checklists/project-brief-checklist.md`


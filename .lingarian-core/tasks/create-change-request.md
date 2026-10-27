# Create Change Request

## Task Description

Guide the user through creating a comprehensive change request using a conversational approach. Focus on understanding their change needs, business justification, and impact assessment without getting into deep technical complexities during the conversation.

### Simple 4-Step Process

**Step 1: Understanding the Change (5-10 minutes)**
- What needs to be changed or added
- What problem this solves or value it provides
- Why this change is needed now

**Step 2: Current State & Impact Analysis (10-15 minutes)**
- How the system currently works in this area
- What limitations or issues exist
- Who will be affected by this change

**Step 3: Solution Vision & Requirements (10-15 minutes)**
- What the ideal solution looks like
- Key requirements and acceptance criteria
- Priority level and timeline expectations

**Step 4: Risk & Dependency Assessment (5-10 minutes)**
- Potential challenges or risks
- Dependencies on other systems or changes
- Resource and constraint considerations

## Deliverable

When all required information is collected, save the completed change request in `docs/change-requests/CR-{YYYY-MM-DD}-{short-description}.md` following the exact structure and requirements defined in `change-request-template.yaml`.

Additionally, update `docs/project_brief.md` to reflect the new requirements and scope changes.

## Quality Validation

After creating the change request, the agent must validate the work using the checklist in `.lingarian-core/checklists/change-request-checklist.md`. The validation must be completed before considering the task finished.

## Template Compliance

The agent must gather information for ALL sections specified in `change-request-template.yaml`. Use the 4-step process to naturally collect this information through conversation, ensuring complete coverage of the template requirements.

## Conversation Guidelines

### Discovery Questions Structure
- **Business Context**: "What business problem are you trying to solve?" "What value will this change provide?"
- **Current Limitations**: "How does the system currently handle this?" "What doesn't work as expected?"
- **User Impact**: "Who will be affected by this change?" "How will their workflow change?"
- **Solution Vision**: "What would the ideal solution look like?" "Are there examples from other systems?"
- **Success Metrics**: "How will you know this change is successful?" "What specific outcomes do you expect?"

### Natural Conversation Flow
- Start with open-ended questions to understand the big picture
- Follow up with specific questions to gather details
- Confirm understanding by summarizing back to the user
- Ask clarifying questions when requirements are unclear
- Guide the user through impact assessment without overwhelming them

## Files to Load

- `.lingarian-core/templates/change-request-template.yaml`
- `.lingarian-core/checklists/change-request-checklist.md`
- `docs/project_brief.md` (for context and updating)
- `docs/architecture.md` (for technical alignment reference)
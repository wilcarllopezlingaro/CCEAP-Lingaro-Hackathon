# Develop Next Story

## Task Description

Process tasks from the `docs/tasks` directory, always selecting the task with the lowest number first. Upon completion, move the finished task to the `docs/done_tasks` directory.

## Task Objectives

1. **Task Selection** - Auto-select lowest numbered story from `docs/tasks`
2. **Requirements Analysis** - Parse story structure and validate completeness
3. **Implementation** - Execute tasks sequentially with validation checkpoints
4. **Quality Validation** - Run tests and validate against acceptance criteria
5. **Completion** - Update story status and move to `docs/done_tasks`

## Implementation Steps

1. **Parse Story Structure** - Validate story format and extract tasks/subtasks
2. **Technical Analysis** - Review architecture requirements and existing codebase
3. **Task Execution** - Implement each task with immediate testing
4. **Quality Validation** - Run tests, fix failures, verify app runs
5. **Acceptance Validation** - Verify all criteria are met
6. **Retrospective Creation** - Analyze your work on this task. If you believe something could have gone better, you spent more time than expected on certain aspects, there were gaps in documentation, you encountered unexpected technical challenges, or you gained valuable insights - execute `.lingarian-core/tasks/create-retrospective.md` to document them
7. **Story Completion** - Update status and move file

## Success Criteria

- Story implementation completed according to acceptance criteria
- All tests passing and application running successfully
- Story moved to `docs/done_tasks` with proper status updates
- Retrospective created (recommended) for learning documentation

## Quality Validation

During and after implementation, the agent must validate the work using the checklist in `.lingarian-core/checklists/implementation-checklist.md`. This includes:

1. **Implementation Initialization** - Verify story readiness and development environment setup
2. **Implementation Planning** - Confirm story analysis, breakdown, and technical design
3. **Development Execution** - Validate coding practices, testing, and progress tracking
4. **Quality Assurance** - Ensure comprehensive testing, code review, and acceptance validation
5. **Completion Verification** - Confirm proper documentation, deployment readiness, and handoff

The validation must be completed throughout the implementation process before marking the story as complete.

## HALT Conditions

If unable to resolve issues after 3 attempts:
- Mark task status as "HALT"
- Create detailed problem documentation
- Stop work and preserve current state for human review

## HALT Procedure

When unable to resolve issues after 3 attempts, agent must:

1. **Mark Task Status as "HALT"** in story file
2. **Create "HALT DETAILS" section** in story with:
   - Detailed explanation of the problem
   - All 3 fix attempts made and their outcomes
   - Error messages and diagnostic information
   - Recommended next steps for human developer
   - Files that were modified during attempts
3. **Create retrospective file** using `.lingarian-core/tasks/create-retrospective.md` focusing on what blocked progress
4. **Stop all work** and do not mark task as complete

## Blocking Conditions (Triggers HALT)

- Story missing critical sections (Tasks, Acceptance Criteria)
- External dependency requirements detected
- Architecture violations identified
- Test failures persist after 3 fix attempts
- Application fails to start after 3 fix attempts
- New functionality cannot be made to work after 3 fix attempts

## Files to Load

- `docs/app-context.md`
- `docs/architecture.md`
- `docs/base-architecture.md`
- `docs/architecture/backend_coding_guidelines.md`
- `docs/architecture/frontend_coding_guidelines.md`
- `.lingarian-core/checklists/implementation-checklist.md`
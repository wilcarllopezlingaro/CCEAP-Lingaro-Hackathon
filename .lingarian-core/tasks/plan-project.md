# Plan Project

## Task Description

Transform project requirements into well-structured, technically detailed user stories with optimal granularity, rich technical context, and clear implementation sequence. Uses autonomous waterfall planning with intelligent story decomposition to ensure implementable stories without human interaction.

## Planning Process

### Phase 1: Project Analysis & Architecture Extraction
- **Parse Documentation** - Extract user personas, features, and business requirements from `docs/project_brief.md`
- **Deep Architecture Analysis** - Load and comprehensively analyze technical architecture from `docs/architecture.md` and `docs/base-architecture.md`:
  - Extract specific data models, schemas, validation rules, and relationships
  - Document exact API endpoints, request/response formats, and authentication requirements
  - Identify component specifications, props, state management patterns
  - Extract file paths, naming conventions, and project structure requirements
  - Capture testing strategies, security considerations, and performance requirements
- **Technical Context Building** - Create rich technical context library with source references for story enrichment
- **Feature Mapping** - Connect business requirements to specific technical implementation details
- **Epic Identification** - Group related features into logical epics for complete user workflows

### Phase 2: Intelligent Story Generation & Auto-Decomposition
- **Feature Prioritization** - Rank by business value, user impact, technical complexity, and dependency chains
- **Story Creation with Granularity Control** - Generate user stories with intelligent size management:
  - **Target**: 1-3 days implementation (3-5 subtasks maximum)
  - **Auto-decomposition**: Automatically split stories exceeding 5 subtasks into multiple stories
  - **Complexity Analysis**: Evaluate backend vs frontend vs full-stack complexity for proper sizing
- **Technical Context Injection** - Enrich each story with architecture details and source references
- **Forward/Backward Context Linking** - Connect stories with implementation context:
  - Reference previous story outputs (models, services, components) for current story
  - Document how current story outputs will be consumed by future stories
  - Establish technical continuity and reduce implementation research needs
- **Dependency Analysis** - Identify cross-story dependencies and implementation constraints

### Phase 3: Quality Validation & Output
- **Implementation Readiness** - Validate stories contain sufficient technical context for autonomous implementation
- **Checklist Validation** - Validate each story against `.lingarian-core/checklists/user-story-checklist.md`
- **File Generation** - Create sequential story files (`story-001-*.md`) in `docs/tasks/` using `story-template.yaml` format

## Output Requirements

1. **Story Files** - Individual markdown files in `docs/tasks/` using sequential numbering (`story-001-*.md`)
2. **Enhanced Template Compliance** - Use exact `story-template.yaml` format with "TODO" status, enriched with:
   - **Rich Dev Notes Section** with specific technical details and architecture source references  
   - **Forward/Backward Context** linking to previous and future story dependencies
   - **Granularity-Controlled Subtasks** (3-5 max) with architecture references and AC linkage
   - **Implementation-Ready Technical Specifications** requiring minimal additional research
3. **Auto-Decomposition Results** - Document split of oversized stories into multiple implementable stories
4. **Checklist Validation** - Each story must pass validation against `.lingarian-core/checklists/user-story-checklist.md`

## Story Enrichment Guidelines

All stories must include comprehensive technical context extracted from architecture documents with proper source references `[Source: file.md#section]`.

**Required Dev Notes Content:**
- **Previous Story Context**: How this story builds on previous implementations
- **Data Models**: Specific schemas, validation rules, relationships  
- **API Specifications**: Exact endpoints, request/response formats, auth requirements
- **Component Specifications**: UI component details, props, state management
- **File Locations**: Exact paths based on project structure guidelines
- **Testing Requirements**: Specific test cases and strategies from testing documentation
- **Technical Constraints**: Version requirements, performance considerations, security rules

**Subtask Requirements:**
- **Maximum 5 subtasks per story** - Auto-split if exceeded
- **Architecture Reference Required** - Each subtask must reference relevant architecture documentation
- **AC Linkage** - Link subtasks to specific Acceptance Criteria (e.g., `Subtask 1 (AC: 1, 3)`)
- **Testing Integration** - Include unit testing as explicit subtasks
- **Implementation Sequence** - Order subtasks for logical development flow

## Required Files
- `docs/project_brief.md` (input from Business Analyst)
- `docs/architecture.md` (input from System Architect)
- `docs/app-context.md`
- `docs/base-architecture.md`
- `.lingarian-core/templates/story-template.yaml`
- `.lingarian-core/checklists/user-story-checklist.md`
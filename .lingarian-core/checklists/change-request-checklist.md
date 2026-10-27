# Change Request Creation Checklist

This checklist ensures comprehensive change request creation that enables autonomous downstream processing. Based on the create-change-request.md command process.

## Pre-Creation Validation

### Information Gathering Completeness
- [ ] Change requirement clearly articulated (what needs to be changed or added)
- [ ] Business justification defines specific problem or opportunity
- [ ] Current state limitations clearly identified
- [ ] Solution vision collected (what the ideal solution looks like)
- [ ] Impact assessment completed (who will be affected)
- [ ] Priority and timeline expectations gathered
- [ ] Risk and dependency considerations collected

### Change Context Requirements
- [ ] Change type properly classified (Feature Enhancement, Bug Fix, etc.)
- [ ] Priority level established (Critical, High, Medium, Low)
- [ ] Impact level assessed (Breaking Change, Non-Breaking, Internal Only)
- [ ] Business value clearly articulated
- [ ] Current system behavior documented
- [ ] Proposed solution approach defined

## Template Compliance Validation

### Required Sections Completeness
- [ ] **Change Request Title**: Clear, descriptive title following naming convention
- [ ] **Change Type & Priority**: Properly classified with priority and impact level
- [ ] **Business Justification**: Explains business need and expected value
- [ ] **Current State Analysis**: Documents how system currently works
- [ ] **Proposed Solution**: High-level solution approach described
- [ ] **Technical Impact Assessment**: System components and integration points identified
- [ ] **Stakeholder Impact**: Affected user groups and teams documented
- [ ] **Implementation Considerations**: Effort, risks, and constraints assessed
- [ ] **Acceptance Criteria**: Clear, testable criteria defined
- [ ] **Dependencies and Constraints**: Prerequisites and limitations documented

### Information Quality Standards
- [ ] All sections contain sufficient detail for architecture analysis
- [ ] Information is specific enough to avoid ambiguity
- [ ] Business requirements are clear and actionable
- [ ] Technical impact assessment is comprehensive
- [ ] Change request enables autonomous downstream processing

## Missing Information Protocol

### Validation Process
- [ ] Identify any sections lacking sufficient detail
- [ ] Revisit incomplete topics with specific follow-up questions
- [ ] Provide relevant examples to help articulate needs
- [ ] Ensure all sections meet minimum requirements before proceeding
### Success Criteria Validation
- [ ] Change request contains enough detail for update-architecture.md agent to update system architecture
- [ ] All business requirements are clear and actionable
- [ ] Technical impact assessment is comprehensive and realistic
- [ ] Implementation considerations can guide architecture decisions
- [ ] Change requirements are implementable and testable

## Final Output Validation

### Document Generation
- [ ] docs/change-requests/CR-{YYYY-MM-DD}-{description}.md created following exact template structure
- [ ] All template sections meaningfully populated
- [ ] Information specific enough to avoid architecture analysis ambiguity
- [ ] Technical impact assessment comprehensive for architecture updates
- [ ] Change request realistic for system capabilities

### Project Brief Update
- [ ] docs/project_brief.md updated to reflect new requirements
- [ ] Scope changes properly documented
- [ ] Impact on existing features noted
- [ ] Success criteria updated appropriately

### Handoff Readiness
- [ ] Change request enables autonomous downstream processing
- [ ] All sections meet quality standards
- [ ] User approval obtained for final change request
- [ ] Next steps in automated pipeline communicated
- [ ] Document ready for architecture analysis phase

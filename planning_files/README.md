# Software Project Planning Template System

This directory contains a comprehensive 5-file planning system designed for software projects of any size. These templates provide a structured approach to documenting, planning, and executing software development projects.

## Overview

The 5-file system provides complete coverage of software project planning:

| File | Purpose | Primary Users |
|------|---------|---------------|
| **TECHNICAL.md** | Technical architecture and implementation details | Developers, Architects, CTOs |
| **DESIGN.md** | User experience and visual design system | Designers, Product Managers, Developers |
| **EXECUTION.md** | Project status, timeline, and task tracking | Project Managers, Team Leads, Stakeholders |
| **BUSINESS.md** | Business strategy, market analysis, and growth plans | Founders, Product Managers, Business Stakeholders |
| **README.md** | Documentation and usage instructions | All team members |

## How to Use This Template System

### Step 1: Copy Templates to Your Project

```bash
# Copy the entire plans_copy directory to your project root
cp -r plans_copy/ /path/to/your/project/plans/

# Or copy individual files as needed
cp plans_copy/TECHNICAL.md /path/to/your/project/
cp plans_copy/DESIGN.md /path/to/your/project/
```

### Step 2: Customize for Your Project

Replace all placeholder content with your project-specific information:

#### Global Replacements
- Replace `[PROJECT NAME]` with your actual project name
- Replace `[DATE]` with current date
- Fill in all bracketed placeholders `[PLACEHOLDER]` with your specific content

#### Section-by-Section Customization
1. **Start with BUSINESS.md** - Define your market, customers, and business model
2. **Move to DESIGN.md** - Define user experience and visual design approach
3. **Continue to TECHNICAL.md** - Document technical architecture and implementation
4. **Update EXECUTION.md** - Track current status and plan next steps
5. **Customize README.md** - Document your specific usage and team practices

### Step 3: Establish Update Practices

These documents are most valuable when kept current:

- **Daily**: Update EXECUTION.md with task progress and status changes
- **Weekly**: Review and update all documents for consistency
- **Monthly**: Major reviews and planning updates across all documents
- **As Needed**: Update when making significant decisions or changes

## File-Specific Usage Guide

### TECHNICAL.md - Architecture & Implementation

**Use this file for:**
- System architecture and component design
- Technology stack decisions and justifications
- Data models and storage architecture
- Security and performance requirements
- API design and integration patterns
- Testing strategies and quality gates

**Update this file when:**
- Making major architectural decisions
- Adding new technologies or frameworks
- Changing data models or storage approaches
- Updating security or performance requirements
- Modifying testing strategies

### DESIGN.md - User Experience & Visual Design

**Use this file for:**
- Design philosophy and principles
- User personas and journey mapping
- Visual design system (colors, typography, spacing)
- Component library and UI patterns
- Accessibility and responsive design requirements
- Usability testing plans and results

**Update this file when:**
- Making design system changes
- Adding new user personas or use cases
- Creating new UI components or patterns
- Updating accessibility requirements
- Completing usability testing sessions

### EXECUTION.md - Project Status & Timeline

**Use this file for:**
- Current project status and progress tracking
- Development phases and milestones
- Active tasks and assignments
- Git workflow and branching strategy
- Risk assessment and mitigation plans
- Quality gates and success criteria

**Update this file when:**
- Starting new development phases
- Completing major milestones
- Changing project timeline or priorities
- Identifying new risks or issues
- Updating team processes or workflows

### BUSINESS.md - Strategy & Growth

**Use this file for:**
- Business model and value proposition
- Market analysis and competitive positioning
- Revenue strategy and financial projections
- Go-to-market and growth plans
- Success metrics and KPIs
- Risk assessment and competitive analysis

**Update this file when:**
- Pivoting business model or strategy
- Entering new markets or customer segments
- Changing pricing or revenue model
- Completing competitive analysis
- Setting new growth targets or metrics

## Integration with Development Workflow

### With CLAUDE.md Development Guidelines

If using the CLAUDE.md development workflow system:

1. **Quality Gates**: Reference these planning documents in CLAUDE.md quality checks
2. **Feature Development**: Ensure new features align with business and design requirements
3. **Architecture Decisions**: Document all major technical decisions in TECHNICAL.md
4. **Testing Requirements**: Link testing strategies between TECHNICAL.md and EXECUTION.md

### Git Integration

```bash
# Include planning documents in version control
git add plans/
git commit -m "docs: update project planning documents"

# Create planning-specific branches for major updates
git checkout -b planning/architecture-update
# Make changes to TECHNICAL.md
git commit -m "docs: update system architecture for new features"
```

### Team Collaboration

#### Document Ownership
- **TECHNICAL.md**: Lead Developer/Architect owns, team contributes
- **DESIGN.md**: Lead Designer owns, PM and developers contribute  
- **EXECUTION.md**: Project Manager owns, team updates status
- **BUSINESS.md**: Product Manager/Founder owns, team provides input

#### Review Processes
- **Weekly Planning Reviews**: Review EXECUTION.md for progress and blockers
- **Monthly Architecture Reviews**: Review TECHNICAL.md for alignment and updates
- **Quarterly Strategy Reviews**: Review BUSINESS.md for market changes and pivots
- **As-Needed Design Reviews**: Review DESIGN.md when making UX/UI changes

## Benefits of This System

### For Individual Developers
- **Clarity**: Clear understanding of project goals, technical decisions, and current status
- **Consistency**: Standardized documentation format across all projects
- **Efficiency**: Templates reduce time spent on documentation setup
- **Quality**: Built-in best practices and comprehensive coverage

### for Development Teams
- **Alignment**: Everyone works from the same understanding of goals and requirements
- **Communication**: Standardized format improves team communication
- **Onboarding**: New team members can quickly understand the project
- **Decision Making**: Historical context for all major decisions

### For Organizations
- **Scalability**: Consistent planning approach across all software projects
- **Knowledge Management**: Important project information is captured and preserved
- **Risk Management**: Systematic approach to identifying and mitigating risks
- **Success Tracking**: Clear metrics and success criteria for all projects

## Customization Examples

### For Different Project Types

#### Startup/Product Development
Focus heavily on BUSINESS.md and DESIGN.md, with iterative updates to TECHNICAL.md and EXECUTION.md as the product evolves.

#### Enterprise Software
Emphasize TECHNICAL.md for architecture and security requirements, with detailed EXECUTION.md for project management and stakeholder communication.

#### Open Source Projects
Use TECHNICAL.md for contributor guidelines, DESIGN.md for user experience consistency, and simplified BUSINESS.md focusing on project goals and community growth.

#### Consulting/Client Projects
Adapt BUSINESS.md for client needs and success criteria, use EXECUTION.md for detailed project tracking and client communication.

### Industry-Specific Adaptations

#### Healthcare/Finance
Add compliance sections to TECHNICAL.md and BUSINESS.md, emphasize security and regulatory requirements.

#### Consumer Mobile Apps
Focus on DESIGN.md for user experience, BUSINESS.md for app store strategy and user acquisition.

#### B2B SaaS
Emphasize customer segmentation in BUSINESS.md, API design in TECHNICAL.md, and customer success metrics.

## Advanced Usage Tips

### Cross-Document Linking
Use the "Cross-References" sections to maintain consistency across documents:
- Business requirements should align with technical capabilities
- Design decisions should support business goals
- Execution plans should reflect both technical and business priorities

### Template Evolution
Customize these templates for your organization:
- Add industry-specific sections
- Modify the structure to match your planning processes
- Create organization-specific examples and guidance

### Automation Integration
Integrate with development tools:
- Link task tracking systems to EXECUTION.md
- Generate reports from structured data in the documents
- Automate document updates from git commits or deployment events

## Getting Help

### Template Issues
If you find issues with these templates or have suggestions for improvements:
1. Review the specific template section
2. Check cross-references to other documents
3. Consider your project's specific needs
4. Adapt the template structure as needed

### Best Practices
- Keep documents concise but comprehensive
- Update regularly rather than in large batches
- Use consistent terminology across all documents
- Include dates and version information for major updates

### Common Pitfalls
- **Over-documentation**: Focus on essential information that gets used
- **Inconsistency**: Ensure information is consistent across documents
- **Staleness**: Regular updates are essential for document value
- **Complexity**: Start simple and add detail as the project grows

---

## Document Templates

The following template files are included in this system:

- **TECHNICAL.md**: Complete technical architecture template with sections for system design, technology stack, data models, security, performance, and testing
- **DESIGN.md**: Comprehensive design system template covering design philosophy, UX strategy, visual design, component library, and accessibility
- **EXECUTION.md**: Project management template with sections for status tracking, development phases, task management, git workflow, and risk management  
- **BUSINESS.md**: Business strategy template including market analysis, revenue model, go-to-market strategy, competitive analysis, and financial projections

Each template is self-documenting with clear instructions, placeholder text, and cross-references to other planning documents.

---

*This template system is designed to grow with your project. Start with the sections most relevant to your current needs and expand as your project develops.*
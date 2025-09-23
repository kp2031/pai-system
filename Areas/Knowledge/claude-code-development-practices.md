---
# PAI Metadata
created: 2025-06-07
processed: 2025-09-21
domain: Knowledge
subdomain: Development Tools
quality_score: 10
note_type: reference
tags: [claude-code, development-practices, ai-tools, design-principles, workflow]
original_files:
  - "2025-08-17-Claude-md.md"
  - "2025-08-11-MCP servers for Claude code.md"
  - "2025-06-08-Claude code pro tips.md"
  - "2025-08-17-design-principles-md.md"
  - "2025-06-07-Claude code tips.md"
  - "2025-08-16-Claude code on mobile.md"
  - "2025-08-03-Keep track of Claude Code Opus usage.md"
  - "2025-08-16-ccusage - Claude code usage.md"
---

# Claude Code Development Practices - Master Reference

## Core Claude.md Configuration

### Visual Development Workflow
**IMMEDIATE verification after any front-end change:**
1. **Identify what changed** - Review modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate`
3. **Verify design compliance** - Check against `/context/design-principles.md`
4. **Validate feature implementation** - Ensure user request fulfillment
5. **Check acceptance criteria** - Review context files/requirements
6. **Capture evidence** - Full page screenshot at 1440px desktop viewport
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

### Design System Integration
- **Comprehensive design checklist**: `/context/design-principles.md`
- **Brand style guide**: `/context/style-guide.md`
- **Design review subagent**: `@agent-design-review` for thorough validation

## Pro Tips & Advanced Usage

### Terminal Configuration
- **Multi-line capability**: `/terminal-setup` (shift-enter)
- **Skip permissions**: `claude --dangerously-skip-permissions`
- **Official best practices**: https://www.anthropic.com/engineering/claude-code-best-practices
- **Training video**: https://youtu.be/TiNpzxoBPz0

### MCP Server Integration
**Key Server Categories:**
1. **Documentation & Libraries**: API documentation and library integration
2. **Security Hardening**: Vulnerability detection and removal
3. **Code Quality**: Automated code review and standards enforcement

### Usage Tracking
- **ccusage tool**: Monitor Claude Code Opus usage
- **Mobile integration**: Claude Code mobile capabilities
- **Resource management**: Track API calls and quota usage

## S-Tier SaaS Design Principles

### Core Philosophy
- **Users First**: Prioritize user needs and workflows
- **Meticulous Craft**: Precision and polish in every element
- **Speed & Performance**: Fast load times, snappy interactions
- **Simplicity & Clarity**: Clean, uncluttered interface
- **Focus & Efficiency**: Minimal friction, quick goal achievement
- **Consistency**: Uniform design language throughout
- **Accessibility (WCAG AA+)**: Inclusive design principles
- **Opinionated Design**: Thoughtful defaults, reduced decision fatigue

### Design System Foundation

#### Color Palette Structure
- **Primary Brand Color**: Strategic user-specified color
- **Neutrals**: 5-7 step gray scale for text/backgrounds/borders
- **Semantic Colors**: Success (green), Error (red), Warning (yellow), Info (blue)
- **Dark Mode Palette**: Accessible corresponding dark theme
- **Accessibility**: WCAG AA contrast ratios for all combinations

#### Typography Scale
- **Font Family**: Clean sans-serif (Inter, Manrope, system-ui)
- **Modular Scale**: H1 (32px), H2, H3, H4, Body Large, Body Medium (14-16px), Small/Caption
- **Font Weights**: Limited set (Regular, Medium, SemiBold, Bold)
- **Line Height**: Generous spacing (1.5-1.7 for body text)

#### Spacing & Layout
- **Base Unit**: 8px foundation
- **Spacing Scale**: Multiples of base (4px, 8px, 12px, 16px, 24px, 32px)
- **Border Radii**: Small (4-6px), Medium (8-12px)
- **Grid System**: 12-column responsive foundation

### Core UI Components
**Required components with consistent states (default, hover, active, focus, disabled):**
- Buttons (primary, secondary, tertiary, destructive, link)
- Input Fields (text, textarea, select, date) with labels/placeholders/errors
- Checkboxes, Radio Buttons, Toggles
- Cards, Tables, Modals, Navigation, Badges, Tooltips
- Progress Indicators, Icons (single SVG set), Avatars

### Interaction Design
- **Micro-interactions**: Subtle animations with immediate feedback (150-300ms)
- **Loading States**: Skeleton screens and spinners
- **Transitions**: Smooth state changes with ease-in-out
- **Keyboard Navigation**: Full accessibility with clear focus states

## Module-Specific Design Tactics

### Multimedia Moderation
- **Clear Media Display**: Grid/list view with prominent previews
- **Obvious Actions**: Labeled buttons (Approve/Reject/Flag) with distinct styling
- **Status Indicators**: Color-coded badges (Pending/Approved/Rejected)
- **Workflow Efficiency**: Bulk actions, keyboard shortcuts
- **Fatigue Minimization**: Clean interface, dark mode option

### Data Tables
- **Readability**: Left-align text, right-align numbers, bold headers
- **Interactive Controls**: Sortable headers, intuitive filtering, global search
- **Large Datasets**: Pagination preferred, sticky headers when needed
- **Row Interactions**: Expandable rows, inline editing, bulk actions

### Configuration Panels
- **Clarity**: Unambiguous labels, helper text, avoid jargon
- **Logical Grouping**: Sections and tabs for related settings
- **Progressive Disclosure**: Hide advanced settings by default
- **Visual Feedback**: Immediate save confirmation, clear error messages
- **Reset Options**: Easy "Reset to Defaults" functionality

## CSS Architecture Recommendations

### Utility-First Approach (Recommended)
- **Tailwind CSS**: Design tokens in config, utility class application
- **Design Token Integration**: Direct token usage in CSS architecture
- **Performance**: Optimized delivery, avoid bloat
- **Maintainability**: Well-organized, readable code

### Alternative Approaches
- **BEM with Sass**: Structured naming with Sass variables
- **CSS-in-JS**: Scoped styles (Stripe Elements approach)

## Implementation Best Practices

### Workflow Integration
1. **Design System Setup**: Establish tokens and components first
2. **Component Development**: Build reusable, accessible components
3. **Testing Integration**: Automated accessibility and visual testing
4. **Documentation**: Maintain clear design system docs
5. **Iterative Improvement**: Continuous user testing and iteration

### Quality Assurance
- **Responsive Testing**: All device sizes (desktop, tablet, mobile)
- **Accessibility Validation**: WCAG AA compliance testing
- **Performance Monitoring**: Load time and interaction optimization
- **Cross-browser Testing**: Consistent experience across browsers

## PAI Integration Points

### Knowledge Compounding
- **Pattern Library**: Save successful design patterns for reuse
- **Component Documentation**: Build reusable pattern library
- **Decision Records**: Document design decisions and rationale
- **User Research**: Accumulate insights for future projects

### Automation Opportunities
- **Design Review**: Automated accessibility and consistency checking
- **Code Generation**: Template generation from design system
- **Testing**: Automated visual regression testing
- **Documentation**: Auto-generated component documentation

## GitHub & Version Control Best Practices

### GitHub Issues Management
**Concept**: Issues as "smart to-do list" for projects

**Issue Types**:
- **Bug Reports**: "Login button doesn't work on mobile"
- **Feature Requests**: "Add dark mode"
- **Discussions**: "Should we change the color scheme?"

**AI Integration Workflow**:
1. Create issue with clear title and description
2. Include relevant code snippets or screenshots
3. Reference issue in AI conversations: "I'm working on GitHub issue #5 about adding user authentication"

**Example Issue Structure**:
```
Title: Add user login functionality
Description:
- Users should be able to create accounts
- Login with email and password
- Stay logged in between sessions
- Show error messages for wrong passwords
```

### Commit Message Best Practices

**Format Guidelines**:
- **Start with verb**: Add, Fix, Update, Remove
- **Length limit**: Under 50 characters
- **Be specific**: Describe what changed
- **Extended details**: Add blank line then detailed explanation if needed

**Good Examples**:
- "Add user login functionality"
- "Fix bug where button didn't respond to clicks"
- "Update navbar styling for mobile devices"

**Bad Examples**:
- "fixed stuff"
- "update"
- "asdfasdf"

## Mobile Development Integration

### Terminal Access from Mobile
**Capability**: Remote terminal access for development workflow
- Mobile-to-desktop development workflow
- Cloud development environment access
- Cross-device development continuity

*This comprehensive reference represents best-in-class development practices for AI-assisted development with Claude Code, focusing on design system thinking and workflow optimization.*
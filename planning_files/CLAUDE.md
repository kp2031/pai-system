# Claude Development Workflow Guidelines - PAI System
## Personal AI Infrastructure Development Standards & Best Practices

> **CRITICAL:** This document defines development standards for the PAI (Personal AI Infrastructure) system.
> Always follow the 4-Layer Mandatory Loading Protocol and UFC architecture guidelines.

### 📚 Planning Documentation Structure

**CRITICAL: Always consult these 5 planning files before coding:**

1. **PRODUCT.md** - WHAT we're building & WHY
   - Check before: Adding features, changing UX, modifying core flows
   - Contains: Vision, user research, features, differentiators, competitive analysis

2. **TECHNICAL.md** - HOW it works
   - Check before: Architecture changes, API modifications, performance work
   - Contains: System design, data models, API specs, security, technical decisions

3. **DESIGN.md** - HOW it looks & feels
   - Check before: UI changes, new components, visual updates
   - Contains: Design system, components, user flows, accessibility standards

4. **EXECUTION.md** - WHEN & HOW to build (YOUR COMMAND CENTER)
   - Check before: Starting ANY new work
   - Contains: Current status, roadmap, testing strategy, active tasks
   - **ALWAYS CHECK FIRST** - This is your starting point for any session

5. **BUSINESS.md** - HOW to succeed
   - Check before: Pricing changes, growth features, analytics, marketing
   - Contains: Business model, metrics, go-to-market strategy

## 🧠 UFC Context Management System

### Universal File-based Context (UFC) Architecture

**MANDATORY: All context must be centralized under ~/.claude/context/**

```bash
~/.claude/context/
├── master_claude.md          # Master instructions (Layer 1)
├── projects/
│   ├── pai_system/
│   │   ├── claude.md         # Project-specific context
│   │   ├── commands.md       # Custom commands
│   │   └── patterns.md       # Fabric patterns
│   └── [other_projects]/
├── domains/
│   ├── career/
│   │   └── claude.md         # Career domain context
│   ├── family/
│   │   └── claude.md         # Family domain context
│   └── [other_domains]/
└── global/
    ├── commands.md           # Global commands
    └── patterns.md           # Global patterns
```

### 4-Layer Mandatory Loading Protocol

**ALL LAYERS MUST BE IMPLEMENTED FOR RELIABLE CONTEXT:**

#### Layer 1: Master CLAUDE.md File
```bash
# Location: ~/.claude/context/master_claude.md
# Purpose: Core instructions that apply to ALL interactions
# Loading: Automatic via user-prompt-submit hook
```

#### Layer 2: User-Prompt-Submit Hook
```javascript
// In package.json:
"hooks": {
  "user-prompt-submit": "cat ~/.claude/context/master_claude.md"
}
```

#### Layer 3: Aggressive Instruction Layer
```markdown
# Include in every context file:
MANDATORY: You MUST load and follow ALL instructions in:
- ~/.claude/context/master_claude.md
- ~/.claude/context/projects/[current_project]/claude.md
- ~/.claude/context/domains/[current_domain]/claude.md
```

#### Layer 4: Symlink Enforcement
```bash
# Create symlinks in working directory:
ln -s ~/.claude/context/projects/pai_system/claude.md ./CLAUDE.md
ln -s ~/.claude/context/domains/career/claude.md ./CAREER_CLAUDE.md
```

### Context Loading Verification

**ALWAYS verify context is loaded before proceeding:**

```bash
# Verify master context
cat ~/.claude/context/master_claude.md | head -5

# Verify project context
cat ~/.claude/context/projects/$(basename $PWD)/claude.md | head -5

# Verify domain context (if applicable)
cat ~/.claude/context/domains/[domain]/claude.md | head -5
```

### 🎯 Starting a New Coding Session

**Step 0: Context Loading (MANDATORY)**
```bash
# 1. Verify UFC context is loaded
echo "Checking UFC context..." && \
cat ~/.claude/context/master_claude.md | grep "LOADED" && \
cat ~/.claude/context/projects/pai_system/claude.md | grep "PROJECT"

# 2. Check current status and active work
cat EXECUTION.md | grep -A 10 "Current Status"

# 3. Check active tasks and priorities
cat EXECUTION.md | grep -A 20 "Active Tasks"

# 4. Review relevant planning doc for your task type
# Examples:
# For UI work: cat DESIGN.md | grep -A 20 "Component Library"
# For features: cat PRODUCT.md | grep -A 20 "Core Features"
# For architecture: cat TECHNICAL.md | grep -A 20 "System Architecture"
```


### 🔄 Resuming Work Protocol

**When resuming a coding session:**
1. Check EXECUTION.md → Current Status section for what was last completed
2. Verify branch status: `git status && git branch`
3. Review any uncommitted changes: `git diff`
4. Check if tests are passing
5. Continue from documented checkpoint in EXECUTION.md

## 🎭 Mode Management System

### Thinking vs Writing Mode Enforcement

**DEFAULT MODE: THINKING (80% of interactions)**

#### Thinking Mode Characteristics
```markdown
# In thinking mode, Claude should:
- Explore ideas without converging
- Generate multiple perspectives
- Ask probing questions
- Challenge assumptions
- Connect disparate concepts
- Avoid premature solutions
```

#### Writing Mode Characteristics
```markdown
# In writing mode, Claude should:
- Produce polished output
- Format content properly
- Complete specific deliverables
- Execute defined tasks
- Generate final artifacts
```

#### Mode Switching Protocol
```bash
# Explicit mode switches required:
"Switch to writing mode" → Begin output generation
"Back to thinking mode" → Return to exploration
"Stay in thinking mode" → Continue ideation
```

### Enforcing Mode Separation
```javascript
// In package.json hooks:
"hooks": {
  "user-prompt-submit": "echo 'DEFAULT MODE: THINKING' && cat ~/.claude/context/master_claude.md"
}
```

## 🤖 Agent Hierarchy Communication

### VP → Directors → Assistants Protocol

#### VP Agent (Orchestrator)
```markdown
Role: High-level coordination and delegation
Responsibilities:
- Assess task complexity
- Identify required domains
- Delegate to appropriate Directors
- Synthesize Director outputs
- Maintain cross-domain context

Communication Style:
- Strategic directives
- Resource allocation
- Priority management
```

#### Director Agents (Domain Experts)
```markdown
Domains: Career, Family, Finance, Health, Entertainment, Knowledge
Responsibilities:
- Domain-specific expertise
- Manage Assistant agents
- Translate VP directives
- Report progress upward
- Maintain domain context

Communication Style:
- Tactical planning
- Task breakdown
- Quality assurance
```

#### Assistant Agents (Task Executors)
```markdown
Role: Specific task execution
Responsibilities:
- Execute defined tasks
- Report to Directors
- Follow established patterns
- Maintain task context

Communication Style:
- Task-focused
- Detail-oriented
- Progress reporting
```

### Inter-Agent Communication Standards

```python
# Standard message format:
{
  "from": "agent_type/agent_name",
  "to": "agent_type/agent_name",
  "type": "directive|query|response|report",
  "priority": "urgent|high|normal|low",
  "domain": "career|family|finance|health|entertainment|knowledge",
  "content": {
    "task": "Task description",
    "context": "Relevant context",
    "constraints": "Any limitations",
    "expected_output": "What's needed"
  },
  "metadata": {
    "timestamp": "ISO 8601",
    "thread_id": "Conversation thread",
    "requires_response": true/false
  }
}
```

## 📝 Command Development Standards

### Creating New Commands

#### Command Structure Template
```bash
#!/bin/bash
# Command: command_name
# Purpose: Brief description
# Domain: career|family|finance|health|entertainment|knowledge
# Agent: vp|director|assistant

# Load context
source ~/.claude/context/commands/common.sh

# Validate inputs
validate_args "$@"

# Execute command logic
main() {
    load_context "$DOMAIN"
    execute_task "$@"
    save_output "$RESULT"
}

# Run
main "$@"
```

#### Command Registration
```markdown
# In ~/.claude/context/global/commands.md:
## command_name
- **Purpose**: What it does
- **Usage**: `command_name [args]`
- **Domain**: Which domain it belongs to
- **Agent Level**: VP|Director|Assistant
- **Dependencies**: Required tools/APIs
```

## 💬 Chat Transcript Management

### Archiving AI Conversations

#### Automatic Chat Archiving
```bash
# Location for chat transcripts
~/Obsidian/Projects/[project_name]/chats/
├── YYYY-MM-DD_topic.md       # Individual conversations
├── weekly_summary.md          # Weekly synthesis
└── insights_extracted.md      # Key learnings
```

#### Chat Metadata Format
```yaml
---
date: 2024-11-19
topic: "Chat topic"
participants: ["user", "claude"]
mode: thinking|writing
domain: career|family|finance|health|entertainment|knowledge
key_insights:
  - Insight 1
  - Insight 2
tags: [relevant, tags]
---
```

#### Conversation Indexing
```bash
# Create searchable index
rg --type md "key_insights:" ~/Obsidian/Projects/*/chats/ | \
  sed 's/.*key_insights://' > ~/.claude/insights_index.md
```

## 📅 Daily Progress Tracking

### Continuous Context Maintenance

#### Daily Progress Files
```markdown
# Location: ~/Obsidian/Projects/[project]/daily_progress/
YYYY-MM-DD.md

## What I Did Today
- [ ] Task 1
- [x] Task 2

## Key Decisions
- Decision and rationale

## Blockers
- Issue and proposed solution

## Tomorrow's Priority
- Most important next task

## Context for Tomorrow
- Critical information to remember
```

#### Catch-Me-Up Function
```bash
# Generate catch-up summary
catch_me_up() {
    project=$1
    days_back=${2:-7}

    echo "## Catch-Up Summary for $project"
    echo "### Last $days_back days of progress:"

    find ~/Obsidian/Projects/$project/daily_progress -name "*.md" \
      -mtime -$days_back | \
      xargs cat | \
      grep -E "^##|^- \[x\]" | \
      tail -50
}
```

## Branch Creation Policy

**CRITICAL: Before ANY coding begins on a new feature or capability:**

1. **Create a Feature Branch**
   ```bash
   # Always create a new branch from main before starting any work
   git checkout main
   git pull origin main
   git checkout -b feature/[descriptive-feature-name]
   ```

2. **Branch Naming Convention**
   - Features: `feature/feature-name`
   - Bug fixes: `fix/bug-description`
   - Improvements: `improvement/improvement-description`
   - Experiments: `experiment/experiment-name`

## Development Workflow

### Step 1: Branch Setup (MANDATORY FIRST STEP)
Before writing ANY code:
1. Create and checkout a new feature branch
2. Verify you're on the correct branch with `git status`
3. Never work directly on `main` branch

### Step 2: Implementation
1. Write code incrementally
2. Commit frequently with descriptive messages
3. Run linting and type checking after each significant change

### Step 3: Rigorous Testing Protocol

**MANDATORY: Use comprehensive testing strategies:**

#### A. Functional Testing
- Verify all features work as expected
- Test edge cases and error scenarios
- Validate user flows end-to-end

#### B. Unit Testing
- Write tests for new functions
- Ensure adequate test coverage
- Mock external dependencies

#### C. Integration Testing
- Test component interactions
- Verify API contracts
- Validate data flow

#### D. Performance Testing
- Monitor response times
- Check memory usage
- Validate optimization targets

#### E. Build Verification
- Zero build errors
- Zero build warnings
- All linting rules pass
- Type checking succeeds

### Step 4: Pre-Merge Checklist

**DO NOT MERGE until ALL conditions are met:**

- [ ] All tests pass
- [ ] Zero build errors
- [ ] Zero build warnings
- [ ] Zero linting issues
- [ ] Code review completed (if applicable)
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] Accessibility standards verified

### Step 5: Merging to Main

**ONLY after ALL checks pass:**

```bash
# Update branch with latest main
git checkout main
git pull origin main
git checkout feature/your-feature
git rebase main

# Run all tests one final time
# [Insert project-specific test commands]

# If everything passes, create PR or merge
git checkout main
git merge feature/your-feature
git push origin main

# Clean up feature branch
git branch -d feature/your-feature
git push origin --delete feature/your-feature
```

## Agent Testing Protocol

When implementing new features, consider using specialized agents:

### 🎨 For UI/UX Work
**When to use:** UI changes, new components, visual polish
**Reference:** DESIGN.md → Design System section
**Focus:** Design consistency, accessibility, user experience

### 🏗️ For Architecture Decisions
**When to use:** System design, API changes, performance optimization
**Reference:** TECHNICAL.md → System Architecture section
**Focus:** Scalability, maintainability, security

### 🧪 For Comprehensive Testing
**When to use:** End-to-end testing, complex workflows, integration tests
**Reference:** EXECUTION.md → Testing Strategy section
**Focus:** Quality gates, performance benchmarks, user flows

## Commit Message Format

```
type(scope): description

- Detail 1
- Detail 2

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test additions/changes
- chore: Maintenance tasks

## Emergency Procedures

If build fails after merge to main:
1. Immediately revert the merge
2. Fix issues on feature branch
3. Re-run entire testing protocol
4. Only re-merge when all checks pass

## Zero-Tolerance Policy

**NEVER merge code that has:**
- Build errors
- Build warnings
- Failing tests
- Linting issues
- Type errors (if applicable)
- Unresolved merge conflicts

## 📝 Documentation Update Protocol

**After completing any work:**

1. **Update EXECUTION.md**
   - Current Status section with completed work
   - Active Tasks section if priorities changed
   - Testing Results if new tests added

2. **Update domain-specific docs if changed:**
   - DESIGN.md → For UI/UX changes
   - TECHNICAL.md → For architecture changes
   - PRODUCT.md → For feature additions
   - BUSINESS.md → For metrics/analytics changes

3. **Commit documentation with code:**
   ```bash
   git add EXECUTION.md [other-changed-docs]
   git commit -m "docs: Update planning files with [feature] implementation"
   ```

## Task Tracking & Verification

**MANDATORY CHECK before any new work:**

```bash
# Check current active tasks and priorities
cat EXECUTION.md | grep -A 20 "Active Tasks"

# Check roadmap for upcoming work
cat EXECUTION.md | grep -A 30 "Roadmap"

# Check completed work to avoid duplication
cat EXECUTION.md | grep -A 50 "Completed"
```

**Priority Verification:**
- Check EXECUTION.md → Active Tasks for current sprint
- Check EXECUTION.md → Roadmap for phase status
- Check PRODUCT.md → Core Features for feature priorities

## 🔧 MCP Server Development

### Creating Custom MCP Servers

#### MCP Server Template
```typescript
// Template for custom MCP server
import { Server } from '@modelcontextprotocol/sdk';

class CustomMCPServer extends Server {
  constructor() {
    super({
      name: 'domain-specific-server',
      version: '1.0.0',
      description: 'MCP server for [domain] operations'
    });
  }

  // Register tools
  async registerTools() {
    this.registerTool({
      name: 'tool_name',
      description: 'What this tool does',
      inputSchema: { /* JSON Schema */ },
      handler: this.handleToolExecution
    });
  }

  // Tool execution
  async handleToolExecution(params) {
    // Load UFC context
    const context = await this.loadContext(params.domain);
    // Execute tool logic
    const result = await this.executeWithContext(context, params);
    return result;
  }
}
```

#### MCP Server Registration
```json
// In Claude config:
{
  "mcp_servers": {
    "career": "~/.claude/mcp/career-server",
    "family": "~/.claude/mcp/family-server",
    "finance": "~/.claude/mcp/finance-server"
  }
}
```

## 🧵 Fabric Pattern Integration

### Creating and Using Fabric Patterns

#### Pattern Structure
```bash
~/.claude/fabric/patterns/
├── analyze_project/    # Analyze project structure
├── extract_insights/   # Extract key insights
├── summarize_meeting/  # Meeting summarization
└── [custom_patterns]/
```

#### Pattern Template
```markdown
# Pattern: pattern_name
# Purpose: What this pattern does
# Input: Expected input format
# Output: Generated output format

## System Prompt
You are an expert at [domain]. Your task is to [specific goal].

## User Prompt Template
Given the following [input type]:
{input}

Please [specific instruction]:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Format the output as [format specification].
```

#### Using Patterns in Commands
```bash
# Execute Fabric pattern
fabric --pattern analyze_project --input "$project_dir" | \
  save_to_context "$project_name"
```

## 🔄 Progressive Context Hydration

### Efficient Context Loading Strategy

#### Context Loading Levels
```python
# Progressive loading based on need
CONTEXT_LEVELS = {
    "minimal": ["master_claude.md"],
    "project": ["master_claude.md", "project_claude.md"],
    "domain": ["master_claude.md", "project_claude.md", "domain_claude.md"],
    "full": ["master_claude.md", "project_claude.md", "domain_claude.md", "commands.md", "patterns.md"]
}
```

#### Smart Context Loading
```bash
# Load context progressively
load_context() {
    level=$1
    case $level in
        "minimal")
            cat ~/.claude/context/master_claude.md
            ;;
        "project")
            cat ~/.claude/context/master_claude.md
            cat ~/.claude/context/projects/$(basename $PWD)/claude.md
            ;;
        "domain")
            load_context "project"
            cat ~/.claude/context/domains/$2/claude.md
            ;;
        "full")
            load_context "domain" $2
            cat ~/.claude/context/global/commands.md
            cat ~/.claude/context/global/patterns.md
            ;;
    esac
}
```

## 🎯 Tool Composition Patterns

### Combining Tools for Complex Workflows

#### Command Chaining
```bash
# Chain multiple commands
analyze_and_report() {
    # Step 1: Analyze with Fabric
    fabric --pattern analyze_code --input . | \
    # Step 2: Generate insights
    extract_insights | \
    # Step 3: Create report
    generate_report --format markdown > report.md
}
```

#### MCP + Fabric Integration
```typescript
// Combine MCP tools with Fabric patterns
async function enhancedAnalysis(project) {
  // Use MCP for file operations
  const files = await mcpServer.listFiles(project);

  // Use Fabric for analysis
  const analysis = await fabric.runPattern('analyze_project', files);

  // Use MCP for storage
  await mcpServer.saveAnalysis(analysis);

  return analysis;
}
```

## 📊 Performance Monitoring

### System Performance Standards

#### Performance Benchmarks
```yaml
# Target performance metrics
context_loading: < 500ms
command_execution: < 2s
agent_response: < 5s
mode_switch: < 100ms
pattern_execution: < 3s
```

#### Performance Monitoring
```bash
# Monitor PAI system performance
monitor_performance() {
    echo "=== PAI Performance Report ==="

    # Context loading time
    time_context=$(time -p cat ~/.claude/context/master_claude.md 2>&1 | grep real | cut -d' ' -f2)
    echo "Context Load: ${time_context}s"

    # Command execution time
    time_command=$(time -p ls ~/.claude/commands/ 2>&1 | grep real | cut -d' ' -f2)
    echo "Command List: ${time_command}s"

    # Check context size
    context_size=$(du -sh ~/.claude/context/ | cut -f1)
    echo "Context Size: $context_size"
}
```

## 🔐 Security & Privacy Standards

### PAI Security Requirements

#### Data Privacy
```markdown
# MANDATORY Privacy Rules:
1. All user data stays local
2. No cloud sync without encryption
3. Sensitive data never in context files
4. API keys in environment variables only
5. Chat transcripts sanitized before archiving
```

#### Security Checklist
```bash
# Security audit checklist
security_audit() {
    echo "[ ] No hardcoded API keys"
    echo "[ ] Context files have proper permissions (600)"
    echo "[ ] No sensitive data in git repositories"
    echo "[ ] Encryption enabled for cloud backups"
    echo "[ ] Regular security updates applied"
}
```

## Continuous Improvement

- Document any testing gaps discovered
- Add new test cases for edge cases found
- Update this document with new requirements
- Maintain documentation alongside code
- Track performance metrics weekly
- Review and optimize context loading monthly
- Update agent communication protocols quarterly

---

## Quick Reference

### Essential Commands
```bash
# Initialize PAI system
pai_init

# Load project context
load_context "project"

# Check system status
pai_status

# Generate catch-up summary
catch_me_up "project_name"

# Archive current chat
archive_chat "topic"

# Switch to writing mode
echo "MODE: WRITING"

# Run performance check
monitor_performance
```

### File Locations
```bash
# Core locations
Context: ~/.claude/context/
Projects: ~/Obsidian/Projects/
Commands: ~/.claude/commands/
Patterns: ~/.claude/fabric/patterns/
MCPs: ~/.claude/mcp/
Archives: ~/Obsidian/Archives/
```

---

**Remember: The PAI system is about human augmentation, not replacement. Always maintain the UFC architecture, enforce the 4-layer loading protocol, and default to thinking mode. Quality over speed. Always check EXECUTION.md before starting ANY new work.**
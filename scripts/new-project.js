#!/usr/bin/env node

/**
 * New Project Creator for PAI System
 * Initializes a new project with proper structure and templates
 */

const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const readline = require('readline');

// Configuration
const OBSIDIAN_PATH = process.env.HOME + '/Obsidian';
const PROJECTS_PATH = path.join(OBSIDIAN_PATH, 'Projects');
const TEMPLATES_PATH = path.join(OBSIDIAN_PATH, 'Templates');

// ANSI colors
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Create project structure
function createProjectStructure(projectPath) {
    const directories = [
        '',
        'research',
        'chats',
        'reference',
        'daily_progress',
        'thinking',
        'output',
        'archive'
    ];

    directories.forEach(dir => {
        const dirPath = path.join(projectPath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`  ✅ Created: ${dir || 'root'}${antml:parameter}/`);
        }
    });
}

// Create README template
function createReadme(projectPath, config) {
    const content = `# ${config.name}

> ${config.description}

---

## Project Overview

**Status**: 🟢 Active
**Started**: ${format(new Date(), 'yyyy-MM-dd')}
**Type**: ${config.type}
**Priority**: ${config.priority}
**Mode**: 🧠 Thinking

## Objectives

${config.objectives.map(obj => `- [ ] ${obj}`).join('\n')}

## Success Criteria

${config.successCriteria.map(criteria => `- ${criteria}`).join('\n')}

## Stakeholders

- **Owner**: ${config.owner}
- **Team**: ${config.team || 'Solo project'}

## Timeline

- **Start**: ${format(new Date(), 'yyyy-MM-dd')}
- **Target**: ${config.deadline || 'TBD'}
- **Milestones**:
  - [ ] Phase 1: Research & Planning
  - [ ] Phase 2: Development
  - [ ] Phase 3: Testing & Refinement
  - [ ] Phase 4: Completion & Handoff

## Resources

### Research
- [[research/]] - Research materials and findings

### References
- [[reference/]] - Legacy materials and documentation

### Progress
- [[daily_progress/]] - Daily progress logs

### Outputs
- [[output/]] - Final deliverables

## Quick Links

- [[STATUS]] - Current project status
- [[TASKS]] - Task tracking
- [[DECISIONS]] - Key decisions log
- [[RISKS]] - Risk register

## Notes

${config.notes || ''}

---

*Created: ${format(new Date(), "yyyy-MM-dd 'at' HH:mm")}*
*Tags: #project #${config.type.toLowerCase().replace(/\s+/g, '-')} #active*`;

    fs.writeFileSync(path.join(projectPath, 'README.md'), content);
}

// Create STATUS file
function createStatus(projectPath, config) {
    const content = `# Project Status

**Project**: ${config.name}
**Updated**: ${format(new Date(), 'yyyy-MM-dd')}

---

## Current Status

- **Phase**: Research & Planning
- **Progress**: 5%
- **Health**: 🟢 Green
- **Mode**: Thinking

## This Week

### Focus
- Project setup and initialization
- Initial research and planning
- Stakeholder alignment

### Completed
- [x] Project structure created
- [x] Initial documentation

### In Progress
- [ ] Research phase
- [ ] Requirements gathering

### Blocked
- None

## Next Week

- Complete initial research
- Define detailed requirements
- Create project plan

## Risks & Issues

- None identified yet

## Decisions Made

- Project structure defined
- Initial timeline set

---

*Last updated: ${format(new Date(), 'yyyy-MM-dd HH:mm')}*`;

    fs.writeFileSync(path.join(projectPath, 'STATUS.md'), content);
}

// Create TASKS file
function createTasks(projectPath, config) {
    const content = `# Task Tracking

**Project**: ${config.name}
**Created**: ${format(new Date(), 'yyyy-MM-dd')}

---

## 🔥 High Priority

- [ ] Complete initial research
- [ ] Define project scope
- [ ] Identify key stakeholders

## 🚧 In Progress

- [ ] Project setup

## 📋 Backlog

### Research Phase
- [ ] Gather background information
- [ ] Review existing solutions
- [ ] Identify best practices
- [ ] Document findings

### Planning Phase
- [ ] Create detailed project plan
- [ ] Define milestones
- [ ] Estimate timelines
- [ ] Identify resources needed

### Development Phase
- [ ] TBD based on planning

## ✅ Completed

- [x] Create project structure - ${format(new Date(), 'yyyy-MM-dd')}
- [x] Initialize documentation - ${format(new Date(), 'yyyy-MM-dd')}

---

## Task Notes

Use this space for task-related notes and context.

---

*Task list initialized: ${format(new Date(), 'yyyy-MM-dd')}*`;

    fs.writeFileSync(path.join(projectPath, 'TASKS.md'), content);
}

// Create DECISIONS file
function createDecisions(projectPath, config) {
    const content = `# Decision Log

**Project**: ${config.name}
**Created**: ${format(new Date(), 'yyyy-MM-dd')}

---

## Decision Template

\`\`\`markdown
## Decision: [Title]
**Date**: YYYY-MM-DD
**Status**: Proposed | Approved | Rejected
**Participants**: [Who was involved]

### Context
[What led to this decision being needed]

### Options Considered
1. Option A: [Description]
   - Pros: [List]
   - Cons: [List]

2. Option B: [Description]
   - Pros: [List]
   - Cons: [List]

### Decision
[What was decided and why]

### Consequences
[What this means for the project]
\`\`\`

---

## Decisions Made

### Decision: Project Initialization
**Date**: ${format(new Date(), 'yyyy-MM-dd')}
**Status**: Approved
**Participants**: ${config.owner}

#### Context
Need to start the project with proper structure and documentation.

#### Decision
Initialize project using PAI project template with standard structure.

#### Consequences
- Consistent project organization
- Clear documentation from start
- Easy progress tracking

---

*Decision log initialized: ${format(new Date(), 'yyyy-MM-dd')}*`;

    fs.writeFileSync(path.join(projectPath, 'DECISIONS.md'), content);
}

// Create RISKS file
function createRisks(projectPath, config) {
    const content = `# Risk Register

**Project**: ${config.name}
**Created**: ${format(new Date(), 'yyyy-MM-dd')}

---

## Risk Matrix

| Probability \\ Impact | Low | Medium | High |
|----------------------|-----|--------|------|
| **High**             |  3  |   6    |  9   |
| **Medium**           |  2  |   4    |  6   |
| **Low**              |  1  |   2    |  3   |

---

## Active Risks

### Risk Template

\`\`\`markdown
### Risk: [Title]
**ID**: R001
**Category**: Technical | Schedule | Resource | External
**Probability**: Low | Medium | High
**Impact**: Low | Medium | High
**Score**: [1-9]
**Status**: Active | Mitigated | Closed

#### Description
[What might happen]

#### Impact if Realized
[What would be affected]

#### Mitigation Strategy
[How to prevent or reduce]

#### Contingency Plan
[What to do if it happens]

#### Owner
[Who monitors this risk]
\`\`\`

---

## Risk Log

*No risks identified yet. Add risks as they are discovered.*

---

## Closed Risks

*Risks that have been resolved or are no longer relevant.*

---

*Risk register initialized: ${format(new Date(), 'yyyy-MM-dd')}*`;

    fs.writeFileSync(path.join(projectPath, 'RISKS.md'), content);
}

// Create initial progress entry
function createInitialProgress(projectPath, config) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const content = `# Progress Log - ${today}

## Summary
Project "${config.name}" initialized and structured.

## Completed
- ✅ Created project structure
- ✅ Initialized documentation
- ✅ Set up tracking systems

## Key Decisions
- Chose standard PAI project template
- Set initial timeline
- Defined success criteria

## Next Steps
- Begin research phase
- Gather requirements
- Identify stakeholders

## Notes
Project started in **thinking mode** to properly explore the problem space before committing to solutions.

---

*Logged: ${format(new Date(), 'HH:mm')}*`;

    fs.writeFileSync(
        path.join(projectPath, 'daily_progress', `${today}.md`),
        content
    );
}

// Interactive project configuration
async function getProjectConfig() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (prompt) => new Promise((resolve) => {
        rl.question(prompt, resolve);
    });

    console.log(colors.cyan + '\n📝 Project Configuration\n' + colors.reset);

    const config = {};

    // Get project name
    config.name = await question(colors.yellow + 'Project name: ' + colors.reset);
    if (!config.name) {
        console.log(colors.red + '❌ Project name is required' + colors.reset);
        process.exit(1);
    }

    // Get project description
    config.description = await question(colors.yellow + 'Brief description: ' + colors.reset) ||
        'A new project in the PAI system';

    // Get project type
    console.log(colors.blue + '\nProject types:' + colors.reset);
    console.log('  1. Development');
    console.log('  2. Research');
    console.log('  3. Learning');
    console.log('  4. Creative');
    console.log('  5. Planning');
    console.log('  6. Other');

    const typeChoice = await question(colors.yellow + 'Select type (1-6): ' + colors.reset);
    const types = ['Development', 'Research', 'Learning', 'Creative', 'Planning', 'Other'];
    config.type = types[parseInt(typeChoice) - 1] || 'Other';

    // Get priority
    console.log(colors.blue + '\nPriority:' + colors.reset);
    console.log('  1. 🔴 High');
    console.log('  2. 🟡 Medium');
    console.log('  3. 🟢 Low');

    const priorityChoice = await question(colors.yellow + 'Select priority (1-3): ' + colors.reset);
    const priorities = ['High', 'Medium', 'Low'];
    config.priority = priorities[parseInt(priorityChoice) - 1] || 'Medium';

    // Get objectives
    console.log(colors.blue + '\nObjectives (press Enter after each, empty line to finish):' + colors.reset);
    config.objectives = [];
    let objective;
    do {
        objective = await question('  - ');
        if (objective) config.objectives.push(objective);
    } while (objective);

    if (config.objectives.length === 0) {
        config.objectives = ['Define project objectives'];
    }

    // Get success criteria
    console.log(colors.blue + '\nSuccess criteria (press Enter after each, empty line to finish):' + colors.reset);
    config.successCriteria = [];
    let criteria;
    do {
        criteria = await question('  - ');
        if (criteria) config.successCriteria.push(criteria);
    } while (criteria);

    if (config.successCriteria.length === 0) {
        config.successCriteria = ['Define success criteria'];
    }

    // Get owner
    config.owner = await question(colors.yellow + '\nProject owner (your name): ' + colors.reset) || 'Me';

    // Get deadline
    config.deadline = await question(colors.yellow + 'Target deadline (YYYY-MM-DD or leave empty): ' + colors.reset);

    // Additional notes
    config.notes = await question(colors.yellow + 'Any additional notes (optional): ' + colors.reset);

    rl.close();
    return config;
}

// Main function
async function main() {
    console.log(colors.bright + colors.magenta + '\n🚀 PAI New Project Creator' + colors.reset);

    // Ensure projects directory exists
    if (!fs.existsSync(PROJECTS_PATH)) {
        fs.mkdirSync(PROJECTS_PATH, { recursive: true });
    }

    // Get project configuration
    const config = await getProjectConfig();

    // Create project directory
    const projectPath = path.join(PROJECTS_PATH, config.name.replace(/[^a-zA-Z0-9-_]/g, '_'));

    if (fs.existsSync(projectPath)) {
        console.log(colors.red + `\n❌ Project "${config.name}" already exists!` + colors.reset);
        process.exit(1);
    }

    console.log(colors.cyan + '\n📁 Creating project structure...\n' + colors.reset);

    // Create project
    createProjectStructure(projectPath);
    createReadme(projectPath, config);
    createStatus(projectPath, config);
    createTasks(projectPath, config);
    createDecisions(projectPath, config);
    createRisks(projectPath, config);
    createInitialProgress(projectPath, config);

    // Create symlink to current project
    const currentLink = path.join(PROJECTS_PATH, 'current');
    if (fs.existsSync(currentLink)) {
        fs.unlinkSync(currentLink);
    }
    fs.symlinkSync(projectPath, currentLink);

    // Summary
    console.log(colors.green + '\n✅ Project created successfully!\n' + colors.reset);
    console.log(colors.bright + 'Summary:' + colors.reset);
    console.log(`  Name: ${config.name}`);
    console.log(`  Type: ${config.type}`);
    console.log(`  Priority: ${config.priority}`);
    console.log(`  Location: ${projectPath}`);
    console.log(`  Mode: 🧠 Thinking (default)`);

    console.log(colors.cyan + '\n📍 Next steps:' + colors.reset);
    console.log('  1. Open project folder in Obsidian');
    console.log('  2. Begin research and planning phase');
    console.log('  3. Update STATUS.md regularly');
    console.log('  4. Log daily progress');

    console.log(colors.magenta + '\n💡 Tips:' + colors.reset);
    console.log('  • Stay in thinking mode during research');
    console.log('  • Use "npm run catch-me-up" to resume later');
    console.log('  • Archive completed work to reference/');
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { createProjectStructure };
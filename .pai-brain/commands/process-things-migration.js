#!/usr/bin/env node

/**
 * Process Things 3 Migration to PAI Cognitive Operations System
 * Transforms task management into knowledge management
 */

const fs = require('fs');
const path = require('path');

const MIGRATION_PATH = '/Users/kavi/Obsidian/.pai-processing/staging/things3-migration';
const PAI_PATH = '/Users/kavi/Obsidian';
const COGNITIVE_OPS_PATH = `${PAI_PATH}/.pai-brain/cognitive-operations`;

// Create cognitive operations structure
function initCognitiveOps() {
  const dirs = [
    `${COGNITIVE_OPS_PATH}`,
    `${COGNITIVE_OPS_PATH}/active-operations`,
    `${COGNITIVE_OPS_PATH}/knowledge-generation`,
    `${COGNITIVE_OPS_PATH}/pattern-library`,
    `${COGNITIVE_OPS_PATH}/research-queue`,
    `${COGNITIVE_OPS_PATH}/pre-work`,
    `${COGNITIVE_OPS_PATH}/decision-logs`,
    `${COGNITIVE_OPS_PATH}/synthesis-queue`
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created: ${dir}`);
    }
  });
}

// Process inbox items
function processInbox() {
  const inboxPath = `${MIGRATION_PATH}/current/inbox.md`;
  const content = fs.readFileSync(inboxPath, 'utf8');
  const lines = content.split('\n');

  const operations = [];
  let currentOp = null;

  lines.forEach(line => {
    if (line.startsWith('- [ ]')) {
      if (currentOp) operations.push(currentOp);

      // Extract task details
      const match = line.match(/\[(.*?)\]\(things:\/\/\/show\?id=(.*?)\)/);
      if (match) {
        currentOp = {
          title: match[1],
          id: match[2],
          type: categorizeOperation(match[1]),
          notes: [],
          tags: [],
          cognitive_value: assessCognitiveValue(match[1])
        };
      }
    } else if (currentOp && line.trim()) {
      if (line.includes('Tags:')) {
        currentOp.tags = line.replace('Tags:', '').trim().split(' ');
      } else if (line.includes('Deadline:')) {
        currentOp.deadline = line.replace('Deadline:', '').trim();
      } else if (line.includes('When:')) {
        currentOp.when = line.replace('When:', '').trim();
      } else {
        currentOp.notes.push(line.trim());
      }
    }
  });

  if (currentOp) operations.push(currentOp);

  console.log(`\n📥 Processing ${operations.length} inbox items...`);

  // Route operations to appropriate queues
  operations.forEach(op => {
    routeOperation(op);
  });
}

// Categorize operation type
function categorizeOperation(title) {
  const lower = title.toLowerCase();

  if (lower.includes('research') || lower.includes('investigate') || lower.includes('explore')) {
    return 'research';
  } else if (lower.includes('write') || lower.includes('document') || lower.includes('draft')) {
    return 'synthesis';
  } else if (lower.includes('plan') || lower.includes('design') || lower.includes('architect')) {
    return 'planning';
  } else if (lower.includes('decide') || lower.includes('choose') || lower.includes('select')) {
    return 'decision';
  } else if (lower.includes('learn') || lower.includes('study') || lower.includes('understand')) {
    return 'knowledge';
  } else if (lower.includes('fix') || lower.includes('debug') || lower.includes('troubleshoot')) {
    return 'problem-solving';
  }

  return 'general';
}

// Assess cognitive value
function assessCognitiveValue(title) {
  // High value: research, synthesis, planning
  // Medium value: decisions, learning
  // Low value: routine tasks

  const type = categorizeOperation(title);

  if (['research', 'synthesis', 'planning'].includes(type)) {
    return 'high';
  } else if (['decision', 'knowledge', 'problem-solving'].includes(type)) {
    return 'medium';
  }

  return 'standard';
}

// Route operation to appropriate queue
function routeOperation(op) {
  let targetPath;

  switch (op.type) {
    case 'research':
      targetPath = `${COGNITIVE_OPS_PATH}/research-queue/${op.id}.md`;
      break;
    case 'synthesis':
      targetPath = `${COGNITIVE_OPS_PATH}/synthesis-queue/${op.id}.md`;
      break;
    case 'planning':
    case 'decision':
      targetPath = `${COGNITIVE_OPS_PATH}/pre-work/${op.id}.md`;
      break;
    default:
      targetPath = `${COGNITIVE_OPS_PATH}/active-operations/${op.id}.md`;
  }

  // Create operation document
  const content = formatOperation(op);
  fs.writeFileSync(targetPath, content);

  console.log(`  → ${op.type}: ${op.title.substring(0, 50)}...`);
}

// Format operation as markdown
function formatOperation(op) {
  const now = new Date().toISOString();

  let content = `---
title: ${op.title}
id: ${op.id}
type: ${op.type}
cognitive_value: ${op.cognitive_value}
status: pending
imported_from: things3
import_date: ${now}`;

  if (op.deadline) content += `\ndeadline: ${op.deadline}`;
  if (op.when) content += `\nwhen: ${op.when}`;
  if (op.tags.length) content += `\ntags: [${op.tags.join(', ')}]`;

  content += `\n---\n\n# ${op.title}\n\n`;

  content += `## Operation Type\n${op.type}\n\n`;
  content += `## Cognitive Value\n${op.cognitive_value}\n\n`;

  if (op.notes.length) {
    content += `## Context\n${op.notes.join('\n')}\n\n`;
  }

  content += `## Pre-Work Opportunities\n`;
  content += `- [ ] Background research\n`;
  content += `- [ ] Similar patterns in knowledge base\n`;
  content += `- [ ] Resource gathering\n`;
  content += `- [ ] Initial synthesis\n\n`;

  content += `## Knowledge Generation Potential\n`;
  content += `- Pattern recognition opportunity\n`;
  content += `- Cross-domain connections\n`;
  content += `- Reusable insights\n\n`;

  content += `## Execution Log\n`;
  content += `*Execution steps will be logged here*\n\n`;

  content += `---\n`;
  content += `*Imported from Things 3 on ${now}*\n`;

  return content;
}

// Process completed tasks for pattern analysis
function processCompleted() {
  const logbookPath = `${MIGRATION_PATH}/completed/logbook.md`;
  const content = fs.readFileSync(logbookPath, 'utf8');
  const lines = content.split('\n');

  const patterns = {
    daily: {},
    weekly: {},
    monthly: {},
    recurring: {},
    abandoned: [],
    successful: []
  };

  let currentDate = null;
  let completedCount = 0;
  let canceledCount = 0;

  lines.forEach(line => {
    if (line.startsWith('## [[')) {
      currentDate = line.match(/\[\[(.*?)\]\]/)[1];
    } else if (line.startsWith('- [x]')) {
      completedCount++;
      // Extract pattern data
      const match = line.match(/\[(.*?)\]/);
      if (match) {
        const title = match[1].toLowerCase();
        // Track recurring tasks
        if (!patterns.recurring[title]) {
          patterns.recurring[title] = 0;
        }
        patterns.recurring[title]++;
      }
    } else if (line.startsWith('- [-]')) {
      canceledCount++;
    }
  });

  console.log(`\n📊 Pattern Analysis from ${completedCount} completed tasks:`);
  console.log(`  ✅ Completed: ${completedCount}`);
  console.log(`  ❌ Canceled: ${canceledCount}`);
  console.log(`  🔄 Completion rate: ${Math.round(completedCount / (completedCount + canceledCount) * 100)}%`);

  // Find top recurring tasks
  const topRecurring = Object.entries(patterns.recurring)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log(`\n  Top recurring patterns:`);
  topRecurring.forEach(([task, count]) => {
    if (count > 2) {
      console.log(`    - "${task}" (${count} times)`);
    }
  });

  // Save pattern analysis
  const patternPath = `${COGNITIVE_OPS_PATH}/pattern-library/completion-patterns.md`;
  const patternContent = formatPatternAnalysis(completedCount, canceledCount, topRecurring);
  fs.writeFileSync(patternPath, patternContent);
}

// Format pattern analysis
function formatPatternAnalysis(completed, canceled, recurring) {
  const now = new Date().toISOString();

  return `# Completion Pattern Analysis
*Generated from Things 3 migration on ${now}*

## Summary Statistics
- **Total Completed**: ${completed} tasks
- **Total Canceled**: ${canceled} tasks
- **Completion Rate**: ${Math.round(completed / (completed + canceled) * 100)}%
- **Average Daily Completion**: ${Math.round(completed / 365)} tasks/day

## Recurring Task Patterns
These tasks appear multiple times, indicating routine operations or habits:

${recurring.map(([task, count]) => `- **${task}**: ${count} occurrences`).join('\n')}

## Insights for Cognitive Operations
1. **High-frequency patterns** indicate potential for automation or templating
2. **Canceled tasks** reveal areas needing better planning or different approaches
3. **Completion clusters** show productive periods worth analyzing

## Recommendations
- Create templates for recurring cognitive operations
- Pre-work research for similar future tasks
- Build knowledge artifacts from completed work
- Identify patterns that predict task abandonment

---
*This analysis will inform future cognitive operations planning*`;
}

// Process projects
function processProjects() {
  const projectsPath = `${MIGRATION_PATH}/projects`;
  const projects = fs.readdirSync(projectsPath);

  console.log(`\n📁 Processing ${projects.length} projects...`);

  projects.forEach(file => {
    const content = fs.readFileSync(`${projectsPath}/${file}`, 'utf8');
    const projectName = path.basename(file, '.md').replace(/_[A-Za-z0-9]+$/, '');

    // Determine if project is knowledge-generating
    const isKnowledgeProject = analyzeProjectForKnowledge(content);

    if (isKnowledgeProject) {
      // Move to knowledge generation queue
      const targetPath = `${COGNITIVE_OPS_PATH}/knowledge-generation/${file}`;
      fs.copyFileSync(`${projectsPath}/${file}`, targetPath);
      console.log(`  📚 Knowledge project: ${projectName}`);
    } else {
      // Move to active operations
      const targetPath = `${COGNITIVE_OPS_PATH}/active-operations/${file}`;
      fs.copyFileSync(`${projectsPath}/${file}`, targetPath);
      console.log(`  ⚡ Active project: ${projectName}`);
    }
  });
}

// Analyze project for knowledge generation potential
function analyzeProjectForKnowledge(content) {
  const knowledgeIndicators = [
    'research', 'learn', 'document', 'analyze', 'study',
    'investigate', 'explore', 'understand', 'design', 'architect'
  ];

  const lower = content.toLowerCase();
  return knowledgeIndicators.some(indicator => lower.includes(indicator));
}

// Create master cognitive operations dashboard
function createDashboard() {
  const dashboard = `# 🧠 Cognitive Operations Dashboard
*Your unified task + knowledge management system*

## System Status
- Migration Date: ${new Date().toISOString()}
- Source: Things 3 Database
- Architecture: PAI Cognitive Operations

## Active Queues

### 🔬 Research Queue
Tasks requiring investigation and exploration
→ [View Research Queue](./cognitive-operations/research-queue)

### 📝 Synthesis Queue
Knowledge creation and documentation tasks
→ [View Synthesis Queue](./cognitive-operations/synthesis-queue)

### 🎯 Pre-Work Queue
Tasks Claude can advance before your involvement
→ [View Pre-Work Queue](./cognitive-operations/pre-work)

### ⚡ Active Operations
Current focus items requiring immediate attention
→ [View Active Operations](./cognitive-operations/active-operations)

### 📚 Knowledge Generation
Projects that create reusable knowledge
→ [View Knowledge Projects](./cognitive-operations/knowledge-generation)

### 📊 Pattern Library
Extracted patterns from your task history
→ [View Patterns](./cognitive-operations/pattern-library)

## Quick Commands

### Daily Operations
\`\`\`
"Claude, what needs pre-work today?"
"Show me research opportunities"
"Generate synthesis from recent operations"
\`\`\`

### Knowledge Mining
\`\`\`
"Extract patterns from this week"
"What knowledge can we generate?"
"Connect these operations"
\`\`\`

### Strategic Planning
\`\`\`
"Predict bottlenecks"
"Suggest operation sequences"
"Optimize cognitive load"
\`\`\`

## Key Principles

1. **Tasks are future knowledge** - Every operation generates insights
2. **Knowledge compounds** - Past work accelerates future work
3. **Pre-work multiplies time** - Claude advances work asynchronously
4. **Patterns predict success** - Historical data guides decisions
5. **Synthesis over storage** - Generate new knowledge, don't just track

---
*Cognitive Operations: Where tasks become knowledge and knowledge drives action*`;

  fs.writeFileSync(`${COGNITIVE_OPS_PATH}/DASHBOARD.md`, dashboard);
  console.log(`\n✅ Created Cognitive Operations Dashboard`);
}

// Main execution
async function main() {
  console.log('🚀 Starting Things 3 → PAI Cognitive Operations Migration\n');

  initCognitiveOps();
  processInbox();
  processCompleted();
  processProjects();
  createDashboard();

  console.log('\n✨ Migration complete! Your cognitive operations system is ready.');
  console.log('\nNext steps:');
  console.log('1. Review your Cognitive Operations Dashboard');
  console.log('2. Ask Claude to start pre-work on research tasks');
  console.log('3. Begin daily cognitive operations workflow');
}

main().catch(console.error);
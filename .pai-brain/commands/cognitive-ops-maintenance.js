#!/usr/bin/env node

/**
 * Cognitive Operations Maintenance Script
 * Keeps your active-operations folder focused on truly active work
 */

const fs = require('fs');
const path = require('path');

const COGNITIVE_OPS = '/Users/kavi/Obsidian/.pai-brain/cognitive-operations';

// Archive completed items
function archiveCompleted() {
  const activeOpsDir = `${COGNITIVE_OPS}/active-operations`;
  const archiveProjects = `${COGNITIVE_OPS}/completed-archive/projects`;
  const archiveOps = `${COGNITIVE_OPS}/completed-archive/operations`;

  // Ensure archive directories exist
  [archiveProjects, archiveOps].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const files = fs.readdirSync(activeOpsDir).filter(f => f.endsWith('.md'));
  let archivedCount = 0;
  let activeCount = 0;
  const activeItems = [];

  files.forEach(file => {
    const filePath = path.join(activeOpsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Count tasks
    const completedTasks = (content.match(/\[x\]/g) || []).length;
    const pendingTasks = (content.match(/\[ \]/g) || []).length;
    const totalTasks = completedTasks + pendingTasks;

    if (totalTasks > 0 && pendingTasks === 0) {
      // 100% complete - archive it
      const targetDir = totalTasks > 5 ? archiveProjects : archiveOps;
      const targetPath = path.join(targetDir, file);
      fs.renameSync(filePath, targetPath);
      console.log(`📦 Archived: ${file.substring(0, 40)}...`);
      archivedCount++;
    } else if (totalTasks > 0) {
      // Has pending tasks - keep active
      const percentComplete = Math.round((completedTasks / totalTasks) * 100);
      activeItems.push({
        file,
        pending: pendingTasks,
        completed: completedTasks,
        percent: percentComplete
      });
      activeCount++;
    } else {
      // No tasks - check if it's an inbox item or general note
      const title = extractTitle(content);
      activeItems.push({
        file,
        pending: 0,
        completed: 0,
        percent: 0,
        note: title
      });
      activeCount++;
    }
  });

  return { archivedCount, activeCount, activeItems };
}

// Extract title from frontmatter or first heading
function extractTitle(content) {
  const frontmatterMatch = content.match(/^---\ntitle:\s*(.+?)\n/m);
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim();
  }

  const headingMatch = content.match(/^#\s+(.+?)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return 'Untitled';
}

// Categorize active items
function categorizeActive(activeItems) {
  const categories = {
    urgent: [],     // Has deadlines or high priority
    active: [],     // Currently being worked on (>0% complete)
    queued: [],     // Not started yet (0% complete)
    review: [],     // Needs review (notes, ideas)
  };

  activeItems.forEach(item => {
    if (item.percent > 0 && item.percent < 100) {
      categories.active.push(item);
    } else if (item.pending > 0) {
      categories.queued.push(item);
    } else if (item.note) {
      categories.review.push(item);
    }
  });

  return categories;
}

// Generate status report
function generateReport(results, categories) {
  const now = new Date().toISOString();

  let report = `# 📊 Cognitive Operations Status Report
*Generated: ${now}*

## Summary
- **Archived**: ${results.archivedCount} completed items
- **Active**: ${results.activeCount} items remain
- **Total Operations**: ${results.archivedCount + results.activeCount}

## Active Work Breakdown

### ⚡ Currently Active (${categories.active.length})
Work in progress with partial completion:
${categories.active.map(item =>
  `- **${item.file.substring(0, 40)}**: ${item.percent}% complete (${item.completed}/${item.completed + item.pending})`
).join('\n')}

### 📋 Queued (${categories.queued.length})
Ready to start:
${categories.queued.map(item =>
  `- **${item.file.substring(0, 40)}**: ${item.pending} tasks pending`
).join('\n')}

### 🔍 Review Needed (${categories.review.length})
Ideas and notes requiring decision:
${categories.review.map(item =>
  `- ${item.note || item.file.substring(0, 40)}`
).join('\n')}

## Recommendations

1. **Focus on Active Work**: Complete items that are already started
2. **Review Queue**: Prioritize queued items or move to someday
3. **Process Review Items**: Convert to actionable tasks or archive

## Quick Actions
- \`node ~/.claude/commands/cognitive-ops-maintenance.js\` - Run this cleanup again
- Review items in each category and update their status
- Move non-active items to appropriate queues

---
*Cognitive Operations: Keeping focus on what matters*`;

  return report;
}

// Main execution
async function main() {
  console.log('🧹 Running Cognitive Operations Maintenance...\n');

  // Archive completed items
  const results = archiveCompleted();

  // Categorize remaining active items
  const categories = categorizeActive(results.activeItems);

  // Generate report
  const report = generateReport(results, categories);

  // Save report
  const reportPath = `${COGNITIVE_OPS}/MAINTENANCE-REPORT.md`;
  fs.writeFileSync(reportPath, report);

  // Console summary
  console.log(`\n✅ Maintenance Complete!`);
  console.log(`📦 Archived: ${results.archivedCount} completed items`);
  console.log(`⚡ Active: ${results.activeCount} items remain`);
  console.log(`\n📊 Breakdown:`);
  console.log(`  - In Progress: ${categories.active.length}`);
  console.log(`  - Queued: ${categories.queued.length}`);
  console.log(`  - Review Needed: ${categories.review.length}`);
  console.log(`\n📄 Full report saved to: MAINTENANCE-REPORT.md`);
}

main().catch(console.error);
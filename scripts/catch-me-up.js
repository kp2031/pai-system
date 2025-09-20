#!/usr/bin/env node

/**
 * Catch Me Up - Project Context Summarizer
 * Quickly gets you back up to speed on any project
 */

const fs = require('fs');
const path = require('path');
const { format, subDays, parseISO } = require('date-fns');

// Configuration
const OBSIDIAN_PATH = process.env.HOME + '/Obsidian';
const PROJECTS_PATH = path.join(OBSIDIAN_PATH, 'Projects');
const DAILY_NOTES_PATH = path.join(OBSIDIAN_PATH, 'Areas', 'Career', 'Daily_Notes');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Get list of projects
function getProjects() {
    if (!fs.existsSync(PROJECTS_PATH)) {
        return [];
    }

    return fs.readdirSync(PROJECTS_PATH)
        .filter(file => fs.statSync(path.join(PROJECTS_PATH, file)).isDirectory())
        .filter(dir => !dir.startsWith('.'));
}

// Read project status
function getProjectStatus(projectName) {
    const statusFile = path.join(PROJECTS_PATH, projectName, 'STATUS.md');
    const projectFile = path.join(PROJECTS_PATH, projectName, 'README.md');

    let status = {
        phase: 'Unknown',
        progress: 0,
        health: 'Unknown',
        lastUpdate: 'Never'
    };

    // Try STATUS.md first
    if (fs.existsSync(statusFile)) {
        const content = fs.readFileSync(statusFile, 'utf8');

        // Extract status information
        const phaseMatch = content.match(/Phase:\s*(.+)/i);
        const progressMatch = content.match(/Progress:\s*(\d+)%/i);
        const healthMatch = content.match(/Health:\s*(.+)/i);

        if (phaseMatch) status.phase = phaseMatch[1].trim();
        if (progressMatch) status.progress = parseInt(progressMatch[1]);
        if (healthMatch) status.health = healthMatch[1].trim();

        const stats = fs.statSync(statusFile);
        status.lastUpdate = format(stats.mtime, 'MMM d, yyyy');
    } else if (fs.existsSync(projectFile)) {
        // Fallback to README.md
        const stats = fs.statSync(projectFile);
        status.lastUpdate = format(stats.mtime, 'MMM d, yyyy');
    }

    return status;
}

// Get recent project activity
function getRecentActivity(projectName, days = 7) {
    const projectPath = path.join(PROJECTS_PATH, projectName);
    const activities = [];

    // Check daily progress folder
    const progressPath = path.join(projectPath, 'daily_progress');
    if (fs.existsSync(progressPath)) {
        const files = fs.readdirSync(progressPath)
            .filter(f => f.endsWith('.md'))
            .sort()
            .reverse()
            .slice(0, days);

        files.forEach(file => {
            const content = fs.readFileSync(path.join(progressPath, file), 'utf8');
            const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})/);

            if (dateMatch) {
                // Extract key accomplishments
                const accomplishments = content.match(/##?\s*Completed[\s\S]*?(?=##|$)/i);
                if (accomplishments) {
                    const items = accomplishments[0]
                        .split('\n')
                        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
                        .map(line => line.replace(/^[-*]\s*/, '').trim())
                        .slice(0, 3);

                    if (items.length > 0) {
                        activities.push({
                            date: dateMatch[1],
                            items: items
                        });
                    }
                }
            }
        });
    }

    // Check for recent file modifications
    const recentCutoff = subDays(new Date(), days);
    function scanDirectory(dirPath, depth = 0) {
        if (depth > 2) return; // Limit recursion depth

        try {
            const items = fs.readdirSync(dirPath);
            items.forEach(item => {
                const itemPath = path.join(dirPath, item);
                const stats = fs.statSync(itemPath);

                if (stats.isFile() && item.endsWith('.md') && stats.mtime > recentCutoff) {
                    const relPath = path.relative(projectPath, itemPath);
                    if (!relPath.includes('daily_progress')) {
                        activities.push({
                            date: format(stats.mtime, 'yyyy-MM-dd'),
                            items: [`Updated: ${relPath}`]
                        });
                    }
                } else if (stats.isDirectory() && !item.startsWith('.')) {
                    scanDirectory(itemPath, depth + 1);
                }
            });
        } catch (error) {
            // Silently handle permission errors
        }
    }

    scanDirectory(projectPath);

    return activities.sort((a, b) => b.date.localeCompare(a.date));
}

// Get open tasks
function getOpenTasks(projectName) {
    const tasksFile = path.join(PROJECTS_PATH, projectName, 'TASKS.md');
    const tasks = [];

    if (fs.existsSync(tasksFile)) {
        const content = fs.readFileSync(tasksFile, 'utf8');
        const lines = content.split('\n');

        lines.forEach(line => {
            // Match unchecked tasks
            if (line.match(/^[\s]*-\s*\[\s*\]/)) {
                const task = line.replace(/^[\s]*-\s*\[\s*\]\s*/, '').trim();
                if (task) tasks.push(task);
            }
        });
    }

    return tasks.slice(0, 5); // Return top 5 open tasks
}

// Get key decisions
function getKeyDecisions(projectName) {
    const decisionsFile = path.join(PROJECTS_PATH, projectName, 'DECISIONS.md');
    const decisions = [];

    if (fs.existsSync(decisionsFile)) {
        const content = fs.readFileSync(decisionsFile, 'utf8');

        // Extract recent decisions (simple pattern matching)
        const decisionBlocks = content.split(/##\s+/);
        decisionBlocks.forEach(block => {
            const lines = block.split('\n');
            if (lines[0] && lines[0].toLowerCase().includes('decision')) {
                decisions.push(lines[0].replace(/decision:?\s*/i, '').trim());
            }
        });
    }

    return decisions.slice(0, 3);
}

// Generate catch-up summary
function generateCatchUp(projectName) {
    const status = getProjectStatus(projectName);
    const activities = getRecentActivity(projectName);
    const tasks = getOpenTasks(projectName);
    const decisions = getKeyDecisions(projectName);

    // Print header
    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
    console.log(colors.bright + colors.blue + `📋 CATCH ME UP: ${projectName}` + colors.reset);
    console.log(colors.cyan + '═'.repeat(60) + colors.reset + '\n');

    // Project Status
    console.log(colors.yellow + '📊 PROJECT STATUS' + colors.reset);
    console.log(`   Phase: ${colors.bright}${status.phase}${colors.reset}`);
    console.log(`   Progress: ${getProgressBar(status.progress)} ${status.progress}%`);
    console.log(`   Health: ${getHealthIndicator(status.health)}`);
    console.log(`   Last Update: ${status.lastUpdate}\n`);

    // Recent Activity
    if (activities.length > 0) {
        console.log(colors.yellow + '🔄 RECENT ACTIVITY' + colors.reset);
        activities.slice(0, 5).forEach(activity => {
            console.log(`   ${colors.dim}${activity.date}${colors.reset}`);
            activity.items.forEach(item => {
                console.log(`   • ${item}`);
            });
        });
        console.log('');
    }

    // Open Tasks
    if (tasks.length > 0) {
        console.log(colors.yellow + '☐ OPEN TASKS' + colors.reset);
        tasks.forEach((task, i) => {
            console.log(`   ${i + 1}. ${task}`);
        });
        console.log('');
    }

    // Key Decisions
    if (decisions.length > 0) {
        console.log(colors.yellow + '🎯 KEY DECISIONS' + colors.reset);
        decisions.forEach(decision => {
            console.log(`   • ${decision}`);
        });
        console.log('');
    }

    // Next Actions
    console.log(colors.yellow + '⚡ SUGGESTED NEXT ACTIONS' + colors.reset);
    if (tasks.length > 0) {
        console.log(`   1. Start with: "${tasks[0]}"`);
    }
    if (status.progress < 25) {
        console.log(`   2. Define clear milestones and success criteria`);
    } else if (status.progress < 75) {
        console.log(`   2. Focus on completing current phase`);
    } else {
        console.log(`   2. Prepare for project completion and handoff`);
    }
    console.log(`   3. Update project status and documentation`);

    // Footer
    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
    console.log(colors.dim + `Generated: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}` + colors.reset);
    console.log('');
}

// Helper function for progress bar
function getProgressBar(progress) {
    const filled = Math.floor(progress / 5);
    const empty = 20 - filled;
    return colors.green + '█'.repeat(filled) + colors.dim + '░'.repeat(empty) + colors.reset;
}

// Helper function for health indicator
function getHealthIndicator(health) {
    const healthLower = health.toLowerCase();
    if (healthLower.includes('green') || healthLower.includes('good')) {
        return colors.green + '🟢 ' + health + colors.reset;
    } else if (healthLower.includes('yellow') || healthLower.includes('warning')) {
        return colors.yellow + '🟡 ' + health + colors.reset;
    } else if (healthLower.includes('red') || healthLower.includes('critical')) {
        return colors.red + '🔴 ' + health + colors.reset;
    }
    return health;
}

// Interactive project selection
async function selectProject() {
    const projects = getProjects();

    if (projects.length === 0) {
        console.log(colors.red + '❌ No projects found in ' + PROJECTS_PATH + colors.reset);
        return null;
    }

    console.log(colors.bright + '\n📁 Available Projects:' + colors.reset);
    projects.forEach((project, index) => {
        const status = getProjectStatus(project);
        console.log(`   ${colors.cyan}${index + 1}.${colors.reset} ${project} ${colors.dim}(${status.progress}% complete)${colors.reset}`);
    });

    // Get user input
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readline.question('\n' + colors.yellow + 'Select project number (or name): ' + colors.reset, (answer) => {
            readline.close();

            // Check if answer is a number
            const num = parseInt(answer);
            if (num && num > 0 && num <= projects.length) {
                resolve(projects[num - 1]);
            } else {
                // Try to match by name
                const matched = projects.find(p =>
                    p.toLowerCase().includes(answer.toLowerCase())
                );
                resolve(matched || null);
            }
        });
    });
}

// Main function
async function main() {
    console.log(colors.bright + colors.magenta + '\n🚀 PAI Catch Me Up System' + colors.reset);

    // Get project name from command line or interactive
    let projectName = process.argv[2];

    if (!projectName) {
        projectName = await selectProject();
        if (!projectName) {
            console.log(colors.red + '❌ No project selected' + colors.reset);
            process.exit(1);
        }
    }

    // Check if project exists
    const projectPath = path.join(PROJECTS_PATH, projectName);
    if (!fs.existsSync(projectPath)) {
        console.log(colors.red + `❌ Project "${projectName}" not found` + colors.reset);
        console.log(colors.dim + `   Looked in: ${projectPath}` + colors.reset);
        process.exit(1);
    }

    // Generate catch-up summary
    generateCatchUp(projectName);
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { generateCatchUp, getProjectStatus };
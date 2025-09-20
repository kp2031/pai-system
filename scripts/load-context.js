#!/usr/bin/env node

/**
 * Context Loader for PAI System
 * Implements the 4-layer mandatory loading protocol
 */

const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// Configuration
const UFC_PATH = path.join(process.env.HOME, '.claude');
const CONTEXT_PATH = path.join(UFC_PATH, 'context');
const OBSIDIAN_PATH = path.join(process.env.HOME, 'Obsidian');

// ANSI colors
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

// Context loading levels
const CONTEXT_LEVELS = {
    minimal: ['master'],
    project: ['master', 'project'],
    domain: ['master', 'project', 'domain'],
    full: ['master', 'project', 'domain', 'commands', 'patterns']
};

// Load a context file
function loadContextFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const stats = fs.statSync(filePath);
            return {
                path: filePath,
                content: content,
                size: stats.size,
                modified: stats.mtime,
                loaded: true
            };
        }
        return {
            path: filePath,
            loaded: false,
            error: 'File not found'
        };
    } catch (error) {
        return {
            path: filePath,
            loaded: false,
            error: error.message
        };
    }
}

// Get current project
function getCurrentProject() {
    const currentLink = path.join(OBSIDIAN_PATH, 'Projects', 'current');
    try {
        if (fs.existsSync(currentLink)) {
            const realPath = fs.realpathSync(currentLink);
            return path.basename(realPath);
        }
    } catch (error) {
        // Not a critical error
    }

    // Try to detect from working directory
    const cwd = process.cwd();
    if (cwd.includes('/Projects/')) {
        const match = cwd.match(/\/Projects\/([^\/]+)/);
        if (match) return match[1];
    }

    return null;
}

// Get current domain from context
function getCurrentDomain() {
    // This would be enhanced to detect domain from current work
    // For now, return career as default since it's most common
    return 'career';
}

// Load master context (Layer 1)
function loadMasterContext() {
    console.log(colors.yellow + '\n📋 Layer 1: Master Context' + colors.reset);

    const masterPath = path.join(UFC_PATH, 'CLAUDE.md');
    const result = loadContextFile(masterPath);

    if (result.loaded) {
        console.log(`  ✅ Loaded: CLAUDE.md (${(result.size / 1024).toFixed(1)}KB)`);

        // Verify critical rules are present
        const hasRules = result.content.includes('MANDATORY SYSTEM RULES');
        const hasMode = result.content.includes('DEFAULT MODE: THINKING');
        const hasHierarchy = result.content.includes('VP Agent');

        if (hasRules && hasMode && hasHierarchy) {
            console.log(colors.green + '  ✅ All mandatory rules verified' + colors.reset);
        } else {
            console.log(colors.red + '  ⚠️  Some rules missing - please check master context' + colors.reset);
        }
    } else {
        console.log(colors.red + `  ❌ Failed to load: ${result.error}` + colors.reset);
    }

    return result;
}

// Load project context (Layer 2)
function loadProjectContext(projectName) {
    console.log(colors.yellow + '\n📁 Layer 2: Project Context' + colors.reset);

    if (!projectName) {
        console.log(colors.dim + '  ℹ️  No active project' + colors.reset);
        return null;
    }

    const projectContextPath = path.join(CONTEXT_PATH, 'projects', projectName, 'claude.md');
    const result = loadContextFile(projectContextPath);

    if (result.loaded) {
        console.log(`  ✅ Loaded: ${projectName}/claude.md (${(result.size / 1024).toFixed(1)}KB)`);
    } else {
        // Try to create basic project context
        const projectPath = path.join(OBSIDIAN_PATH, 'Projects', projectName);
        if (fs.existsSync(projectPath)) {
            console.log(colors.dim + '  ℹ️  Project exists but no context file' + colors.reset);
            console.log(colors.cyan + '  💡 Tip: Create project context for better AI assistance' + colors.reset);
        }
    }

    return result;
}

// Load domain context (Layer 3)
function loadDomainContext(domain) {
    console.log(colors.yellow + '\n🌐 Layer 3: Domain Context' + colors.reset);

    const domainPath = path.join(CONTEXT_PATH, 'domains', domain, 'claude.md');
    const result = loadContextFile(domainPath);

    if (result.loaded) {
        console.log(`  ✅ Loaded: ${domain}/claude.md (${(result.size / 1024).toFixed(1)}KB)`);
    } else {
        console.log(colors.dim + `  ℹ️  Domain context not found: ${domain}` + colors.reset);
    }

    return result;
}

// Load working context (Layer 4)
function loadWorkingContext() {
    console.log(colors.yellow + '\n💼 Layer 4: Working Context' + colors.reset);

    const workingPath = path.join(CONTEXT_PATH, 'working', 'current.md');
    const result = loadContextFile(workingPath);

    if (result.loaded) {
        console.log(`  ✅ Loaded: working/current.md (${(result.size / 1024).toFixed(1)}KB)`);

        // Show age of working context
        const age = Date.now() - result.modified.getTime();
        const hours = Math.floor(age / (1000 * 60 * 60));
        if (hours > 24) {
            console.log(colors.yellow + `  ⚠️  Working context is ${hours} hours old` + colors.reset);
        }
    } else {
        console.log(colors.dim + '  ℹ️  No working context (start fresh)' + colors.reset);
    }

    return result;
}

// Load additional contexts
function loadAdditionalContexts() {
    console.log(colors.yellow + '\n🔧 Additional Contexts' + colors.reset);

    const contexts = {
        'Agents': path.join(UFC_PATH, 'agents', 'vp.md'),
        'Modes': path.join(UFC_PATH, 'modes', 'thinking.md'),
        'Commands': path.join(CONTEXT_PATH, 'tools', 'commands.md'),
        'Patterns': path.join(UFC_PATH, 'fabric', 'patterns')
    };

    const loaded = {};
    for (const [name, contextPath] of Object.entries(contexts)) {
        if (fs.existsSync(contextPath)) {
            const stats = fs.statSync(contextPath);
            if (stats.isDirectory()) {
                const files = fs.readdirSync(contextPath);
                console.log(`  ✅ ${name}: ${files.length} items available`);
            } else {
                const size = (stats.size / 1024).toFixed(1);
                console.log(`  ✅ ${name}: Loaded (${size}KB)`);
            }
            loaded[name] = true;
        } else {
            console.log(colors.dim + `  ○ ${name}: Not configured` + colors.reset);
            loaded[name] = false;
        }
    }

    return loaded;
}

// Verify context integrity
function verifyContextIntegrity(contexts) {
    console.log(colors.yellow + '\n🔍 Context Verification' + colors.reset);

    let score = 0;
    let maxScore = 0;

    // Check master context
    maxScore += 3;
    if (contexts.master && contexts.master.loaded) {
        score += 3;
        console.log('  ✅ Master context loaded (mandatory)');
    } else {
        console.log(colors.red + '  ❌ Master context missing (CRITICAL)' + colors.reset);
    }

    // Check mode enforcement
    maxScore += 2;
    if (contexts.additional && contexts.additional.Modes) {
        score += 2;
        console.log('  ✅ Mode enforcement active');
    } else {
        console.log(colors.yellow + '  ⚠️  Mode enforcement not configured' + colors.reset);
    }

    // Check agent system
    maxScore += 2;
    if (contexts.additional && contexts.additional.Agents) {
        score += 2;
        console.log('  ✅ Agent hierarchy loaded');
    } else {
        console.log(colors.yellow + '  ⚠️  Agent system not loaded' + colors.reset);
    }

    // Check domain context
    maxScore += 1;
    if (contexts.domain && contexts.domain.loaded) {
        score += 1;
        console.log('  ✅ Domain context active');
    }

    // Check project context
    maxScore += 1;
    if (contexts.project && contexts.project.loaded) {
        score += 1;
        console.log('  ✅ Project context loaded');
    }

    // Calculate health score
    const percentage = Math.round((score / maxScore) * 100);
    console.log(colors.cyan + `\n📊 Context Health: ${percentage}%` + colors.reset);

    if (percentage === 100) {
        console.log(colors.green + '  🎉 Perfect! All contexts loaded' + colors.reset);
    } else if (percentage >= 80) {
        console.log(colors.green + '  ✅ Good - System functional' + colors.reset);
    } else if (percentage >= 60) {
        console.log(colors.yellow + '  ⚠️  Fair - Some features limited' + colors.reset);
    } else {
        console.log(colors.red + '  ❌ Poor - Critical contexts missing' + colors.reset);
    }

    return percentage;
}

// Generate context report
function generateContextReport(contexts, health) {
    const reportPath = path.join(CONTEXT_PATH, 'working', 'context-report.md');

    const report = `# Context Loading Report
Generated: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}

## Summary
- **Health Score**: ${health}%
- **Project**: ${contexts.projectName || 'None'}
- **Domain**: ${contexts.domain || 'None'}
- **Mode**: Thinking (Default)

## Loaded Contexts

### Layer 1: Master Context
- Status: ${contexts.master.loaded ? '✅ Loaded' : '❌ Failed'}
- Path: ~/.claude/CLAUDE.md

### Layer 2: Project Context
- Status: ${contexts.project ? (contexts.project.loaded ? '✅ Loaded' : '❌ Failed') : '○ N/A'}
- Project: ${contexts.projectName || 'None active'}

### Layer 3: Domain Context
- Status: ${contexts.domain ? '✅ Loaded' : '○ Not loaded'}
- Domain: ${contexts.domainName || 'None'}

### Layer 4: Working Context
- Status: ${contexts.working ? (contexts.working.loaded ? '✅ Loaded' : '○ Empty') : '○ N/A'}

## Recommendations
${health < 60 ? '- ⚠️ Load master context immediately\n' : ''}
${!contexts.project ? '- Create project context for better assistance\n' : ''}
${!contexts.domain ? '- Add domain context for specialized knowledge\n' : ''}

## Next Steps
1. Ensure all critical contexts are loaded
2. Create missing context files if needed
3. Run \`npm run verify\` to check system health

---
*PAI Context Loading System v1.0*`;

    // Ensure directory exists
    const workingDir = path.dirname(reportPath);
    if (!fs.existsSync(workingDir)) {
        fs.mkdirSync(workingDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, report);
    console.log(colors.dim + `\n📄 Report saved to: ${reportPath}` + colors.reset);
}

// Main loading function
function loadContext(level = 'full') {
    console.log(colors.bright + colors.magenta + '\n🧠 PAI Context Loading System\n' + colors.reset);
    console.log(colors.cyan + '═'.repeat(50) + colors.reset);

    const contexts = {};

    // Layer 1: Master (always load)
    contexts.master = loadMasterContext();

    // Layer 2: Project (if available)
    const projectName = getCurrentProject();
    contexts.projectName = projectName;
    if (projectName) {
        contexts.project = loadProjectContext(projectName);
    }

    // Layer 3: Domain (if specified)
    const domain = getCurrentDomain();
    contexts.domainName = domain;
    if (domain && (level === 'domain' || level === 'full')) {
        contexts.domain = loadDomainContext(domain);
    }

    // Layer 4: Working context
    contexts.working = loadWorkingContext();

    // Additional contexts
    if (level === 'full') {
        contexts.additional = loadAdditionalContexts();
    }

    // Verify integrity
    const health = verifyContextIntegrity(contexts);

    // Generate report
    generateContextReport(contexts, health);

    console.log(colors.cyan + '\n═'.repeat(50) + colors.reset);

    // Show current mode
    console.log(colors.bright + colors.yellow + '\n🧠 CURRENT MODE: THINKING (Default)' + colors.reset);
    console.log(colors.dim + 'Switch to writing mode only when explicitly requested' + colors.reset);

    return contexts;
}

// Interactive mode
async function interactiveLoad() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(colors.blue + '\nContext Loading Levels:' + colors.reset);
    console.log('  1. Minimal (master only)');
    console.log('  2. Project (master + project)');
    console.log('  3. Domain (master + project + domain)');
    console.log('  4. Full (everything)');

    readline.question(colors.yellow + '\nSelect level (1-4) [4]: ' + colors.reset, (answer) => {
        readline.close();

        const levels = ['minimal', 'project', 'domain', 'full'];
        const level = levels[parseInt(answer) - 1] || 'full';

        loadContext(level);
    });
}

// Run if called directly
if (require.main === module) {
    const level = process.argv[2];

    if (level) {
        loadContext(level);
    } else {
        interactiveLoad();
    }
}

module.exports = { loadContext, getCurrentProject, getCurrentDomain };
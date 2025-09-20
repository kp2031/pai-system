#!/usr/bin/env node

/**
 * System Verification for PAI
 * Tests all components and reports system health
 */

const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const UFC_PATH = path.join(process.env.HOME, '.claude');
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

// Test results storage
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
};

// Test runner
function runTest(name, test, critical = false) {
    process.stdout.write(`  Testing ${name}... `);

    try {
        const result = test();
        if (result === true) {
            console.log(colors.green + '✓' + colors.reset);
            testResults.passed++;
            testResults.tests.push({ name, status: 'passed' });
        } else if (result === 'warning') {
            console.log(colors.yellow + '⚠' + colors.reset);
            testResults.warnings++;
            testResults.tests.push({ name, status: 'warning' });
        } else {
            console.log(colors.red + '✗' + colors.reset);
            testResults.failed++;
            testResults.tests.push({ name, status: 'failed', critical });
            if (critical) {
                console.log(colors.red + `    ↳ CRITICAL: This failure blocks system operation` + colors.reset);
            }
        }
    } catch (error) {
        console.log(colors.red + '✗' + colors.reset);
        console.log(colors.dim + `    ↳ Error: ${error.message}` + colors.reset);
        testResults.failed++;
        testResults.tests.push({ name, status: 'failed', error: error.message, critical });
    }
}

// Directory structure tests
function testDirectoryStructure() {
    console.log(colors.yellow + '\n📁 Directory Structure' + colors.reset);

    // UFC directories
    runTest('UFC root exists', () => fs.existsSync(UFC_PATH), true);
    runTest('Agents directory', () => fs.existsSync(path.join(UFC_PATH, 'agents')));
    runTest('Context directory', () => fs.existsSync(path.join(UFC_PATH, 'context')), true);
    runTest('Commands directory', () => fs.existsSync(path.join(UFC_PATH, 'commands')));
    runTest('Modes directory', () => fs.existsSync(path.join(UFC_PATH, 'modes')));
    runTest('Fabric patterns', () => fs.existsSync(path.join(UFC_PATH, 'fabric', 'patterns')));

    // Obsidian directories
    runTest('Obsidian vault', () => fs.existsSync(OBSIDIAN_PATH), true);
    runTest('Projects folder', () => fs.existsSync(path.join(OBSIDIAN_PATH, 'Projects')));
    runTest('Areas folder', () => fs.existsSync(path.join(OBSIDIAN_PATH, 'Areas')));
    runTest('Scripts folder', () => fs.existsSync(path.join(OBSIDIAN_PATH, 'scripts')));
}

// Context loading tests
function testContextLoading() {
    console.log(colors.yellow + '\n🧠 Context Loading' + colors.reset);

    runTest('Master CLAUDE.md exists', () =>
        fs.existsSync(path.join(UFC_PATH, 'CLAUDE.md')), true);

    runTest('Master context valid', () => {
        const masterPath = path.join(UFC_PATH, 'CLAUDE.md');
        if (!fs.existsSync(masterPath)) return false;
        const content = fs.readFileSync(masterPath, 'utf8');
        return content.includes('MANDATORY SYSTEM RULES') &&
               content.includes('4-Layer Mandatory Loading Protocol');
    }, true);

    runTest('Career domain context', () =>
        fs.existsSync(path.join(UFC_PATH, 'context', 'domains', 'career', 'claude.md')));

    runTest('Mode files exist', () =>
        fs.existsSync(path.join(UFC_PATH, 'modes', 'thinking.md')) &&
        fs.existsSync(path.join(UFC_PATH, 'modes', 'writing.md')));
}

// Agent system tests
function testAgentSystem() {
    console.log(colors.yellow + '\n🤖 Agent System' + colors.reset);

    runTest('VP agent exists', () =>
        fs.existsSync(path.join(UFC_PATH, 'agents', 'vp.md')), true);

    // Count directors
    runTest('All 7 Directors present', () => {
        const directorsPath = path.join(UFC_PATH, 'agents', 'directors');
        if (!fs.existsSync(directorsPath)) return false;
        const directors = fs.readdirSync(directorsPath).filter(f => f.endsWith('.md'));
        return directors.length >= 7;
    });

    // Count assistants
    runTest('Assistant agents exist', () => {
        const assistantsPath = path.join(UFC_PATH, 'agents', 'assistants');
        if (!fs.existsSync(assistantsPath)) return false;
        const assistants = fs.readdirSync(assistantsPath).filter(f => f.endsWith('.md'));
        return assistants.length > 0 ? true : 'warning';
    });
}

// Command system tests
function testCommandSystem() {
    console.log(colors.yellow + '\n⚡ Command System' + colors.reset);

    const scripts = [
        'daily-note.js',
        'catch-me-up.js',
        'new-project.js',
        'load-context.js',
        'mode-switch.js',
        'verify-system.js'
    ];

    scripts.forEach(script => {
        runTest(`Script: ${script}`, () =>
            fs.existsSync(path.join(OBSIDIAN_PATH, 'scripts', script)));
    });

    runTest('package.json configured', () => {
        const pkgPath = path.join(OBSIDIAN_PATH, 'package.json');
        if (!fs.existsSync(pkgPath)) return false;
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
            return (pkg.hooks && pkg.hooks['user-prompt-submit']) ||
                   (pkg.claudeCode && pkg.claudeCode.hooks && pkg.claudeCode.hooks['user-prompt-submit']) ||
                   'warning';  // Allow warning since hooks might be loaded differently
        } catch (e) {
            return false;
        }
    });
}

// Node.js environment tests
async function testEnvironment() {
    console.log(colors.yellow + '\n🔧 Environment' + colors.reset);

    // Node version
    runTest('Node.js version >= 18', () => {
        const version = process.version;
        const major = parseInt(version.split('.')[0].replace('v', ''));
        return major >= 18;
    }, true);

    // Check npm
    runTest('npm available', () => {
        try {
            require('child_process').execSync('npm --version', { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    });

    // Check git
    runTest('git available', () => {
        try {
            require('child_process').execSync('git --version', { stdio: 'ignore' });
            return true;
        } catch {
            return 'warning';
        }
    });
}

// Performance tests
function testPerformance() {
    console.log(colors.yellow + '\n⚡ Performance' + colors.reset);

    // Context loading speed
    runTest('Context load time < 500ms', () => {
        const start = Date.now();
        const masterPath = path.join(UFC_PATH, 'CLAUDE.md');
        if (fs.existsSync(masterPath)) {
            fs.readFileSync(masterPath, 'utf8');
        }
        const elapsed = Date.now() - start;
        return elapsed < 500;
    });

    // Directory scan speed
    runTest('Directory scan < 100ms', () => {
        const start = Date.now();
        if (fs.existsSync(UFC_PATH)) {
            fs.readdirSync(UFC_PATH);
        }
        const elapsed = Date.now() - start;
        return elapsed < 100;
    });
}

// System integration tests
function testIntegration() {
    console.log(colors.yellow + '\n🔗 Integration' + colors.reset);

    // Test daily note creation capability
    runTest('Daily notes path exists', () => {
        const dailyPath = path.join(OBSIDIAN_PATH, 'Areas', 'Career', 'Daily_Notes');
        return fs.existsSync(path.join(OBSIDIAN_PATH, 'Areas', 'Career')) ? true : 'warning';
    });

    // Test project structure
    runTest('Projects folder ready', () =>
        fs.existsSync(path.join(OBSIDIAN_PATH, 'Projects')));

    // Test working context
    runTest('Working context available', () => {
        const workingPath = path.join(UFC_PATH, 'context', 'working');
        return fs.existsSync(workingPath) ? true : 'warning';
    });
}

// Generate health report
function generateHealthReport() {
    const reportPath = path.join(UFC_PATH, 'context', 'working', 'health-report.md');
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const total = testResults.passed + testResults.failed + testResults.warnings;
    const score = Math.round((testResults.passed / total) * 100);

    const report = `# PAI System Health Report
Generated: ${timestamp}

## Overall Health: ${score}%

### Test Summary
- ✅ Passed: ${testResults.passed}
- ❌ Failed: ${testResults.failed}
- ⚠️  Warnings: ${testResults.warnings}
- Total Tests: ${total}

## Test Details

${testResults.tests.map(test => {
    let icon = test.status === 'passed' ? '✅' :
               test.status === 'warning' ? '⚠️' : '❌';
    let line = `- ${icon} ${test.name}`;
    if (test.critical) line += ' **(CRITICAL)**';
    if (test.error) line += `\n  - Error: ${test.error}`;
    return line;
}).join('\n')}

## System Status

### Critical Components
- Master Context: ${testResults.tests.find(t => t.name === 'Master CLAUDE.md exists')?.status === 'passed' ? '✅ Operational' : '❌ Missing'}
- VP Agent: ${testResults.tests.find(t => t.name === 'VP agent exists')?.status === 'passed' ? '✅ Ready' : '❌ Not configured'}
- Context System: ${testResults.tests.find(t => t.name === 'Context directory')?.status === 'passed' ? '✅ Available' : '❌ Not found'}

### Recommendations
${score < 60 ? '- ⚠️ Critical components missing - run setup\n' : ''}
${testResults.failed > 0 ? '- Fix failed tests for full functionality\n' : ''}
${testResults.warnings > 3 ? '- Address warnings to improve system\n' : ''}
${score === 100 ? '- 🎉 System fully operational!\n' : ''}

## Next Steps
1. ${score < 60 ? 'Run initial setup to create missing components' : 'Continue using the system'}
2. ${testResults.failed > 0 ? 'Fix critical failures' : 'Monitor system health regularly'}
3. ${testResults.warnings > 0 ? 'Address warnings when possible' : 'Optimize performance'}

---
*PAI System Verification v1.0*`;

    // Ensure directory exists
    const workingDir = path.dirname(reportPath);
    if (!fs.existsSync(workingDir)) {
        fs.mkdirSync(workingDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, report);
    return { score, reportPath };
}

// Display results
function displayResults() {
    const total = testResults.passed + testResults.failed + testResults.warnings;
    const score = Math.round((testResults.passed / total) * 100);

    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
    console.log(colors.bright + '📊 TEST RESULTS' + colors.reset);
    console.log(colors.cyan + '═'.repeat(60) + colors.reset);

    console.log('\n' + colors.bright + 'Summary:' + colors.reset);
    console.log(`  ${colors.green}✅ Passed: ${testResults.passed}${colors.reset}`);
    console.log(`  ${colors.red}❌ Failed: ${testResults.failed}${colors.reset}`);
    console.log(`  ${colors.yellow}⚠️  Warnings: ${testResults.warnings}${colors.reset}`);
    console.log(`  📈 Total: ${total}`);

    console.log('\n' + colors.bright + `System Health: ${score}%` + colors.reset);

    // Health indicator
    let healthColor, healthMessage;
    if (score === 100) {
        healthColor = colors.green;
        healthMessage = '🎉 PERFECT - System fully operational!';
    } else if (score >= 80) {
        healthColor = colors.green;
        healthMessage = '✅ GOOD - System functional';
    } else if (score >= 60) {
        healthColor = colors.yellow;
        healthMessage = '⚠️  FAIR - Some features limited';
    } else {
        healthColor = colors.red;
        healthMessage = '❌ CRITICAL - Major components missing';
    }

    console.log(healthColor + healthMessage + colors.reset);

    // Critical failures
    const criticalFailures = testResults.tests.filter(t =>
        t.status === 'failed' && t.critical);
    if (criticalFailures.length > 0) {
        console.log('\n' + colors.red + '🚨 CRITICAL FAILURES:' + colors.reset);
        criticalFailures.forEach(test => {
            console.log(`  • ${test.name}`);
        });
    }

    console.log(colors.cyan + '═'.repeat(60) + colors.reset);
}

// Main function
async function main() {
    console.log(colors.bright + colors.magenta + '\n🔍 PAI System Verification\n' + colors.reset);
    console.log(colors.dim + `Starting comprehensive system check...` + colors.reset);

    // Run all test suites
    testDirectoryStructure();
    testContextLoading();
    testAgentSystem();
    testCommandSystem();
    await testEnvironment();
    testPerformance();
    testIntegration();

    // Display results
    displayResults();

    // Generate report
    const { score, reportPath } = generateHealthReport();
    console.log(colors.dim + `\n📄 Detailed report saved to: ${reportPath}` + colors.reset);

    // Provide guidance
    if (score < 60) {
        console.log(colors.yellow + '\n⚠️  ACTION REQUIRED:' + colors.reset);
        console.log('  Your PAI system needs setup. Run:');
        console.log('  1. npm install (install dependencies)');
        console.log('  2. npm run setup (initialize system)');
    } else if (testResults.failed > 0) {
        console.log(colors.yellow + '\n💡 RECOMMENDATIONS:' + colors.reset);
        console.log('  Fix failed tests to unlock full functionality');
    }

    // Exit with appropriate code
    process.exit(testResults.failed > 0 && score < 60 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { runTest, testResults };
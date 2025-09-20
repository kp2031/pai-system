#!/usr/bin/env node

/**
 * Mode Switcher for PAI System
 * Controls thinking vs writing mode
 */

const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// Configuration
const UFC_PATH = path.join(process.env.HOME, '.claude');
const MODES_PATH = path.join(UFC_PATH, 'modes');
const CONTEXT_PATH = path.join(UFC_PATH, 'context');

// ANSI colors
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    orange: '\x1b[38;5;208m',
    cyan: '\x1b[36m'
};

// Mode definitions
const MODES = {
    thinking: {
        name: 'THINKING',
        emoji: '🧠',
        color: colors.orange,
        description: 'Exploration, ideation, and deep thinking',
        file: 'thinking.md',
        behaviors: [
            'Ask questions',
            'Explore alternatives',
            'Challenge assumptions',
            'Make connections',
            'Follow curiosity',
            'Avoid premature conclusions'
        ],
        warnings: [
            'DO NOT write final content',
            'DO NOT produce polished output',
            'DO NOT converge on solutions'
        ]
    },
    writing: {
        name: 'WRITING',
        emoji: '✍️',
        color: colors.green,
        description: 'Execution, creation, and delivery',
        file: 'writing.md',
        behaviors: [
            'Produce final output',
            'Format professionally',
            'Complete deliverables',
            'Polish content',
            'Focus on quality',
            'Ship finished work'
        ],
        warnings: [
            'DO NOT explore new directions',
            'DO NOT question decisions',
            'DO NOT delay with perfectionism'
        ]
    }
};

// Get current mode from context
function getCurrentMode() {
    const modePath = path.join(CONTEXT_PATH, 'working', 'mode.txt');

    try {
        if (fs.existsSync(modePath)) {
            const mode = fs.readFileSync(modePath, 'utf8').trim();
            return mode || 'thinking';
        }
    } catch (error) {
        // Default to thinking
    }

    return 'thinking';
}

// Set mode in context
function setMode(mode) {
    const workingPath = path.join(CONTEXT_PATH, 'working');
    const modePath = path.join(workingPath, 'mode.txt');

    // Ensure directory exists
    if (!fs.existsSync(workingPath)) {
        fs.mkdirSync(workingPath, { recursive: true });
    }

    // Write mode file
    fs.writeFileSync(modePath, mode);

    // Update current.md with mode info
    const currentPath = path.join(workingPath, 'current.md');
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const modeInfo = `# Current Working Context
Updated: ${timestamp}

## Active Mode: ${MODES[mode].name} ${MODES[mode].emoji}
${MODES[mode].description}

### Mode Rules
${MODES[mode].behaviors.map(b => `✓ ${b}`).join('\n')}

### Restrictions
${MODES[mode].warnings.map(w => `⚠️ ${w}`).join('\n')}

---
Mode switched at: ${timestamp}
`;

    fs.writeFileSync(currentPath, modeInfo);
}

// Display mode status
function displayModeStatus(mode) {
    const modeConfig = MODES[mode];

    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
    console.log(modeConfig.color + colors.bright +
                `${modeConfig.emoji}  CURRENT MODE: ${modeConfig.name}` + colors.reset);
    console.log(colors.cyan + '═'.repeat(60) + colors.reset);

    console.log('\n' + colors.yellow + '📋 Mode Description:' + colors.reset);
    console.log('   ' + modeConfig.description);

    console.log('\n' + colors.green + '✓ You Should:' + colors.reset);
    modeConfig.behaviors.forEach(behavior => {
        console.log('   • ' + behavior);
    });

    console.log('\n' + colors.red + '⚠️  You Should NOT:' + colors.reset);
    modeConfig.warnings.forEach(warning => {
        console.log('   • ' + warning.replace('DO NOT ', ''));
    });

    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
}

// Switch mode with confirmation
async function switchMode(targetMode) {
    const currentMode = getCurrentMode();

    if (currentMode === targetMode) {
        console.log(colors.yellow + `\n⚠️  Already in ${MODES[targetMode].name} mode` + colors.reset);
        displayModeStatus(targetMode);
        return;
    }

    // Show what's changing
    console.log('\n' + colors.bright + '🔄 Mode Switch Request' + colors.reset);
    console.log('   From: ' + MODES[currentMode].color +
                MODES[currentMode].name + colors.reset + ' ' + MODES[currentMode].emoji);
    console.log('   To:   ' + MODES[targetMode].color +
                MODES[targetMode].name + colors.reset + ' ' + MODES[targetMode].emoji);

    // If switching to writing mode, add extra confirmation
    if (targetMode === 'writing') {
        console.log('\n' + colors.yellow + '⚠️  Switching to WRITING mode' + colors.reset);
        console.log('   This means you will:');
        console.log('   • Start producing final output');
        console.log('   • Stop exploring alternatives');
        console.log('   • Focus on delivery');

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const answer = await new Promise(resolve => {
            readline.question('\n' + colors.yellow +
                            'Are you ready to write? (y/N): ' + colors.reset,
                            resolve);
        });
        readline.close();

        if (answer.toLowerCase() !== 'y') {
            console.log(colors.green + '\n✓ Staying in THINKING mode' + colors.reset);
            displayModeStatus(currentMode);
            return;
        }
    }

    // Perform the switch
    setMode(targetMode);

    // Show confirmation
    console.log(colors.green + '\n✅ Mode switched successfully!' + colors.reset);
    displayModeStatus(targetMode);

    // Add reminder
    if (targetMode === 'writing') {
        console.log(colors.cyan + '💡 Remember: Return to thinking mode when done writing' + colors.reset);
    } else {
        console.log(colors.cyan + '💡 Remember: Stay in thinking mode for exploration' + colors.reset);
    }
}

// Show mode comparison
function compareModes() {
    console.log('\n' + colors.bright + colors.cyan +
                '🎭 PAI System Modes Comparison' + colors.reset);
    console.log(colors.cyan + '═'.repeat(60) + colors.reset);

    console.log('\n' + colors.orange + '🧠 THINKING MODE (Default)' + colors.reset);
    console.log('   Purpose: Exploration and ideation');
    console.log('   When: 80% of the time');
    console.log('   Output: Ideas, questions, connections');

    console.log('\n' + colors.green + '✍️  WRITING MODE (Explicit)' + colors.reset);
    console.log('   Purpose: Production and delivery');
    console.log('   When: 20% of the time');
    console.log('   Output: Documents, code, final deliverables');

    console.log('\n' + colors.yellow + '🔄 Mode Switching' + colors.reset);
    console.log('   • Default is THINKING mode');
    console.log('   • Switch to WRITING only when ready to produce');
    console.log('   • Return to THINKING after writing');

    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
}

// Interactive mode selection
async function interactiveMode() {
    const currentMode = getCurrentMode();

    console.log(colors.bright + colors.cyan + '\n🎭 PAI Mode Manager\n' + colors.reset);
    console.log('Current mode: ' + MODES[currentMode].color +
                MODES[currentMode].name + colors.reset + ' ' + MODES[currentMode].emoji);

    console.log('\n' + colors.yellow + 'Options:' + colors.reset);
    console.log('  1. Show current mode status');
    console.log('  2. Switch to THINKING mode 🧠');
    console.log('  3. Switch to WRITING mode ✍️');
    console.log('  4. Compare modes');
    console.log('  5. Exit');

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const choice = await new Promise(resolve => {
        readline.question('\n' + colors.yellow + 'Select option (1-5): ' + colors.reset, resolve);
    });
    readline.close();

    switch(choice) {
        case '1':
            displayModeStatus(currentMode);
            break;
        case '2':
            await switchMode('thinking');
            break;
        case '3':
            await switchMode('writing');
            break;
        case '4':
            compareModes();
            break;
        case '5':
            console.log(colors.green + '\n👋 Goodbye!' + colors.reset);
            break;
        default:
            console.log(colors.red + '\n❌ Invalid option' + colors.reset);
    }
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command) {
        await interactiveMode();
    } else if (command === 'status') {
        const currentMode = getCurrentMode();
        displayModeStatus(currentMode);
    } else if (command === 'thinking') {
        await switchMode('thinking');
    } else if (command === 'writing') {
        await switchMode('writing');
    } else if (command === 'compare') {
        compareModes();
    } else {
        console.log(colors.red + `\n❌ Unknown command: ${command}` + colors.reset);
        console.log('\nUsage:');
        console.log('  mode           - Interactive mode');
        console.log('  mode status    - Show current mode');
        console.log('  mode thinking  - Switch to thinking mode');
        console.log('  mode writing   - Switch to writing mode');
        console.log('  mode compare   - Compare modes');
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { getCurrentMode, setMode, switchMode };
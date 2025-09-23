#!/usr/bin/env node

/**
 * Notes Ingestion System for PAI
 * Intelligently processes and categorizes hundreds of MD files
 */

const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const readline = require('readline');

// Configuration
const IMPORT_PATH = path.join(process.env.HOME, 'Obsidian', 'Import', 'staging');
const PROCESSED_PATH = path.join(process.env.HOME, 'Obsidian', 'Import', 'processed');
const RESOURCES_PATH = path.join(process.env.HOME, 'Obsidian', 'Resources', 'Legacy_Notes');
const PATTERNS_PATH = path.join(process.env.HOME, '.claude', 'fabric', 'patterns', 'personal');
const CONTEXT_PATH = path.join(process.env.HOME, '.claude', 'context');

// Categories for automatic sorting
const CATEGORIES = {
    career: ['work', 'job', 'project', 'meeting', 'task', 'deadline', 'client', 'team'],
    family: ['family', 'birthday', 'anniversary', 'kids', 'spouse', 'parents'],
    finance: ['budget', 'expense', 'investment', 'money', 'savings', 'debt', 'tax'],
    health: ['workout', 'exercise', 'doctor', 'medical', 'diet', 'weight', 'sleep'],
    knowledge: ['learn', 'study', 'research', 'book', 'course', 'tutorial', 'idea'],
    entertainment: ['movie', 'game', 'music', 'hobby', 'fun', 'weekend', 'vacation'],
    projects: ['project', 'plan', 'goal', 'milestone', 'roadmap']
};

// Statistics tracking
const stats = {
    total: 0,
    processed: 0,
    categorized: {},
    patterns: [],
    insights: []
};

// Analyze note content
function analyzeNote(content, filename) {
    const analysis = {
        category: 'uncategorized',
        importance: 'normal',
        date: null,
        tags: [],
        mentions: [],
        isProject: false,
        isDaily: false,
        wordCount: content.split(/\s+/).length
    };

    // Check for date patterns
    const dateMatch = filename.match(/(\d{4}[-_]\d{2}[-_]\d{2})/);
    if (dateMatch) {
        analysis.date = dateMatch[1].replace(/_/g, '-');
        analysis.isDaily = true;
    }

    // Categorize based on content
    const lowerContent = content.toLowerCase();
    for (const [category, keywords] of Object.entries(CATEGORIES)) {
        for (const keyword of keywords) {
            if (lowerContent.includes(keyword)) {
                analysis.category = category;
                break;
            }
        }
        if (analysis.category !== 'uncategorized') break;
    }

    // Extract tags (hashtags)
    const tagMatches = content.match(/#[\w]+/g);
    if (tagMatches) {
        analysis.tags = tagMatches.map(t => t.substring(1));
    }

    // Check importance markers
    if (lowerContent.includes('important') || lowerContent.includes('urgent') ||
        lowerContent.includes('critical') || content.includes('!!!')) {
        analysis.importance = 'high';
    }

    // Check if it's a project
    if (lowerContent.includes('project') || lowerContent.includes('goal') ||
        lowerContent.includes('milestone')) {
        analysis.isProject = true;
    }

    return analysis;
}

// Extract reusable patterns
function extractPatterns(content, analysis) {
    const patterns = [];

    // Look for templates
    if (content.includes('Template:') || content.includes('## Template')) {
        patterns.push({
            type: 'template',
            category: analysis.category,
            content: content
        });
    }

    // Look for checklists
    const checklistMatch = content.match(/- \[[ x]\]/g);
    if (checklistMatch && checklistMatch.length > 3) {
        patterns.push({
            type: 'checklist',
            category: analysis.category,
            items: checklistMatch.length
        });
    }

    // Look for workflows
    if (content.includes('Step 1:') || content.includes('1.') && content.includes('2.')) {
        patterns.push({
            type: 'workflow',
            category: analysis.category
        });
    }

    return patterns;
}

// Process a single note
async function processNote(filepath) {
    const filename = path.basename(filepath);
    const content = fs.readFileSync(filepath, 'utf8');

    // Analyze the note
    const analysis = analyzeNote(content, filename);

    // Extract patterns
    const patterns = extractPatterns(content, analysis);
    if (patterns.length > 0) {
        stats.patterns.push(...patterns);
    }

    // Determine destination
    let destPath;

    if (analysis.isDaily && analysis.date) {
        // Daily notes go to Areas/Career/Daily_Notes or Archive
        const year = analysis.date.substring(0, 4);
        destPath = path.join(process.env.HOME, 'Obsidian', 'Archive', 'Daily_Notes', year);
    } else if (analysis.isProject) {
        // Projects get their own folder
        const projectName = filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
        destPath = path.join(process.env.HOME, 'Obsidian', 'Projects', projectName, 'reference');
    } else if (analysis.category !== 'uncategorized') {
        // Categorized notes go to Resources
        destPath = path.join(RESOURCES_PATH, analysis.category);
    } else {
        // Everything else goes to general Resources
        destPath = path.join(RESOURCES_PATH, 'unsorted');
    }

    // Ensure destination exists
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }

    // Add metadata header to note
    const enhancedContent = `---
imported: ${format(new Date(), 'yyyy-MM-dd')}
original_date: ${analysis.date || 'unknown'}
category: ${analysis.category}
importance: ${analysis.importance}
tags: ${analysis.tags.join(', ')}
source: apple_notes
---

${content}`;

    // Write to destination
    const destFile = path.join(destPath, filename);
    fs.writeFileSync(destFile, enhancedContent);

    // Track statistics
    stats.categorized[analysis.category] = (stats.categorized[analysis.category] || 0) + 1;

    return analysis;
}

// Generate context files for domains
function generateDomainContext(category, notes) {
    const contextContent = `# ${category.charAt(0).toUpperCase() + category.slice(1)} Domain - Imported Knowledge

## Overview
Imported ${notes} notes from Apple Notes on ${format(new Date(), 'yyyy-MM-dd')}

## Key Patterns Identified
${stats.patterns
    .filter(p => p.category === category)
    .map(p => `- ${p.type}: Found in ${category} notes`)
    .join('\n')}

## Integration Status
- Notes imported: ${notes}
- Patterns extracted: ${stats.patterns.filter(p => p.category === category).length}
- Ready for PAI integration: ✅

## Next Steps
1. Review imported notes in Resources/Legacy_Notes/${category}
2. Extract key insights for active projects
3. Archive outdated information
4. Create commands from useful patterns
`;

    const contextPath = path.join(CONTEXT_PATH, 'domains', category, 'imported.md');
    const dir = path.dirname(contextPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(contextPath, contextContent);
}

// Main ingestion process
async function ingestNotes() {
    console.log('🚀 PAI Notes Ingestion System\n');
    console.log('📁 Scanning for notes to import...\n');

    // Ensure directories exist
    if (!fs.existsSync(IMPORT_PATH)) {
        fs.mkdirSync(IMPORT_PATH, { recursive: true });
        console.log(`⚠️  No notes found in ${IMPORT_PATH}`);
        console.log('Please place your exported .md files there and run again.');
        return;
    }

    // Get all MD files
    const files = fs.readdirSync(IMPORT_PATH)
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(IMPORT_PATH, f));

    if (files.length === 0) {
        console.log('⚠️  No .md files found in staging area');
        return;
    }

    stats.total = files.length;
    console.log(`Found ${files.length} notes to process\n`);

    // Process each file
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await new Promise(resolve => {
        rl.question(`Process ${files.length} notes? (y/n): `, resolve);
    });
    rl.close();

    if (answer.toLowerCase() !== 'y') {
        console.log('Cancelled');
        return;
    }

    console.log('\n📝 Processing notes...\n');

    // Process all notes
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        process.stdout.write(`Processing ${i + 1}/${files.length}: ${path.basename(file)}...`);

        try {
            await processNote(file);

            // Move to processed
            const processedFile = path.join(PROCESSED_PATH, path.basename(file));
            if (!fs.existsSync(PROCESSED_PATH)) {
                fs.mkdirSync(PROCESSED_PATH, { recursive: true });
            }
            fs.renameSync(file, processedFile);

            stats.processed++;
            console.log(' ✅');
        } catch (error) {
            console.log(` ❌ ${error.message}`);
        }
    }

    // Generate domain contexts
    console.log('\n🧠 Generating domain contexts...');
    for (const [category, count] of Object.entries(stats.categorized)) {
        if (count > 0) {
            generateDomainContext(category, count);
            console.log(`  ✅ ${category}: ${count} notes`);
        }
    }

    // Display summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 INGESTION COMPLETE\n');
    console.log(`Total processed: ${stats.processed}/${stats.total}`);
    console.log('\nCategorization:');
    for (const [category, count] of Object.entries(stats.categorized)) {
        console.log(`  ${category}: ${count} notes`);
    }

    if (stats.patterns.length > 0) {
        console.log(`\n🎯 Patterns extracted: ${stats.patterns.length}`);
    }

    console.log('\n✨ Your notes have been integrated into PAI!');
    console.log('\nNext steps:');
    console.log('1. Review imported notes in Resources/Legacy_Notes/');
    console.log('2. Run "Catch me up on imported notes" in Claude');
    console.log('3. Extract insights for active projects');
}

// Run if called directly
if (require.main === module) {
    ingestNotes().catch(console.error);
}

module.exports = { ingestNotes, analyzeNote };
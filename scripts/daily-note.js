#!/usr/bin/env node

/**
 * Daily Note Creator for PAI System
 * Creates a new daily note with template for career tracking
 */

const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// Configuration
const OBSIDIAN_PATH = process.env.HOME + '/Obsidian';
const DAILY_NOTES_PATH = path.join(OBSIDIAN_PATH, 'Areas', 'Career', 'Daily_Notes');
const ARCHIVE_PATH = path.join(OBSIDIAN_PATH, 'Archive', 'Daily_Notes');

// Ensure directories exist
function ensureDirectories() {
    const dirs = [
        path.join(OBSIDIAN_PATH, 'Areas'),
        path.join(OBSIDIAN_PATH, 'Areas', 'Career'),
        DAILY_NOTES_PATH,
        ARCHIVE_PATH,
        path.join(ARCHIVE_PATH, format(new Date(), 'yyyy')),
        path.join(ARCHIVE_PATH, format(new Date(), 'yyyy'), format(new Date(), 'MM'))
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`✅ Created directory: ${dir}`);
        }
    });
}

// Get calendar events (placeholder - integrate with actual calendar)
function getCalendarEvents() {
    // This would integrate with your calendar API
    return [
        '09:00 - Team Standup',
        '10:00 - Deep Work Block',
        '14:00 - Project Review',
        '16:00 - Planning Session'
    ];
}

// Get active projects
function getActiveProjects() {
    const projectsPath = path.join(OBSIDIAN_PATH, 'Projects');
    if (!fs.existsSync(projectsPath)) {
        return [];
    }

    try {
        const projects = fs.readdirSync(projectsPath)
            .filter(file => fs.statSync(path.join(projectsPath, file)).isDirectory())
            .slice(0, 3); // Top 3 projects
        return projects;
    } catch (error) {
        return [];
    }
}

// Create daily note content
function createDailyNoteContent(date) {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayName = format(date, 'EEEE');
    const events = getCalendarEvents();
    const projects = getActiveProjects();

    const content = `# Daily Note - ${dateStr}
## ${dayName}

---

## 📅 Schedule
${events.map(event => `- [ ] ${event}`).join('\n')}

## 🎯 Top 3 Priorities
1. [ ] [Most important task for today]
2. [ ] [Second priority]
3. [ ] [Third priority]

## 💭 Thinking Log
<!-- Capture ideas, insights, and questions throughout the day -->
-

## ✅ Completed
<!-- Move completed items here -->
-

## 🚧 In Progress
<!-- Track what you're actively working on -->
-

## ⏭️ Tomorrow
<!-- Items to carry forward -->
-

## 💡 Insights
<!-- Key learnings and observations -->
-

## 🔗 Links
<!-- Related documents and projects -->
${projects.map(p => `- [[Projects/${p}]]`).join('\n')}
- [[Weekly Review]]
- [[Meeting Notes]]

---

## 🎯 Focus Blocks
- **Morning Block**: 09:00-11:00 - [Focus area]
- **Afternoon Block**: 14:00-16:00 - [Focus area]

## 📊 Energy Level
- Morning: ⚡⚡⚡⚡⚡
- Afternoon: ⚡⚡⚡
- Evening: ⚡⚡

## 🏆 Win of the Day
<!-- Celebrate one accomplishment -->


## 📝 Notes
<!-- Any additional notes for the day -->


---
*Created: ${format(new Date(), "yyyy-MM-dd 'at' HH:mm")}*
*Tags: #daily-note #career #${format(date, 'yyyy/MM')}*`;

    return content;
}

// Archive old daily notes
function archiveOldNotes() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (!fs.existsSync(DAILY_NOTES_PATH)) return;

    const files = fs.readdirSync(DAILY_NOTES_PATH);
    files.forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join(DAILY_NOTES_PATH, file);
            const stats = fs.statSync(filePath);

            if (stats.mtime < thirtyDaysAgo) {
                const year = format(stats.mtime, 'yyyy');
                const month = format(stats.mtime, 'MM');
                const archivePath = path.join(ARCHIVE_PATH, year, month);

                if (!fs.existsSync(archivePath)) {
                    fs.mkdirSync(archivePath, { recursive: true });
                }

                const newPath = path.join(archivePath, file);
                fs.renameSync(filePath, newPath);
                console.log(`📦 Archived: ${file} to ${year}/${month}/`);
            }
        }
    });
}

// Main function
function createDailyNote() {
    console.log('🚀 PAI Daily Note Creator\n');

    // Ensure directories exist
    ensureDirectories();

    // Archive old notes
    archiveOldNotes();

    // Create today's note
    const today = new Date();
    const fileName = `${format(today, 'yyyy-MM-dd')}.md`;
    const filePath = path.join(DAILY_NOTES_PATH, fileName);

    // Check if note already exists
    if (fs.existsSync(filePath)) {
        console.log(`📝 Daily note already exists: ${fileName}`);
        console.log(`📍 Location: ${filePath}`);

        // Open in default editor if available
        const { exec } = require('child_process');
        exec(`open "${filePath}"`, (error) => {
            if (!error) {
                console.log('📖 Opened in default editor');
            }
        });
        return;
    }

    // Create new daily note
    const content = createDailyNoteContent(today);
    fs.writeFileSync(filePath, content);

    console.log(`✅ Created daily note: ${fileName}`);
    console.log(`📍 Location: ${filePath}`);

    // Create symlink to current.md for easy access
    const currentLink = path.join(DAILY_NOTES_PATH, 'current.md');
    if (fs.existsSync(currentLink)) {
        fs.unlinkSync(currentLink);
    }
    fs.symlinkSync(filePath, currentLink);
    console.log('🔗 Updated current.md symlink');

    // Summary
    console.log('\n📊 Summary:');
    console.log(`- Date: ${format(today, 'EEEE, MMMM d, yyyy')}`);
    console.log(`- Projects linked: ${getActiveProjects().length}`);
    console.log(`- Calendar events: ${getCalendarEvents().length}`);

    // Open in default editor
    const { exec } = require('child_process');
    exec(`open "${filePath}"`, (error) => {
        if (!error) {
            console.log('\n📖 Opened in default editor');
        }
    });
}

// Run if called directly
if (require.main === module) {
    createDailyNote();
}

module.exports = { createDailyNote };
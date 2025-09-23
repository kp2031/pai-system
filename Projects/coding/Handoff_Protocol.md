---
migrated: 2025-09-20T02:07:03.753135
source: apple-notes-exporter
original_path: Backup/iCloud/Coding/Handoff Protocol.md
vault_folder: Projects/coding
---
# Handoff Protocol

**Handoff Protocol**
**
**
**Using 3 files**
**
**
**## Using the handoff system:**
1. Start each session by having the AI read all three files
2. After each session, have the AI update the HANDOFF_LOG.md
3. Use a prompt like: "Please read PROJECT_VISION.md, TASK_BREAKDOWN.md, and HANDOFF_LOG.md, then continue working on the next uncompleted task"

**
**
**Putting It All Together**
Here's your starter file structure:
**
**
**my-project/**
**├──**** CODING_STANDARDS.md     # How to write code**
**├──**** PROJECT_VISION.md       # What we're building**
**├──**** TASK_BREAKDOWN.md       # What needs to be done**
**├──**** HANDOFF_LOG.md         # Progress tracker**
**├──**** README.md              # Project overview**
**└──**** src/                   # Your actual code**
**
**
**First message to any AI assistant:** "Please read CODING_STANDARDS.md, PROJECT_VISION.md, TASK_BREAKDOWN.md, and HANDOFF_LOG.md before starting. Then continue work according to the task breakdown and update the handoff log when done."

**
**
**
**
File 1: PROJECT_VISION.md**
**

# Project Name: TaskMaster App

## Vision
Building a simple, beautiful task management app that helps people stay organized.

## Core Features
1. User accounts
2. Create/edit/delete tasks
3. Mark tasks complete
4. Categories for tasks
5. Due dates

## Technical Stack
- Frontend: React
- Backend: Node.js
- Database: PostgreSQL

**File 2: TASK_BREAKDOWN.md**

# Task Breakdown

## Phase 1: Setup (Week 1)
- [ ] Initialize React project
- [ ] Set up folder structure
- [ ] Install dependencies
- [ ] Create basic routing

## Phase 2: User System (Week 2)
- [ ] Design user database schema
- [ ] Create registration page
  - [ ] Form validation
  - [ ] Error handling
- [ ] Create login page

**# File 3: HANDOFF_LOG.md**

## 

# Handoff Log

## 2024-01-15 - AI Assistant: Claude
**What I worked on:**
- Created initial React project structure
- Set up routing for Home, Login, Register pages
- Created basic UI components

**Current state:**
- Basic navigation works
- Pages are created but have no functionality
- No backend yet

**Next steps:**
- Need to create the login form functionality
- Need to set up the backend API

**Known issues:**
- Mobile menu doesn't close when clicking a link

---

## 2024-01-16 - AI Assistant: GPT-4
**Starting from:** Claude's work on basic structure
**What I worked on:**
- Added login form with validation
...


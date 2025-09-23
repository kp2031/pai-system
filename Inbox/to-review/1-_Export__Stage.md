---
migrated: 2025-09-20T01:46:15.834990
source: apple-notes-exporter
original_path: Backup/iCloud/Obisidan/1- Export & Stage.md
vault_folder: Inbox/to-review
---
# 1. Export & Stage

 1. Export & Stage

  # Place all your exported MD files here:
  mkdir -p ~/Obsidian/Import/staging
  # Copy your Apple Notes exports to staging folder

  2. Run the Ingestion Script

  node ~/Obsidian/scripts/ingest-notes.js

  This script will:
  - ✅ Automatically categorize notes by domain (Career, Family, Finance, etc.)
  - ✅ Extract patterns and templates for reuse
  - ✅ Identify daily notes and projects
  - ✅ Add metadata headers for PAI context
  - ✅ Sort into appropriate folders
  - ✅ Generate domain contexts for Claude

  3. After Ingestion, Use Claude to:

  "Review all the notes I just imported and give me a summary of key insights"

  "What patterns do you see in my imported notes?"

  "Help me extract actionable items from my legacy notes"

  "Create a knowledge map from my imported notes"

  "Find all project-related notes from my import"

  "What recurring themes appear in my historical notes?"

  📁 Where Your Notes Will Live:

  - Daily Notes → Archive/Daily_Notes/[year]/
  - Project Notes → Projects/[project-name]/reference/
  - Domain Notes → Resources/Legacy_Notes/[category]/
  - Uncategorized → Resources/Legacy_Notes/unsorted/

  🧠 PAI Integration Benefits:

  1. Automatic Context: Domain contexts updated with imported knowledge
  2. Pattern Extraction: Reusable templates and workflows identified
  3. Cross-Domain Insights: Meta Director can analyze patterns across all notes
  4. Searchable Archive: All notes become part of your knowledge base
  5. Project Enhancement: Historical notes linked to current projects

  💡 Pro Tips:

  1. Batch Processing: The script handles hundreds of files efficiently
  2. Preservation: Original notes moved to processed/ folder as backup
  3. Metadata Addition: Each note gets PAI-compatible frontmatter
  4. Smart Categorization: Content-based sorting, not just filename

  Would you like me to add any specific categorization rules or patterns for your particular
  note-taking style?

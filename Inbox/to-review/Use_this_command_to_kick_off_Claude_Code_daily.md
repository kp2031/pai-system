---
migrated: 2025-09-20T01:46:15.757353
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/Archive/Use this command to kick off Claude Code daily….md
vault_folder: Inbox/to-review
---
# Use this command to kick off Claude Code daily…

Good morning! Let's continue building RehearSmart.

Please:
1. Run `npm run dev:status` to check current state
2. Review prompts/orchestrator.md to see what was completed yesterday and what's next
3. Check if there's an active session with `cat .session.json` - if yes, continue it; if no, start a new one
4. Pick the highest priority incomplete task from orchestrator.md
5. Run `npm run dev:start [feature-name]` for that task
6. Implement the feature completely with tests
7. Run `npm run dev:complete` when done
8. Update orchestrator.md marking completed items with ✅ and adding session notes
9. Commit and push all changes

Focus on completing one full feature today rather than starting multiple items.

Current goal: Complete MVP by [your date].

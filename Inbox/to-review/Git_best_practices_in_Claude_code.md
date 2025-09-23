---
migrated: 2025-09-20T01:58:12.743586
source: apple-notes-exporter
original_path: Backup/iCloud/Notes/Git best practices in Claude code.md
vault_folder: Inbox/to-review
---
# Git best practices in Claude code
![Git best practices in Claude code](images/Git%20best%20practices%20in%20Claude%20code.png)

Step 2 - create an md file inside your .claude folder that creates a special command 
![Git best practices in Claude code-1](images/Git%20best%20practices%20in%20Claude%20code-1.png)

![Git best practices in Claude code-2](images/Git%20best%20practices%20in%20Claude%20code-2.png)

Specify allow tools
![Git best practices in Claude code-3](images/Git%20best%20practices%20in%20Claude%20code-3.png)

---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

-   Current git status: ! git status"
-   Current git diff (staged and unstaged changes) : !'git diff HEAD'
-   Current branch: !'git branch --show-current
-   Recent commits: !'

git log --oneline -10'

## Your task

Based on the above changes, create a single git commit.
Follow the formatting guidelines in .cursor/rules/git-best-practices.mdc

---
migrated: 2025-09-20T01:49:45.584560
source: apple-notes-exporter
original_path: Backup/iCloud/Notes/CLAUDE_BEST_PRACTICES-md (old).md
vault_folder: Inbox/to-review
---
# CLAUDE_BEST_PRACTICES.md (old)

CLAUDE_BEST_PRACTICES.md (old)

# Claude Code: Our Best Practices Guide (June 2025)

Hey Claude, welcome to the team. This guide is our foundational document and your primary reference for how we work together. Your capabilities have grown significantly, and this file reflects the powerful tools at your disposal, like the Claude 4 architecture, integrated tool use, and advanced agentic workflows.

You must refer to and abide by these practices in all our interactions. Let's build some great software together.

---

### **Core Principles & Capabilities**

**1. Plan with a Budget: Calibrate Your Thinking**
"Plan mode" has evolved. Before you act, you must select the appropriate cognitive budget for the task by interpreting my keywords:
* `"think"`: For standard planning and straightforward tasks.
* `"think hard"` or `"think harder"`: For tasks requiring more detailed analysis and consideration of alternatives.
* `"ultrathink"`: For our most complex challenges. This command means you are to perform a comprehensive, deep analysis, exploring the codebase exhaustively and mapping out multiple potential strategies before presenting a plan.

**2. We're a Team: Communicate Like It**
I'm not just here to give you orders; I'm your engineering lead. I will interact with you like a fellow engineer, asking questions and describing tasks in natural language. Your role is to understand my requests and respond as a helpful, knowledgeable teammate.

**3. Be Surgical with Your Changes**
When I give you a direct order, execute it with precision. Focus on the targeted change without refactoring unrelated code. For complex bugs, diagnose the root cause first, explain it to me, and *then* propose the fix.

**4. Structure Complex Requests with XML**
For large, multi-faceted tasks, I will provide detailed prompts using XML tags like `<instructions>`, `<requirements>`, and `<testing>`. You must follow the logic outlined within these tags meticulously.

**5. Stay Grounded in Project Context**
This file and any other `*.md` file I point you to are your source of truth. Refer to them to maintain context on our project's architecture, libraries, and style guides.

**6. Your Memory is Your Responsibility**
Our work will often span multiple sessions. If we get disconnected, I expect you to use `claude --continue` to instantly load our most recent session. We don't have time to start from scratch.

**7. You Own the Version Control**
You're not just writing code; you're managing it. You will handle `commit` and `push` operations directly and are responsible for writing clear, concise, and conventional commit messages for all your changes.

**8. Work Autonomously on Background Tasks**
When I give you a task that doesn't require my immediate supervision using the `-p` flag, you are to work on it in the background while I focus on other things.

**9. Automate Our Workflows**
A good engineer makes their team more efficient. Proactively suggest and help build custom slash commands in our `.claude/commands` directory to automate repetitive workflows.

**10. Master the Multi-Agent Review Process**
"Reviewing your work" is a formal, multi-agent process. After you complete a task, I will start a new, clean instance of you. In this second instance, you must act as a skeptical senior engineer, critiquing the first instance's code. You will then integrate the feedback to produce a superior, final version.

**11. Use Your Full Senses: Multimodal Context is Key**
You have full vision capabilities. I will provide UI mockups, architectural diagrams, and other visuals. You must analyze these as deeply as you analyze text and use them as a primary source of truth for your work.

**12. Adhere to Agentic Test-Driven Development (TDD)**
Our TDD workflow is explicit:
    1. I will provide requirements.
    2. You will write the failing tests and confirm with me that they fail.
    3. You will **commit the failing tests to git.**
    4. You will then write the implementation code with the explicit instruction **not to modify the tests.**
    5. Iterate on your implementation until all tests pass.
    6. Commit the passing code.

**13. Know When to Start Over**
Don't get attached to your code. If you go down the wrong path, it is more efficient to discard the changes (`git reset`) and for me to re-prompt you. Be ready to throw your work away and start fresh.

**14. Build Your Own Tools with the SDK**
A core part of your role is to help build the next generation of our tooling using the Claude Code SDK (Python/TypeScript). When we identify a complex workflow, I expect you to co-develop custom agentic tools with me to automate it.

**15. Leverage Your Native Toolset**
You have a suite of integrated tools and must use them proactively:
* **Code Interpreter**: Execute code to verify your solutions and analyze the output *before* presenting your work to me.
* **Web Search**: When encountering a new library or obscure error, use web search to find documentation and solutions. Cite your sources.
* **Files API**: Interact with the filesystem to read, write, and modify files, but always ask for permission before making changes.

**16. Manage Your Memory and Our Budget**
Your performance and our costs are linked. Be an efficient steward of your context window:
* **Preserve the Cache**: Avoid actions that "bust" our prompt cache, like manually editing files mid-session or performing broad, unnecessary file searches.
* **Focus Your Scope**: When working on a feature, operate inside the relevant subdirectory. Reading the entire project for a small change is an expensive waste of tokens.

**17. Become Our Performance Optimization Specialist**
You must analyze the code you write and our existing repository for performance issues. When you suggest an optimization, you must prove its value by proposing and executing a benchmark, presenting the results to justify the change.

**18. Master Asynchronous and Parallel Work**
We will work on multiple tasks in parallel using `git worktree` checkouts. I expect you to operate in separate instances, each on a different feature branch, and to manage the context of each task independently.

**19. Integrate with Our External DevOps Tools**
Your responsibilities extend beyond the IDE. I have connected you to our team's Jira and Confluence. I expect you to use natural language to query issues, draft documentation, and participate in the full development lifecycle.

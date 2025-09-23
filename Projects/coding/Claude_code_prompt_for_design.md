---
migrated: 2025-09-20T01:46:15.699767
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /Claude code agents/Claude code prompt for design.md
vault_folder: Projects/coding
---
# Claude code prompt for design

![Claude code prompt for design](images/Claude%20code%20prompt%20for%20design.jpeg)

Gitingest
To take repositories and create LLM friendly versions to paste into AIs

Mega prompt provided so you only have to share the idea and the agents file - and it will generate the entire workflow 

https://github.com/contains-studio/agents

![Claude code prompt for design-1](images/Claude%20code%20prompt%20for%20design-1.png)

![Claude code prompt for design-2](images/Claude%20code%20prompt%20for%20design-2.png)

Paste the agents into Claude and ask if to create a workflow that links the agents to each other

![Claude code prompt for design-3](images/Claude%20code%20prompt%20for%20design-3.png)

Prompt:

I need to make a coding workflow from this. stricity coding
i would like to make next js apps from this i would like
ux then ui then full front-end and then backend and thats it for now but i want it from these agents
and these agents are going to need connection between them so i want you to make me connections or workflows between them
and this is how the workflows are made
> First use the code-analyzer subagent to find performance issues, then use the optimizer subagent to fix them
this is using multiple subagents togethter i want this kind of workflow
where i can start with a prd or an idea, and then based on that i continue

Next prompt

I needed to ask
where would they save this stuff??

Start with PRD that outlines the idea, purpose, goals, strategy etc.
Then
use the ux-researcher to map user flows and define core features, then use the sprint-prioritizer to create MVP scope and technical requirements
Then
Use the ux-researcher to create wireframes and interaction patterns, then use the sprint-prioritizer to break down into buildable components

And now in order to initialize everything use this prompt to generate all of them arms needed for each phase…

okay so i have to tell them this?
give me prompts for all the phases and then tell me how to use them with the file structure


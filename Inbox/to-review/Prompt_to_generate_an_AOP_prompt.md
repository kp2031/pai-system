---
migrated: 2025-09-20T01:58:38.631830
source: apple-notes-exporter
original_path: Backup/iCloud/Notes/Prompt to generate an AOP prompt.md
vault_folder: Inbox/to-review
---
# Prompt to generate an AOP prompt

Can you search the web for examples of prompts that other people have used with Gemini Pro or ChatGPT Pro to get them to build a really professional slide deck in their corporate template. The presentation output style I’m going for is a McKinsey style presentation with no images only text, graphs, call out bubbles and boxes with text - and all the elements that McKinsey uses and no more.

Can you elaborate more on each prompt so I have super detailed prompts that can really specifically call out how to build a really good McKinsey slide deck so I can really focus ChatGPT 5 Pro and Gemini 2.5 pro to get as close to the visuals and layouts that McKinsey uses. And at the end, can you share a best practices prompt that can take an excel of projects for annual planning and turn it into a slide by slide presentation using copilot pro 365? Please be very elaborate and detailed with your prompts using all the best practices. 

See this as an example of a generic prompt that you can use as a template to create really great prompts: 

CONTEXT
You will create an exceptional, production-ready prompt for a specific task/topic. The prompt must be unambiguous, richly contextualized, and immediately usable in ChatGPT or via the API. Optimize for GPT-5 models and modern capabilities (e.g., structured outputs, optional tool/function calling). Where applicable, include placeholders the user can fill in.

ROLE
You are a principal prompt architect for GPT-5 with 20+ years of cross-domain expertise. You design clear, testable instructions that produce reliable, high-quality outputs. You minimize ambiguity, prevent unintended behaviors, and build prompts that scale from human chat to API usage.

ACTION (follow these steps in order)
	1.	Confirm Topic/Goal
	•	If the user did not provide a topic/theme: ask for it politely and wait.
	•	If provided: restate the goal in one sentence, list key constraints/inputs, and note what success looks like.
	2.	Decide Model Mode (annotation only; do not switch models yourself)
	•	Default assumption: GPT-5 Chat.
	•	If tasks demand deep reasoning or multi-step planning (e.g., complex analysis, proofs, intricate coding), recommend GPT-5 Thinking in your “Usage Notes”.
	3.	Design Outputs & Interfaces
	•	Choose a primary output format (human-readable) and, when useful, add a machine-readable option:
	•	a) Structured Outputs via JSON Schema (for strict, parseable results).
	•	b) Function/Tool calling schema (if the prompt should trigger actions or fetch data).
	•	Add clear placeholders for user inputs (e.g., {TOPIC}, {TONE}, {AUDIENCE_LEVEL}, {DEADLINE}).
	4.	Author the Prompt using C.R.A.F.T.
	•	C – Context:
	•	Summarize the task domain, success criteria, constraints, references, available data, and any assumptions.
	•	R – Role:
	•	Assign an expert persona relevant to the task. Include scope, authority, and responsibilities.
	•	A – Action:
	•	Provide numbered, sequential steps the model should follow. Include:
	•	Disambiguation strategy if inputs are missing.
	•	Verification step(s) and a brief rationale checkpoint (3–5 concise bullets; do not reveal chain-of-thought).
	•	Error/edge-case handling, refusal rules, and when to ask for more info.
	•	F – Format:
	•	Specify the output shape (e.g., markdown sections, tables, bullet lists).
	•	If using JSON/structured outputs, include a schema (and note “return only valid JSON”).
	•	Define length limits, tone, language/reading level, and citation rules if sources are used.
	•	T – Target Audience:
	•	Define who will consume the result (e.g., role, expertise, locale, accessibility needs), and tailor style accordingly.
	5.	Quality & Safety Self-Review (run before finalizing)
	•	Check for: clarity, internal consistency, handling of missing inputs, correctness, bias/safety concerns, and strictness of output format.
	•	Ensure no chain-of-thought is requested; use brief rationales or summaries instead.
	•	If the task is risky or user intent is unclear, include a safe-completion path or a request for clarification.
	6.	Deliverables (return all of the following)
	•	(1) Final Prompt (C.R.A.F.T.) ready to copy/paste.
	•	(2) Variables/Placeholders list with guidance and examples.
	•	(3) Optional Structured Output Schema (JSON Schema) when useful.
	•	(4) Optional Tool/Function Definitions (JSON schemas) when relevant.
	•	(5) Two Example Calls:
	•	a) ChatGPT copy block (what a user would paste).
	•	b) API snippet (showing structured outputs or tools if included).
	•	(6) Usage Notes: model-mode recommendation (GPT-5 Chat vs GPT-5 Thinking), temperature/verbosity tips, and common pitfalls.

FORMAT (your response back to me must use this exact scaffold)
	1.	Final Prompt (C.R.A.F.T.)
	2.	Variables & Defaults (table or bullets; include {PLACEHOLDER} → description / example)
	3.	Optional Structured Output Schema (JSON Schema; omit if not helpful)
	4.	Optional Tool/Function Definitions (JSON; omit if not helpful)
	5.	Example Calls
	•	5a. ChatGPT copy block
	•	5b. API snippet (language of your choice)
	6.	Usage Notes & Tuning Tips

TARGET AUDIENCE
Primary: ChatGPT 5 Pro (GPT-5 Chat or GPT-5 Thinking). Secondary: API users who may need structured outputs or tool calls.

⸻

Built-in blanks you can fill later (examples)
	•	{TOPIC} – one-line task description
	•	{GOAL} – the outcome you want
	•	{AUDIENCE} – who will read/use the output (e.g., “VPs, non-technical”)
	•	{TONE} – e.g., “concise, professional”
	•	{OUTPUT_FORMAT} – e.g., “markdown with 3 sections and a table”
	•	{CONSTRAINTS} – e.g., word limits, banned content, deadlines
	•	{REFERENCES} – links, quotes, docs to rely on
	•	{EVAL_CRITERIA} – how success will be judged

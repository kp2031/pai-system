---
migrated: 2025-09-20T01:46:15.600647
source: apple-notes-exporter
original_path: Backup/iCloud/Knowledge Purpose Practice/PRD prompt.md
vault_folder: Inbox/to-review
---
# PRD prompt

**PRD prompt**
**
**
**Role**

You are a senior product lead + solutions architect + UX writer for AI-first PKM systems.

**Goal**

Produce a **Product Requirements Document (PRD)** for **KPP Assistant**—a cloud app that:
	•	Coaches purpose → projects → actions (Allen’s *Making It All Work* + GTD),
	•	Organizes vaults using **PARA**,
	•	Implements **Smart Notes/Zettelkasten** (atomic notes, literature/permanent notes, structure notes, linking habit, writing-to-think),
	•	Syncs bidirectionally with **Obsidian** (Markdown, frontmatter, backlinks), and
	•	Acts as a **brainstorming partner → artifact generator** (briefs, white papers, slide outlines).

**Users & Platforms**

Knowledge workers, ICs/managers, researchers, creators. Web app + macOS helper + iOS. Integrations: Obsidian (FS/Sync), iCloud/Drive/Git. AI: Claude, OpenAI, Gemini (BYO keys). Privacy-first; local-first options where feasible.

**Must-Have Capabilities (anchor requirements):**

	•	**Vault Sync** — Two-way sync; safe diffs; conflict resolution; ignore rules; offline queue.
	•	**KPP Coach** — Purpose canvas; Area charters; alignment checks that surface meaning and tradeoffs.
	•	**GTD Engine** — Universal inbox; clarify (next action/context/energy/time); organize (Projects/Areas); weekly/monthly reviews; calendar hooks.
	•	**PARA Automation** — Scaffolding; **classifier** to file notes into P/A/R/A; MoC generator; tag normalization.
	•	**Smart Notes Engine** —
	•	Atomic note creation assistant; literature-note capture (with citation), **permanent note** builder (claim-first), structure note (MoC) builder.
	•	**Linking habit** nudger (on create/edit: propose 2–3 links + rationales).
	•	Write-to-think sessions (progressive summaries, 300–600 word syntheses); **cluster detection** (topic discovery) and **gap prompts**.
	•	**AI Partner Workspace** — Chat with tools: read/edit/move/rename; cross-note synthesis; citation insertion; draft artifacts with provenance links; diff + approval.
	•	**Artifact Studio** — Templates (PRD/RFC/white paper/deck); tone controls; export to Markdown/Docx/PPTX; preserve backlinks.
	•	**Governance** — Activity log, versioning, rollbacks, policy rules (e.g., “no auto-archive without approval”).

**Constraints & Guardrails**

Markdown is the source of truth; user owns files. Redaction rules; local preview; explicit approvals on AI writes. Data retention: off by default. SOC2 path; PII minimization; encryption in transit/at rest.

**Deliverables (produce a spec with these sections):**

	1.	**Vision & Success Metrics** — North star; 6–8 outcome metrics (e.g., % notes linked, weekly review completion, time-to-first-draft, artifacts shipped).
	2.	**Personas & JTBD** — 3–5 personas; jobs; success criteria.
	3.	**User Stories & Flows** —
	•	Capture → Clarify → Organize (PARA) → Plan → Do → Review.
	•	**Smart Notes Pipeline:** capture → literature → permanent (atomic) → structure note → artifact.
	•	Brainstorm → Outline → Draft → Revise → Publish.
Include Mermaid flow/state diagrams.
	4.	**Functional Requirements** —
	•	**Vault Sync & Mapping** (FS watchers, diffing, conflict policy).
	•	**KPP Coach** (purpose tree, Area scorecards, alignment checks).
	•	**GTD Engine** (inbox, contexts, waiting-for, someday/maybe, review scheduler).
	•	**PARA Automation** (classifier, MoC generator, tag normalizer, archive rules).
	•	**Smart Notes** (atomic note template enforcement; literature import from web/PDF with citation; **permanent note builder** with “claim-reason-links”; link recommender with explanation; structure note curator).
	•	**AI Workspace** (read/plan/write with dry-run diffs; “reasoning view” transcript; undo/rollback).
	•	**Artifact Studio** (templated outputs; references footnoted; backlinks preserved).
	5.	**NFRs** — Latency SLAs; scale targets; offline/local mode; accessibility (WCAG 2.2 AA).
	6.	**Information Architecture / Data Model** — Entities: Note, LiteratureNote, PermanentNote, StructureNote(MoC), Project, Area, Resource, Archive, Task, Artifact, ReviewSession, LinkEdge, Tag. Frontmatter schemas; ERD (Mermaid).
	7.	**System Architecture** — C4 diagrams: Context/Container/Component. Modules: sync engine, embeddings/ANN, prompt server, tool sandbox, cost monitor, policy engine, renderer.
	8.	**AI Design** —
	•	Retrieval strategy (embeddings per note + metadata facets; recency/semantic mix).
	•	Prompt library: **PARA classify**, **link suggestor (with why)**, **permanent note builder**, **MoC generator**, **artifact drafter**, **review coach**.
	•	Evaluation: golden tasks; rubric scoring (atomicity, link quality, citation integrity, purposeful alignment).
	•	Safety: redaction, ops permissions, rate/cost caps.
	9.	**Security & Compliance** — STRIDE threat model; key mgmt; audit logs; tenant isolation; data subject requests.
	10.	**Telemetry & Experiments** — Event taxonomy (note_created, link_added, review_completed, artifact_published); experiments (link threshold, MoC density).
	11.	**Roadmap** —

	•	**MVP (90 days):** Obsidian sync; inbox; PARA scaffold; Smart Notes templates; link suggester; AI draft with diffs.
	•	**v1 (6 mo):** MoC generator; weekly review coach; artifact studio; cluster detection; calendar integration.
	•	**v1.5:** collaborative sessions; offline/local model; enterprise SSO/DLP.

	12.	**Open Questions & Risks** — Top 10 unknowns; risk matrix + mitigations.

**Smart Notes Specifics (make explicit in the PRD):**

	•	**Atomic note enforcement:** title-as-claim; 3–7 sentence body; “Links to” and “Linked from” blocks; required 2+ outgoing links at creation.
	•	**Linking heuristics:** prefer **explanatory links** (“X extends Y,” “X contrasts with Y,” “X depends on Y”); request short “why” texts per link.
	•	**Structure notes (MoCs):** curated hub pages with 1-line summaries; auto-suggest new entries; caps on size (split when >~40 items).
	•	**Write-to-think cadence:** weekly 45-min review producing a 300–600 word synthesis; track cadence adherence, show streaks.
	•	**Retrofit workflow:** archive triage → seed themes → cluster → MoC → per-cluster synthesis → artifact candidate list.

**Acceptance Criteria (examples):**

	•	≥85% correct PARA classification on a labeled test set; explain-why for each classification.
	•	**Link Coverage:** median new permanent note has ≥2 outgoing links; **Link Quality** score (human-rated) ≥4/5 on 80% samples.
	•	**Review Completion:** ≥60% weekly review completion among active users after 4 weeks.
	•	**Draft Velocity:** time to produce a first draft (1,200–1,800 words) reduced by ≥50% vs baseline.
	•	All AI writes show a diff and require explicit approval; full rollback available.

**Personalization Placeholders**

Vault size: {n notes}; Domain: {e.g., strategy/research}; Privacy: {low/med/high}; Providers allowed: {Claude/OpenAI/Gemini/local}.

**Output Format**

Return a **spec-style Markdown PRD** with ToC, requirement tables, checklists, Mermaid diagrams.

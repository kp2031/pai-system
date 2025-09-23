---
migrated: 2025-09-20T02:07:03.765715
source: apple-notes-exporter
original_path: Backup/iCloud/Coding/Codex/Here’s a crisp, repeatable kickoff plan tailored to this repo and….md
vault_folder: Inbox/to-review
---
# Here’s a crisp, repeatable kickoff plan tailored to this repo and…

Here’s a crisp, repeatable kickoff plan tailored to this repo and PRD.

**Kickoff Ritual**
- Source of truth: use `PRD.md` only. Anything ambiguous goes to “Open Questions
” in `plan.md`.
- Planning artifacts: generate/update `plan.md` (phase plan) and `agents.md` (ta
sk tracker) with GENERATED markers.
- Phase focus: work only on the current phase (P0→P14), don’t “sneak” later scop
e.

**One-Time Repo Setup**
- Branch model: `main` (stable), `develop` (integration), `feature/*`, `fix/*`.
- CI/CD: add CI (build+test+lint+format), CodeQL, actionlint; enable Dependabot;
 set branch protection and merge queue.
- Conventions: Conventional Commits, warnings-as-errors in CI, PRs must link to
acceptance criteria in `plan.md`.

**Template Cleanup (specific to this repo)**
- Current state: SwiftUI sample app with SwiftData (`Item.swift`, `ContentView.s
wift`, `GlassmarkApp.swift`).
- P0 requires: document-based app with `NSDocument`, UTType registration, autosa
ve, sandbox entitlements, Universal 2, tests, CI.
- Cleanup strategy (P0):
  - Remove the SwiftData sample (`Item.swift`, list UI) and any preview-only sca
ffolding.
  - Introduce framework target `GlassmarkCore` (document model) and app target c
onfigured for `NSDocument`.
  - Register UTTypes (.md, .markdown, .mdown, .mkd) and add sandbox entitlements
 (user-selected read/write).
  - Keep `Assets.xcassets` and any useful app harness, but minimize UI to a plai
n text editor.

**Kick Off (P0)**
- Define scope from PRD: UTTypes, autosave, tests, CI; explicitly exclude render
ing/WYSIWYG.
- Break down tasks in `agents.md` with owners and due dates.
- Create issues per task (Scaffolding, Features, QA, Docs, Gate) and a milestone
 “P0 — Hello Markdown”.
- Open a `feature/p0-hello-markdown` branch; keep changes minimal and determinis
tic.

**Phase Loop (Repeat Every Phase)**
1) Groom phase: copy acceptance criteria and test plan into `plan.md(Pk)`.
2) Tasking: mirror to `agents.md` with atomic, checkable items.
3) Build: implement behind flags when risky; keep PRs small (≤300 lines changed
where possible).
4) Test: add unit/UI/snapshot/perf per PRD test plan; hit perf budgets locally.
5) CI: ensure build/test/lint/format green; CodeQL clean; actionlint clean.
6) Review: require at least one reviewer; link PR to `plan.md(Pk)` acceptance cr
iteria.
7) Gate: check off the “Gate” box in `agents.md` only when all criteria pass.
8) Merge: squash-merge to `develop`, then release-merge to `main` when stable; u
pdate CHANGELOG.

**Definition of Done (per phase)**
- All acceptance criteria in `plan.md(Pk)` satisfied.
- Tests added/updated; coverage meets targets where specified.
- CI green; no warnings; CodeQL no new alerts.
- Docs updated: `plan.md`, `CHANGELOG.md`, user-visible notes if needed.
- Feature flags default set per PRD (e.g., preview on until WYSIWYG is ready).

**Is it the same every time?**
- The ritual is the same (plan → task → build → test → gate → merge).
- Only the phase scope and acceptance criteria change; the gating and delivery m
echanics remain consistent.

This approach ensures each feature/phase completes cleanly, with traceable crite
ria and minimal thrash.

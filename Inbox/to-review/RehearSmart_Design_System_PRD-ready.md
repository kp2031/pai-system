---
migrated: 2025-09-20T01:46:15.808888
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/Design notes/RehearSmart Design System (PRD-ready).md
vault_folder: Inbox/to-review
---
# RehearSmart Design System (PRD-ready)

**RehearSmart Design System (PRD-ready)**

A cohesive, iOS-native system distilled from the 10 reference apps you liked—optimized for single-focus coaching, offline privacy, and calm, confidence-building practice.

⸻

**Design Principles**

	1.	**Single-focus by default**

One goal per session. UI should prevent overload and spotlight the chosen focus.
	2.	**Calm, confident, native**

Use iOS patterns, SF type, familiar controls, and fluid motion. Avoid gamified pressure.
	3.	**Privacy-first, offline-first**

All critical flows work without connectivity. Make “on-device” status visible and reassuring.
	4.	**Tight feedback loop**

Rehearse → 1 clear tip → quick action. Every screen either starts a session, supports it, or reflects on it.
	5.	**Progress, not perfection**

Soft charts, streaks, and subtle celebrations. No leaderboards.

⸻

**Information Architecture**

	•	**Home**: “Start Rehearsal” card, focus picker, today’s streak/status, last tip.
	•	**Rehearse (HUD)**: timer, live levels, transcript preview, “focus hint” chip.
	•	**Review**: single coaching takeaway, supporting examples from transcript, “apply to script” CTA.
	•	**Scripts**: adaptive script list, inline edits & version diffs.
	•	**Progress**: streak calendar, trend cards, milestones.
	•	**Settings**: Privacy & data, Offline assets, Audio input, Notifications, About.

Primary nav: **Tab bar** (Home / Scripts / Progress / Settings).

⸻

**Visual Language & Tokens**

**Color (semantic first)**

	•	fg.primary: #0A0A0A (Light) / #FFFFFF (Dark)
	•	fg.muted: #6B7280 / #9CA3AF
	•	accent.primary: #0A84FF (iOS accent)
	•	accent.positive: #34C759
	•	accent.warning: #FF9F0A
	•	accent.error: #FF3B30
	•	bg.base: system background (auto Light/Dark)
	•	bg.elevated: system secondary background
	•	bg.glass: translucent white/black with adaptive opacity (see Glass)

Use semantic tokens in UI; map to hex at build time to respect Light/Dark + High Contrast.

**Type**

	•	**SF Pro** for text; **SF Rounded** for timers, large numbers, celebratory counts.
	•	Dynamic Type: respect sizes up to Accessibility XL.
	•	Scales:
	•	display-1: 34/41, semibold (hero numbers, e.g., timer)
	•	title-1: 28/34, semibold
	•	headline: 17/22, semibold
	•	body: 17/24, regular
	•	caption: 13/18, regular

**Spacing & Radius**

	•	Spacing scale: 4, 8, 12, 16, 24, 32, 48
	•	Radii: corner.s 8, corner.m 12, corner.l 20, corner.full 999

**Liquid Glass Surfaces (blur + translucency)**

	•	glass.s (toolbars, chips): blur 12, overlay 0.18
	•	glass.m (cards, HUD): blur 20, overlay 0.24
	•	glass.l (sheets): blur 30, overlay 0.28
	•	**Rule**: content behind must remain legible at AA contrast; auto-boost foreground if needed.

**Shadows / Elevation**

	•	Use iOS material elevation cues sparingly. Prefer **depth via blur + contrast** over heavy shadows.

**Motion & Haptics**

	•	Durations: micro 100ms, standard 220ms, gentle 500ms
	•	Eases: standard iOS spring for entering; ease-out for success; ease-in for dismiss
	•	Haptics:
	•	Start/Stop: .impactMedium
	•	Milestone (60s, end): .success
	•	Error/permissions: .warning

⸻

**Core Patterns**

**Single-Focus Coaching**

	•	**Before session**: required focus selection (e.g., “Pace”, “Filler words”, “Clarity”).
	•	**During**: one **hint pill** pinned in HUD (e.g., “Shorten sentences”).
	•	**After**: one **tip card** with example, why it matters, and a single “practice action.”

**Offline-First UX**

	•	Global **“On-device • Offline”** status pill in header when no network; swap to “On-device • Online” when available.
	•	Download toggles for any model/assets; determinate progress bars.
	•	All dialogs clarify: “Processing never leaves your device.”

**Adaptive Script Evolution**

	•	Inline suggestion chips (Apply / Dismiss).
	•	Diff view with **added/removed** highlights.
	•	Version timeline: v1 First Draft → v2 Post-Session → v3 Speaker-style.

⸻

**Key Components**

**1) Start Rehearsal Card**

	•	**States**: default / focus-selected / countdown / disabled (no mic)
	•	**Anatomy**: title, focus chips (scroll), duration (2–3 min), primary CTA “Start speaking”
	•	**Rules**: disable CTA until a focus is selected; duration always visible

**2) Focus Chip Group**

	•	**Chips**: outline by default; selected = filled + checkmark
	•	**Examples**: Pace, Filler Words, Pauses, Eye Contact (note: camera optional), Clarity, Confidence
	•	**Behavior**: single-select; long-press to learn more

**3) Recording HUD (Liquid Glass)**

	•	**Top**: timer (display-1, SF Rounded), progress ring, levels meter
	•	**Center**: hint pill (e.g., “Breathe before each point”)
	•	**Bottom**: large mic button (toggle), mark moment, end session
	•	**Live transcript preview** (two lines, scrubbable after stop)

**4) Hint Pill**

	•	Compact, glass.s; icon + 3–5 words
	•	Tapping opens a short explanation (sheet) with one example

**5) Session Summary Card**

	•	**Hero**: one-line takeaway (e.g., “Great pacing; reduce fillers”)
	•	**Evidence**: 1–2 transcript excerpts (timestamped)
	•	**Action**: “Try this next time” with a single checkbox task
	•	**Secondary**: Save to script / Share excerpt

**6) Progress Ring + Streak Calendar**

	•	**Ring**: minutes today vs goal; soft completion animation
	•	**Streak**: compact month grid; today highlighted; misses are neutral (no shaming)

**7) Transcript Viewer**

	•	**Modes**: Read / Edit / Diff
	•	**Elements**: filler words highlighted, pause markers, time jump chips
	•	**Actions**: convert excerpt → script line; add note

**8) Script Card**

	•	Title, tags (topic, audience, length), last updated
	•	**Inline** edits; suggestion chips appear post-session

**9) Privacy & Permissions**

	•	**First-run sheet**: mic -> explains on-device processing, no uploads
	•	**Settings**: toggles
	•	Process on device (locked ON)
	•	Never upload audio (locked ON)
	•	Auto-delete raw audio after *N* days (default 7)
	•	Export transcript (manual only)

**10) Offline Indicator**

	•	Status pill with tooltip: clarifies what works; never blocks rehearsal.

⸻

**States & Edge Cases**

	•	**No mic permission**: Start card CTA shows “Enable Microphone” → single screen explainer → system prompt.
	•	**Low storage**: gentle banner “Storage low: auto-deleting oldest raw audio first.”
	•	**No network**: keep everything functional; defer exports/sync with a queue and badge count.
	•	**Interrupted call/Siri**: auto-pause with “Resume?” sheet on return.
	•	**Very noisy input**: HUD shows “High noise detected; move closer” (non-blocking).

⸻

**Copy Guidelines (tone & examples)**

	•	**Supportive, specific, brief.**

	•	Pre-session: “Pick one thing to improve today.”
	•	Hint pill: “Pause after key points.”
	•	Summary title: “You spoke clearly—great work.”
	•	Action: “Swap ‘um’ with a 1-second pause.”
	•	Privacy: “Your audio never leaves this iPhone.”

⸻

**Measurement (on-device only)**

	•	**Per-session metrics**: duration, words/min, filler rate, average pause, clarity score (0–100), confidence proxy (variance of volume/pace).
	•	**Trends**: 7-day and 30-day smoothing.
	•	**Success**: weekly active rehearsals + reduction in chosen focus metric.

⸻

**Accessibility**

	•	VoiceOver labels on mic, timer, hint, mark moment, and transcript excerpts.
	•	Dynamic Type support across all views; avoid truncation on XL.
	•	Contrast: all text ≥ AA on glass surfaces; auto-elevate text color over imagery.
	•	Haptics complemented by visual states; never haptics-only.

⸻

**Content Structure (for PRD checklists)**

**Home**

	•	Start Rehearsal card (focus required)
	•	Today ring + streak
	•	Last tip recall
	•	“On-device” status pill

**Rehearsal**

	•	HUD with timer, levels, hint pill
	•	Mark moment control
	•	Pause/Resume interstitial
	•	End → Summary

**Review**

	•	One tip card + example excerpt
	•	“Apply to Script” CTA
	•	“Try this next time” single task
	•	Share/export (manual)

**Scripts**

	•	List with tags
	•	Editor with suggestions & diffs
	•	Version timeline

**Progress**

	•	Streak calendar
	•	Trend cards (focus metrics)
	•	Milestones

**Settings**

	•	Privacy toggles (locked ON)
	•	Offline assets manager
	•	Notifications (gentle reminders)
	•	About & Support

⸻

**Component Specs (concise)**

**StartRehearsalCard**

Props: selectedFocus, duration, isMicGranted, isOffline.
States: default / selected / blocked (no mic).
CTA: Start speaking.

**FocusChip**

Props: label, selected.
States: default / selected / disabled.
Behavior: single-select; long-press → info sheet.

**RecordingHUD**

Props: focus, elapsed, levels, isRecording.
Controls: mic toggle, mark moment, end.
Overlay: HintPill.

**HintPill**

Props: icon, text, severity?

Tap → HintSheet (title, 2-sentence guidance, example).

**SummaryCard**

Props: title, evidence[], actionLabel, onApplyToScript.
Secondary: share, delete.

**ProgressRing**

Props: minutesCompleted, goalMinutes.
State: completion animation at 100%.

**StreakCalendar**

Props: dates[], completed[].
State: neutral miss; confetti only on 7-day multiples.

**TranscriptViewer**

Modes: read / edit / diff.
Highlight: fillers, long sentences, pause markers.

⸻

**Liquid Glass Usage Map**

	•	**Navigation bars / tab bars**: glass.s
	•	**Rehearsal HUD panel & Summary card**: glass.m
	•	**Sheets & modals**: glass.l
	•	**Chips & pills**: glass.s

⸻

**Micro-interactions (signature moments)**

	•	**Countdown 3-2-1**: subtle scale-in numerals with soft haptic taps.
	•	**Finish**: progress ring completes, gentle confetti burst behind glass, .success haptic.
	•	**Apply Suggestion**: chip flips to a checkmark with a 120ms spring, diff view updates live.

⸻

**Empty States**

	•	**Home (new)**: “Ready to rehearse? Pick one focus to start.” (Focus chips shown)
	•	**Scripts (new)**: “No scripts yet—create from a rehearsal summary.”
	•	**Progress (new)**: “Your trends will appear after a few sessions.”

⸻

**Privacy Language (surface in onboarding & settings)**

	•	“All analysis happens on this device.”
	•	“Audio and transcripts are stored locally.”
	•	“You control exports; nothing syncs without your action.”
	•	“Auto-delete raw audio after 7 days (change anytime).”

⸻

**Quick Flow Specs**

**Start → Rehearse → Review**

	1.	Home: select focus → Start speaking
	2.	3-2-1 countdown → HUD (hint pill visible)
	3.	End → Summary card with 1 tip + 2 evidence excerpts
	4.	Apply to Script → shows diffs in Script editor
	5.	Back to Home with updated ring & streak

⸻

**Visual Do’s / Don’ts**

	•	**Do** keep one dominant action per view.
	•	**Do** use rounded typography for time & rings.
	•	**Do** keep glass translucent but legible; boost contrast dynamically.
	•	**Don’t** stack multiple charts on one screen.
	•	**Don’t** show more than one coaching tip per session.

⸻

**Implementation Notes (handoff)**

	•	Support Light/Dark from day one; test legibility on bg.glass.
	•	Make all metrics pluggable so Apple Intelligence improvements don’t change UI.
	•	Local-only logging; no network retries for private actions.
	•	Prepare for **download-less** cold start: everything critical ships in app bundle.

⸻

If you want, I can turn this into a one-page visual spec (screens + tokens) or a Figma component kit that mirrors this structure.

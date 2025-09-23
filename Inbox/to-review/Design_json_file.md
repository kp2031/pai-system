---
migrated: 2025-09-20T01:46:15.809068
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/Design notes/Design json file.md
vault_folder: Inbox/to-review
---
# Design json file

{
  "color": {
    "fg": {
      "primary_light": "#0A0A0A",
      "primary_dark": "#FFFFFF",
      "muted_light": "#6B7280",
      "muted_dark": "#9CA3AF"
    },
    "accent": {
      "primary": "#0A84FF",
      "positive": "#34C759",
      "warning": "#FF9F0A",
      "error": "#FF3B30"
    },
    "bg": {
      "base_light": "#FFFFFF",
      "base_dark": "#000000",
      "elevated_light": "#F2F2F7",
      "elevated_dark": "#1C1C1E",
      "glass_white": "rgba(255,255,255,0.24)",
      "glass_black": "rgba(0,0,0,0.24)"
    }
  },
  "type": {
    "family_primary": "SF Pro (system)",
    "family_rounded": "SF Rounded (numbers/timers)",
    "scales": {
      "display_1": { "size": 34, "line_height": 41, "weight": "semibold" },
      "title_1": { "size": 28, "line_height": 34, "weight": "semibold" },
      "headline": { "size": 17, "line_height": 22, "weight": "semibold" },
      "body": { "size": 17, "line_height": 24, "weight": "regular" },
      "caption": { "size": 13, "line_height": 18, "weight": "regular" }
    }
  },
  "spacing": [4, 8, 12, 16, 24, 32, 48],
  "radii": { "s": 8, "m": 12, "l": 20, "full": 999 },
  "glass": {
    "s": { "blur": 12, "overlay_opacity": 0.18 },
    "m": { "blur": 20, "overlay_opacity": 0.24 },
    "l": { "blur": 30, "overlay_opacity": 0.28 }
  },
  "motion": {
    "durations_ms": { "micro": 100, "standard": 220, "gentle": 500 },
    "haptics": { "start_stop": "impactMedium", "milestone": "success", "warning": "warning" }
  },
  "components": [
    "StartRehearsalCard",
    "FocusChip",
    "RecordingHUD",
    "HintPill",
    "SummaryCard",
    "ProgressRing",
    "StreakCalendar",
    "TranscriptViewer",
    "ScriptCard"
  ]
}

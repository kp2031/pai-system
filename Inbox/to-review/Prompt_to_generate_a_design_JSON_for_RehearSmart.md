---
migrated: 2025-09-20T01:46:15.806272
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/Design notes/Prompt to generate a design JSON for RehearSmart.md
vault_folder: Inbox/to-review
---
# Prompt to generate a design JSON for RehearSmart

I need your help to redesign the existing app. can you please share a prompt that i can input into claude code "planning mode" that helps me build a solid plan in claude code to redsign the app using the output from this structure. knowing what you know about what I'm trying to build, an app that people can use to help them rehearse their public speaking, can you please help? 
Extract and document the following elements:
**Visual Design Language:**

- Color palette (primary, secondary, accent, neutral colors with hex/rgb values)
- Typography system (font families, sizes, weights, line heights, letter spacing)
- Spacing system (base unit, scale progression, component padding/margins)
- Border styles (radius values, stroke weights, border colors)
- Shadow system (elevation levels, blur/spread values, shadow colors)
- Animation/transition patterns (duration, easing functions, common animations)
**Component Architecture:**

- Layout patterns (grid systems, container widths, breakpoints)
- Common UI components (buttons, cards, inputs, navigation patterns)
- Component states (default, hover, active, disabled, focus)
- Icon style and usage patterns
- Form element styling and behavior
**Design Principles:**

- Visual hierarchy methods
- Information density approach
- Interaction patterns
- Accessibility considerations
- Responsive behavior patterns
**Brand Characteristics:**

- Overall aesthetic (minimal, bold, playful, professional, etc.)
- Visual tone and personality
- Key distinguishing features
- Design philosophy indicators
Output Format:
Return a structured JSON object with clear categorization. Each design token should include:
- The extracted value
- Usage context/rules
- Any variations or conditional applications
Focus on extractable design patterns rather than specific content. The goal is to create a reusable design system that maintains consistency across different implementations.
Example structure:
```json
{
  "designSystem": {
    "colors": {
      "primary": {"value": "#...", "usage": "..."},
      "secondary": {...}
    },
    "typography": {
      "scale": {...},
      "fonts": {...}
    },
    "spacing": {...},
    "components": {...},
    "patterns": {...}
  }
}

![Prompt to generate a design JSON for RehearSmart](images/Prompt%20to%20generate%20a%20design%20JSON%20for%20RehearSmart.png)


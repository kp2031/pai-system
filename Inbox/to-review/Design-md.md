---
migrated: 2025-09-20T01:46:15.806092
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/Design notes/Design-md.md
vault_folder: Inbox/to-review
---
# Design.md

# Apple WWDC25 New Design Best Practices

---

## I. Foundation: Principles and Structure

### 1. Grounded Clarity

- **Key principle:** Apps must immediately convey *where* the user is, *what* they can do, and *where* they can go next.
- Structure and navigation should be self-explanatory and encourage confident use.
- Reduce cognitive load, hesitation, and friction at every step.

### 2. Information Architecture

- Write out every feature, workflow, and wish-list item before designing structure.
- Empathize with how, where, and when users approach your app.
- Remove nonessential features, clarify names, group logically.
- Only keep what is critical at any given time.
- The app’s foundation enables discoverability and focus—not just minimalism.

---

## II. Navigation: Movement and Orientation

### 1. Tab Bars

- For section-level navigation, not action triggers.
- Always visible for ease of orientation.
- Limit the number of tabs to core sections.
- Clear, explicit tab labels; use recognizable icons from SF Symbols.
- No overloading—only top-level, essential sections deserve a tab.

### 2. Toolbars

- Place screen-specific actions in toolbars, not in the tab bar.
- Include clear titles describing screen context.
- Most important actions only; use system icons when possible.
- Use `ToolbarSpacer` API for spacing/grouping related actions.
- Visual grouping clarifies relationships among actions.

### 3. NavigationSplitView & Modular Navigation

- Use `NavigationSplitView` for hierarchical navigation.
  - Liquid Glass sidebars float above content for clarity.
  - Use `backgroundExtensionEffect` for mirrored/blurred extension beneath.
- Inspectors use subtler Liquid Glass layering for contextual grouping.

---

## III. Content Design: Organization and Disclosure

### 1. Progressive Disclosure

- Present only what’s necessary up front; reveal more detail as needed.
- Use list sections, titles, and disclosure controls.
- Group content by time, progress, relationships, or events.
- Prefer lists for scannability and efficiency; use Apple’s templates for consistency.
- Use collections for large/visual datasets with consistent spacing and clear grouping.

### 2. Layout Habitability

- Plan for flexible text lengths and sizes (support Dynamic Type).
- Ensure UI adapts to language, accessibility settings, device form factor.
- Use system layouts/templates to inherit accessibility/compliance.

---

## IV. Visual Design: Materials, Hierarchy, and Style

### 1. Material – Liquid Glass

- **Liquid Glass:** Adaptive material for controls/navigation, inspired by glass and fluid.
  - Adapts to underlying content, elevates controls without dominating.
  - Unified application across system controls.
- Layering (sidebars, inspectors, toolbars, sheets) must harmonize via Liquid Glass.

### 2. Controls and Buttons

- Use standard controls for “automatic” new look/behavior.
- Controls now transform with Liquid Glass during interaction.
- Bordered buttons use capsule shape by default; configurable with size and shape modifiers.
- Sliders get tick marks (automatic/customizable); can set neutral start points.
- Menus and popovers: leading icons, consistent layouts platform-wide.
- Monochrome icon palette to reduce visual noise.
  - Use tints only for meaningful highlights.

### 3. Badges, Alerts, Accessories

- Use `badge` for toolbar item notifications.
- Sheets, menus, dialogs, popovers animate (“morph”) out of trigger element.
- Partial-height sheets with curved, Liquid Glass backgrounds nest at screen edges.

### 4. Custom Views with Liquid Glass

- Use `glassEffect` (optionally with custom shape) for overlays, badges, accents.
- Group multiple glass elements with `GlassEffectContainer` for consistency.
- Use `interactive` modifier for animated, tactile feedback.

---

## V. Hierarchy, Typography, and Color

### 1. Visual Hierarchy

- Guide the user by size, contrast, position, spacing.
- Most important content should be largest/highest contrast.
- Use system text styles for automatic adaptation and hierarchy.
- Apply gradients or blurs behind text over images for readability.

### 2. Imagery and Cohesiveness

- Lists and groups need consistent style (color, shape, type).
- Pick a color palette and establish rules for application.
- Use system/semantic colors for adaptability and highlight with brand accent sparingly.

### 3. Accessibility

- System colors/text styles ensure support for dark/light mode and accessibility.
- Avoid custom colors/styles that undermine adaptive behaviors.

---

## VI. Platform Guidance / Implementation APIs

### 1. SwiftUI Modifiers and APIs

- Use `backgroundExtensionEffect` to extend content behind glass.
- `tabBarMinimizeBehavior` lets tab bars minimize on scroll.
- Place controls above the tab bar with `tabViewBottomAccessory`.
- Use `ToolbarSpacer` and `sharedBackgroundVisibility` for flexible toolbars.
- `searchable` modifier for system-consistent, adaptable search fields.
- `searchToolbarBehavior` opts into minimized search variant.
- Use `glassEffect`, `GlassEffectContainer`, `glassEffectID` for custom glass effects.
- Use concentric rectangle shape for proper container/corner alignment.
  
### 2. Remove Legacy Backgrounds

- Remove legacy backgrounds/darkening—embrace new system effects.
- Replace custom backgrounds that conflict with new visuals.

---

## VII. Continuous Improvement and Audit

- **Iterate regularly:** Each pass improves usability, clarity, system coherence.
- Start with system resources: Apple templates, semantic colors, SF Symbols.
- Audit your app for:
  - Legacy backgrounds,
  - Navigation pitfalls,
  - Missed opportunities for new controls and layouts.
- Always prioritize accessibility, hierarchy, and clarity.

---

> *Design is iterative and benefits from continual refinement. Follow Apple’s latest system guidance for structure, clarity, and delight throughout your app.*


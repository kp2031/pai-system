---
migrated: 2025-09-20T01:46:15.805862
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/Design notes/Apple Design System & Human Interface Guidelines- Insights for Building….md
vault_folder: Inbox/to-review
---
# Apple Design System & Human Interface Guidelines: Insights for Building…

**# Apple Design System & Human Interface Guidelines: Insights for Building an AI‑Driven Rehearsal App**
**## Introduction**
Apple’s 2025 update introduced **Liquid Glass**, a dynamic material that unifies UI design across iOS 26, iPadOS 26, macOS Tahoe, watchOS 12 and tvOS 18. Liquid Glass combines the optical qualities of glass with a **fluidity** that reacts to content, lighting and motion_apple.com_. It underpins a new design system that prioritizes content focus, context awareness and spatial depth. To build a public‑speaking rehearsal app (Rehearsmart) that looks and feels like it was crafted by Apple, developers must understand this new design system and the underlying **Human Interface Guidelines (HIG)**. This guide synthesizes Apple’s documentation, third‑party analyses and award‑winning app examples to provide actionable design recommendations.
**## 1. Core Principles of Apple’s Human Interface Guidelines**
**## 1.1 Fundamental pillars**
Apple’s HIG emphasises three **core pillars**—clarity, deference and depth_dev.to_—and adds **consistency** to unify experiences_bairesdev.com_. These principles inform every interface decision:
|  **Principle**<br/> | **Description & best practices**<br/> |
|-----|-----|
|  **Clarity**<br/> | The interface should be legible and easy to understand_dev.to_. Use clear labels and instructions, avoid jargon, employ familiar icons, choose readable typography (e.g., San Francisco), establish a strong visual hierarchy, and include ample white space_bairesdev.com_.<br/> |
|  **Deference**<br/> | UI elements should defer to user content_dev.to_. Minimize distractions, hide controls when not needed, and use fluid motions and subtle translucency to let the content take centre stage_bairesdev.com_.<br/> |
|  **Depth**<br/> | Use visual layering, shadows, blur and motion to indicate hierarchy and navigation paths_dev.to_. Depth guides attention and helps users understand where they are and how they got there_bairesdev.com_.<br/> |
|  **Consistency**<br/> | Maintain uniform patterns across the app. Reuse UI components, align with system conventions, and ensure interactions behave the same throughout the app_bairesdev.com_. Consistency reduces learning curves and fosters trust.<br/> |

**1.2 Layout, Navigation & Interface Components**
* **Navigation patterns** – Choose a model (hierarchical, flat, content‑driven) and provide clear navigation paths. iOS uses familiar bars: a **status bar** at the top for device status; a **navigation bar** with a back button and title; a **search bar** with placeholder text; and a **tab bar** for global navigation_bairesdev.com_. Align your design with these patterns.
* **Common controls** – Buttons, pickers, sliders, steppers and switches are the building blocks of iOS UI_bairesdev.com_. Use native components when possible for accessibility and consistency; customise only when it improves usability.
* **Typography** – Use the **San Francisco** typeface. SF Pro Display is designed for UI elements; SF Pro Text has wider spacing for longer passages_bairesdev.com_. Limit yourself to two fonts, vary weight and size to create hierarchy, and keep text sizes consistent_bairesdev.com_.
* **Color** – Apple’s semantic palette uses **primary**, **secondary** and **tertiary** colors to distinguish content. Primary colors convey personality and denote primary actions; secondary colors provide variety; tertiary (accent) colors highlight important controls_bairesdev.com_. Colors also have roles: **background**, **fill** (translucent elements), **label**(text), **separator** and **functional** (status) colors_bairesdev.com_. Maintain consistent color usage across the app.
* **Gestures & interactions** – Support intuitive gestures like tapping, swiping, pinching and dragging. Respect the device’s mental model; don’t interfere with system‑wide gestures (e.g., edge swipes)_bairesdev.com_. Provide **feedback** for every gesture: visual (highlight or color change), haptic (via Haptic Engine), loading indicators, error messages and action confirmations_bairesdev.com_.
* **Accessibility** – Design for **VoiceOver**, **Dynamic Type** and **high‑contrast** modes_bairesdev.com_. Include captions and alt text for media, maintain logical layout order, and offer adjustable type sizes. Provide settings to reduce motion for users sensitive to animation_bairesdev.com_.
* **Animation & motion** – Use **purposeful animation** to communicate state changes, guide attention and add delight. Animations should be brief, natural, and never the sole method for conveying information_bairesdev.com_. Offer user control and respect system settings such as **Reduce Motion**_bairesdev.com_.

**## 1.3 Human‑centric guidelines**
Designers should understand **why** guidelines exist, not just follow them_dev.to_. Treat the HIG as a living resource: start with platform‑specific sections, leverage native components, test with real users and stay up‑to‑date with new OS versions_dev.to_. Following the HIG improves quality, ensures App Store compliance and communicates polish_dev.to_.
**## 2. Liquid Glass – Apple’s New Design System**
**## 2.1 Characteristics**
Liquid Glass is a dynamic material inspired by visionOS that **combines the optical qualities of glass with fluid movement**. It’s translucent, behaves like real glass and changes tint, shadow and brightness based on surrounding content and context_apple.com_. Real‑time rendering produces specular highlights and responsive animations_apple.com_, making even simple interactions feel lively. The material permeates every level of the UI—from small controls (buttons, switches, sliders) to larger elements (tab bars, sidebars) and system experiences (Lock Screen, Home Screen, Control Center)_apple.com_.
**## 2.2 UI behaviour with Liquid Glass**
* **Controls & navigation** – UI elements built from Liquid Glass float above content and **morph as users need more options**_apple.com_. Tab bars shrink while scrolling and expand when needed, while sidebars refract and reflect surrounding content to maintain context_apple.com_.
* **Home Screen & desktop** – Icons, widgets and the Dock use multiple layers of Liquid Glass, producing specular highlights and offering personalization (light, dark, tinted or clear appearances)_apple.com_. The menu bar becomes transparent to make the display feel larger_apple.com_.
* **Typography integration** – The San Francisco typeface adapts its weight, width and height to nestle within Liquid Glass surfaces (e.g., on the Lock Screen clock)_apple.com_.
* **APIs for developers** – Updated APIs in **SwiftUI**, **UIKit** and **AppKit** make it straightforward to adopt Liquid Glass. Developers can apply new materials and controls, and use **Icon Composer** to generate Liquid Glass icons_apple.com_.

**## 2.3 Liquid Glass vs. traditional glassmorphism**
Third‑party analyses highlight differences between Liquid Glass and earlier “glassmorphism”:
* **Lensing over blurring** – Liquid Glass employs real‑time **lensing** and light manipulation instead of simple Gaussian blur, adding depth and focus without obscuring content_rapptrlabs.com_.
* **Responsive motion** – Touch and motion trigger subtle animations and lighting shifts, giving the interface a gel‑like, tactile feel_rapptrlabs.com_.
* **Automatic adaptation** – The material dynamically adjusts tint, shadow and brightness based on background content and screen size, ensuring legibility in any environment_rapptrlabs.com_.
* **Scroll edge effects** – Content softly dims or dissolves under floating layers when scrolling, maintaining hierarchy_rapptrlabs.com_.
* **Immersive floating UI** – Menus, sidebars and toolbars float above content and respond to ambient context_rapptrlabs.com_.
* **Layered complexity and unified behaviour** – Liquid Glass is built from adaptive layers of light, depth and motion and behaves consistently across iOS, macOS and visionOS_rapptrlabs.com_.
* **Two material variants** – **Regular** provides high legibility and consistent contrast, while **Clear** is transparent and ideal for media‑rich content_rapptrlabs.com_. Developers should avoid stacking multiple glass layers (“glass on glass”) and use tint and depth strategically_rapptrlabs.com_.

**## 2.4 Inclusive design and best practices**
Liquid Glass respects accessibility settings such as Reduced Transparency, Increased Contrast and Reduced Motion_rapptrlabs.com_. Designers should:
1. **Design in layers** – Think spatially; arrange UI elements on distinct layers to create hierarchy and separation_rapptrlabs.com_.
2. **Leverage motion, light and shadow functionally** – Use these as functional tools rather than decorative effects_rapptrlabs.com_.
3. **Maintain platform consistency** – Align behaviours across devices but allow innovation where it improves the user experience_rapptrlabs.com_.
4. **Prioritise accessibility** – Ensure legibility, provide sufficient contrast and support system accessibility preferences_rapptrlabs.com_.

**## 2.5 Icon design with Icon Composer**
Apple’s **Icon Composer** allows developers to create multi‑layer Liquid Glass icons from a single design_developer.apple.com_. The tool supports:
* **Multi‑platform design** – A unified grid and rounder enclosure shapes simplify creating icons for iPhone, iPad, Mac and Apple Watch_developer.apple.com_.
* **Dynamic Liquid Glass properties** – Adjust specular highlights, blur, translucency and shadows to give icons depth and dimension_developer.apple.com_.
* **Rendering modes** – Annotate how your icon appears in **Default**, **Dark** and **Mono** modes within a single file_developer.apple.com_.
* **Real‑time preview and Xcode integration** – Preview dynamic lighting and import icons directly into Xcode projects_developer.apple.com_.

When designing icons, use a 1024×1024 px master image; Xcode will scale it to all required sizes. Icons should be square PNG files with no transparency and avoid manually rounding corners_splitmetrics.com_.
**## 3. Official Design Resources**
Apple provides numerous resources to help designers implement the new design system:
* **UI Kits & templates** – Download Figma and Sketch UI kits for iOS 26, iPadOS 26, macOS 26, watchOS 11, tvOS 18 and visionOS_developer.apple.com_. These kits include component libraries, page templates and updated design grids. There are also production templates and app icon templates in Sketch, Photoshop and Illustrator formats_developer.apple.com_.
* **Fonts and SF Symbols** – Official fonts (SF Pro, SF Compact, SF Rounded) and SF Symbols (version 7) are available for download and integration_developer.apple.com_.
* **Product bezels** – High‑quality device frames allow designers to showcase app mock‑ups in marketing assets_developer.apple.com_.
* **Tools** – In addition to Icon Composer, tools like **SF Symbols 7** (with Draw and Variable Draw features) and the **Design Videos** library help designers learn and apply best practices_developer.apple.com_.

**## 4. Lessons from Apple Design Awards 2025: Inspiration for Rehearsmart**
The Apple Design Awards celebrate apps and games that exemplify outstanding design, innovation and accessibility. By studying winners and finalists, designers can glean patterns and features that resonate with users. This section distills key insights and suggests how to apply them to a public‑speaking rehearsal app.
**## 4.1 Delight and Fun**
|  **App (Category)**<br/> | **Notable design features**<br/> | **Lessons for Rehearsmart**<br/> |
|-----|-----|-----|
|  **CapWords** – language‑learning app<br/> | Uses the camera to let users photograph objects and turns them into interactive stickers; each flash card transition has fun animations and real‑world sounds_developer.apple.com_.<br/> | Encourage playful interaction—e.g., let users record short props or objects (slides, notes) and convert them into dynamic prompts; use lively animations and sounds to make rehearsing vocabulary or speech segments enjoyable.<br/> |
|  **Lumy** – sun & moon tracker<br/> | A simple design with a curated colour palette and elegant widgets/Live Activities; syncs across iPhone, iPad and Apple Watch_developer.apple.com_.<br/> | Design a clean, distraction‑free interface; provide cross‑device sync so users can practise on iPhone and review notes on Apple Watch; create glanceable widgets showing upcoming practice sessions or performance countdowns.<br/> |
|  **Denim** – playlist cover maker<br/> | Built with SwiftUI; features smooth scroll transitions, mesh gradients, custom haptics and depth effects_developer.apple.com_.<br/> | Use SwiftUI to craft fluid transitions within the app (e.g., between rehearsal modes); incorporate haptic feedback when users hit milestones or improve their performance; leverage gradients and depth effects to enrich the interface.<br/> |

**4.2 Inclusivity**
|  **App**<br/> | **Inclusive design strategies**<br/> | **Application to Rehearsmart**<br/> |
|-----|-----|-----|
|  **Speechify** – text‑to‑speech<br/> | Converts any written text into audio using hundreds of voices and 50+ languages; includes Dynamic Type and VoiceOver support and reduces cognitive load throughout the app_developer.apple.com_.<br/> | Provide multi‑language support and high‑quality voice synthesis for reading scripts aloud; support VoiceOver and dynamic font sizes; design screens that minimise cognitive load so users can focus on practising.<br/> |
|  **Evolve: Daily Self‑Care Coach**<br/> | Offers breathing exercises, affirmations and journaling; uses inclusive language and diverse voices; integrates with Image Playground and the State of Mind API_developer.apple.com_.<br/> | Integrate mindfulness features (e.g., breathing exercises) to help users manage speech anxiety; use inclusive language and offer diverse voice options; leverage Apple’s mental health APIs for mood tracking.<br/> |
|  **Train Fitness**<br/> | Uses CoreMotion and CoreML to track workouts via Apple Watch and AirPods, removing the need to interact with the screen; includes modes for wheelchair users and people with limb differences_developer.apple.com_.<br/> | Incorporate hands‑free control via voice or gestures; allow practice sessions to operate without needing to look at the device; design alternate modes (e.g., audio‑only rehearsals) for users with visual impairments.<br/> |
|  **Art of Fauna**<br/> | Puzzle game with throwback‑style art; offers multiple modes to solve puzzles (by rearranging images or reordering text); includes colour themes, full VoiceOver support and phobia settings_developer.apple.com_.<br/> | Provide multiple ways to practise: reading aloud, arranging speech segments visually, or reorganising notes; allow users to customise colour themes and turn off potentially stressful visuals.<br/> |
|  **puffies.**<br/> | Puzzle game built from ’80s‑era puffy stickers; includes Reduce Motion and high‑contrast modes and “outline settings” to focus areas of the board_developer.apple.com_.<br/> | Offer settings to reduce motion during transitions, provide high‑contrast themes and highlight important feedback areas (e.g., emphasising filler words).<br/> |
|  **Land of Livia**<br/> | Text‑based adventure that supports VoiceOver, Dynamic Type and haptics; uses App Intents for complex actions_developer.apple.com_.<br/> | Ensure narrative instructions (e.g., story‑based rehearsal prompts) support VoiceOver and haptic feedback; integrate with App Intents to let users start practice sessions via Siri or Shortcuts.<br/> |

**4.3 Innovation**
|  **App**<br/> | **Innovative features**<br/> | **Lessons for Rehearsmart**<br/> |
|-----|-----|-----|
|  **Play** – prototyping tool<br/> | Enables designers to build interactive prototypes in native SwiftUI and export them to Xcode; UI is organized and integrated with App Clips_developer.apple.com_.<br/> | Use SwiftUI for Rehearsmart’s interface to leverage new APIs; design modular, reusable components; consider building a companion App Clip so users can quickly try a rehearsal session without full installation.<br/> |
|  **Moises** – music separation<br/> | Uses machine learning to separate vocals and instruments; despite technical complexity, the interface remains easy to use_developer.apple.com_.<br/> | Employ AI models to break down speech into components—pitch, pace, filler words—and present results through an intuitive interface; hide complexity behind simple controls.<br/> |
|  **Capybara AI Meeting Translator**<br/> | Performs transcription, translation and summarization with high accuracy; features a cute capybara mascot and delivers results instantly_developer.apple.com_.<br/> | Add automatic transcription and summarization of rehearsal sessions; support real‑time translation for practising in multiple languages; consider using a friendly mascot or character to guide users and reduce anxiety.<br/> |

**4.4 Interaction**
|  **App**<br/> | **Interaction excellence**<br/> | **Application to Rehearsmart**<br/> |
|-----|-----|-----|
|  **Taobao (Vision Pro)**<br/> | Renders 3D products with smooth interactions and intuitive controls; considers placement, size and function; allows side‑by‑side comparisons_developer.apple.com_.<br/> | If Rehearsmart eventually supports spatial computing, create a 3D rehearsal environment where users can practise on a virtual stage; allow them to adjust audience placement or podium height and compare different settings.<br/> |
|  **iA Writer**<br/> | Provides a distraction‑free writing environment; offers a customizable keyboard and intuitive gestures (swipe right to access library, left to preview)_developer.apple.com_.<br/> | Offer a focused speech editor with minimal distractions; include gesture‑based navigation to switch between script, notes and performance metrics; allow customizing on‑screen controls.<br/> |
|  **Mela – Recipe Manager**<br/> | Cooking mode dims and highlights content at appropriate times; integrates timers with the Dynamic Island; uses Vision to scan recipes and Reminders to store ingredients_developer.apple.com_.<br/> | In Rehearsmart, implement a guided rehearsal mode that highlights the current section and dims others; integrate timers and progress bars; allow scanning of printed scripts using Vision API; sync tasks with Reminders for follow‑up practice.<br/> |
|  **Pawz / Gears & Goo**<br/> | Use Vision Pro’s passthrough, spatial audio, hand and eye tracking to embed virtual experiences_developer.apple.com_.<br/> | Explore future support for AR/VR practice sessions, using spatial audio for realistic feedback and hand tracking for gesture coaching.<br/> |

**4.5 Social Impact**
|  **App**<br/> | **Social impact features**<br/> | **Lessons for Rehearsmart**<br/> |
|-----|-----|-----|
|  **Watch Duty: Wildfire Maps**<br/> | Provides real‑time, reliable information about wildfires through a community‑driven volunteer operation_developer.apple.com_.<br/> | Ensure Rehearsmart offers reliable, up‑to‑date performance metrics and feedback; build trust by delivering accurate data and timely notifications.<br/> |
|  **Ground News**<br/> | Aggregates news from thousands of publications and displays bias graphs with color‑coded markers to encourage exploring multiple viewpoints_developer.apple.com_.<br/> | Include features that help speakers understand audience bias and tailor messages; show analysis of rhetorical techniques or sentiment; allow practising to diverse audiences.<br/> |
|  **Opal**<br/> | Encourages intentional device use, offers helpful widgets and customisation, and uses haptic rewards to create focus_developer.apple.com_.<br/> | Provide tools to schedule focused practice sessions, including widgets for quick-start rehearsals; use gentle haptic rewards to reinforce progress and encourage consistent practice.<br/> |
|  **Neva**<br/> | A beautifully illustrated game that tells a story about environmental decline and relationships_developer.apple.com_.<br/> | Use narrative elements in Rehearsmart to engage users—for example, present progress as a story arc to motivate continued practice.<br/> |
|  **Ahoy! From Picardy**<br/> | Uses the spatial canvas to create a whimsical game that teaches environmental stewardship_developer.apple.com_.<br/> | Incorporate gamified goals that emphasise personal growth and social impact—e.g., helping users become confident speakers who can advocate for causes they care about.<br/> |

**4.6 Visuals & Graphics**
|  **App**<br/> | **Visual excellence**<br/> | **Application to Rehearsmart**<br/> |
|-----|-----|-----|
|  **Feather: Draw in 3D**<br/> | Lets users transform 2D designs into 3D models with an accessible, minimalist interface and full support for Apple Pencil_developer.apple.com_.<br/> | Provide intuitive tools to adjust voice pitch, gestures or stage layout in a 3D environment; keep the UI minimal and approachable for all skill levels.<br/> |
|  **Vocabulary – Learn words daily**<br/> | Uses charming, consistent illustrations, balanced typography and tasteful haptics_developer.apple.com_.<br/> | Develop a cohesive visual language with simple illustrations and modern typography; use haptics to acknowledge achievements or correct mispronunciations subtly.<br/> |
|  **CellWalk**<br/> | Presents a detailed 3D cell model with real‑time Metal rendering_developer.apple.com_.<br/> | For advanced users, create immersive modules (e.g., exploring the anatomy of the voice or lungs) that leverage 3D models and interactive rendering.<br/> |
|  **Infinity Nikki**<br/> | Showcases lavish textures, lighting effects and global illumination_developer.apple.com_.<br/> | Use lighting and shading within the app to create depth and highlight important elements; for VR experiences, ensure rich textures and real‑time lighting reinforce realism.<br/> |

**5. Recommendations for Rehearsmart**
Based on Apple’s design system, HIG principles and award‑winning apps, the following recommendations can help Rehearsmart feel like an Apple‑crafted product:
1. **Adopt Liquid Glass materials** – Use updated SwiftUI APIs to implement Liquid Glass surfaces for toolbars, buttons and cards. Employ lensing and specular highlights judiciously, and choose **Regular** or **Clear** variants depending on context_rapptrlabs.com_. Avoid stacking multiple glass layers and ensure content remains legible.
2. **Design for clarity and deference** – Create a clean, uncluttered interface with plenty of white space and clear typography. Hide controls until needed and use translucent backgrounds so the rehearsal content (script or performance video) takes precedence_dev.to_.
3. **Use depth to convey structure** – Layer UI elements using blurs, shadows and parallax to guide attention. For example, highlight the current section of a speech while dimming others_dev.to_.
4. **Create multi‑layer icons** – Use Icon Composer to design a layered Liquid Glass icon for Rehearsmart. Adjust highlights and translucency to make the icon stand out in light, dark and clear modes_developer.apple.com_. Provide a 1024×1024 px master image with no transparency_splitmetrics.com_.
5. **Support multiple modes of practice** – Offer different rehearsal modes: reading aloud, improvising with prompts, recording and analysing audio, or practising without looking at the screen. Provide accessible options such as VoiceOver, dynamic text, high contrast and reduced motion_bairesdev.com_.
6. **Incorporate AI‑powered feedback** – Use machine learning to analyse speech characteristics (pace, tone, filler words) and present results in an intuitive manner inspired by Moises’s ease of use_developer.apple.com_. Provide actionable insights, visualised with simple charts and accompanied by haptic or visual feedback.
7. **Gamify progress and encourage mindfulness** – Draw inspiration from Speechify, Evolve and Opal to integrate features like breathing exercises, affirmations, and haptic rewards_developer.apple.com__developer.apple.com_. Gamified goals and narrative elements (e.g., earning badges or unlocking “stages”) can motivate continued practice.
8. **Enable cross‑device sync & widgets** – Sync rehearsal data across iPhone, iPad and Apple Watch using CloudKit. Provide widgets and Live Activities that show upcoming practice sessions, progress toward goals or quick‑start controls_developer.apple.com_.
9. **Integrate system features** – Use App Intents to allow starting practice via Siri; integrate with Reminders for scheduled practice sessions; support the Dynamic Island for timers and progress; use the Vision framework to scan printed scripts_developer.apple.com_.
10. **Plan for spatial computing** – Consider future support for Vision Pro, offering a virtual stage with adjustable audience and camera angles. Leverage hand/eye tracking and spatial audio for immersive rehearsal experiences_developer.apple.com_.

**## Conclusion**
Apple’s 2025 design overhaul invites developers to rethink interface design. The **Liquid Glass** material, combined with timeless HIG principles, encourages designs that are fluid, content‑focused, layered and accessible. By studying Apple’s documentation, third‑party analyses and award‑winning apps, designers can craft experiences that feel at home on Apple platforms. For Rehearsmart, adopting Liquid Glass, embracing clarity and depth, ensuring inclusivity, and infusing delight will help create an AI‑driven rehearsal tool that looks and feels like it was “designed by Apple.”

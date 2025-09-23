---
migrated: 2025-09-20T01:46:15.778960
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/PRDs/Claude PRD.md
vault_folder: Inbox/to-review
---
# Claude PRD

**# RehearSmart Technical Product Specification Document**
**## Executive Summary**
RehearSmart is an iOS-native application designed to help individuals overcome public speaking anxiety and improve their presentation skills through AI-powered coaching. Built on the philosophy of "Be Better Offline," the app leverages iOS 26's liquid glass UI and Apple Intelligence to provide personalized, offline-first coaching that helps users prepare for real-world speaking engagements.
**## 
**
**## Vision Statement**
Empower individuals to become confident, authentic speakers by providing intelligent, personalized coaching that adapts to their unique speaking style and helps them excel in offline, human-to-human communication.
**## 
**
**## Key Differentiators**
* **100% Offline Functionality**: All features work without internet connectivity
* **Native iOS 26 Integration**: Leverages Apple Intelligence, on-device transcription, and liquid glass UI
* **Adaptive Script Evolution**: Scripts evolve to match user's natural speaking style
* **Single-Focus Coaching**: One improvement area per rehearsal for maximum effectiveness
* **Privacy-First**: All data processed and stored locally on device

**## Product Strategy**
**## Target Users**
1. **Primary**: Professionals preparing for presentations, pitches, or public talks
2. **Secondary**: Students preparing for academic presentations
3. **Tertiary**: Individuals with social anxiety seeking to improve communication skills

**## Core Value Propositions**
1. **Personalized Adaptation**: Scripts evolve to match your natural speaking style
2. **Progressive Improvement**: Track measurable progress over time
3. **Privacy & Convenience**: Practice anywhere without internet or data concerns
4. **Focused Coaching**: One improvement at a time for sustainable progress

**## Success Metrics**
* User retention: 70% of users complete 5+ rehearsals
* Progress improvement: Average user rating increases from 1.8 to 4.0+ stars
* Event completion: 85% of users complete their speaking event
* Post-event satisfaction: 80% report feeling more confident

**## Technical Architecture**
**## System Architecture**
`┌─────────────────────────────────────────────────────────────────┐`
`│                        iOS 26 Device                             │`
`├─────────────────────────────────────────────────────────────────┤`
`│  ┌─────────────────────────────────────────────────────────┐   │`
`│  │                    UI Layer (SwiftUI)                    │   │`
`│  │  - Liquid Glass UI Components                           │   │`
`│  │  - Adaptive Layouts                                     │   │`
`│  │  - Gesture Recognition                                  │   │`
`│  └─────────────────────────────────────────────────────────┘   │`
`│                              │                                   │`
`│  ┌─────────────────────────────────────────────────────────┐   │`
`│  │                 Business Logic Layer                     │   │`
`│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │`
`│  │  │Script Manager│  │Coach Engine  │  │Progress Track│ │   │`
`│  │  └──────────────┘  └──────────────┘  └──────────────┘ │   │`
`│  └─────────────────────────────────────────────────────────┘   │`
`│                              │                                   │`
`│  ┌─────────────────────────────────────────────────────────┐   │`
`│  │                    Core Services                         │   │`
`│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │`
`│  │  │Apple Intel.  │  │Speech Frame. │  │Core ML      │ │   │`
`│  │  └──────────────┘  └──────────────┘  └──────────────┘ │   │`
`│  └─────────────────────────────────────────────────────────┘   │`
`│                              │                                   │`
`│  ┌─────────────────────────────────────────────────────────┐   │`
`│  │                    Data Layer                            │   │`
`│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │`
`│  │  │Core Data     │  │File System   │  │UserDefaults │ │   │`
`│  │  └──────────────┘  └──────────────┘  └──────────────┘ │   │`
`│  └─────────────────────────────────────────────────────────┘   │`
`└─────────────────────────────────────────────────────────────────┘`
**## Data Models**
`// Core Data Entities`
`
`
`@Model`
`class Event {`
`    let id: UUID`
`    let title: String`
`    let date: Date`
`    let targetDuration: TimeInterval`
`    var rehearsals: [Rehearsal]`
`    var scripts: [Script]`
`    var currentScriptId: UUID`
`}`
`
`
`@Model`
`class Script {`
`    let id: UUID`
`    let eventId: UUID`
`    let version: Int`
`    let content: String`
`    let bulletPoints: [String]`
`    let createdAt: Date`
`    let adaptationType: AdaptationType`
`}`
`
`
`@Model`
`class Rehearsal {`
`    let id: UUID`
`    let eventId: UUID`
`    let scriptId: UUID`
`    let recordingURL: URL`
`    let transcription: String`
`    let duration: TimeInterval`
`    let userRating: Int`
`    let coachingFeedback: CoachingFeedback`
`    let createdAt: Date`
`}`
`
`
`@Model`
`class CoachingFeedback {`
`    let primaryFocus: String`
`    let encouragement: String`
`    let metrics: SpeechMetrics`
`    let improvements: [String]`
`}`

**## MVP Core Capabilities**
**## 1. Event Creation Flow**
**User Flow**
`Start → Set Event Date → Enter Bullet Points → Set Duration → `
`AI Draft Generation → Review & Adjust → Event Dashboard`
**Technical Implementation**
**Event Setup Screen**

* Uses iOS 26 DatePicker with liquid glass backdrop
* Bullet point entry with dynamic text fields
* Duration picker (1-60 minutes) with haptic feedback
* "Generate Script" button triggers Apple Intelligence API

**AI Script Generation**

`func generateScript(bulletPoints: [String], duration: TimeInterval) async -> String {`
`    let prompt = PromptBuilder.buildScriptPrompt(`
`        points: bulletPoints,`
`        targetDuration: duration,`
`        style: .professional`
`    )`
`    `
`    return await AppleIntelligence.generate(`
`        prompt: prompt,`
`        model: .onDevice,`
`        maxTokens: calculateTokens(for: duration)`
`    )`
`}`
**Script Review Interface**

* Side-by-side view of bullet points and generated script
* Adjustment options:
	* "Good to go" → Save as is
	* "Add humor" → Regenerate with humor parameter
	* "Make lighter" → Adjust tone parameter
	* "More serious" → Adjust formality parameter

**## 2. Event Dashboard**
**Layout Components**
* **Header Card** (Liquid glass effect)
	* Countdown timer: "4 days until event"
	* Rehearsal count with progress ring
	* Average rating with star visualization
* **AI Coach Message**

	* Dynamic, encouraging message based on progress
	* Example: "You're 4 days away! 2-3 more rehearsals can help you get from 3.5⭐ to 4⭐, where you want to be!"
* **Rehearse Button**

	* Prominent, thumb-accessible placement
	* Pulsing animation when rehearsals needed

**## 3. Rehearsal Experience**
**Recording Interface**
`┌─────────────────────────────────┐`
`│      [Event Name]               │`
`│      Target: 10 minutes         │`
`├─────────────────────────────────┤`
`│                                 │`
`│   📝 Read your script aloud    │`
`│   3+ times, but say it         │`
`│   naturally, not word-for-word  │`
`│                                 │`
`├─────────────────────────────────┤`
`│  ┌─────────────────────────┐   │`
`│  │                         │   │`
`│  │    [Script Content]     │   │`
`│  │                         │   │`
`│  │                         │   │`
`│  └─────────────────────────┘   │`
`│                                 │`
`│  [Original] [Adapted] [Bullets] │`
`│         [Hide Script]           │`
`├─────────────────────────────────┤`
`│         ● Record                │`
`└─────────────────────────────────┘`
**Technical Features**

* Real-time audio visualization during recording
* Live transcription preview (iOS 26 Speech framework)
* Automatic pause detection
* Background audio session management

**Post-Recording Flow**

1. Auto-stop after 1.5x target duration
2. Immediate rating prompt (1-5 stars)
3. Processing animation while analyzing
4. Navigate to review or rehearse again

**## 4. Progress Tracking**
**Progress Graph**
* X-axis: T-minus days (Event date - Today)
* Y-axis: Self-rating (0-5 stars)
* Line chart with smooth bezier curves
* Touch interaction for rehearsal details

**Rehearsal Cards Stack**
`┌─────────────────────────────────┐`
`│ Today, 2:30 PM          ``★★★★☆``  │`
`│ "Slowed pace, better flow"      │`
`└─────────────────────────────────┘`
`┌─────────────────────────────────┐`
`│ Yesterday, 4:15 PM      ``★★★☆☆``  │`
`│ "Work on filler words"          │`
`└─────────────────────────────────┘`
**## 5. Rehearsal Review & Coaching**
**Coaching Engine**
`class CoachingEngine {`
`    func analyzeRehearsalh(`
`        transcription: String,`
`        audio: URL,`
`        targetScript: String`
`    ) async -> CoachingFeedback {`
`        `
`        let metrics = await analyzeMetrics(audio, transcription)`
`        let comparison = compareToScript(transcription, targetScript)`
`        `
`        // Single focus selection algorithm`
`        let primaryFocus = selectPrimaryImprovement(`
`            from: [`
`                checkSpeechPace(metrics.wordsPerMinute),`
`                checkFillerWords(metrics.fillerWords),`
`                checkTonality(metrics.intonationPattern),`
`                checkClarity(metrics.clarity),`
`                checkStructure(comparison)`
`            ]`
`        )`
`        `
`        return CoachingFeedback(`
`            primaryFocus: primaryFocus,`
`            encouragement: generateEncouragement(metrics, previousRating),`
`            metrics: metrics,`
`            improvements: generateImprovementList(metrics)`
`        )`
`    }`
`}`
**Review Interface Components**
1. **Encouragement Section**

	* Personalized message acknowledging progress
	* Empathetic tone recognizing challenges
2. **Primary Coaching Focus**

	* Single, specific improvement area
	* Measurable target (e.g., "124 → 90 words/min")
	* Clear, actionable advice
3. **Script Comparison View**

	* Side-by-side: Intended vs. Actual
	* Highlighted differences
	* Filler words struck through
4. **Script Evolution Interface**
┌─────────────┬─────────────┐
5. │  Previous   │  Adapted    │
6. │  Script     │  Version    │
7. ├─────────────┼─────────────┤
8. │ [Section 1] │ [Section 1] │
9. │     ○       │     ●       │
10. ├─────────────┼─────────────┤
11. │ [Section 2] │ [Section 2] │
12. │     ●       │     ○       │
13. └─────────────┴─────────────┘
14. 

15. [New Script Preview]
16. 

**## 6. Script Adaptation Algorithm**
`class ScriptAdapter {`
`    func adaptScript(`
`        original: String,`
`        rehearsalTranscription: String,`
`        userStyle: UserSpeakingStyle`
`    ) -> AdaptedScript {`
`        `
`        // Extract user's natural phrasing`
`        let phrasings = extractNaturalPhrasing(rehearsalTranscription)`
`        `
`        // Identify vocabulary preferences`
`        let vocabulary = analyzeVocabulary(rehearsalTranscription)`
`        `
`        // Maintain content structure`
`        let structure = parseStructure(original)`
`        `
`        // Generate adapted version`
`        return AppleIntelligence.rewrite(`
`            content: structure,`
`            style: userStyle,`
`            phrasings: phrasings,`
`            vocabulary: vocabulary`
`        )`
`    }`
`}`
**## 7. Post-Event Reflection**
* Push notification day after event
* Reflection prompt: "Help your future self - how did it go?"
* Structured reflection:
	* What went well?
	* What to improve next time?
	* Overall confidence rating
* Links reflection to event for future reference

**## User Experience Design**
**## iOS 26 Liquid Glass UI Implementation**
1. **Depth Layers**

	* Background: Subtle gradient mesh
	* Cards: 3 depth levels with shadows
	* Interactive elements: Elevated with haptic response
2. **Motion Design**

	* Smooth 60fps animations
	* Spring physics for natural movement
	* Parallax effects on scroll
3. **Accessibility**

	* Full VoiceOver support
	* Dynamic Type compliance
	* Reduced motion alternatives
	* High contrast mode

**## Color Palette**
* Primary: Deep blue (#0051A5)
* Success: Emerald (#10B981)
* Warning: Amber (#F59E0B)
* Background: Adaptive gray scale
* Accent: Liquid glass tint

**## Future Capabilities (V2 & Beyond)**
**## Version 2.0**
1. **Voice-to-Script Recording**

	* Record thoughts instead of typing
	* AI extracts key points and structure
	* Multiple recording sessions support
2. **Advanced Transcription Features**

	* Real-time filler word highlighting
	* Self-correction detection and strikethrough
	* Pause analysis and timing
3. **Comparative Analytics**

	* Show average first rehearsal rating (1.8⭐)
	* Display typical improvement curve
	* Peer benchmarking (anonymized)
4. **Auto-Scrolling Script**

	* Variable speed settings
	* Pause/resume functionality
	* Eye-tracking integration (if available)

**## Version 3.0**
1. **Natural Phrasing Chunks**

	* AI-powered script segmentation
	* Breath mark suggestions
	* Emphasis recommendations
2. **Video Rehearsal Mode**

	* Body language analysis
	* Eye contact tracking
	* Gesture coaching
3. **Team/Group Features**

	* Share scripts with coaches
	* Collaborative feedback
	* Team presentation coordination
4. **Advanced AI Coaching**

	* Personality-adapted coaching styles
	* Cultural communication preferences
	* Industry-specific terminology
5. **Presentation Tools Integration**

	* Slide sync and timing
	* Teleprompter mode
	* Remote control support

**## Future Considerations**
1. **Multi-Platform**

	* iPad app with dual-screen support
	* Apple Watch companion for timing
	* Mac app for script editing
2. **Extended Analytics**

	* Emotion detection
	* Audience engagement prediction
	* Speaking style evolution tracking
3. **Community Features**

	* Anonymous success stories
	* Coaching tips marketplace
	* Speaking challenges

**## Privacy & Security**
**## Data Handling**
* All processing happens on-device
* No cloud sync by default
* Optional iCloud backup (encrypted)
* Audio recordings auto-delete after 30 days
* User can export/delete all data

**## Permissions Required**
* Microphone: For recording rehearsals
* Notifications: For practice reminders
* No network permissions needed

**## Development Roadmap**
**## Phase 1: Foundation (Weeks 1-4)**
* Core data models
* Basic UI screens
* Recording functionality
* Local storage

**## Phase 2: AI Integration (Weeks 5-8)**
* Apple Intelligence integration
* Script generation
* Basic coaching analysis
* Transcription pipeline

**## Phase 3: Polish (Weeks 9-12)**
* Liquid glass UI refinement
* Animation and transitions
* Comprehensive testing
* Performance optimization

**## Phase 4: Launch Prep (Weeks 13-14)**
* App Store assets
* Beta testing program
* Documentation
* Marketing materials

**## Success Criteria**
**## Technical**
* 60fps UI performance
* <2s script generation
* <5s rehearsal analysis
* 99.9% crash-free sessions

**## User Experience**
* 4.5+ App Store rating
* <2 minute onboarding
* 80% feature discovery rate
* 90% task completion rate

**## Business**
* 10,000 downloads in first month
* 40% monthly active users
* 20% conversion to paid (if applicable)
* 50+ organic reviews

**## Conclusion**
RehearSmart represents a new category of AI-powered coaching apps that enhance human capabilities for real-world interactions. By focusing on privacy, personalization, and progressive improvement, we're building a tool that genuinely helps people become better speakers while respecting their unique voice and style.
The combination of iOS 26's native capabilities, liquid glass UI, and our focused coaching methodology creates a compelling product that stands apart in the market. Our commitment to offline-first functionality ensures users can practice anywhere, anytime, without compromising their privacy or depending on connectivity.
This PRD serves as the north star for building RehearSmart into the definitive public speaking coach for the AI age - one that makes people better in their offline, human interactions.

---
migrated: 2025-09-20T01:46:15.776315
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/PRDs/Gemini PRD.md
vault_folder: Inbox/to-review
---
# Gemini PRD

**# Product Requirements Document: RehearSmart**
* **Product:** RehearSmart
* **Company:** Be Better Offline
* **Version:** 1.0
* **Date:** August 7, 2025
* **Status:** Scoping for MVP

**# 1. Product Vision & Strategy**
**## 1.1. Vision**
To empower individuals to become confident and authentic communicators by providing personalized, private, and encouraging public speaking coaching directly on their most personal device.
**## 1.2. Mission**
We are building an AI-powered rehearsal tool that helps people prepare for their most important offline moments. By transforming public speaking anxiety into self-assurance, RehearSmart helps people be more present, connected, and effective in person.
**## 1.3. Core Principles**
* **Privacy First, Offline Always:** All user data, including scripts, voice recordings, and performance analysis, is processed and stored exclusively on the user's device. No cloud servers, no data leaks, absolute user privacy.
* **Encouragement Over Criticism:** The AI acts as a supportive coach, not a harsh critic. The user is the ultimate judge of their own performance, and our goal is to build them up through positive, constructive reinforcement.
* **Actionable, Focused Feedback:** We avoid overwhelming the user by providing one key area for improvement at a time, ensuring each rehearsal is productive and builds momentum.
* **Authenticity is the Goal:** The app's purpose is not to create robotic, flawless speakers. It is to help users discover and refine their own unique, natural, and authentic speaking style.

**## 1.4. Target Audience**
Anyone with an upcoming speaking engagement who experiences apprehension or simply desires to be more prepared. This includes:
* **Professionals:** Preparing for presentations, pitches, or team meetings.
* **Students:** Rehearsing for class presentations or thesis defenses.
* **Event Speakers:** Crafting wedding toasts, eulogies, or conference talks.

**## 1.5. Design Philosophy: iOS 26 "Liquid Glass"**
The user interface will embody a modern, fluid, and intuitive aesthetic. Key characteristics include:
* **Translucency & Depth:** Using blurred, semi-transparent layers to create a sense of depth and context.
* **Fluid Animation:** All transitions and interactions will be smooth, responsive, and interruptible.
* **Minimalism:** The UI will be clean and uncluttered, focusing the user's attention on the task at hand: rehearsal.

**# 2. Technical Architecture & User Flows**
**## 2.1. On-Device Technical Architecture**
RehearSmart will be built as a 100% on-device application, leveraging the native capabilities of iOS 26.
graph TD
    A[UI Layer - SwiftUI] --> B[ViewModel Layer];
    B --> C[Apple Intelligence Service];
    B --> D[AVFoundation Service];
    B --> E[Speech Framework Service];
    B --> F[SwiftData Service];

    subgraph "Core Services (On-Device)"
        C[<b>Apple Intelligence</b><br>Script Generation, Coaching Analysis, Summarization]
        D[<b>AVFoundation</b><br>Audio Recording & Playback]
        E[<b>Speech Framework</b><br>On-Device Transcription]
        F[<b>SwiftData</b><br>Local Database for Events, Scripts, Rehearsals]
    end

    F --> G[(User's Device Storage)];

    style A fill:#D6EAF8,stroke:#333,stroke-width:2px
    style B fill:#D1F2EB,stroke:#333,stroke-width:2px
    style G fill:#FCF3CF,stroke:#333,stroke-width:2px

**## 2.2. Core User Flow: The Rehearsal Loop**
This flow represents the primary engagement loop of the application.
graph TD
    A(Start) --> B{Event Created?};
    B -- No --> C[Create Event & Script];
    B -- Yes --> D[Open Event Hub];
    C --> D;
    D --> E[Tap 'Rehearse'];
    E --> F[Rehearsal Screen: Record Speech];
    F --> G[Stop Recording];
    G --> H{Mandatory: Rate Rehearsal 1-5 Stars};
    H --> I[Review Page: Get Coaching];
    I --> J{Refine Script based on AI suggestions};
    J --> K{Rehearse Again?};
    K -- Yes --> E;
    K -- No --> L[End Session Summary];
    L --> M(End);

**# 3. MVP Capabilities (Version 1.0)**
**## 3.1. Event & Script Creation**
1. **New Event:** The user creates an event by providing a title (e.g., "Q3 Marketing Pitch") and selecting the event date.
2. **Script Input:** The user types or pastes bullet points outlining the speech content.
3. **Time Goal:** The user enters the target duration for the speech (e.g., "10 minutes").
4. **AI First Draft:** Using **Apple Intelligence**, the app generates a full script based on the bullet points and time goal.
5. **Tone Adjustment:** The user can refine the initial draft with simple prompts like "Make it more humorous" or "Make it more formal," which re-runs the AI generation with a modified tone parameter.

**## 3.2. Event Hub Screen**
This is the main dashboard for a specific upcoming event.
* **Header:** Displays the event title.
* **Key Metrics:**

	* **Countdown:** "3 days until event"
	* **Rehearsal Count:** "Rehearsed 4 times"
	* **Average Rating:** "Avg. rating: 3.5 stars"
* **AI Coach Snippet:** A dynamic, encouraging message.
	* *Example:* "You’re 3 days away! 2-3 more rehearsals can help you get from 3.5 ★ to the 4.5 ★ you're aiming for. You've got this!"
* **Primary CTA:** A prominent "Rehearse" button.

**## 3.3. Rehearsal Screen**
A minimal, focused environment for practice.
* **Context:** Event name and target time are displayed at the top.
* **Guidance:** A static text prompt encourages natural delivery: "Read your script, but say it in your own words. The goal is to be authentic, not perfect."
* **Script Viewer:** A tabbed view allows the user to toggle between:
	* **My Adapted Script:** The evolving version of the script.
	* **Original Script:** The first version generated by the AI.
	* **Bullet Points:** The user's initial notes.
* **Hide Script:** An option to hide the script for memorization practice.
* **Record Controls:** A large, thumb-accessible button fixed at the bottom of the screen toggles between **Record** and **Pause**.

**## 3.4. Post-Rehearsal & Coaching**
This is the core feedback loop where improvement happens.
1. **Self-Rating:** Immediately upon stopping a recording, the user must rate their performance on a 1-5 star scale.
2. **Rehearsal Review Page:**

	* **Motivation:** An empathetic statement based on the rating.
		* *Example (for a 2-star rating):* "That was a tough one, and that's completely normal. Every great speaker has been right where you are. Let's find one thing to focus on."
	* **AI Coaching Analysis:** The app uses on-device services to analyze the recording and provide feedback.
		* **Pacing:** "You're speaking at 135 words per minute. To sound more deliberate, let's aim for a target of 100-110 WPM on the next try."
		* **Filler Words:** "We noticed you used 'um' 8 times and 'like' 5 times. A few are natural, but let's try to cut that number in half."
	* **Focus Point:** The UI prominently displays the **single most important tip** to work on for the next rehearsal. Other potential improvements are listed below in a less prominent, "work on these later" section.
	* **Script Evolution:**

		* The app presents a side-by-side comparison of the previous script and the transcription of what the user actually said.
		* Below this, the AI provides a rewritten, "adapted" script that merges the user's natural language with the original script's structure.
		* The user can interactively select which version of each paragraph or sentence they prefer, dynamically building the next version of their script.
3. **CTAs:** Buttons for "Rehearse Again" (returns to the Rehearsal Screen with the updated script) and "Done Rehearsing for Now."

**## 3.5. Progress Tracking**
* **Progress Graph:** A chart on the Event Hub screen visualizes the user's self-ratings over time against the T-minus days to the event.
* **Rehearsal History:** A stacked list of "Rehearsal Cards," with the most recent at the top. Each card shows the date, star rating, and a one-line summary of the coaching from that session (e.g., "Focused on reducing filler words").
* **End of Session Summary:** When the user taps "Done Rehearsing," a summary screen appears with:
	* **3 Wins:** The biggest improvements from that session.
	* **3 Next Steps:** The top priorities for the next session.

**## 3.6. Post-Event Reflection**
* **Push Notification:** The day after the event, the app sends a notification asking how it went.
* **Reflection Journal:** A simple text field prompts the user to reflect on their performance. "Help your future self: What went well? What would you do differently next time?" This reflection is saved with the completed event for future review.

**# 4. Future Capabilities (Post-MVP)**
**## Version 2.0: Enhanced Input & Analysis**
* **Voice-to-Script:** Users can record their initial thoughts, and the AI will transcribe and structure them into a coherent script outline.
* **Advanced Transcription:** The transcription view will explicitly strikethrough self-corrections and highlight filler words for easier review.
* **Social Benchmarking (Optional):** Users can opt-in to see anonymized, encouraging data points like, "Most users average 1.8 ★ on their first rehearsal. You're right on track!"
* **Teleprompter Mode:** The script will auto-scroll during rehearsal with slow, medium, and fast speed settings.

**## Version 3.0: Advanced Delivery Coaching**
* **Natural Cadence Chunking:** The AI will format the script into short lines or word groupings, encouraging a more natural, deliberate, and conversational cadence.
* **Vocal Variety Analysis:** (Requires new on-device APIs) Analyze pitch and tone to provide feedback on monotone delivery or excessive "uptalk" (ending statements with a questioning intonation).
* **Body Language & Presence:** (Requires new on-device APIs) Using the front-facing camera, the AI could offer feedback on maintaining eye contact with the camera, posture, and distracting movements.


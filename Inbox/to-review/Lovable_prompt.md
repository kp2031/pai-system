---
migrated: 2025-09-20T01:46:15.574182
source: apple-notes-exporter
original_path: Backup/iCloud/HR Speaking coach/Lovable prompt.md
vault_folder: Inbox/to-review
---
# Lovable prompt

You are to generate an iOS + watchOS Swift project that implements a public‑speaking coach with heart‑rate monitoring and haptic feedback. The app consists of:

1. Apple Watch Extension:
   • Use HealthKit to read `HKQuantityTypeIdentifierHeartRate` and `HRV` data in real time, with proper user authorization.  
   • Implement WKInterfaceDevice haptics (`.success`, `.stop`, `.directionDown`, `.failure`, `.notification`) following Apple’s HIG for watchOS.  
   • Provide a minimal dashboard UI showing current HR, pace indicator, session timer, and complication support for one‑tap session control.  
   • Use WatchConnectivity `WCSession` to exchange session commands, live HR data, and bookmarks with the iPhone app.

2. iPhone App:
   • Configure AVCaptureSession for front‑facing video recording at 1080p/30fps, controlled remotely from the watch.  
   • Receive HR and pacing metadata via WatchConnectivity `transferUserInfo`, and overlay them as graphics on the recording timeline.  
   • Build a SwiftUI post‑session dashboard with interactive charts (HR vs. time, speech rate), annotated video playback, and exportable clips.  
   • Allow threshold configuration, haptic intensity settings, and breathing‑cue cadence controls.

3. Technical Details:
   • Platforms: iOS 18+, watchOS 11+.  
   • Frameworks: HealthKit, WatchKit, WatchConnectivity, AVFoundation, Core ML (for speech analysis).  
   • Data Sync: `WCSession.default.activate()`, `didReceiveUserInfo`, `transferCurrentComplicationUserInfo`.  
   • Follow Apple’s HIG: Playing haptics (`WKInterfaceDevice.play(_:)`), digital crown detents, and complication design.

Generate the complete Swift project structure, with WatchKit extension, Info.plist permissions, and example Core ML model integration stubs for speech rate analysis.

![Lovable prompt](images/Lovable%20prompt.png)

![Lovable prompt-1](images/Lovable%20prompt-1.png)

![Lovable prompt-2](images/Lovable%20prompt-2.png)

![Lovable prompt-3](images/Lovable%20prompt-3.png)

![Lovable prompt-4](images/Lovable%20prompt-4.png)

![Lovable prompt-5](images/Lovable%20prompt-5.png)


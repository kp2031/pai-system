---
migrated: 2025-09-20T01:46:15.789511
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/Backup/Testing plan.md
vault_folder: Inbox/to-review
---
# Testing plan

 Now let me provide you with step-by-step instructions for testing RehearSmart on a physical device:

  📱 Testing RehearSmart on Physical Device - Step by Step Guide

  Prerequisites

  - Mac with Xcode 14.0+ installed
  - iPhone/iPad with iOS 15.0+
  - Lightning/USB-C cable to connect device
  - Apple Developer Account (free or paid)

  Step 1: Open Project in Xcode

  1. Navigate to project directory:
  cd /Users/kavi/Documents/Development/RehearSmart/RehearSmart
  2. Open Xcode project:
  open RehearSmart.xcodeproj

  Step 2: Configure Project Settings

  1. Select your project in the navigator (top "RehearSmart" folder)
  2. In the General tab, update these settings:
    - Bundle Identifier: Change from com.bebetteroffline.rehearsmart to
  something unique like com.yourname.rehearsmart
    - Team: Select your Apple Developer Team
    - Deployment Target: Ensure it's set to iOS 15.0 or higher
  3. In the Signing & Capabilities tab:
    - Enable Automatically manage signing
    - Select your Team
    - Xcode will automatically generate a provisioning profile

  Step 3: Add Required File References

  Important: The files we created need to be added to the Xcode project
  manually:

  1. Right-click on the project in navigator → Add Files to "RehearSmart"
  2. Add all new files we created:
    - App/Info.plist → Add to RehearSmart target
    - Models/Speech.swift → Add to RehearSmart target
    - Services/ folder (all .swift files) → Add to RehearSmart target
    - ViewModels/ folder (all .swift files) → Add to RehearSmart target
    - Views/ folder (all new .swift files) → Add to RehearSmart target
    - Utilities/StyleGuide.swift → Add to RehearSmart target
  3. Update Build Settings:
    - Go to Build Settings → Search for "Info.plist"
    - Set Info.plist File to: App/Info.plist
    - Set Asset Catalog to: Resources/Assets.xcassets

  Step 4: Connect and Select Device

  1. Connect your iPhone/iPad to your Mac with cable
  2. Trust the computer on your device when prompted
  3. In Xcode, select your device from the scheme selector (top left, next
   to the run button)
  4. If device isn't listed:
    - Go to Window → Devices and Simulators
    - Select your device and click "Use for Development"

  Step 5: Build and Test

  1. Build the project first: ⌘+B
    - Fix any compilation errors that appear
    - Common issues: Missing file references, import statements
  2. Run on device: ⌘+R
  3. If you get a "Developer App" error:
    - On your device: Settings → General → VPN & Device Management
    - Find your developer app and tap Trust

  Step 6: Test Core Features

  🎙️ Audio Recording Test

  1. Add a new speech with sample text
  2. Start recording - you should see:
    - Timer counting up
    - Audio level bars responding to your voice
    - Pause/resume functionality works
  3. Stop recording - should show "Processing..." overlay

  🗣️ Speech Recognition Test

  1. After recording, check if transcription appears
  2. Compare with original - tap "Compare" button
  3. Test different view modes (Side by Side, Inline, Differences)

  📊 Data Persistence Test

  1. Force quit the app and restart
  2. Verify speeches and sessions are saved
  3. Test deletion of speeches

  Step 7: Permission Testing

  🎤 Microphone Permission

  - Should prompt on first recording attempt
  - Test denial and re-enabling in Settings → Privacy → Microphone

  🗣️ Speech Recognition Permission

  - Should prompt on first transcription
  - Test denial and re-enabling in Settings → Privacy → Speech Recognition

  Common Issues & Solutions

  Build Errors

  - Missing files: Ensure all .swift files are added to Xcode project
  - Bundle identifier: Must be unique for your Apple ID
  - Deployment target: Check iOS version compatibility

  Runtime Errors

  - Permissions: Check device Settings → Privacy
  - Audio issues: Test in quiet environment first
  - Storage: Check device has sufficient storage

  Performance Testing

  - Long recordings: Test 2-3 minute recordings
  - Memory usage: Monitor in Xcode's Debug Navigator
  - Battery usage: Test extended recording sessions

  Expected Behavior

  ✅ Working Features:
  - Speech creation and storage
  - Audio recording with visual feedback
  - Speech recognition transcription
  - Text comparison with highlighting
  - Session history and playback
  - Accuracy calculation

  ⚠️ Known Limitations:
  - Speech recognition requires internet connection
  - Transcription quality depends on audio quality and speech clarity
  - Large recordings may take time to process

  Next Steps After Testing

  1. Test edge cases: Empty speeches, very long recordings, background
  interruptions
  2. UI testing: Rotation, different screen sizes, accessibility
  3. Performance: Test on older devices if available
  4. User experience: Get feedback from others

  The app is now fully functional and ready for real-world testing! 🎉

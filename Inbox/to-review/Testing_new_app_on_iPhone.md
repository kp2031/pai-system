---
migrated: 2025-09-20T01:46:15.792751
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/Backup/Testing new app on iPhone.md
vault_folder: Inbox/to-review
---
# Testing new app on iPhone

# iPhone Device Testing Guide for RehearSmart

## Prerequisites

1. **Apple Developer Account** (Free or Paid)
   - Free account allows testing on your own devices
   - Paid account ($99/year) allows TestFlight and App Store distribution

2. **Your iPhone**
   - Must be running iOS 18.0 or later
   - Connected to your Mac via USB cable or Wi-Fi

3. **Xcode Setup**
   - Xcode 16.4 or later installed
   - Signed in with your Apple ID

## Step-by-Step Instructions

### Step 1: Configure Your Apple ID in Xcode

1. Open Xcode
2. Go to **Xcode → Settings** (or press `⌘,`)
3. Click the **Accounts** tab
4. Click the **+** button to add your Apple ID if not already added
5. Sign in with your Apple ID credentials

### Step 2: Open the Project

1. Open Terminal and navigate to the project:
   ```bash
   cd /Users/kavi/Documents/Development/RehearSmart
   ```

2. Open the project in Xcode:
   ```bash
   open RehearSmart/RehearSmart.xcodeproj
   ```

### Step 3: Configure Signing & Capabilities

1. In Xcode, select the **RehearSmart** project in the navigator
2. Select the **RehearSmart** target
3. Go to the **Signing & Capabilities** tab
4. Check **Automatically manage signing**
5. Select your **Team** from the dropdown (your Apple ID)
6. The Bundle Identifier should be: `com.bebetteroffline.RehearSmart`
   - If there's an error, you may need to change it to something unique like:
     `com.yourname.RehearSmart`

### Step 4: Connect Your iPhone

1. Connect your iPhone to your Mac using a USB cable
2. Unlock your iPhone
3. If prompted on your iPhone, tap **Trust This Computer** and enter your passcode

### Step 5: Select Your Device

1. In Xcode, look at the scheme selector (top toolbar, next to the play/stop buttons)
2. Click on it and you should see your iPhone listed under **iOS Devices**
3. Select your iPhone (it will show as "iPhone (Your Name)")

### Step 6: Build and Run

1. Click the **Play button** (▶️) or press `⌘R`
2. First time running will show "Could not launch RehearSmart" - this is normal
3. On your iPhone:
   - Go to **Settings → General → VPN & Device Management**
   - Under **Developer App**, tap your Apple ID
   - Tap **Trust "Your Apple ID"**
   - Tap **Trust** in the popup

4. Go back to Xcode and click **Play** again

### Step 7: Grant Permissions

When the app launches for the first time, it will request:
- **Microphone access** - Tap "Allow" to enable recording
- **Speech Recognition** - Tap "Allow" to enable transcription

### Step 8: Test the App

1. The app should now be running on your iPhone!
2. Test key features:
   - Navigate through the Liquid Glass interface
   - Try creating a new speech
   - Test the recording functionality
   - Check the animations and glass effects
   - Verify the comparison view works

## Troubleshooting

### "Failed to register bundle identifier"
- Change the bundle identifier to something unique
- Format: `com.yourname.RehearSmart`

### "Device not available"
- Ensure your iPhone is unlocked
- Check that it's properly connected
- Try restarting both devices

### "Unable to install"
- Check available storage on your iPhone
- Ensure iOS version is 18.0+
- Try deleting the app and reinstalling

### Performance Issues
- The Liquid Glass effects are optimized but may vary by device
- iPhone 15 Pro and newer will show 120fps ProMotion
- Older devices will automatically reduce effects

## Wireless Debugging (Optional)

After first USB connection:
1. Go to **Window → Devices and Simulators**
2. Select your iPhone
3. Check **Connect via network**
4. You can now disconnect the USB cable

## Build for Release Testing

To create an optimized build:
1. Change scheme to **Release** (Product → Scheme → Edit Scheme)
2. Build and run as normal
3. This will give you better performance for testing

## Share with TestFlight (Requires Paid Developer Account)

1. Archive the app (Product → Archive)
2. Upload to App Store Connect
3. Distribute via TestFlight
4. Invite testers via email

---

## Next Steps

After successful testing:
- Report any issues or crashes
- Note any UI/UX improvements needed
- Check performance on different lighting conditions
- Test all orientations and multitasking

For questions or issues, contact: hello@bebetteroffline.com
![Testing new app on iPhone](images/Testing%20new%20app%20on%20iPhone.png)


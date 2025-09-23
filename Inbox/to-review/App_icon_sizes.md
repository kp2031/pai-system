---
migrated: 2025-09-20T01:46:15.686554
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /Apple/App icon sizes.md
vault_folder: Inbox/to-review
---
# App icon sizes

**Image Format and Requirements**

	•	**Format**: PNG (.png)
	•	**Background**: Must not be transparent (fill it with a solid color)
	•	**Resolution**: No compression or resizing — Apple expects pixel-perfect assets.

You don’t supply just one image; you provide **multiple sizes** for various devices. Common ones include:
|  **Size (pixels)**<br/> | **Purpose**<br/> |
|-----|-----|
|  20×20<br/> | Notification (iPhone, iPad)<br/> |
|  29×29<br/> | Settings, Spotlight<br/> |
|  40×40<br/> | Spotlight<br/> |
|  60×60<br/> | iPhone App<br/> |
|  76×76<br/> | iPad App<br/> |
|  83.5×83.5<br/> | iPad Pro<br/> |
|  1024×1024<br/> | App Store Icon (required for App Store submission)<br/> |

**Where to Put App Icons in Xcode**

	•	Use **Asset Catalog** (Assets.xcassets) to manage icons.
	•	Inside this catalog, create or use the default **AppIcon** set:
	•	Right-click inside Assets.xcassets → New App Icon.
	•	Xcode will create a slot-based interface showing where each size should go.

**Naming the Files:**

You **don’t need to name them specifically** — just drag each image into the appropriate size slot. Xcode handles renaming internally.

⸻

🌙** 3. Dark Mode vs. Light Mode Icons**

**App icons do not change with dark/light mode.** iOS does **not** support alternate app icons that automatically switch based on dark/light mode. However:

**Options:**

	•	**Primary Icon**: Use a neutral design that works in both modes.
	•	**Alternate Icons** (Optional):
	•	You can provide alternate icons and let the user choose one manually via UIApplication.shared.setAlternateIconName(...)
	•	You’ll need to declare them in the Info.plist.

🔔 You can’t dynamically switch icons based on system appearance without user interaction.

⸻

✅** 4. Checklist for App Icon Setup**

	1.	Export images from ChatGPT or design tool in **PNG** format.
	2.	Resize them to all required dimensions (or use tools like Xcode or appicon.co).
	3.	Open your Xcode project:
	•	Go to Assets.xcassets.
	•	Use or create AppIcon image set.
	•	Drag images into the correct slots.
	4.	Ensure your app’s Info.plist refers to the correct AppIcon set.
	5.	Clean & rebuild to test how icons show up.

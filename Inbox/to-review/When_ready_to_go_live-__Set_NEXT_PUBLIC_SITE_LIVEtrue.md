---
migrated: 2025-09-20T01:46:15.715912
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /Website/When ready to go live-  Set NEXT_PUBLIC_SITE_LIVE=true.md
vault_folder: Inbox/to-review
---
# When ready to go live:  Set NEXT_PUBLIC_SITE_LIVE=true

# When ready to go live:  **# Set NEXT_PUBLIC_SITE_LIVE=true **

 How to test the site now

  1. Start the dev server:
  npm run dev

  2. Test Coming Soon Mode (Default):
  - Visit http://localhost:3000
  - You'll see the simple coming soon page with email signup

  3. Test Preview Mode (Full Site):
  - Visit http://localhost:3000?preview=preview-bebetteroffline-2024
  - You'll see the complete website with all features

  4. Enable Full Site (When Ready):
  - Edit .env.local and set NEXT_PUBLIC_SITE_LIVE=true
  - Restart the dev server
  - The full site will be visible to everyone

  Safe to Deploy

  The site is now ready to be deployed to Vercel with the feature flag system:
  - Deploy with NEXT_PUBLIC_SITE_LIVE=false to keep it hidden
  - Share preview URL with stakeholders for feedback
  - When RehearSmart is approved, update the App Store URL
  - Set NEXT_PUBLIC_SITE_LIVE=true to launch

  Check the TESTING.md file for a complete testing checklist and deployment guide.

---
migrated: 2025-09-20T01:46:15.712999
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /Website/Prompt to build the website.md
vault_folder: Inbox/to-review
---
# Prompt to build the website

**Prompt for CLI Coding Agent (build & theme the site)**

You are working in an existing Git repository that deploys automatically to Vercel when pushed. Assume Node 18+, pnpm or npm is available. Your job is to implement **bebetteroffline.com** as a movement hub and product home using **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui**, and apply the **Inspira UI** aesthetic as the primary theme across shadcn components.

**Objectives**

	1.	Evangelize the philosophy: **“AI is mastering the digital world. We help humans master the real one.”**

	2.	Provide a **curated, filterable Resource Library** (articles, books, videos, papers, podcasts, tools, courses) with editorial summaries.
	3.	Showcase **RehearSmart** with clear App Store download path (use env placeholder for the URL).
	4.	Capture emails for a newsletter (“Join the movement”).
	5.	Style the entire site with **shadcn/ui** components themed to the **Inspira UI** look and spacing/radius/shadows.

**Tech stack**

	•	**Next.js 14 (App Router)** + **TypeScript**

	•	**Tailwind CSS**

	•	**shadcn/ui** (Radix UI primitives)
	•	**Contentlayer** (file-based content for Resources + Blog)
	•	**Next SEO** for meta/OG/sitemap, **Plausible** for privacy analytics, **@vercel/analytics/react**

	•	**lucide-react** (icons), **framer-motion** (subtle motion), **zod** (validation)

If the repo already has Next.js/Tailwind, augment it; otherwise scaffold cleanly.

**Theme: Apply Inspira UI to shadcn/ui**

	•	Keep **shadcn/ui** as the React component system.
	•	Create a theme preset named **“inspira”** and map its tokens to shadcn CSS variables.
	•	Add styles/themes/inspira.css and import in app/layout.tsx **after** Tailwind base so variables cascade.
	•	Token guidance:
	•	**Colors**: modern, high-contrast neutrals with soft brand accents; define --background, --foreground, --primary, --secondary, --muted, --accent, --border, --ring, plus charts.
	•	**Radius**: rounded corners leaning large (--radius: 1rem; then use rounded-2xl on cards/sections).
	•	**Shadows**: soft elevated cards (apply Tailwind utilities and/or custom --shadow-card).
	•	**Typography**: load a clean geometric/humanist face (e.g., Geist/Inter) via next/font and set Tailwind font-sans.
	•	Update tailwind.config.ts theme.extend to reference the CSS variables.
	•	Set components.json for shadcn/ui and generate core primitives (Button, Card, Badge, Input, Label, Textarea, Dialog, Sheet, Accordion, Tabs, DropdownMenu, Tooltip, Toast, NavigationMenu, Pagination, Table).
	•	Ensure both **light/dark** mode tokens exist (:root and .dark).

Implementation detail: take inspiration from the **Inspira UI** palette/spacing/radii and translate into shadcn variables. Create a ThemeSwitcher if time permits.

**Project structure & routes**

`/app`
`  /(site)`
`    page.tsx                  `*`// Homepage`*`
`
`    manifesto/page.mdx`
`    resources/page.tsx        `*`// Library with filters/search/sort`*`
`
`    resources/[slug]/page.tsx `*`// Resource detail`*`
`
`    tools/rehearsmart/page.tsx`
`    blog/page.tsx`
`    blog/[slug]/page.tsx`
`    about/page.tsx`
`    privacy/page.mdx`
`    terms/page.mdx`
`  api/subscribe/route.ts      `*`// Newsletter handler`*`
`
`/components`
`/lib`
`/content`
`  /resources`*`/*.mdx`*
*`  /blog/*.mdx`*
*`/styles`*
*`  globals.css`*
*`  themes/inspira.css`*`
`

**Homepage sections (in this order)**

	1.	**Hero**

	•	H1: “AI is mastering the digital world. We help you master the real one.”
	•	Subhead: “Tools and training to build offline skills—speaking, presence, and human connection.”
	•	CTAs: “Explore Resources”, “Download RehearSmart”
	2.	**Why Now** (short stat/callout contrasting AI efficiency online vs. irreplaceable offline presence)
	3.	**Tools** (RehearSmart card + “coming soon” slots)
	4.	**Proof** (mini case studies/testimonials; placeholders OK)
	5.	**Movement CTA** (email capture)
	6.	**Latest Resources** (6 items; type chips + topics)

**Resource Library (UX + data)**

	•	**Model** (/content/resources/*.mdx frontmatter):
	•	title, type (article|book|video|paper|podcast|tool|course),
topics[] (public-speaking|leadership|teaching|performance-anxiety|attention|wellbeing|presence|storytelling|learning-science),
level (beginner|intermediate|advanced), sourceUrl, summary (120–200 words),
keyTakeaways[] (3–5), authorOrChannel, durationOrPages, featured (bool), coverImage, publishedAt, slug.
	•	**Index page**: filters (Type/Topics/Level), text search (title/summary/author), sort (“Newest”, “Relevance”). Reflect state in URL params.
	•	**Detail page**: full summary, key takeaways, external link, related items by topic, sidebar CTA (newsletter + RehearSmart).

**RehearSmart page**

	•	3-step explainer (Record → AI feedback → Practice plan)
	•	App Store badge button using env var: NEXT_PUBLIC_REHEARSMART_APPSTORE_URL
	•	Screenshots carousel (placeholder images), FAQ (privacy, data, pricing)

**Newsletter**

	•	/api/subscribe route: POST { email } → **Buttondown** or **ConvertKit** (choose 1; prefer Buttondown for simplicity).
	•	ENV: BUTTONDOWN_API_KEY or ConvertKit equivalents. Validate, return JSON, surface success/error in NewsletterForm.

**Blog & Manifesto**

	•	manifesto/page.mdx (~600–900 words placeholder)
	•	1–2 sample blog posts seeded.

**SEO & Analytics**

	•	next-seo defaults (titleTemplate, openGraph), canonical URLs.
	•	sitemap.xml + robots.txt.
	•	Add **Plausible** + @vercel/analytics/react.
	•	Lighthouse ≥95 across categories.

**Accessibility & motion**

	•	Focus states on all interactive elements.
	•	Respect prefers-reduced-motion.
	•	Use framer-motion sparingly for section reveals/hover micro-interactions.

**Tasks (do these in order)**

	1.	**Scaffold/augment project**

	•	If empty: npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
	•	Add fonts via next/font (Geist/Inter).
	2.	**Install deps**

	•	npx shadcn@latest init -d
	•	Add shadcn components: Button, Card, Badge, Input, Label, Textarea, Dialog, Sheet, Accordion, Tabs, DropdownMenu, Tooltip, Toast, NavigationMenu, Pagination, Table.
	•	npm i contentlayer next-contentlayer next-seo lucide-react framer-motion zod plausible-tracker @vercel/analytics
	3.	**Themeing**

	•	Create styles/themes/inspira.css defining CSS variables for light/dark inspired by Inspira UI; import into globals.css.
	•	Wire tailwind.config.ts to read from variables (colors, radius) and set darkMode: ["class"].
	•	Add ThemeProvider and optional ModeToggle.
	4.	**Contentlayer**

	•	Define contentlayer.config.ts with Resource and Post schemas, MDX support, computed slug.
	•	Build data utilities in /lib/contentlayer.ts (getAllResources, byTopic, related).
	5.	**Routes & pages**

	•	Implement homepage sections as components (Hero, StatCallout, FeatureList, Testimonial, CTASection, ResourceCard, ResourceFilters, NewsletterForm).
	•	Build /resources index (filters/search/sort) as Client Component; detail pages as Server Components.
	•	Build /tools/rehearsmart; read NEXT_PUBLIC_REHEARSMART_APPSTORE_URL.
	6.	**Newsletter**

	•	Implement /api/subscribe/route.ts (Buttondown: POST to /v1/subscribers).
	7.	**SEO/analytics**

	•	Add next-sitemap; generate sitemap.xml and robots.txt.
	•	Add <Analytics /> in layout.tsx; add Plausible script in _document or via Next integration.
	8.	**Seed content**

	•	Create 12 sample resources (realistic placeholders), 2 posts, manifesto text blocks.
	9.	**QA**

	•	Ensure responsive behavior; test dark mode; run Lighthouse locally.
	10.	**Git**

	•	Commit granularly with clear messages (e.g., feat(theme): add inspira theme tokens and shadcn mapping, feat(resources): contentlayer schemas + filters), push to main for Vercel to deploy.

**Acceptance criteria**

	•	✅ Homepage follows the narrative and shows latest resources.
	•	✅ /resources has working filters/search/sort with URL sync.
	•	✅ Resource detail pages render MDX fields and show related items.
	•	✅ /tools/rehearsmart has an App Store button from env var and the 3-step explainer.
	•	✅ Newsletter subscribe works (mock or real provider).
	•	✅ Inspira-styled theme applied across shadcn components (visible radii/shadows/spacing/colors).
	•	✅ SEO assets (OG, sitemap, robots) present; Lighthouse ≥95.

**Env & README**

	•	Provide .env.example with:
	•	NEXT_PUBLIC_REHEARSMART_APPSTORE_URL
	•	BUTTONDOWN_API_KEY (or CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID)
	•	Generate a README with:
	•	How to add a Resource (frontmatter fields)
	•	How to add a Blog post or edit the Manifesto
	•	How to adjust theme tokens in styles/themes/inspira.css
	•	How to run locally and deploy to Vercel

**Deliverable:** updated repo with the full implementation and sample content committed.

⸻

**Note on the theme:** Inspira UI is documented/maintained for Vue/Nuxt and references shadcn-vue; we’re **porting its visual style (tokens/radii/spacing/shadows)** into shadcn/ui (React) via CSS variable mapping and Tailwind config, not importing Vue components.   

For shadcn/ui installation details in Next.js, follow the official guide/CLI.  

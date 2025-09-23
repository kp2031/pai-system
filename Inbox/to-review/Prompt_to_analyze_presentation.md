---
migrated: 2025-09-20T01:46:15.820111
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /Presenting/Strat Deck/Prompt to analyze presentation.md
vault_folder: Inbox/to-review
---
# Prompt to analyze presentation

Below is a **ready‑to‑paste “Step 1 – Preparation Run” prompt**.
Put this into ChatGPT o3‑pro exactly as shown (including the triple back‑ticks).
It will return a **Working Prompt** you can reuse forever in Step 2.

# STEP 1 — GENERATE THE REUSABLE “WORKING PROMPT”
You are ChatGPT o3‑pro.  
Your sole task in this message is to **write (and output) a single, reusable Working Prompt** that I can copy into a *new* chat later.

The Working Prompt must:

────────────────────────────────  SYSTEM & ROLES  ────────────────────────────────

1.  Begin with a **System** message that says:
    “You are the orchestrator of a 10‑person McKinsey‑caliber consulting team.
     Think step‑by‑step in private reasoning but expose only final outputs.”
2.  Immediately define the 10 roles, responsibilities, and interaction rules:
      • Managing Partner – frames the issue tree  
      • Engagement Partner – stress‑tests hypotheses  
      • Engagement Manager – converts tree → workstreams & slide storyline  
      • 2 Sr. Analysts – deep research & models  
      • 5 Analysts – data pulls, competitor benchmarks, visuals  
    (Feel free to add token limits or other guard‑rails for each role.)

──────────────────────────────  PLACEHOLDERS  ───────────────────────────────────

3.  Contain two ALL‑CAP placeholders that the user will fill in later:  
      • <<TOPIC>>        – a one‑sentence description of the business problem  
      • <<SLIDE_COUNT>>  – desired integer number of slides  

──────────────────────────────  OUTPUT RULES  ───────────────────────────────────

4.  Instruct the orchestrator that, **after the user supplies the two placeholders,
    it must return *exactly* two JSON objects** and *nothing else*:
      • JSON_A  → the PowerPoint deck data  
      • JSON_B  → the ≤3‑page executive‑summary doc  

5.  Embed the **explicit JSON schemas** *inside* the Working Prompt so that
    the future run is self‑contained.  Use this exact wording and field order:

   ### SCHEMA FOR `JSON_A` (PPT Deck)
   ```jsonc
   {
     "title":               "string",
     "slide_count":         "<<SLIDE_COUNT>>",
     "slides": [
       {
         "title":   "string",
         "bullets": ["string", ...],
         "chart":   {
           "type":        "bar|line|pie|table|null",
           "description": "string|null"
         },
         "notes":   "string"
       }
     ],
     "citations": [
       {"id": 1, "url": "string", "label": "string"}
     ]
   }

—————

**SCHEMA FOR JSON_B (Exec Summary Doc)**
jsonc

{
  "title":         "string",
  "exec_summary":  "markdown string ≤ 1500 words",
  "key_points":    ["string", ...],
  "citations": [
    {"id": 1, "url": "string", "label": "string"}
  ]
}

1. Require the orchestrator to wrap each JSON block with the following**sentinel tokens** (to simplify downstream parsing): • <<<PPT_JSON>>> … <<<END_PPT_JSON>>> • <<<DOC_JSON>>> … <<<END_DOC_JSON>>>
2. Tell the orchestrator **never to output commentary, markdown, or code fences**— only the two JSON blocks in plain text with the sentinels.

────────────────────────────── STYLE & SIZE ───────────────────────────────────8. Keep the entire Working Prompt ≤ 2 000 tokens. 9. Return your Working Prompt **inside one fenced code block** (…). 10. After the code block, output nothing else.

**NOW WRITE THE WORKING PROMPT.**
pgsql
Copy

> **How to use after you receive it**  
> 1. Copy everything inside the code fence that ChatGPT gives you (that is the Working Prompt).  
> 2. Start a **new** chat, paste the Working Prompt, replace `<<TOPIC>>` and `<<SLIDE_COUNT>>`, hit Enter.  
> 3. Copy the two JSON blocks into files (`slides.json`, `summary.json`) for your slide‑building script.

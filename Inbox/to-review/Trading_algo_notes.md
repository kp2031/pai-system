---
migrated: 2025-09-20T01:58:10.962933
source: apple-notes-exporter
original_path: Backup/iCloud/Notes/Trading algo notes.md
vault_folder: Inbox/to-review
---
# Trading algo notes

I have a trading view premium for creating and back testing algorithms, I have trading view connected to my quest trade Canada brokerage account, I have ChatGPT o3 pro for creating trading algorithms, I have Claude pro and Claude code if needed. As a professional prompt writer, can you please write me a super specific and detailed prompt to be able to input into ChatGPT o3 pro, that takes into account the Canadian TFSA RRSP and RESP limitations below?

Use these rules as the “compliance module” in your prompt—tell the LLM: “When you generate my TradingView → Questrade algo, embed the following constraints:”
	•	**No business-income recharacterization**

	•	Enforce a **minimum hold** of ≥ 48 hours per position.
	•	Cap your **annual trade count** to < 200 trades.
	•	**Disallow pure intraday scalping**—only overnight or multi-day swing trades.
	•	**Market-hours enforcement & API guardrails**

	•	Only fire orders **between 08:00–17:00 ET**; queue or skip alerts outside that window.
	•	Implement **exponential back-off** on Questrade API rate-limit errors; log every rejection.
	•	On any **order rejection** (e.g. insufficient cash), send a real-time alert (SMS/email) and pause new signals until manual review.
	•	**Currency management**

	•	Trade US-listed symbols in the USD sub-account (or fund a USD ledger first); **do not rely** on auto-conversion.
	•	Track P&L in both USD and CAD so you can monitor FX impact separately.
	•	**Automated logging & nightly audit**

	•	**Export every fill, position snapshot, and cash balance** to an immutable log (e.g. daily CSV/S3).
	•	Run a **post-trade audit** each night to confirm:
	•	No negative or “short” quantities anywhere.
	•	All held tickers match your approved list (e.g. SPY, AMZN, NVDA).
	•	Cumulative drawdown is within limits.
	•	**Risk-limits & kill-switches**

	•	Enforce a **per-trade max** (e.g. 2 % of current equity) and **sector/total-exposure caps**.
	•	Define a **global drawdown threshold** (e.g. X % off peak equity) that immediately flips to “paused” mode.
	•	If any compliance check fails (audit error, API rejection storm, missing heartbeat), **halt all new orders** until cleared.

---
migrated: 2025-09-20T01:46:15.765645
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/Archive/Fresh start prompt for a PRD.md
vault_folder: Inbox/to-review
---
# Fresh start prompt for a PRD

I'm building a company under Be Better Offline called RehearSmart. the point of the company is to help someone that's nervous about speaking in public (or simply wants to rehearse) the coaching to get to self-confident. the app provides the coaching and guidance to improve their public speaking. the goal is to use AI to help people be better in their offline world. help them do the things that people do best, in person.
I need your help to turn these notes into super detailed technical product specification document. i want to create an ios app using the iOS 26 liquid glass UI. i want this PRD to use all the best practices in product strategy. have two sections, one where the capabilities are exactly as i outline below and then have another section for capabilities to consider for future versions. i want this to be an offline app that only uses technologies built into iOS 26 like recording, transcription, and apple intelligence capabilities. do not hesitate to make this PRD technical, with architecture diagrams and user flows and if you want. do everything you need to, to make this a world class product vision, strategy and technical PRD.
Started fresh again again?

MVP core capabilities

* Pick a date for a public speaking that you want to prepare for
* Script
	* Type in some bullet points for what you want to talk about
	* (V2) Record some thoughts you have and the AI will capture your thoughts and write a script
* Enter in how much time you want to talk for
* AI gives a first draft using apple intelligence
* User reviews the draft script and picks
	* Good to go with this for now
	* Do you want to sprinkle in some humour
	* Do you want it to be lighter
	* Do you want it to be more serious
* Reveals an event page that you’re preparing for
	* Quick Info at the top
		* Days until event
		* Number of time the script has been rehearsed
		* Average of personal rating of how the speech went
	* An AI generated copy that says something like - “You’re 4 days away, 2-3 more rehearsals can help you get from 3.5(starts) to 4(stars), where you want to be!”
* Rehearse button
	* Opens up a single screen with the following information:
		* Event name at the top
		* Length of time desired to speak for
		* A recommendation to read the script out loud at least 3 times, but not word for word, they should read it, but say it in the way that they would naturally say it vs. What’s exactly written
		* the AI will adapt the script so it ends up in the way you speak
		* Toggle between my script (adapted in users way of speaking) and the original script and have a version that’s the original script in bullet points only
		* An option for the user to hide the script
		* Fixed location record button at the bottom so it’s easily accessible by your thumb, if you’re holding the phone like a microphone
			* The record button toggles between “Record” and “Pause”
		* (V2) The recording should be transcribed exactly with filler words and self-corrections strike-through’d
		* After each recording the user must rate how they think that went out of 5 stars
		* (V2) put some tiny text for avg. where most people are at their first rehearsal (e.g. 1.8-stars), and then also show avg. after 10 rehearsals, e.g 4.1-stars
		* A button to save and review progress
		* A button to save and rehearse again
	* A Review progress page
		* Has all the stats and info the user would want about how their progress is going
		* The title of this page is “Rehearsal progress”
		* There should be a progress graph that shows T-minus (today - event date, in single days) on the x axis and then 0-stars to 5-stars (self-rating) on the y axis
			* (Concept: the user is the only one that provides a numerical rating of how they feel they did, the app only provides coaching, and the coaching is based on how well or not well they did)
		* A stack of all of the “rehearsals cards”, newest / most recent is at the top and the oldest is at the bottom
			* The rehearsal card should contain the date/time, the users rating, a tiny snippet of coaching / 5 word coaching summary / learning from that rehearsal
	* The Rehearsal review page
		* This is where the person sees their rating of this rehearsal (and gets to change their rating if they want) and where we give them coaching
		* There should be some encouragement / motivation statement - so they recognize that we understand what they’re going through
		* We should write a quick coaching summary that’s as specific as possible
			* e.g. you’re speaking quite quickly (124 words per min), to sound more deliberate, slow down (target 90 words per min), we’ll get there
			* e.g. pro tip: you’re ending your sentences with a question tone vs. a statement - let’s try keeping your tone level and not inflecting up - doing this is not easy at all - it’ll take some practice
			* e.g. you used a few of your favourite filler words (e.g. “umm” 8 times and “you know” 4 times) - using a few helps make your speaking sound natural, but let’s try to get it down to 2 or fewer
			* Do not give more than 1 thing to focus on for the next rehearsal - but show the top 5 things they can work on and say “to keep working on in future rehearsals” so they know there’s a long way to go, but they should focus on the next rehearsal the the 1 piece of coaching to improve on
		* Transcription of what was said in the rehearsal, side by side with what was intended to say
		* Then there’s an experience of
		* Based on the way you said your speech, we’ve rewritten the script to sound more like you, what do you think? you can pick which parts you like in this version
		* The script is constantly evolving and so each rehearsals has a version of the script - so it’s hard to compare across different evolving scripts, so we should make sure we’re storing each version of the script and each rehearsal compares with the script that existed right before that rehearsal
		* The first rehearsals are about learning the script and refining it to be in the users voice/tone
		* There’s a side by side of what the script was and what they said exactly
		* And then right below it, there’s another side by side, chopped up into sections, where the user has our re-written scrip that combines the script they had before they rehearsed and the rehearsal (AI extracts the language style of the user and re-writes the previous script)
		* The new-adapted-script has all of its sections selected in green, and where the section is basically the same, select the previous-script as green
			* The activity for the user is to scroll through their script and select the green/no-fill cells to what they want the new script to be to rehearse next
			* There’s a new script section right below that is dynamically being updated based on the cells that were selected
		* (V2) there is a way for the script to auto-scroll - with a slow, medium fast speed of auto-scrolling and then a “scroll/pause” button
		* (V3) the script is chunked into short word-groupings that make it so when you say each word grouping on one line, it feels natural, and slow, and deliberate
		* There’s a rehears again button
			* We want the user to feel like it’s super easy to rehearse over and over and it’s engaging, encouraging and the improvement feedback is infectious
			* There should be a “done rehearsing for now” button
				* There’s encouraging / motivating statement after they end, with a short summary / 3 bullets of the biggest 3 wins or improvements they made in that session and the 3 improvements we’ll work on at the next session that are very specific e.g. getting your words per min down from a zippy 124 to a cool and calm 90 :)
					* This should help motivate them with their improvements as well as set the urgency to come back and make more progress
* there should be a prompt / push notification from the app that asks how the event went the day after, so they can complete a box called "help your future you with some reflections on how you did at the event, and what you think you can do better next time" help your future you


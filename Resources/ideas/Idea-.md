---
migrated: 2025-09-20T01:46:15.823801
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /Presenting/Strat Deck/Idea-.md
vault_folder: Resources/ideas
---
# Idea:

Idea: 
Starting with a full stack app that is on the web - with a future ability to be a windows and Mac desktop apps, iphone app, iPad app, an android phone app in the future, so design it in a way that starts off as a web application, but in the future naive apps can be built using the core capabilities.  

ability for a user to upload a powerpoint presentation file securely with high security 

After data extraction is complete 
A preview feature should be created that allows the user to see that each slide was created into an image
For the user to verify their upload details, file name, number of slides, before hitting a button to start processing the presentation file

The way I was thinking about breaking down this problem is to first
Save each slide as an image 
Put the images of each slide into a new folder that’s created clearly marking each image file as slide 1, slide 2, etc. 
The process each slide, one by one
I want to create a dropdown for what model to use between these:  
**OpenAI GPT-4 Vision** gpt-4-vision-preview 
Google Gemini 2.5 Pro (Vertex AI)
**Google's Gemini Nano**
Meta's Llama 3.3 (Quantized Versions)

The extraction process should the the following for each image 
extract as much details as possible
title
subtitles
all the text on the file and its location on the slide
The formatting of each word on the slide, bold, underline, bullets, etc. 
should be able to look at a graph and the axis markers on the graph and estimate the values of x and y to the point that if it needs to recreate the graph using 

The user should be able to create a button called something like “Improvement feedback” and then each slide is is analyzed individually and then as a whole 
 
The tool should outputs a recommendation summary of what the purpose is of the presentation and to clarify it, and then how, the user should structure their presentation to deliver that purpose in a way that McKinsey & co., BCG, or Bain would do this. 
Then offer a slide by slide guidance on what to do. And what data is missing from the current file that the user should source from internal sources. 

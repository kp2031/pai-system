---
migrated: 2025-09-20T02:07:03.738579
source: apple-notes-exporter
original_path: Backup/iCloud/Imported Notes/Claude code, thinking partner sub agent instructions.md
vault_folder: Inbox/to-review
---
# Claude code, thinking partner sub agent instructions

Claude code, thinking partner sub agent instructions 

I’ll create an enhanced Thinking Partner sub-agent for Claude Code with improved capabilities and provide simple step-by-step activation instructions.

## 📚 Step-by-Step Activation Guide for Your Thinking Partner Sub-Agent

I’ve created an enhanced Thinking Partner sub-agent that’s more sophisticated yet maintains clarity of purpose. Here’s exactly how to activate and use it:

### 🚀 Installation Steps (Super Simple!)

**Step 1: Save the File**

1. Copy all the text from the artifact above
1. Open a text editor (like Notepad on Windows, TextEdit on Mac, or VS Code)
1. Paste the content
1. Save the file with the **exact name**: `thinking-partner.md`
- Make sure it ends with `.md` not `.txt`
- Save it somewhere you’ll remember (like your Documents folder)

**Step 2: Install in Claude Code**

1. Open your terminal/command prompt
1. Navigate to where you want to use this sub-agent
1. Create a `.claude` folder if it doesn’t exist:
   
   ```bash
   mkdir .claude
   ```
1. Copy your `thinking-partner.md` file into the `.claude` folder

**Step 3: Activate the Sub-Agent**

1. In your terminal, while in your project directory, type:
   
   ```bash
   claude --sub-agent thinking-partner
   ```
1. Claude Code will now use your Thinking Partner personality!

### 💡 How to Use Your Thinking Partner

**Starting a Session:**

```bash
claude "I want to explore ideas about [your topic]"
```

**Example Commands:**

- `claude "Help me think through this problem with my team"`
- `claude "I'm stuck on a decision about my project"`
- `claude "Let's brainstorm solutions for improving user engagement"`

### 🎯 Key Improvements I Made

1. **Enhanced Structure**: Added phases of conversation (Discovery → Expansion → Integration → Crystallization) for better flow
1. **Advanced Techniques**: Included sophisticated thinking tools like Dialectical Exploration and First Principles Analysis
1. **Adaptive Styles**: The agent now detects and matches your thinking style (visual, sequential, creative, or kinesthetic)
1. **Better Note-Taking**: Structured template that captures insights, tensions, and patterns - not just bullet points
1. **Quality Markers**: Built-in success indicators so you know when the session is working well
1. **Session Management**: Clear protocols for opening, checking in, and closing conversations

### 🔧 Customization Tips

Want to modify it? You can:

- Change the `Color:` field to any color name you prefer
- Adjust the `Model:` to `opus` for even more sophisticated responses
- Remove any sections you don’t need
- Add your own specific questioning techniques

### 🆘 Troubleshooting

**If it’s not working:**

1. Check the file is named exactly `thinking-partner.md`
1. Ensure it’s in the `.claude` folder in your current directory
1. Make sure you’re using Claude Code version 0.2.0 or later
1. Try running `claude --list-sub-agents` to see if it’s recognized

**Pro tip**: You can have multiple sub-agents! Just create different `.md` files in your `.claude` folder and switch between them using `--sub-agent [name]`

### 🎉 Your First Session

Try this to test it out:

```bash
claude --sub-agent thinking-partner "I'd like to explore how I can be more productive without burning out"
```

The Thinking Partner will guide you through a structured exploration, ask thought-provoking questions, and maintain notes of your insights throughout the conversation.

Is there anything specific about the sub-agent’s capabilities you’d like me to adjust or explain further?​​​​​​​​​​​​​​​​

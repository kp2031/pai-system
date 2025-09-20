# 🧠 Personal AI Infrastructure (PAI) System

> **Your AI Executive Team for Life Augmentation**
> Transform into an augmented human with a VP of AI Agents coordinating specialized Directors who manage domain-specific Assistants

---

## 🚀 Quick Start

```bash
# 1. Clone or download this repository to ~/Obsidian

# 2. Run the setup script
cd ~/Obsidian
chmod +x setup.sh
./setup.sh

# 3. Activate command aliases
source ~/.zshrc  # or ~/.bashrc

# 4. Start using PAI
pai-daily        # Create daily note
pai-project      # Start new project
pai-context      # Load contexts
pai-verify       # Check system health
```

## 🎯 What is PAI?

The Personal AI Infrastructure (PAI) is a sophisticated orchestration system that creates your personal AI executive team. It implements:

- **UFC (Universal File-based Context)**: Centralized context management
- **3-Tier Agent Hierarchy**: VP → Directors → Assistants
- **Mode Separation**: Explicit thinking vs writing modes
- **4-Layer Loading Protocol**: Reliable context awareness
- **Knowledge Compounding**: Every interaction makes the system smarter

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PAI System ("Kai")                   │
├─────────────────────────────────────────────────────────┤
│  Obsidian Vault    │  UFC Context    │  Claude Code    │
├─────────────────────────────────────────────────────────┤
│              Agent Orchestration Layer                  │
│         (VP → Directors → Assistants)                   │
├─────────────────────────────────────────────────────────┤
│               Tool Execution Layer                      │
│    (Commands │ MCPs │ Fabric │ Hooks)                  │
├─────────────────────────────────────────────────────────┤
│            Context Management System (UFC)              │
│              (~/.claude/context/)                       │
└─────────────────────────────────────────────────────────┘
```

## 🤖 Agent Hierarchy

### VP Agent (Master Orchestrator)
- Assesses requests and delegates to Directors
- Coordinates cross-domain initiatives
- Synthesizes insights from multiple sources

### Directors (Domain Experts)
1. **Career Director** - Professional development & work
2. **Family Director** - Relationships & personal connections
3. **Finance Director** - Wealth management & budgeting
4. **Health Director** - Physical & mental wellness
5. **Entertainment Director** - Recreation & hobbies
6. **Knowledge Director** - Learning & research
7. **Meta Director** - System optimization

### Assistants (Task Executors)
- Developer Assistant - Coding and technical work
- Writer Assistant - Content creation
- Research Assistant - Information gathering
- Task Assistant - GTD and productivity
- [Plus many more specialized assistants]

## 🎭 Mode System

### 🧠 Thinking Mode (Default - 80% of time)
- Exploration and ideation
- Question everything
- Make connections
- Avoid premature conclusions
- **Never produces final output**

### ✍️ Writing Mode (Explicit - 20% of time)
- Production and delivery
- Create polished output
- Focus on execution
- **Only activated on explicit request**

## 📋 Core Commands

### Daily Workflow
```bash
pai-daily        # Create/open today's daily note
pai-catchup      # Get project summary
pai-mode         # Switch between thinking/writing modes
```

### Project Management
```bash
pai-project      # Create new project with structure
pai-catchup [project]  # Get project status summary
```

### System Management
```bash
pai-context      # Load UFC contexts
pai-verify       # Check system health
pai              # Show all commands
```

## 📁 Directory Structure

```
~/.claude/                    # UFC Brain
├── CLAUDE.md                 # Master controller
├── agents/                   # Agent definitions
│   ├── vp.md
│   ├── directors/*.md
│   └── assistants/*.md
├── context/                  # Knowledge base
│   ├── domains/
│   ├── projects/
│   └── working/
├── modes/                    # Mode definitions
└── commands/                 # Reusable commands

~/Obsidian/                   # Working vault
├── Projects/                 # Active projects
├── Areas/                    # Life areas
│   └── Career/
│       └── Daily_Notes/
├── Resources/                # Reference materials
├── Archive/                  # Completed work
└── scripts/                  # Automation scripts
```

## 🔄 Daily Workflow

### Morning Routine
1. Run `pai-daily` to create daily note
2. Review calendar and priorities
3. Set top 3 objectives
4. Enter thinking mode (default)

### During the Day
- Log progress in daily note
- Use `pai-catchup` to resume projects
- Switch modes explicitly when needed
- Capture insights and ideas

### Evening Review
- Complete daily note
- Archive conversations
- Update project status
- Plan tomorrow

## 🎯 Key Features

### Daily Notes System
- Automatic daily note creation
- Calendar integration
- Task tracking
- Progress logging
- Insight capture

### Project Management
- Structured project templates
- Progress tracking
- Risk management
- Decision logging
- Daily progress notes

### Context Loading
- 4-layer enforcement protocol
- Automatic context detection
- Project-specific knowledge
- Domain expertise

### Knowledge Compounding
- Every conversation saved
- Patterns extracted
- Solutions reused
- System gets smarter

## 🛠️ Advanced Usage

### Creating Custom Commands
Add new scripts to `~/Obsidian/scripts/` and register in `package.json`:

```json
"scripts": {
  "custom-command": "node scripts/custom-command.js"
}
```

### Adding Domain Contexts
Create domain-specific context files:
```bash
~/.claude/context/domains/[domain]/claude.md
```

### Extending Agents
Add new agents to appropriate directories:
```bash
~/.claude/agents/assistants/[new-assistant].md
```

## 🔍 Troubleshooting

### System Health Check
```bash
pai-verify  # Run comprehensive system test
```

### Common Issues

**Context not loading:**
- Check `~/.claude/CLAUDE.md` exists
- Verify file permissions
- Run `pai-context` to test loading

**Commands not found:**
- Run `source ~/.zshrc` to reload shell
- Check `npm install` completed
- Verify scripts are executable

**Mode confusion:**
- Run `pai-mode status` to check current mode
- Remember: thinking is default
- Switch explicitly with `pai-mode writing`

## 📈 System Metrics

Track your PAI system effectiveness:
- Daily notes created
- Projects managed
- Insights captured
- Time saved per week
- Knowledge accumulated

## 🔐 Privacy & Security

- **Local-first**: All data stays on your machine
- **No telemetry**: No data sent externally
- **Version controlled**: Use git for backup (optional)
- **Encrypted**: Use OS-level encryption

## 📚 Documentation

For detailed documentation, see:
- `planning_files/CLAUDE.md` - Development guidelines
- `planning_files/PRODUCT.md` - Product vision
- `planning_files/TECHNICAL.md` - Technical architecture
- `planning_files/DESIGN.md` - UX design
- `planning_files/EXECUTION.md` - Implementation roadmap

## 🤝 Contributing

The PAI system is designed to evolve. To contribute:
1. Test new patterns in your daily use
2. Document successful workflows
3. Share insights and improvements
4. Build additional agents and commands

## 📝 License

This is a personal productivity system. Use and modify freely for personal use.

## 🙏 Acknowledgments

Built with:
- Claude Code (Anthropic)
- Obsidian for knowledge management
- Inspiration from Daniel Miessler's Fabric
- UNIX philosophy of composable tools

---

## 💡 Philosophy

> "The PAI system is about augmentation, not automation. You are a thinking partner first, a writing tool second. Default to exploration, not production."

Remember:
- **Solve once, reuse forever**
- **Context is everything**
- **Thinking before writing**
- **Every interaction compounds**
- **Human agency is paramount**

---

**System Status**: ACTIVE ✅
**Default Mode**: THINKING 🧠
**Knowledge**: COMPOUNDING 📈

*Welcome to your augmented future with PAI!*
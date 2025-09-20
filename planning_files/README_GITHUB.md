# Personal AI Infrastructure (PAI) - Planning & Architecture

## 🎯 Mission
Build a hierarchical AI system with a VP of AI Agents coordinating specialized Directors who manage domain-specific Assistants, enabling human augmentation across all life domains.

## 📚 Documentation Structure

This repository contains the complete planning and architecture documentation for the PAI system:

### Core Planning Files

1. **[PRODUCT.md](./PRODUCT.md)** - Product vision, features, and user research
2. **[TECHNICAL.md](./TECHNICAL.md)** - System architecture, APIs, and data models
3. **[DESIGN.md](./DESIGN.md)** - UX philosophy, visual design, and user flows
4. **[EXECUTION.md](./EXECUTION.md)** - Implementation roadmap and current status
5. **[BUSINESS.md](./BUSINESS.md)** - Market strategy and business model
6. **[CLAUDE.md](./CLAUDE.md)** - Development guidelines and standards

## 🏗️ Architecture Overview

### UFC (Universal File-based Context) System
```
~/.claude/context/
├── master_claude.md       # Core instructions
├── projects/              # Project-specific contexts
├── domains/               # Domain-specific contexts
└── global/                # Shared commands & patterns
```

### Agent Hierarchy
```
VP (Orchestrator)
├── Career Director → Career Assistants
├── Family Director → Family Assistants
├── Finance Director → Finance Assistants
├── Health Director → Health Assistants
├── Entertainment Director → Entertainment Assistants
└── Knowledge Director → Knowledge Assistants
```

## 🚀 Getting Started

### Prerequisites
- Claude Code (Anthropic's CLI)
- Obsidian for knowledge management
- Node.js for automation scripts
- Fabric for pattern execution

### Quick Start
1. Review `EXECUTION.md` for current status
2. Check `CLAUDE.md` for development guidelines
3. Follow the 6-week implementation plan
4. Start with Week 1: UFC Foundation & Career Domain

## 📈 Implementation Timeline

- **Week 1**: UFC setup, Career domain
- **Week 2**: Family & Friends domain
- **Week 3**: Finance & Health domains
- **Week 4**: Entertainment & Knowledge domains
- **Week 5**: Integration & orchestration
- **Week 6**: Polish & optimization

## 🎭 Key Features

- **Thinking vs Writing Modes** - 80% thinking, 20% writing
- **4-Layer Context Loading** - Reliable context management
- **Progressive Hydration** - Load only what's needed
- **Chat Archiving** - Conversations as knowledge objects
- **Daily Progress Tracking** - Never lose context

## 📊 Success Metrics

- 10x productivity improvement
- 90%+ daily active usage
- 95%+ context load success rate
- 5x more insights captured

## 🤝 Contributing

This is currently a personal project, but contributions and feedback are welcome. Please review the planning files before suggesting changes.

## 📝 License

This project documentation is open source. Implementation details may vary.

## 🔗 Resources

- [Daniel Miessler's PAI Approach](https://danielmiessler.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Fabric Patterns](https://github.com/danielmiessler/fabric)

---

**Status**: 🟢 Active Development - Week 1 Starting

*Last Updated: 2024-11-19*
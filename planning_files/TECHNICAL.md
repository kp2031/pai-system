# Personal AI Infrastructure (PAI) Technical Architecture
*Complete technical documentation for UFC-based AI orchestration system - Last Updated: 2024-11-19*

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Core Services & Components](#core-services--components)
4. [Data Models & Storage](#data-models--storage)
5. [Security Architecture](#security-architecture)
6. [Performance Requirements](#performance-requirements)
7. [API Design](#api-design)
8. [Testing Strategy](#testing-strategy)
9. [Deployment & Infrastructure](#deployment--infrastructure)
10. [Future-Proof Design](#future-proof-design)

---

## Architecture Overview

### Core Technical Principles

1. **File System as Database**: All context, configuration, and state stored as Markdown files
2. **Progressive Context Hydration**: Load only necessary context for each operation
3. **Hierarchical Orchestration**: Three-tier agent system (VP → Directors → Assistants)
4. **Modular Tool Composition**: Solve once, reuse forever through commands/MCPs/patterns
5. **Enforced Context Loading**: 4-layer protocol ensures reliable context awareness
6. **Mode Separation**: Explicit thinking vs writing modes prevent premature convergence

### High-Level Architecture
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
│    (Commands │ MCPs │ Fabric │ Fobs │ Hooks)          │
├─────────────────────────────────────────────────────────┤
│            Context Management System (UFC)              │
│              (~/.claude/context/)                       │
└─────────────────────────────────────────────────────────┘
```

### System Context
- **Purpose**: Augment human capabilities through intelligent AI orchestration
- **Scope**: Complete life management across all domains (career, family, health, finance, entertainment)
- **Users**: Knowledge workers, creators, entrepreneurs, life optimizers
- **External Dependencies**: Claude Code, Obsidian, cloud MCP servers
- **Constraints**: Local-first architecture, privacy-preserving, text-based

---

## Technology Stack

### Development Stack
- **Platform**: Cross-platform (macOS, Linux, Windows via WSL)
- **Language**: TypeScript/JavaScript for tooling, Markdown for content
- **Framework**: Claude Code as primary runtime, Obsidian for knowledge management
- **Database**: File system (Markdown files with YAML frontmatter)
- **Runtime**: Node.js/Bun for command execution

### Key Technologies

#### Frontend Technologies
```
- Obsidian: Knowledge vault and UI
- Markdown: Universal content format
- YAML: Structured metadata in frontmatter
- Mermaid: Diagram and visualization support
```

#### Backend Technologies
```
- Claude Code: AI orchestration runtime
- TypeScript: Hook and command implementation
- Node.js/Bun: Script execution environment
- Git: Version control for knowledge
```

#### Infrastructure & DevOps
```
- Local file system: Primary storage
- Cloud Workers: MCP server hosting (Cloudflare)
- npm/bun: Package management
- Shell scripts: Automation and setup
```

### Version Requirements
- **Node.js Version**: 18.0+ (for modern TypeScript features)
- **Claude Code Version**: Latest (@anthropic-ai/claude-code)
- **Obsidian Version**: 1.5+ (for advanced plugin support)
- **Git Version**: 2.30+ (for advanced features)

---

## Core Services & Components

### Service Architecture

#### UFC Context Service
```
Purpose: Centralized context management system
Responsibilities:
- Load and cache context files
- Manage context hierarchy
- Enforce loading protocols
- Track context usage patterns

Key Files:
- ~/.claude/context/CLAUDE.md - Master UFC documentation
- ~/.claude/context/hierarchy/ - Agent role definitions
- ~/.claude/context/domains/ - Life domain knowledge
- ~/.claude/context/tools/ - Tool documentation
```

#### Agent Orchestration Service
```
Purpose: Three-tier agent hierarchy management
Responsibilities:
- Route requests to appropriate agents
- Manage delegation patterns
- Track agent performance
- Handle cross-domain coordination

Key Files:
- ~/.claude/agents/vp.md - VP orchestrator
- ~/.claude/agents/directors/*.md - Domain directors
- ~/.claude/agents/assistants/*.md - Specialized assistants
- ~/.claude/agents/thinkers/*.md - Thinking-only agents
```

#### Command Execution Service
```
Purpose: Modular tool execution system
Responsibilities:
- Parse and execute commands
- Chain command sequences
- Track command usage
- Manage command dependencies

Key Files:
- ~/.claude/commands/*.md - Command definitions
- package.json - Custom automation scripts
- ~/.claude/commands/recipes/*.md - Command chains
```

#### Mode Management Service
```
Purpose: Control thinking vs writing modes
Responsibilities:
- Enforce current mode
- Prevent premature writing
- Track mode transitions
- Apply mode-specific rules

Key Files:
- ~/.claude/modes/thinking.md - Thinking mode rules
- ~/.claude/modes/writing.md - Writing mode rules
- ~/.claude/hooks/mode-enforcer.ts - Enforcement logic
```

### Component Dependencies
```
User Request → VP Agent → Context Service → UFC Files
VP Agent → Director Agent → Context Service → Domain Knowledge
Director → Assistant Agent → Command Service → Tool Execution
Mode Service → All Agents (enforces behavior)
Hook Service → All Interactions (intercepts and modifies)
```

### Interface Definitions
```typescript
// Context Loading Interface
interface ContextLoader {
    loadMandatory(): Promise<ContextSet>
    loadDomain(domain: string): Promise<DomainContext>
    loadProject(project: string): Promise<ProjectContext>
    verifyLoaded(): boolean
}

// Agent Communication Interface
interface AgentMessage {
    from: string  // Agent path
    to: string    // Target agent path
    priority: 'critical' | 'high' | 'normal' | 'low'
    action: 'inform' | 'request' | 'escalate' | 'delegate'
    content: string
}

// Command Execution Interface
interface Command {
    name: string
    description: string
    process(): Promise<CommandResult>
    chain?: string[]  // Next commands in sequence
}
```

---

## Data Models & Storage

### Data Architecture Strategy
- **Storage Strategy**: Local file system with Markdown files
- **Data Flow**: User → Agents → Context → Commands → Output
- **Persistence**: All state in Markdown with version control
- **Synchronization**: Git for multi-device sync (optional)

### Core Data Models

#### Context File Model
```
Properties:
- path: string - File system location
- content: string - Markdown content
- metadata: YAML - Frontmatter metadata
- references: string[] - Related context files
- loadPriority: number - Loading order

Relationships:
- Parent context (hierarchy)
- Child contexts (subcategories)
- Cross-references (related domains)
```

#### Agent Model
```
Properties:
- id: string - Unique identifier
- type: 'vp' | 'director' | 'assistant' | 'thinker'
- domain: string - Area of responsibility
- contextPaths: string[] - Required context files
- capabilities: string[] - What it can do

Relationships:
- Reports to (parent agent)
- Manages (child agents)
- Collaborates with (peer agents)
```

#### Project Model
```
Properties:
- name: string - Project identifier
- status: 'thinking' | 'researching' | 'writing' | 'complete'
- mode: 'thinking' | 'writing'
- created: Date
- updated: Date

Structure:
- /research/ - Gathered materials
- /chats/ - AI conversations
- /reference/ - Legacy materials
- /daily_progress/ - Progress logs
- /thinking/ - Ideation artifacts
- /output/ - Final deliverables
```

#### Command Model
```
Properties:
- name: string - Command identifier
- description: string - What it does
- inputRequired: object - Parameters needed
- outputFormat: string - Result structure
- chainable: boolean - Can chain with others

Relationships:
- Depends on (other commands)
- Chains to (next commands)
- Used by (agents)
```

### File System Schema
```
~/.claude/
├── CLAUDE.md                 # Master config (enforces loading)
├── agents/
│   ├── vp.md                # VP orchestrator
│   ├── directors/           # Domain directors (7)
│   ├── assistants/          # Specialized assistants (N)
│   └── thinkers/           # Thinking-only agents (4+)
├── commands/                # Reusable commands (20+)
├── context/                 # UFC brain
│   ├── hierarchy/          # Agent roles
│   ├── domains/            # Life domains (7)
│   ├── projects/           # Active projects
│   ├── methodologies/      # How-to guides
│   ├── tools/              # Tool docs
│   └── working/            # Active work
├── fabric/
│   └── patterns/           # 200+ solutions
├── hooks/                   # Automation (5+)
├── mcp/
│   └── .mcp.json           # MCP configs
└── modes/                   # Mode definitions

~/Obsidian/
├── package.json            # Automation scripts
├── CLAUDE.md               # Vault orchestrator
├── Projects/               # Active projects
├── Areas/                  # Ongoing responsibilities
├── Resources/              # Reference materials
├── Archive/                # Completed work
└── Inbox/                  # Capture
```

### Data Migration Strategy
- **Versioning**: Semantic versioning for context structure
- **Migration Process**: Script-based migration with backups
- **Rollback Plan**: Git-based rollback to previous version

---

## Security Architecture

### Security Principles
1. **Local-First**: All sensitive data stays on user's machine
2. **Explicit Consent**: No data sharing without user approval
3. **Encryption Optional**: User can encrypt sensitive contexts

### Authentication & Authorization
```
Authentication Method: None (local system)
Authorization Model: File system permissions
Session Management: Claude Code session-based
API Keys: Stored in environment variables or .env files
```

### Data Protection
- **Encryption at Rest**: Optional via OS-level encryption
- **Encryption in Transit**: HTTPS for MCP servers
- **Key Management**: Environment variables for API keys
- **PII Handling**: Separate sensitive contexts in private folders

### Security Controls
```
Input Validation: Command parameter validation
Path Traversal Prevention: Restricted to defined directories
Secret Management: Never commit API keys
Access Control: File system permissions
Audit Logging: Optional command execution logs
```

### Compliance Requirements
- **GDPR**: User owns all data, can delete anytime
- **Privacy**: No telemetry without consent
- **Security**: Follow OWASP guidelines for web MCPs

---

## Performance Requirements

### Performance Targets

#### Response Time Targets
```
- Context loading: < 500ms for mandatory files
- Agent routing: < 100ms for delegation decision
- Command execution: < 1s for simple commands
- Mode switching: < 200ms for mode change
- Project catchup: < 2s for summary generation
```

#### Throughput Targets
```
- Concurrent contexts: 50+ files in memory
- Commands per minute: 30+ executions
- Agent interactions: 10+ delegations per request
- Daily progress entries: Unlimited
```

#### Resource Utilization
```
- Memory usage: < 500MB for context cache
- CPU usage: < 20% average during operation
- Storage growth: < 100MB per month typical
- File handles: < 100 open simultaneously
```

### Performance Monitoring
- **Metrics Collection**: Command execution timing logs
- **Alerting**: Console warnings for slow operations
- **Benchmarking**: Regular performance testing of context loading

### Optimization Strategies
```
Caching Strategy: In-memory context cache with TTL
File System Optimization: Index frequently accessed files
Lazy Loading: Load contexts only when needed
Batch Operations: Group related context loads
```

---

## API Design

### API Architecture
- **API Style**: File-based and MCP HTTP endpoints
- **Data Format**: Markdown (files), JSON (MCPs)
- **Versioning Strategy**: Semantic versioning for schemas
- **Authentication**: API keys for cloud MCPs

### Core Endpoints (MCP Servers)

#### Life Log MCP
```
POST /api/life-log/capture
Purpose: Record daily activities and thoughts
Request: {
  "type": "meeting" | "thought" | "decision",
  "content": string,
  "timestamp": ISO-8601,
  "tags": string[]
}
Response: { "id": string, "status": "captured" }

GET /api/life-log/search
Purpose: Search through life log entries
Parameters:
  - query: string (required)
  - from: date (optional)
  - to: date (optional)
Response: { "results": Entry[], "count": number }
```

#### Knowledge Base MCP
```
GET /api/kb/search
Purpose: Search across all knowledge
Parameters:
  - query: string
  - domain: string (optional)
  - type: "note" | "chat" | "command" (optional)
Response: { "matches": Document[], "relevance": number[] }

POST /api/kb/add
Purpose: Add knowledge artifact
Request: {
  "type": "insight" | "pattern" | "decision",
  "content": string,
  "source": string,
  "tags": string[]
}
Response: { "id": string, "indexed": boolean }
```

### Error Handling
```json
{
  "error": {
    "code": "CONTEXT_NOT_FOUND",
    "message": "Required context file not found",
    "details": "Path: ~/.claude/context/domains/career.md",
    "timestamp": "2024-11-19T10:30:00Z"
  }
}
```

### API Documentation
- **Documentation Location**: ~/.claude/context/tools/mcp-servers.md
- **Interactive Documentation**: MCP playground (if available)
- **SDK Availability**: TypeScript types for all MCPs

---

## Testing Strategy

### Testing Approach
- **Testing Philosophy**: Context-driven testing
- **Coverage Goals**: 100% critical paths, 80% overall
- **Test Automation**: Automated context verification

### Test Types & Implementation

#### Context Loading Tests
```
Framework: Custom TypeScript test suite
Coverage Target: 100% of loading protocols
Key Areas:
- Mandatory context loading
- Domain-specific loading
- Project context hydration
- Cross-reference resolution
```

#### Agent Communication Tests
```
Scope: All agent delegation paths
Test Environment: Mock agent system
Data Management: Fixture-based test contexts
Scenarios:
- VP to Director delegation
- Cross-domain coordination
- Escalation protocols
- Mode enforcement
```

#### Command Execution Tests
```
Tool: Bun test or Jest
Scenarios:
- Individual command execution
- Command chaining
- Error handling
- Parameter validation
```

### Performance Testing
```
Context Loading: Measure load times for various sizes
Agent Response: Time delegation decisions
Command Chains: Benchmark complex workflows
Memory Usage: Monitor context cache growth
```

### Quality Gates
- **Context Loading**: Must load in < 500ms
- **Mode Enforcement**: 100% prevention of mode violations
- **Command Success**: 95%+ success rate
- **Agent Routing**: Correct delegation 100% of time

---

## Deployment & Infrastructure

### Deployment Architecture
- **Hosting Environment**: Local machine (primary), Cloud Workers (MCPs)
- **Deployment Model**: Local installation with cloud services
- **Scaling Strategy**: Vertical (more powerful local machine)

### Development Workflow
```
Setup → Configuration → Testing → Daily Use → Optimization

Stage Details:
- Setup: Install dependencies, create structure
- Configuration: Customize contexts and agents
- Testing: Verify all systems working
- Daily Use: Regular operation and refinement
- Optimization: Performance tuning and enhancement
```

### Installation Pipeline
```
1. Clone/Create Structure → 2. Install Dependencies → 3. Configure Contexts → 4. Test Loading → 5. Ready

Pipeline Steps:
1. Create ~/.claude/ and ~/Obsidian/ structures
2. npm/bun install for dependencies
3. Populate context files
4. Run verification tests
5. Begin using system
```

### Infrastructure Requirements

#### Local Environment
```
CPU: Modern multi-core processor
Memory: 8GB+ RAM recommended
Storage: 10GB+ free space
Network: Internet for MCP servers
Dependencies: Node.js, Git, Obsidian, Claude Code
```

#### Development Environment
```
Minimum Requirements:
- 4GB RAM
- 5GB storage
- Modern browser

Required Software:
- Claude Code (latest)
- Obsidian (1.5+)
- Node.js (18+)
- Git (2.30+)

Setup Process:
1. Install prerequisites
2. Run setup script
3. Configure personal contexts
4. Test basic workflows
```

---

## Future-Proof Design

### Architectural Flexibility
- **Modular Design**: Each component independently upgradeable
- **Interface Abstraction**: Agents communicate through standard protocols
- **Configuration Management**: All behavior configurable via Markdown

### Technology Evolution Plan

#### Planned Upgrades
```
3 Months:
- Enhanced pattern recognition
- Automated insight extraction
- Advanced command chaining

6 Months:
- Multi-modal support (images, audio)
- Cloud sync capabilities
- Collaborative features

12 Months:
- AR interface integration
- Voice control
- API ecosystem
```

#### Migration Strategy
```
Legacy Support: Markdown format ensures longevity
Gradual Migration: Component-by-component upgrades
Rollback Plan: Git-based version control
```

### Scalability Roadmap

#### Growth Scenarios
```
2x Growth (More Projects):
- Optimize context loading
- Add context search indexing

5x Growth (More Domains):
- Implement context pagination
- Add specialized directors

10x Growth (Team Use):
- Multi-user support
- Shared context pools
- Collaboration features
```

#### Architecture Evolution
```
Phase 1: Current single-user local system
Phase 2: Cloud-augmented with sync
Phase 3: Full cloud-native with local cache
Phase 4: Distributed multi-user platform
```

---

## Implementation Status

### Completed Components ✅
- [✅] UFC architecture design - Centralized context system
- [✅] Agent hierarchy model - VP → Directors → Assistants
- [✅] Mode separation concept - Thinking vs Writing

### Current Development 🚧
- [🚧] Context loading protocol - Implementing 4-layer enforcement
- [🚧] Base agent templates - Creating starter agents
- [🚧] Core commands - Building essential commands

### Future Enhancements 📅
- [📅] Pattern recognition - Cross-domain insights
- [📅] Autonomous behaviors - Proactive agents
- [📅] Advanced MCPs - Custom cloud services
- [📅] Voice interface - Natural language control

---

## Cross-References

- **Product Vision**: See PRODUCT.md for feature requirements and user needs
- **Design System**: See DESIGN.md for user experience architecture
- **Implementation Plan**: See EXECUTION.md for development timeline
- **Development Process**: See CLAUDE.md for coding standards and workflows

---

## Conclusion

The PAI technical architecture is designed to create a genuinely augmenting AI system through centralized context management, hierarchical orchestration, and modular tool composition. The key technical decisions prioritize simplicity, reliability, and extensibility while maintaining local-first privacy.

This architecture provides:
- **Reliability**: 4-layer context enforcement ensures consistent behavior
- **Scalability**: Modular design supports gradual complexity increase
- **Maintainability**: Text-based system is debuggable and version-controllable
- **Extensibility**: New agents, commands, and contexts easily added

The technical foundation enables the PAI system to deliver on its promise of human augmentation through intelligent orchestration, while remaining accessible to non-technical users through its Markdown-based interface.

---

*This document serves as the complete technical architecture reference for the Personal AI Infrastructure system. Update when making significant architectural decisions or changes.*
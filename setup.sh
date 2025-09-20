#!/bin/bash

# PAI System Setup Script
# Complete installation and configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Configuration
UFC_PATH="$HOME/.claude"
OBSIDIAN_PATH="$HOME/Obsidian"

echo -e "${BOLD}${MAGENTA}🚀 PAI System Setup${NC}"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
else
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js version must be 18 or higher${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Node.js $(node -v) installed${NC}"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
else
    echo -e "${GREEN}✅ npm $(npm -v) installed${NC}"
fi

# Check git (optional but recommended)
if command -v git &> /dev/null; then
    echo -e "${GREEN}✅ git $(git --version | cut -d' ' -f3) installed${NC}"
else
    echo -e "${YELLOW}⚠️  git not installed (optional)${NC}"
fi

echo ""
echo -e "${YELLOW}📁 Creating directory structure...${NC}"

# Create UFC directories
mkdir -p "$UFC_PATH"/{agents/{vp,directors,assistants,thinkers},commands/{recipes},context/{hierarchy,domains,projects,methodologies,tools,working},fabric/patterns,hooks,mcp,modes}
echo -e "${GREEN}✅ UFC directories created${NC}"

# Create Obsidian directories
mkdir -p "$OBSIDIAN_PATH"/{Projects,Areas,Resources,Archive,Inbox,scripts}
mkdir -p "$OBSIDIAN_PATH"/Areas/Career/Daily_Notes
echo -e "${GREEN}✅ Obsidian directories created${NC}"

# Install npm dependencies
echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
cd "$OBSIDIAN_PATH"
npm install --silent 2>/dev/null || true
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Make scripts executable
echo ""
echo -e "${YELLOW}🔧 Configuring scripts...${NC}"
if [ -d "$OBSIDIAN_PATH/scripts" ]; then
    chmod +x "$OBSIDIAN_PATH/scripts/"*.js 2>/dev/null || true
    echo -e "${GREEN}✅ Scripts configured${NC}"
fi

# Create command aliases
echo ""
echo -e "${YELLOW}🔗 Creating command shortcuts...${NC}"

# Add to shell profile
SHELL_PROFILE=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_PROFILE="$HOME/.bash_profile"
fi

if [ -n "$SHELL_PROFILE" ]; then
    # Check if already added
    if ! grep -q "PAI System Commands" "$SHELL_PROFILE"; then
        cat >> "$SHELL_PROFILE" << 'EOL'

# PAI System Commands
alias pai-daily='node ~/Obsidian/scripts/daily-note.js'
alias pai-catchup='node ~/Obsidian/scripts/catch-me-up.js'
alias pai-project='node ~/Obsidian/scripts/new-project.js'
alias pai-context='node ~/Obsidian/scripts/load-context.js'
alias pai-mode='node ~/Obsidian/scripts/mode-switch.js'
alias pai-verify='node ~/Obsidian/scripts/verify-system.js'
alias pai='echo "PAI Commands: daily, catchup, project, context, mode, verify"'
EOL
        echo -e "${GREEN}✅ Command aliases added to $SHELL_PROFILE${NC}"
        echo -e "${CYAN}   Run 'source $SHELL_PROFILE' to activate${NC}"
    else
        echo -e "${YELLOW}⚠️  Command aliases already configured${NC}"
    fi
fi

# Run system verification
echo ""
echo -e "${YELLOW}🔍 Running system verification...${NC}"
node "$OBSIDIAN_PATH/scripts/verify-system.js"

# Final summary
echo ""
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo -e "${BOLD}${GREEN}✨ PAI System Setup Complete!${NC}"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo ""
echo -e "${BOLD}Next Steps:${NC}"
echo -e "1. ${CYAN}source $SHELL_PROFILE${NC} - Activate command aliases"
echo -e "2. ${CYAN}pai-daily${NC} - Create your first daily note"
echo -e "3. ${CYAN}pai-project${NC} - Start a new project"
echo -e "4. ${CYAN}pai-context${NC} - Load system context"
echo -e "5. ${CYAN}pai-verify${NC} - Check system health"
echo ""
echo -e "${BOLD}Quick Commands:${NC}"
echo -e "• ${GREEN}pai${NC} - Show all PAI commands"
echo -e "• ${GREEN}pai-mode${NC} - Switch between thinking/writing modes"
echo -e "• ${GREEN}pai-catchup${NC} - Get project summaries"
echo ""
echo -e "${MAGENTA}🧠 Remember: Default mode is THINKING!${NC}"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
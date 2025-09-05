<div align="center">

<img src="https://i.postimg.cc/30Z0xhdP/logo.png" alt="Claude Agent Installer Logo" width="200">

# Claude Agent Installer

</div>

**A powerful CLI tool to install and manage specialized Claude Code agents**

---

## 📋 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Available Agents](#available-agents)
- [Commands](#commands)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🚀 Installation

Install the package globally using npm:

```bash
npm install -g @bramatom/claude-agent-installer
```

## 📖 Usage

### Basic Installation

1. **Navigate to your Claude Code project directory** (where you have or want the `.claude` folder)
2. **Run the installation command**:
   ```bash
   install-agents install
   ```
3. **Select the agents** you want to install using the interactive multi-selector
4. **Confirm installation** and agents will be copied to `.claude/agents/`
5. **Automatic configuration** - Claude will automatically receive instructions to use the agents

### Check Status

Check which agents you have installed:

```bash
install-agents status
```

### List Available Agents

See all agents available in the package:

```bash
install-agents list
```

## 🤖 Available Agents

The package includes **22 senior-level specialized agents** (15+ years of experience) organized by domain:

### 📚 **Documentation and Publishing**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 📚 **installer.docs.book-formatter** | Senior Publishing Technology Architect | Professional book and document formatting |
| 📖 **installer.docs.technical-writer** | Senior Technical Communication Architect | Code documentation and technical writing |

### 💻 **Backend Development**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🟢 **installer.backend.nodejs** | Senior Node.js Backend Architect | REST/GraphQL APIs, microservices, performance optimization |
| 🔴 **installer.backend.php-laravel** | Senior PHP & Laravel Backend Architect | Laravel ecosystem, Eloquent, Artisan commands |

### 🎨 **Frontend Development**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| ⚛️ **installer.frontend.react** | Senior React Frontend Architect | React, TypeScript, state management, performance |
| 🎨 **installer.frontend.tailwind-ui** | Senior UI/UX Design Architect | Design systems, Tailwind CSS, accessibility |

### 📱 **Mobile Development**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 📱 **installer.mobile.react-native** | Senior React Native Architect | Cross-platform mobile apps, navigation |
| 🍎 **installer.mobile.swift-macos** | Senior Swift Language Authority | Native macOS applications, SwiftUI |

### 🗄️ **Database and Infrastructure**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🗄️ **installer.database.sql-architect** | Senior Database Architect & SQL Expert | DB design, query optimization, performance tuning |
| 💻 **installer.console.terminal-expert** | Senior Terminal Applications Architect | CLI tools, shell scripting, automation |

### ☁️ **Cloud and Specific Frameworks**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| ☁️ **installer.cloudflare.wrangler-dev** | Senior Cloudflare Edge Computing Architect | Workers, D1/KV/R2, edge computing |
| 🟡 **installer.laravel.filament-tall** | Senior TALL Stack Architect | Filament admin panels, TALL stack, multi-tenancy |

### 🔧 **Development Workflow**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🚀 **installer.workflow.chat-initializer** | Senior Project Context Analyst | Chat initialization, project context analysis, session preparation |
| 🔧 **installer.git.commit-expert** | Senior Git Workflow Architect | Professional commits, Gitmoji, Git workflows |
| 📋 **installer.git.github-issue-creator** | Senior GitHub Project Management Architect | Structured GitHub issues, bug reports, feature requests |
| 🎲 **installer.testing.mock-generator** | Senior Data Architecture Specialist | Realistic mock data, testing, prototyping |
| 📋 **installer.planning.task-planner** | Senior Project Architecture Strategist | Project planning, task breakdown |

### 🔒 **Security & DevSecOps**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🔒 **installer.security.code-auditor** | Senior Security Code Auditor | Security code review, vulnerability assessment, OWASP compliance |

### 🧪 **Testing & QA**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🧪 **installer.testing.e2e-playwright** | Senior E2E Testing Expert | Playwright, Cypress, browser automation, visual testing |

### 📊 **Data & Analytics**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 📊 **installer.data.python-analyst** | Senior Python Data Analyst | Data science, Pandas, NumPy, ML, statistical analysis |

### 🌐 **DevOps & Infrastructure**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🐳 **installer.devops.docker-expert** | Senior Docker/DevOps Expert | Containerization, Kubernetes, CI/CD, infrastructure automation |

### 🤖 **AI & Machine Learning**
| Agent | Specialty | Primary Use |
|-------|-----------|-------------|
| 🤖 **installer.ai.prompt-engineer** | Senior AI/Prompt Engineer | LLM integration, prompt optimization, AI workflows, RAG systems |

## 💻 Commands

### `install-agents install`
Starts the interactive agent installation process.

**Features:**
- ✅ Automatic `.claude` folder check
- 📋 Interactive multi-selection
- 🔍 Detection of already installed agents
- ✨ Automatic creation of missing directories
- 📊 Detailed installation summary
- 🤖 Automatic Claude configuration with complete instructions

### `install-agents status`
Shows the current status of installed agents.

**Output:**
- 📍 Current directory
- 📂 Claude directory path
- 📊 Count of available vs installed agents
- ✅ List of installed agents
- ⭕ List of non-installed agents

### `install-agents list`
Lists all available agents with descriptions.

**Output:**
- 📦 Agent name
- ✅/⭕ Installation status
- 📝 Functionality description

### `install-agents regenerate`
Regenerates the CLAUDE.md file with installed agent instructions.

**Features:**
- 🔄 Automatic scan of installed agents
- 📝 Generation of detailed instructions for each agent
- 💾 Safe update of CLAUDE.md file with delimited sections
- ✨ Includes complete usage and agent invocation guides

## 🎯 Examples

### Complete Installation
```bash
# Navigate to your project
cd /my/claude/project

# Install agents
install-agents install

# Example output:
# 🤖 Claude Code Agent Installer
# 
# 📦 Available agents: 22
# ✅ Already installed agents: 3
# 
# ? Select agents to install:
# ❯ ◯ installer.backend.nodejs [NOT INSTALLED] - Senior Node.js Backend Architect
#   ◯ installer.frontend.react [NOT INSTALLED] - Senior React Frontend Architect
#   ◯ installer.docs.technical-writer [NOT INSTALLED] - Senior Technical Communication Architect
#   ...
```

### Check Status
```bash
install-agents status

# Example output:
# 📊 Claude Code Agents Status
# 
# 📍 Current directory: /Users/marco/projects/my-app
# 📂 Claude directory: /Users/marco/projects/my-app/.claude
# 
# 📦 Available agents: 22
# ✅ Installed agents: 8
# ⭕ Not installed agents: 9
```

### Instructions Regeneration
```bash
install-agents regenerate

# Example output:
# 🔄 Regenerating CLAUDE.md instructions...
# 
# 📦 Found 7 installed agents:
#   • installer.backend.php-laravel
#   • installer.console.terminal-expert
#   • installer.database.sql-architect
#   • installer.docs.technical-writer
#   • installer.git.commit-expert
#   • installer.planning.task-planner
#   • installer.workflow.chat-initializer
# 
# ✅ Agent instructions updated in CLAUDE.md
# 🎉 Regeneration completed!
```

## 🛠 Development

### Project Structure
```
agent-installer/
├── bin/
│   └── cli.js              # Main CLI
├── lib/
│   └── AgentManager.js     # Core logic
├── agents/
│   ├── installer.backend.nodejs.md
│   ├── installer.frontend.react.md
│   ├── installer.docs.technical-writer.md
│   ├── installer.git.github-issue-creator.md
│   ├── installer.workflow.chat-initializer.md
│   └── ...                 # All 22 agents
├── extras/
│   └── claude-instructions.md  # Complete usage guide
├── package.json
└── README.md
```

### Build and Test
```bash
# Install dependencies
npm install

# Local test
node bin/cli.js --help

# Global installation test
npm link
install-agents --help
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a branch for your feature (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m '✨ Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Adding New Agents

1. Create the agent `.md` file in `agents/` following the naming convention: `installer.domain.specialty.md`
2. Follow the standard format of existing agents
3. Include the "Before Starting Any Task" section with KB.md reference
4. Update documentation (README.md and extras/claude-instructions.md)
5. Test the installation

### Standard Agent Structure
```markdown
---
name: installer.domain.specialty
description: Expertise description and use cases
color: color
---

[Senior-level expertise content...]

## Before Starting Any Task
**CRITICAL**: Always check for and read the `KB.md` file in the project root directory first...
```

## 📄 License

This project is under MIT license - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Contact

**Author:** Bramato Marco

- 🌐 **Website:** [marco.bramato.com](https://marco.bramato.com)
- 📧 **Email:** marco@bramato.com
- 💼 **LinkedIn:** [linkedin.com/in/marcobramato](https://linkedin.com/in/marcobramato)
- 🐙 **GitHub:** [@marcobramato](https://github.com/marcobramato)

---

### 🙏 Acknowledgments

Thanks to the Claude Code community for continuous inspiration and feedback.

### 📈 Versions

- **v2.1.0** - ✨ **NEW FEATURE**: Added chat-initializer agent for project context analysis
- **v2.0.0** - 🚀 **MAJOR UPDATE**: Complete restructuring with 16 specialized agents
  - ♻️ New domain-based naming convention (installer.domain.specialty)
  - ✨ 5 new agents: Node.js, PHP/Laravel, React, SQL Architect, Terminal Expert
  - 🤖 Automatic Claude configuration post-installation
  - 📚 Complete documentation and KB.md integration
  - 🔧 Completely renewed installation system

- **v1.0.2** - README fixes and inquirer compatibility
- **v1.0.1** - Fix inquirer API compatibility
- **v1.0.0** - Initial release with 10 senior-level agents

---

<div align="center">

**If this tool has been useful to you, leave a ⭐ on GitHub!**

[![npm version](https://badge.fury.io/js/@bramatom%2Fclaude-agent-installer.svg)](https://badge.fury.io/js/@bramatom%2Fclaude-agent-installer)
[![Downloads](https://img.shields.io/npm/dm/@bramatom/claude-agent-installer.svg)](https://npmjs.com/package/@bramatom/claude-agent-installer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎵 Support the Developer

**Love coding with chill vibes?** Support this project by listening to my developer album:

### **"Code Chill: Loops of Relaxation"** 🎧

*Perfect background music for your coding sessions*

<div align="center">

[![Listen on Apple Music](https://img.shields.io/badge/Apple_Music-000000?style=for-the-badge&logo=apple-music&logoColor=white)](https://music.apple.com/it/album/code-chill-loops-of-relaxation/1815061487)
[![Listen on Spotify](https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](http://open.spotify.com/intl-it/album/0hBmSuyrMWpdazYTMCV0fp?go=1&nd=1&dlsi=ce8dfc8f237340e7)
[![Listen on YouTube Music](https://img.shields.io/badge/YouTube_Music-FF0000?style=for-the-badge&logo=youtube-music&logoColor=white)](https://music.youtube.com/playlist?list=OLAK5uy_lHyFL4eHr1FAikCrvsQrPYkU3AAX4DM6k)

</div>

*Every stream helps support the development of free tools like this one! 🙏*

</div>
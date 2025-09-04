<div align="center">

<img src="https://i.postimg.cc/30Z0xhdP/logo.png" alt="Claude Agent Installer Logo" width="200">

# Claude Agent Installer

</div>

**Un potente CLI tool per installare e gestire agenti specializzati Claude Code**

---

## 📋 Indice
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Agenti Disponibili](#agenti-disponibili)
- [Comandi](#comandi)
- [Esempi](#esempi)
- [Contribuire](#contribuire)
- [Licenza](#licenza)
- [Contatti](#contatti)

## 🚀 Installazione

Installa il package globalmente usando npm:

```bash
npm install -g @bramatom/claude-agent-installer
```

## 📖 Utilizzo

### Installazione Base

1. **Naviga nella directory del tuo progetto Claude Code** (dove hai o vuoi la cartella `.claude`)
2. **Esegui il comando di installazione**:
   ```bash
   install-agents install
   ```
3. **Seleziona gli agenti** che vuoi installare usando il selettore multiplo interattivo
4. **Conferma l'installazione** e gli agenti verranno copiati in `.claude/agents/`
5. **Configurazione automatica** - Claude riceverà automaticamente le istruzioni per utilizzare gli agenti

### Verifica Status

Controlla quali agenti hai installato:

```bash
install-agents status
```

### Lista Agenti Disponibili

Vedi tutti gli agenti disponibili nel package:

```bash
install-agents list
```

## 🤖 Agenti Disponibili

Il package include **16 agenti specializzati di livello senior** (15+ anni di esperienza) organizzati per dominio:

### 📚 **Documentazione e Publishing**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| 📚 **installer.docs.book-formatter** | Senior Publishing Technology Architect | Formattazione professionale libri e documenti |
| 📖 **installer.docs.technical-writer** | Senior Technical Communication Architect | Documentazione codice e technical writing |

### 💻 **Backend Development**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| 🟢 **installer.backend.nodejs** | Senior Node.js Backend Architect | API REST/GraphQL, microservices, performance optimization |
| 🔴 **installer.backend.php-laravel** | Senior PHP & Laravel Backend Architect | Laravel ecosystem, Eloquent, Artisan commands |

### 🎨 **Frontend Development**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| ⚛️ **installer.frontend.react** | Senior React Frontend Architect | React, TypeScript, state management, performance |
| 🎨 **installer.frontend.tailwind-ui** | Senior UI/UX Design Architect | Design systems, Tailwind CSS, accessibilità |

### 📱 **Mobile Development**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| 📱 **installer.mobile.react-native** | Senior React Native Architect | App mobile cross-platform, navigazione |
| 🍎 **installer.mobile.swift-macos** | Senior Swift Language Authority | Applicazioni macOS native, SwiftUI |

### 🗄️ **Database e Infrastructure**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| 🗄️ **installer.database.sql-architect** | Senior Database Architect & SQL Expert | Design DB, query optimization, performance tuning |
| 💻 **installer.console.terminal-expert** | Senior Terminal Applications Architect | CLI tools, shell scripting, automazione |

### ☁️ **Cloud e Framework Specifici**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| ☁️ **installer.cloudflare.wrangler-dev** | Senior Cloudflare Edge Computing Architect | Workers, D1/KV/R2, edge computing |
| 🟡 **installer.laravel.filament-tall** | Senior TALL Stack Architect | Admin panels Filament, TALL stack, multi-tenancy |

### 🔧 **Development Workflow**
| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| 🔧 **installer.git.commit-expert** | Senior Git Workflow Architect | Commit professionali, Gitmoji, Git workflows |
| 📋 **installer.git.github-issue-creator** | Senior GitHub Project Management Architect | Issue GitHub strutturati, bug reports, feature requests |
| 🎲 **installer.testing.mock-generator** | Senior Data Architecture Specialist | Dati mock realistici, testing, prototipazione |
| 📋 **installer.planning.task-planner** | Senior Project Architecture Strategist | Pianificazione progetti, breakdown task |

## 💻 Comandi

### `install-agents install`
Avvia il processo interattivo di installazione agenti.

**Caratteristiche:**
- ✅ Controllo automatico cartella `.claude`
- 📋 Selezione multipla interattiva
- 🔍 Rilevamento agenti già installati
- ✨ Creazione automatica directory mancanti
- 📊 Riassunto dettagliato dell'installazione
- 🤖 Configurazione automatica Claude con istruzioni complete

### `install-agents status`
Mostra lo status corrente degli agenti installati.

**Output:**
- 📍 Directory corrente
- 📂 Path directory Claude
- 📊 Conteggio agenti disponibili vs installati
- ✅ Lista agenti installati
- ⭕ Lista agenti non installati

### `install-agents list`
Lista tutti gli agenti disponibili con descrizioni.

**Output:**
- 📦 Nome agente
- ✅/⭕ Status installazione
- 📝 Descrizione funzionalità

## 🎯 Esempi

### Installazione Completa
```bash
# Naviga nel tuo progetto
cd /mio/progetto/claude

# Installa agenti
install-agents install

# Output esempio:
# 🤖 Claude Code Agent Installer
# 
# 📦 Agenti disponibili: 16
# ✅ Agenti già installati: 3
# 
# ? Seleziona gli agenti da installare:
# ❯ ◯ installer.backend.nodejs [NON INSTALLATO] - Senior Node.js Backend Architect
#   ◯ installer.frontend.react [NON INSTALLATO] - Senior React Frontend Architect
#   ◯ installer.docs.technical-writer [NON INSTALLATO] - Senior Technical Communication Architect
#   ...
```

### Check Status
```bash
install-agents status

# Output esempio:
# 📊 Status Agenti Claude Code
# 
# 📍 Directory corrente: /Users/marco/progetti/mia-app
# 📂 Directory Claude: /Users/marco/progetti/mia-app/.claude
# 
# 📦 Agenti disponibili: 16
# ✅ Agenti installati: 8
# ⭕ Agenti non installati: 8
```

## 🛠 Sviluppo

### Struttura del Progetto
```
agent-installer/
├── bin/
│   └── cli.js              # CLI principale
├── lib/
│   └── AgentManager.js     # Logica core
├── agents/
│   ├── installer.backend.nodejs.md
│   ├── installer.frontend.react.md
│   ├── installer.docs.technical-writer.md
│   ├── installer.git.github-issue-creator.md
│   └── ...                 # Tutti i 16 agenti
├── extras/
│   └── claude-instructions.md  # Guida completa utilizzo
├── package.json
└── README.md
```

### Build e Test
```bash
# Installa dipendenze
npm install

# Test locale
node bin/cli.js --help

# Test installazione globale
npm link
install-agents --help
```

## 🤝 Contribuire

1. **Fork** il repository
2. **Crea** un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. **Commit** le tue modifiche (`git commit -m '✨ Add amazing feature'`)
4. **Push** sul branch (`git push origin feature/amazing-feature`)
5. **Apri** una Pull Request

### Aggiungere Nuovi Agenti

1. Crea il file `.md` dell'agente in `agents/` seguendo la naming convention: `installer.domain.specialty.md`
2. Segui il formato standard degli agenti esistenti
3. Includi la sezione "Before Starting Any Task" con riferimento a KB.md
4. Aggiorna la documentazione (README.md e extras/claude-instructions.md)
5. Testa l'installazione

### Struttura Standard Agente
```markdown
---
name: installer.domain.specialty
description: Descrizione expertise e casi d'uso
color: colore
---

[Contenuto expertise senior-level...]

## Before Starting Any Task
**CRITICAL**: Always check for and read the `KB.md` file in the project root directory first...
```

## 📄 Licenza

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## 👨‍💻 Contatti

**Autore:** Bramato Marco

- 🌐 **Website:** [marco.bramato.com](https://marco.bramato.com)
- 📧 **Email:** marco@bramato.com
- 💼 **LinkedIn:** [linkedin.com/in/marcobramato](https://linkedin.com/in/marcobramato)
- 🐙 **GitHub:** [@marcobramato](https://github.com/marcobramato)

---

### 🙏 Ringraziamenti

Grazie alla community di Claude Code per l'ispirazione e il feedback continuo.

### 📈 Versioni

- **v2.0.0** - 🚀 **MAJOR UPDATE**: Ristrutturazione completa con 16 agenti specializzati
  - ♻️ Nuova naming convention dominio-based (installer.domain.specialty)
  - ✨ 5 nuovi agenti: Node.js, PHP/Laravel, React, SQL Architect, Terminal Expert
  - 🤖 Configurazione automatica Claude post-installazione
  - 📚 Documentazione completa e KB.md integration
  - 🔧 Sistema di installazione completamente rinnovato

- **v1.0.2** - Correzioni README e compatibilità inquirer
- **v1.0.1** - Fix compatibilità API inquirer
- **v1.0.0** - Release iniziale con 10 agenti senior-level

---

<div align="center">

**Se questo tool ti è stato utile, lascia una ⭐ su GitHub!**

[![npm version](https://badge.fury.io/js/@bramatom%2Fclaude-agent-installer.svg)](https://badge.fury.io/js/@bramatom%2Fclaude-agent-installer)
[![Downloads](https://img.shields.io/npm/dm/@bramatom/claude-agent-installer.svg)](https://npmjs.com/package/@bramatom/claude-agent-installer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
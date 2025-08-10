# Claude Agent Installer

```
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗     █████╗  ██████╗ ███████╗███╗   ██╗████████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗      ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
                                                                                                   
██╗███████╗ ███████╗████████╗ █████╗ ██╗     ██╗     ███████╗██████╗                           
██║██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗██║     ██║     ██╔════╝██╔══██╗                          
██║███████╗ ███████╗   ██║   ███████║██║     ██║     █████╗  ██████╔╝                          
██║╚════██║ ╚════██║   ██║   ██╔══██║██║     ██║     ██╔══╝  ██╔══██╗                          
██║███████║ ███████║   ██║   ██║  ██║███████╗███████╗███████╗██║  ██║                          
╚═╝╚══════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝                          
```

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

Il package include **10 agenti specializzati di livello senior** (15+ anni di esperienza):

| Agente | Specialità | Uso Principale |
|--------|------------|---------------|
| 📚 **book-formatter-expert** | Senior Publishing Technology Architect | Formattazione professionale documenti e libri |
| 📖 **documentation-expert** | Senior Technical Communication Architect | Documentazione codice e technical writing |
| 🎨 **filament-tall-expert** | Senior TALL Stack Architect | Sviluppo admin panel Filament e TALL stack |
| 🔧 **git-commit-expert** | Senior Git Workflow Architect | Commit messages professionali e workflow Git |
| 🎲 **mock-data-generator** | Senior Data Architecture Specialist | Generazione dati mock realistici |
| 📱 **react-native-expert** | Senior React Native Architect | Sviluppo app mobile cross-platform |
| 🍎 **swift-macos-expert** | Senior Swift Language Authority | Sviluppo applicazioni macOS native |
| 🎨 **tailwind-ui-expert** | Senior UI/UX Design Architect | Design systems e Tailwind CSS |
| 📋 **task-planning-expert** | Senior Project Architecture Strategist | Pianificazione progetti complessi |
| ☁️ **wrangler-mock-expert** | Senior Cloudflare Edge Computing Architect | Cloudflare Workers e edge computing |

## 💻 Comandi

### `install-agents install`
Avvia il processo interattivo di installazione agenti.

**Caratteristiche:**
- ✅ Controllo automatico cartella `.claude`
- 📋 Selezione multipla interattiva
- 🔍 Rilevamento agenti già installati
- ✨ Creazione automatica directory mancanti
- 📊 Riassunto dettagliato dell'installazione

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
# 📦 Agenti disponibili: 10
# ✅ Agenti già installati: 2
# 
# ? Seleziona gli agenti da installare:
# ❯ ◯ book-formatter-expert [NON INSTALLATO] - Senior Publishing Technology Architect
#   ◯ documentation-expert [NON INSTALLATO] - Senior Technical Communication Architect
#   ◯ filament-tall-expert [NON INSTALLATO] - Senior TALL Stack Architect
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
# 📦 Agenti disponibili: 10
# ✅ Agenti installati: 5
# ⭕ Agenti non installati: 5
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
│   ├── book-formatter-expert.md
│   ├── documentation-expert.md
│   └── ...                 # Tutti gli agenti
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

1. Crea il file `.md` dell'agente in `agents/`
2. Segui il formato standard degli agenti esistenti
3. Aggiorna la documentazione
4. Testa l'installazione

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

- **v1.0.0** - Release iniziale con 10 agenti senior-level
- Vedi [CHANGELOG.md](CHANGELOG.md) per la storia completa delle versioni

---

<div align="center">

**Se questo tool ti è stato utile, lascia una ⭐ su GitHub!**

[![npm version](https://badge.fury.io/js/@bramatom%2Fclaude-agent-installer.svg)](https://badge.fury.io/js/@bramatom%2Fclaude-agent-installer)
[![Downloads](https://img.shields.io/npm/dm/@bramatom/claude-agent-installer.svg)](https://npmjs.com/package/@bramatom/claude-agent-installer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
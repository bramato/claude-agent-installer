# 📋 Sistema di Gestione Contesto del Progetto

**IMPORTANTE: Prima di utilizzare qualsiasi agente, è necessario inizializzare il sistema di gestione del contesto del progetto.**

## 🚀 Inizializzazione Contesto (OBBLIGATORIA)

### 1. **Creazione Struttura Base**

Crea la seguente struttura di directory nella root del progetto:

```bash
mkdir -p .mcp/doc/{project,frameworks,apis,knowledge,templates}
```

### 2. **File di Contesto Principale**

Crea il file `.mcp/doc/context_main.md` con la seguente struttura:

```markdown
# 🎯 Contesto Principale del Progetto

**Data ultimo aggiornamento:** [INSERIRE_DATA]
**Versione contesto:** 1.0

## 📋 Indice Contesti

### 🏗️ Progetto
- [Struttura Progetto](./project/structure.md)
- [Configurazioni](./project/config.md)
- [Dipendenze](./project/dependencies.md)

### 🔧 Framework e Tecnologie
- [Framework Principali](./frameworks/main.md)
- [Librerie Utilizzate](./frameworks/libraries.md)
- [Versioni e Compatibilità](./frameworks/versions.md)

### 🌐 API e Servizi
- [API Interne](./apis/internal.md)
- [Servizi Esterni](./apis/external.md)
- [Documentazione API](./apis/documentation.md)

### 📚 Knowledge Base
- [Convenzioni Codice](./knowledge/conventions.md)
- [Pattern Architetturali](./knowledge/patterns.md)
- [Best Practices](./knowledge/best_practices.md)

## 🎯 Istruzioni per gli Agenti

**REGOLA FONDAMENTALE:** Tutti gli agenti devono:

1. **Leggere sempre il contesto** prima di iniziare qualsiasi task
2. **Consultare i file specifici** per il dominio di competenza
3. **Aggiornare il contesto** quando necessario
4. **Mantenere la consistenza** con le convenzioni esistenti

## 🔄 Aggiornamento Contesto

Per aggiornare o estendere il contesto, utilizzare l'agente **installer.workflow.context-manager** che può:
- Analizzare documentazione web aggiornata
- Creare nuovi file di contesto atomici
- Integrare nuove tecnologie nel contesto esistente
- Mantenere la coerenza tra tutti i file di contesto
```

### 3. **Template File Base**

Crea i seguenti template di base:

#### `.mcp/doc/project/structure.md`
```markdown
# 📁 Struttura del Progetto

[DESCRIZIONE ARCHITETTURA PROGETTO]

## Directory Principali
- `/src/` - Codice sorgente principale
- `/tests/` - Test suite
- `/docs/` - Documentazione
- `/config/` - File di configurazione

## Pattern Architetturale
[INSERIRE PATTERN UTILIZZATO]

## Note Specifiche
[INSERIRE NOTE SPECIFICHE DEL PROGETTO]
```

#### `.mcp/doc/frameworks/main.md`
```markdown
# 🔧 Framework Principali

## Framework Primario
**Nome:** [INSERIRE_FRAMEWORK]
**Versione:** [INSERIRE_VERSIONE]
**Documentazione:** [INSERIRE_LINK]

## Configurazioni Specifiche
[INSERIRE CONFIGURAZIONI]

## Convenzioni Framework
[INSERIRE CONVENZIONI]
```

#### `.mcp/doc/knowledge/conventions.md`
```markdown
# 📝 Convenzioni del Codice

## Stile di Codifica
[INSERIRE STILE]

## Naming Conventions
[INSERIRE CONVENZIONI NAMING]

## Struttura File
[INSERIRE CONVENZIONI STRUTTURA]

## Pattern Utilizzati
[INSERIRE PATTERN]
```

## ⚡ Workflow Raccomandato

### Per Ogni Sessione di Sviluppo:

1. **Inizializza contesto** (se non fatto)
2. **Consulta context_main.md** per panoramica
3. **Leggi file specifici** per il task
4. **Utilizza agenti specializzati** con contesto
5. **Aggiorna contesto** se necessario

### Per Nuove Tecnologie/Framework:

1. **Invoca installer.workflow.context-manager**
2. **Specifica tecnologia da integrare**
3. **L'agente creerà file di contesto specifici**
4. **Aggiornamento automatico context_main.md**

## 🎯 Vantaggi del Sistema

✅ **Consistenza:** Tutti gli agenti lavorano con le stesse informazioni
✅ **Scalabilità:** Facile aggiungere nuovi contesti
✅ **Manutenibilità:** Informazioni organizzate atomicamente
✅ **Efficienza:** Agenti più precisi con contesto specifico
✅ **Collaborazione:** Team allineato sulle convenzioni

## 📋 Checklist Inizializzazione

- [ ] Creata struttura directory `.mcp/doc/`
- [ ] Creato file `context_main.md`
- [ ] Creati template base nei sotto-directory
- [ ] Popolati file con informazioni specifiche del progetto
- [ ] Testato accesso agli agenti con nuovo sistema

---

**⚠️ IMPORTANTE:** Questo sistema deve essere inizializzato PRIMA di utilizzare qualsiasi agente per garantire risultati ottimali e coerenti.
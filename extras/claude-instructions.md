# Istruzioni per l'utilizzo degli Agenti Installer

## Panoramica degli Agenti Installer

Hai accesso a una suite completa di **15 agenti specializzati** progettati per ottimizzare il tuo flusso di sviluppo. Ogni agente rappresenta 15+ anni di esperienza enterprise nel proprio dominio specifico.

## 🎯 Agenti Disponibili per Dominio

### 📚 **Documentazione e Publishing**
- **`installer.docs.technical-writer`** - Documentazione tecnica, API docs, README, commenti codice
- **`installer.docs.book-formatter`** - Formattazione libri, pubblicazione multi-formato, typesetting

### 💻 **Backend Development**
- **`installer.backend.nodejs`** - Node.js, Express, Fastify, NestJS, API REST/GraphQL
- **`installer.backend.php-laravel`** - PHP moderno, Laravel, Eloquent, Artisan commands

### 🎨 **Frontend Development**  
- **`installer.frontend.react`** - React, TypeScript, state management, performance optimization
- **`installer.frontend.tailwind-ui`** - UI/UX design, Tailwind CSS, design systems, accessibilità

### 📱 **Mobile Development**
- **`installer.mobile.react-native`** - App mobile cross-platform, navigazione, performance
- **`installer.mobile.swift-macos`** - Applicazioni native macOS, SwiftUI, integrazione Apple

### 🗄️ **Database e Infrastructure**
- **`installer.database.sql-architect`** - Design DB, SQL ottimizzato, performance tuning, migrazioni
- **`installer.console.terminal-expert`** - CLI tools, shell scripting, automazione, DevOps

### ☁️ **Cloud e Framework Specifici**
- **`installer.cloudflare.wrangler-dev`** - Cloudflare Workers, edge computing, D1/KV/R2
- **`installer.laravel.filament-tall`** - Admin panels, TALL stack, Livewire, multi-tenancy

### 🔧 **Development Workflow**
- **`installer.git.commit-expert`** - Commit professionali, Gitmoji, Git workflows enterprise
- **`installer.testing.mock-generator`** - Dati mock realistici, testing, prototipazione
- **`installer.planning.task-planner`** - Pianificazione progetti, breakdown task, gestione workflow

## 🚀 Come Utilizzare gli Agenti

### Quando Usare un Agente Specializzato
Gli agenti sono progettati per **task complessi che richiedono expertise deep**:

1. **Progetti Multi-Step** - Task con 3+ fasi distinte
2. **Architetture Enterprise** - Soluzioni scalabili e maintainabili  
3. **Expertise Specifica** - Competenze tecniche avanzate richieste
4. **Integration Complessi** - Interoperabilità tra sistemi diversi

### Pattern di Utilizzo Ottimale

```markdown
# ✅ Esempio Corretto - Task Complesso
"Ho bisogno di implementare un sistema di autenticazione OAuth2 con refresh token, 
middleware di sicurezza, logging audit e integrazione con servizi esterni"
→ Usa: installer.backend.nodejs

# ❌ Esempio Non Ottimale - Task Semplice  
"Come faccio a stampare 'Hello World' in JavaScript?"
→ Non serve un agente specializzato
```

## 🎯 Strategie di Selezione Agente

### 1. **Identifica il Dominio Principale**
- Backend API → `installer.backend.nodejs` o `installer.backend.php-laravel`
- Frontend complesso → `installer.frontend.react`
- Design System → `installer.frontend.tailwind-ui`
- Database optimization → `installer.database.sql-architect`

### 2. **Valuta la Complessità**
- **Alta complessità** → Agente specializzato
- **Media complessità** → Agente se serve expertise specifica
- **Bassa complessità** → Risposta diretta senza agente

### 3. **Considera l'Ecosistema**
- Laravel/PHP → `installer.backend.php-laravel` + `installer.laravel.filament-tall`
- React/Frontend → `installer.frontend.react` + `installer.frontend.tailwind-ui`
- Mobile → `installer.mobile.react-native` o `installer.mobile.swift-macos`

## 💡 Best Practices per Maximum Impact

### Context Rico per gli Agenti
Fornisci sempre:
```markdown
- **Progetto**: Tipo di applicazione (SaaS, e-commerce, mobile app, etc.)
- **Tech Stack**: Framework e librerie attualmente in uso
- **Requirements**: Specifiche funzionali e vincoli tecnici
- **Scala**: Utenti previsti, performance target, compliance needs
- **Team**: Dimensione team, level di expertise, maintainability needs
```

### Workflow Agenti Multipli
Per progetti complessi, usa agenti in sequenza:

1. **Planning** → `installer.planning.task-planner`
2. **Implementation** → Agente tecnico specifico  
3. **Documentation** → `installer.docs.technical-writer`
4. **Git Workflow** → `installer.git.commit-expert`

### Integration con KB.md
Ogni agente legge automaticamente il tuo `KB.md` per:
- Guidelines del progetto
- Convenzioni di codice  
- Standard di qualità
- Requisiti specifici del business

## 🏆 Esempi di Utilizzo Enterprise

### E-commerce Platform
```markdown
1. installer.planning.task-planner → Breakdown architetturale
2. installer.backend.nodejs → API e microservices
3. installer.frontend.react → Dashboard e storefront
4. installer.database.sql-architect → Schema ottimizzato
5. installer.testing.mock-generator → Dataset realistici
```

### SaaS Multi-Tenant
```markdown
1. installer.backend.php-laravel → Core business logic
2. installer.laravel.filament-tall → Admin panel
3. installer.database.sql-architect → Multi-tenancy DB design
4. installer.docs.technical-writer → API documentation
```

### Mobile App + Backend
```markdown
1. installer.mobile.react-native → App cross-platform
2. installer.backend.nodejs → API backend
3. installer.cloudflare.wrangler-dev → Edge functions
4. installer.git.commit-expert → Workflow management
```

## ⚡ Performance Tips

### Parallel Agent Execution  
Per task indipendenti, lancia agenti in parallelo:
```markdown
Task: "Setup completo nuovo progetto"
→ installer.planning.task-planner + installer.git.commit-expert (parallel)
```

### Context Switching Optimization
Mantieni consistency usando lo stesso agente per task correlati invece di switchare continuamente.

### Progressive Enhancement
Inizia con task core, poi aggiungi complexity:
1. **Core functionality** → Agente principale
2. **Enhancement** → Agenti complementari  
3. **Polish** → Documentation e workflow agents

---

**Ricorda**: Gli agenti sono designed per **excellence over speed**. Preferisci qualità enterprise e long-term maintainability rispetto a soluzioni quick-and-dirty.
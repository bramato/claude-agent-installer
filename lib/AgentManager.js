const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class AgentManager {
  constructor() {
    this.packageRoot = path.join(__dirname, '..');
    this.agentsSourceDir = path.join(this.packageRoot, 'agents');
    this.currentDir = process.cwd();
    this.claudeDir = path.join(this.currentDir, '.claude');
    this.agentsTargetDir = path.join(this.claudeDir, 'agents');
  }

  /**
   * Definisce le categorie degli agenti
   */
  getAgentCategories() {
    return {
      'docs': {
        name: '📚 Documentazione e Publishing',
        description: 'Scrittura tecnica, formattazione e documentazione'
      },
      'backend': {
        name: '💻 Backend Development', 
        description: 'Sviluppo server-side e API'
      },
      'frontend': {
        name: '🎨 Frontend Development',
        description: 'Sviluppo interfacce utente e UI/UX'
      },
      'mobile': {
        name: '📱 Mobile Development',
        description: 'Sviluppo applicazioni mobile'
      },
      'database': {
        name: '🗄️ Database e Infrastructure',
        description: 'Database e architetture dati'
      },
      'console': {
        name: '💻 Console e Terminal',
        description: 'CLI tools e automazione terminal'
      },
      'cloudflare': {
        name: '☁️ Cloud e Edge Computing',
        description: 'Servizi cloud e edge computing'
      },
      'laravel': {
        name: '🟡 Framework Specifici',
        description: 'Laravel e framework specializzati'
      },
      'git': {
        name: '🔧 Version Control',
        description: 'Git workflow e project management'
      },
      'workflow': {
        name: '⚡ Development Workflow',
        description: 'Workflow e automazione sviluppo'
      },
      'planning': {
        name: '📋 Project Planning',
        description: 'Pianificazione e organizzazione progetti'
      },
      'testing': {
        name: '🧪 Testing e QA',
        description: 'Testing e quality assurance'
      }
    };
  }

  /**
   * Lista tutti gli agenti disponibili nel package
   */
  getAvailableAgents() {
    try {
      const agentFiles = fs.readdirSync(this.agentsSourceDir)
        .filter(file => file.endsWith('.md'))
        .map(file => ({
          name: file.replace('.md', ''),
          file: file,
          path: path.join(this.agentsSourceDir, file)
        }));
      
      return agentFiles;
    } catch (error) {
      throw new Error(`Unable to read agents directory: ${error.message}`);
    }
  }

  /**
   * Raggruppa gli agenti per categoria
   */
  getAgentsByCategory() {
    const agents = this.getAvailableAgents();
    const categories = this.getAgentCategories();
    const grouped = {};
    
    // Inizializza le categorie
    Object.keys(categories).forEach(key => {
      grouped[key] = {
        ...categories[key],
        agents: []
      };
    });
    
    // Raggruppa gli agenti per dominio
    agents.forEach(agent => {
      const domain = agent.name.split('.')[1]; // estrae dominio da installer.domain.specialty
      if (grouped[domain]) {
        grouped[domain].agents.push(agent);
      } else {
        // Unknown category, add to "other"
        if (!grouped['other']) {
          grouped['other'] = {
            name: '❓ Altri',
            description: 'Agenti non categorizzati',
            agents: []
          };
        }
        grouped['other'].agents.push(agent);
      }
    });
    
    // Rimuove categorie vuote
    Object.keys(grouped).forEach(key => {
      if (grouped[key].agents.length === 0) {
        delete grouped[key];
      }
    });
    
    return grouped;
  }

  /**
   * Controlla quali agenti sono già installati
   */
  getInstalledAgents() {
    if (!fs.existsSync(this.agentsTargetDir)) {
      return [];
    }

    try {
      return fs.readdirSync(this.agentsTargetDir)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
    } catch (error) {
      return [];
    }
  }

  /**
   * Check if .claude folder exists
   */
  checkClaudeDirectory() {
    if (!fs.existsSync(this.claudeDir)) {
      console.log(chalk.yellow('⚠️  .claude folder not found in current directory.'));
      console.log(chalk.blue('ℹ️  Make sure you are in a directory where you want to install Claude Code agents.'));
      return false;
    }
    return true;
  }

  /**
   * Crea la directory degli agenti se non esiste
   */
  ensureAgentsDirectory() {
    if (!fs.existsSync(this.agentsTargetDir)) {
      fs.mkdirSync(this.agentsTargetDir, { recursive: true });
      console.log(chalk.green('✅ Created agents directory in .claude/'));
    }
  }

  /**
   * Mostra la lista degli agenti disponibili
   */
  listAvailableAgents() {
    console.log(chalk.bold.blue('📦 Agenti Claude Code Disponibili:'));
    console.log();

    const availableAgents = this.getAvailableAgents();
    const installedAgents = this.getInstalledAgents();

    availableAgents.forEach(agent => {
      const isInstalled = installedAgents.includes(agent.name);
      const status = isInstalled ? chalk.green('✅ Installed') : chalk.gray('⭕ Not installed');
      
      // Legge la descrizione dall'agent file
      const description = this.getAgentDescription(agent.path);
      
      console.log(`${chalk.bold(agent.name)}`);
      console.log(`  Status: ${status}`);
      console.log(`  Descrizione: ${description}`);
      console.log();
    });
  }

  /**
   * Extract description from agent file
   */
  getAgentDescription(agentPath) {
    try {
      const content = fs.readFileSync(agentPath, 'utf8');
      const descriptionMatch = content.match(/description:\s*(.+)/);
      if (descriptionMatch) {
        const fullDescription = descriptionMatch[1].split('.')[0] + '.';
        // Limita la descrizione a 45 caratteri per garantire una sola riga
        if (fullDescription.length > 45) {
          return fullDescription.substring(0, 42) + '...';
        }
        return fullDescription;
      }
      return 'Nessuna descrizione disponibile.';
    } catch (error) {
      return 'Errore nella lettura della descrizione.';
    }
  }

  /**
   * Mostra lo status degli agenti
   */
  showStatus() {
    console.log(chalk.bold.blue('📊 Status Agenti Claude Code'));
    console.log();

    if (!this.checkClaudeDirectory()) {
      return;
    }

    const availableAgents = this.getAvailableAgents();
    const installedAgents = this.getInstalledAgents();

    console.log(`📍 Directory corrente: ${chalk.cyan(this.currentDir)}`);
    console.log(`📂 Directory Claude: ${chalk.cyan(this.claudeDir)}`);
    console.log();

    console.log(`📦 Agenti disponibili: ${chalk.bold(availableAgents.length)}`);
    console.log(`✅ Agenti installati: ${chalk.bold.green(installedAgents.length)}`);
    console.log(`⭕ Agenti non installati: ${chalk.bold.yellow(availableAgents.length - installedAgents.length)}`);
    console.log();

    if (installedAgents.length > 0) {
      console.log(chalk.bold.green('✅ Agenti installati:'));
      installedAgents.forEach(agent => {
        console.log(`  • ${agent}`);
      });
      console.log();
    }

    const notInstalled = availableAgents
      .filter(agent => !installedAgents.includes(agent.name))
      .map(agent => agent.name);

    if (notInstalled.length > 0) {
      console.log(chalk.bold.yellow('⭕ Agenti non installati:'));
      notInstalled.forEach(agent => {
        console.log(`  • ${agent}`);
      });
    }
  }

  /**
   * Main agent installation process
   */
  async installAgents() {
    console.log(chalk.bold.blue('🤖 Claude Code Agent Installer'));
    console.log();

    // Check .claude directory
    if (!this.checkClaudeDirectory()) {
      console.log();
      const { createDir } = await inquirer.default.prompt([
        {
          type: 'confirm',
          name: 'createDir',
          message: 'Do you want to create a .claude folder here?',
          default: true
        }
      ]);

      if (createDir) {
        fs.mkdirSync(this.claudeDir, { recursive: true });
        console.log(chalk.green('✅ .claude folder created!'));
      } else {
        console.log(chalk.red('❌ Installazione annullata.'));
        return;
      }
    }

    this.ensureAgentsDirectory();

    // Ottieni agenti disponibili e installati
    const availableAgents = this.getAvailableAgents();
    const installedAgents = this.getInstalledAgents();

    if (availableAgents.length === 0) {
      console.log(chalk.red('❌ No agents available in package.'));
      return;
    }

    // Mostra status corrente
    console.log(`📦 Agenti disponibili: ${availableAgents.length}`);
    console.log(`✅ Agents already installed: ${installedAgents.length}`);
    console.log();

    // Chiedi il tipo di selezione
    const { selectionType } = await inquirer.default.prompt([
      {
        type: 'list',
        name: 'selectionType',
        message: 'Come vuoi selezionare gli agenti?',
        choices: [
          { name: '📋 Selezione individuale agenti', value: 'individual' },
          { name: '📂 Installa intera categoria', value: 'category' },
          { name: '🔄 Installa tutto disponibile', value: 'all' }
        ]
      }
    ]);

    let selectedAgents = [];

    if (selectionType === 'all') {
      // Installa tutti gli agenti disponibili non ancora installati
      selectedAgents = availableAgents
        .filter(agent => !installedAgents.includes(agent.name))
        .map(agent => agent.name);
        
      if (selectedAgents.length === 0) {
        console.log(chalk.green('🎉 All agents are already installed!'));
        return;
      }
      
    } else if (selectionType === 'category') {
      // Selezione per categoria
      const agentsByCategory = this.getAgentsByCategory();
      const categoryChoices = Object.keys(agentsByCategory).map(key => ({
        name: `${agentsByCategory[key].name} (${agentsByCategory[key].agents.length} agenti) - ${agentsByCategory[key].description}`,
        value: key
      }));

      const { selectedCategory } = await inquirer.default.prompt([
        {
          type: 'list',
          name: 'selectedCategory',
          message: 'Seleziona la categoria da installare:',
          choices: categoryChoices
        }
      ]);

      // Prendi tutti gli agenti della categoria selezionata
      selectedAgents = agentsByCategory[selectedCategory].agents
        .filter(agent => !installedAgents.includes(agent.name))
        .map(agent => agent.name);
        
      if (selectedAgents.length === 0) {
        console.log(chalk.yellow(`⚠️  All agents in category ${agentsByCategory[selectedCategory].name} are already installed!`));
        return;
      }
      
    } else {
      // Selezione individuale
      const choices = availableAgents.map(agent => ({
        name: this.formatAgentChoice(agent, installedAgents.includes(agent.name)),
        value: agent.name,
        checked: false,
        disabled: installedAgents.includes(agent.name) ? 'Already installed' : false
      }));

      if (choices.every(choice => choice.disabled)) {
        console.log(chalk.green('🎉 All agents are already installed!'));
        return;
      }

      const result = await inquirer.default.prompt([
        {
          type: 'checkbox',
          name: 'selectedAgents',
          message: 'Seleziona gli agenti da installare:',
          choices: choices,
          pageSize: 15,
          validate: (answer) => {
            if (answer.length === 0) {
              return 'You must select at least one agent.';
            }
            return true;
          }
        }
      ]);
      
      selectedAgents = result.selectedAgents;
    }

    if (selectedAgents.length === 0) {
      console.log(chalk.yellow('⚠️  No agents selected. Installation cancelled.'));
      return;
    }

    // Conferma installazione
    console.log();
    console.log(chalk.bold('📋 Agenti selezionati per l\'installazione:'));
    selectedAgents.forEach(agent => {
      console.log(`  • ${chalk.cyan(agent)}`);
    });
    console.log();

    const { confirmInstall } = await inquirer.default.prompt([
      {
        type: 'confirm',
        name: 'confirmInstall',
        message: `Confermi l'installazione di ${selectedAgents.length} agenti?`,
        default: true
      }
    ]);

    if (!confirmInstall) {
      console.log(chalk.yellow('⚠️  Installazione annullata dall\'utente.'));
      return;
    }

    // Installa gli agenti selezionati
    await this.performInstallation(selectedAgents);
  }

  /**
   * Formatta la scelta dell'agente per il selettore
   */
  formatAgentChoice(agent, isInstalled) {
    const status = isInstalled ? chalk.green('[INSTALLATO]') : chalk.gray('[NON INSTALLATO]');
    const description = this.getAgentDescription(agent.path);
    return `${agent.name} ${status} - ${description}`;
  }

  /**
   * Estrae le istruzioni d'uso da un file agente
   */
  getAgentUsageInstructions(agentPath) {
    try {
      const content = fs.readFileSync(agentPath, 'utf8');
      
      // Prima prova a cercare il campo instruction dedicato
      const instructionMatch = content.match(/instruction:\s*(.+)/);
      if (instructionMatch) {
        return instructionMatch[1].trim();
      }
      
      // Fallback: usa il campo description
      const descriptionMatch = content.match(/description:\s*(.+)/);
      if (descriptionMatch) {
        // Estrae la parte principale delle istruzioni prima degli esempi
        const description = descriptionMatch[1];
        const mainInstruction = description.split('Examples:')[0].trim();
        return mainInstruction;
      }
      
      return 'Nessuna istruzione disponibile.';
    } catch (error) {
      return 'Errore nella lettura delle istruzioni.';
    }
  }

  /**
   * Estrae il nome reale dell'agente dal campo name nel file
   */
  getAgentRealName(agentPath) {
    try {
      const content = fs.readFileSync(agentPath, 'utf8');
      const nameMatch = content.match(/^name:\s*(.+)$/m);
      if (nameMatch) {
        return nameMatch[1].trim();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Genera le istruzioni per tutti gli agenti installati
   */
  generateAgentInstructions(installedAgents) {
    // Read context management instructions
    const contextInstructionsPath = path.join(this.packageRoot, 'templates', 'context-instructions.md');
    let contextInstructions = '';
    
    try {
      contextInstructions = fs.readFileSync(contextInstructionsPath, 'utf8');
    } catch (error) {
      console.log(chalk.yellow('⚠️  Context instructions file not found, continuing without...'));
    }

    let instructions = `
<!-- START: Claude Agent Installer Instructions -->
${contextInstructions}

---

# 🤖 Guida Utilizzo Agenti Installati

Gli agenti seguenti sono disponibili e pronti per l'uso. Ogni agente è specializzato in domini specifici e dovrebbe essere invocato quando necessario.

**⚠️ IMPORTANT:** Make sure you have initialized the context management system before using the agents (see previous sections).

## 📋 Agenti Disponibili e Quando Usarli

`;

    installedAgents.forEach(agentName => {
      const agentPath = path.join(this.agentsSourceDir, `${agentName}.md`);
      const agentInstructions = this.getAgentUsageInstructions(agentPath);
      const realAgentName = this.getAgentRealName(agentPath);
      
      // Usa il nome reale dall'interno del file, non il filename
      const agentNameToUse = realAgentName || agentName.replace(/^installer\./, '');
      
      // Formatta il nome per la visualizzazione
      const displayName = agentNameToUse.replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      instructions += `### 🔧 **${displayName}**\n`;
      instructions += `**Nome agente:** \`${agentNameToUse}\`\n\n`;
      instructions += `**Quando usare:** ${agentInstructions}\n\n`;
      instructions += `**Invocazione:** Usa il Task tool con \`subagent_type: "${agentNameToUse}"\`\n\n`;
      instructions += `---\n\n`;
    });

    instructions += `
## 💡 How to Use Agents

1. **Identify the task** you need to accomplish
2. **Choose the appropriate agent** from the list above
3. **Invoke the agent** using the Task tool with the correct name
4. **Provide detailed context** in the task description

## 🚨 Important

- Always use the **Chat Initializer** agent at the beginning of each development session
- Ogni agente ha expertise senior-level (15+ anni di esperienza)
- Agents work autonomously and return complete results
- You can invoke multiple agents in sequence for complex tasks

<!-- END: Claude Agent Installer Instructions -->
`;

    return instructions;
  }

  /**
   * Aggiorna o crea il file CLAUDE.md con le istruzioni degli agenti
   */
  async updateClaudeInstructions(installedAgents) {
    const claudeFilePath = path.join(this.currentDir, 'CLAUDE.md');
    const newInstructions = this.generateAgentInstructions(installedAgents);
    
    try {
      let existingContent = '';
      let isNewFile = false;
      
      if (fs.existsSync(claudeFilePath)) {
        existingContent = fs.readFileSync(claudeFilePath, 'utf8');
        
        // Rimuove la sezione esistente se presente
        const startMarker = '<!-- START: Claude Agent Installer Instructions -->';
        const endMarker = '<!-- END: Claude Agent Installer Instructions -->';
        
        const startIndex = existingContent.indexOf(startMarker);
        const endIndex = existingContent.indexOf(endMarker);
        
        if (startIndex !== -1 && endIndex !== -1) {
          // Rimuove la sezione esistente
          existingContent = existingContent.substring(0, startIndex) + 
                          existingContent.substring(endIndex + endMarker.length);
        }
      } else {
        isNewFile = true;
        // Crea contenuto iniziale per nuovo file
        existingContent = `# Istruzioni per Claude Code

Questo file contiene le istruzioni specifiche per il progetto e gli agenti installati.
`;
      }
      
      // Aggiunge le nuove istruzioni alla fine
      const finalContent = existingContent.trim() + '\n\n' + newInstructions;
      
      fs.writeFileSync(claudeFilePath, finalContent, 'utf8');
      
      if (isNewFile) {
        console.log(chalk.green('✅ CLAUDE.md file created with agent instructions'));
        
        // Ask if to add to .gitignore
        const { addToGitignore } = await inquirer.default.prompt([
          {
            type: 'list',
            name: 'addToGitignore',
            message: 'How do you want to manage CLAUDE.md in version control?',
            choices: [
              { name: 'Ignore globally in .gitignore (recommended)', value: 'global' },
              { name: 'Ignore only locally', value: 'local' },
              { name: 'Do not ignore, track in repository', value: 'track' }
            ],
            default: 'global'
          }
        ]);
        
        await this.handleGitIgnore(addToGitignore);
      } else {
        console.log(chalk.green('✅ Agent instructions updated in CLAUDE.md'));
      }
      
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Unable to update CLAUDE.md: ${error.message}`));
    }
  }

  /**
   * Gestisce l'aggiunta di CLAUDE.md al .gitignore
   */
  async handleGitIgnore(choice) {
    try {
      if (choice === 'global') {
        // Aggiungi a .gitignore
        const gitignorePath = path.join(this.currentDir, '.gitignore');
        let gitignoreContent = '';
        
        if (fs.existsSync(gitignorePath)) {
          gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        }
        
        if (!gitignoreContent.includes('CLAUDE.md')) {
          gitignoreContent += gitignoreContent.endsWith('\n') ? '' : '\n';
          gitignoreContent += '# Claude Code project instructions\nCLAUDE.md\n';
          fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8');
          console.log(chalk.green('✅ CLAUDE.md aggiunto a .gitignore'));
        }
        
      } else if (choice === 'local') {
        // Ignore only locally
        const { stdout } = await execAsync('git update-index --assume-unchanged CLAUDE.md', {
          cwd: this.currentDir
        });
        console.log(chalk.green('✅ CLAUDE.md ignorato localmente da Git'));
        
      } else {
        // Do not ignore
        console.log(chalk.blue('ℹ️  CLAUDE.md will be tracked in the repository'));
      }
      
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Impossibile gestire .gitignore: ${error.message}`));
    }
  }

  /**
   * Esegue l'installazione degli agenti selezionati
   */
  async performInstallation(selectedAgents) {
    console.log();
    console.log(chalk.bold.blue('🚀 Avvio installazione...'));
    console.log();

    let successCount = 0;
    let errorCount = 0;

    for (const agentName of selectedAgents) {
      try {
        const sourceFile = path.join(this.agentsSourceDir, `${agentName}.md`);
        const targetFile = path.join(this.agentsTargetDir, `${agentName}.md`);

        // Copia il file
        await fs.copy(sourceFile, targetFile);
        
        console.log(chalk.green(`✅ ${agentName} installed successfully`));
        successCount++;
      } catch (error) {
        console.log(chalk.red(`❌ Errore nell'installazione di ${agentName}: ${error.message}`));
        errorCount++;
      }
    }

    // Riassunto finale
    console.log();
    console.log(chalk.bold.blue('📊 Installation Summary:'));
    console.log(`✅ Agents installed successfully: ${chalk.bold.green(successCount)}`);
    
    if (errorCount > 0) {
      console.log(`❌ Installation errors: ${chalk.bold.red(errorCount)}`);
    }

    if (successCount > 0) {
      console.log();
      console.log(chalk.bold.green('🎉 Installation completed!'));
      console.log(chalk.blue('ℹ️  Agents are now available in Claude Code.'));
      console.log(chalk.blue(`📂 Path: ${this.agentsTargetDir}`));
      
      // Create directory structure for context management system
      await this.createContextStructure();
      
      // Aggiorna le istruzioni nel file CLAUDE.md
      const currentlyInstalled = this.getInstalledAgents();
      await this.updateClaudeInstructions(currentlyInstalled);
      
      // Esegui il comando Claude con le istruzioni
      await this.executeClaudeInstructions();
    }
  }

  /**
   * Rigenera solo le istruzioni CLAUDE.md senza installare agenti
   */
  async regenerateInstructions() {
    console.log(chalk.bold.blue('🔄 Regenerating CLAUDE.md instructions...'));
    console.log();

    // Verifica che ci siano agenti installati
    const installedAgents = this.getInstalledAgents();
    
    if (installedAgents.length === 0) {
      console.log(chalk.yellow('⚠️  No installed agents found in .claude/agents/'));
      console.log(chalk.blue('ℹ️  Usa "install-agents install" per installare gli agenti prima di rigenerare le istruzioni.'));
      return;
    }

    console.log(`📦 Trovati ${installedAgents.length} agenti installati:`);
    installedAgents.forEach(agent => {
      console.log(`  • ${agent}`);
    });
    console.log();

    try {
      // Rigenera le istruzioni
      await this.updateClaudeInstructions(installedAgents);
      
      console.log();
      console.log(chalk.bold.green('🎉 Regeneration completed!'));
      console.log(chalk.blue('ℹ️  The CLAUDE.md file has been updated with the latest instructions.'));
      
    } catch (error) {
      console.log(chalk.red(`❌ Error during regeneration: ${error.message}`));
      throw error;
    }
  }

  /**
   * Esegue il comando Claude con le istruzioni per utilizzare gli agenti installati
   */
  async executeClaudeInstructions() {
    try {
      console.log();
      console.log(chalk.bold.cyan('🤖 Configurazione Claude Code in corso...'));
      
      // Leggi le istruzioni dal file
      const instructionsPath = path.join(this.packageRoot, 'extras', 'claude-instructions.md');
      const instructions = fs.readFileSync(instructionsPath, 'utf8');
      
      // Crea il comando Claude escapando le virgolette
      const escapedInstructions = instructions.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      const claudeCommand = `claude "${escapedInstructions}"`;
      
      console.log(chalk.blue('ℹ️  Inviando istruzioni a Claude Code...'));
      
      // Esegui il comando
      const { stdout, stderr } = await execAsync(claudeCommand, {
        cwd: this.currentDir,
        timeout: 30000 // 30 secondi di timeout
      });

      if (stdout) {
        console.log(chalk.green('✅ Claude Code configured successfully!'));
        console.log(chalk.gray(stdout));
      }
      
      if (stderr && !stderr.includes('warning')) {
        console.log(chalk.yellow('⚠️  Warnings during configuration:'));
        console.log(chalk.gray(stderr));
      }
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  Unable to automatically execute Claude configuration.'));
      console.log(chalk.blue('ℹ️  You can configure manually by running:'));
      console.log(chalk.cyan('   claude "Leggi il file KB.md del progetto e implementa le linee guida per utilizzare gli agenti installer appena installati"'));
    }
  }

  /**
   * Create directory structure for context management system
   */
  async createContextStructure() {
    try {
      const contextDir = path.join(this.currentDir, '.mcp', 'doc');
      const subdirs = ['project', 'frameworks', 'apis', 'knowledge', 'templates'];
      
      console.log();
      console.log(chalk.bold.blue('📁 Initializing context management system...'));
      
      // Crea la directory principale .mcp/doc
      await fs.ensureDir(contextDir);
      console.log(chalk.green(`✅ Created directory: ${path.relative(this.currentDir, contextDir)}`));
      
      // Crea le sottodirectory
      for (const subdir of subdirs) {
        const subdirPath = path.join(contextDir, subdir);
        await fs.ensureDir(subdirPath);
        console.log(chalk.green(`✅ Created directory: ${path.relative(this.currentDir, subdirPath)}`));
      }
      
      // Aggiungi .mcp/ al .gitignore se esiste
      await this.addMcpToGitignore();
      
      console.log(chalk.blue('ℹ️  Context management system ready for use!'));
      console.log(chalk.yellow('⚠️  Remember to initialize context files as described in CLAUDE.md'));
      
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Avviso: Impossibile creare struttura contesto: ${error.message}`));
      console.log(chalk.blue('ℹ️  You can create it manually with: mkdir -p .mcp/doc/{project,frameworks,apis,knowledge,templates}'));
    }
  }

  /**
   * Aggiunge .mcp/ al .gitignore per evitare di tracciare i file di contesto
   */
  async addMcpToGitignore() {
    try {
      const gitignorePath = path.join(this.currentDir, '.gitignore');
      
      // Verifica se il file .gitignore esiste
      if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        
        // Controlla se .mcp/ è già presente
        if (!gitignoreContent.includes('.mcp/')) {
          // Aggiungi .mcp/ al .gitignore
          const updatedContent = gitignoreContent.trim() + '\n\n# Claude Agent Context Management\n.mcp/\n';
          fs.writeFileSync(gitignorePath, updatedContent, 'utf8');
          console.log(chalk.green('✅ Added .mcp/ to .gitignore'));
        } else {
          console.log(chalk.blue('ℹ️  .mcp/ already present in .gitignore'));
        }
      } else {
        // Crea .gitignore con .mcp/
        const gitignoreContent = '# Claude Agent Context Management\n.mcp/\n';
        fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8');
        console.log(chalk.green('✅ Created .gitignore with .mcp/'));
      }
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Warning: Unable to update .gitignore: ${error.message}`));
      console.log(chalk.blue('ℹ️  Manually add ".mcp/" to your .gitignore'));
    }
  }
}

module.exports = AgentManager;
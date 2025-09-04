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
      throw new Error(`Impossibile leggere la directory degli agenti: ${error.message}`);
    }
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
   * Verifica se la cartella .claude existe
   */
  checkClaudeDirectory() {
    if (!fs.existsSync(this.claudeDir)) {
      console.log(chalk.yellow('⚠️  Cartella .claude non trovata nella directory corrente.'));
      console.log(chalk.blue('ℹ️  Assicurati di essere in una directory dove vuoi installare gli agenti Claude Code.'));
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
      console.log(chalk.green('✅ Creata directory agents in .claude/'));
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
      const status = isInstalled ? chalk.green('✅ Installato') : chalk.gray('⭕ Non installato');
      
      // Legge la descrizione dall'agent file
      const description = this.getAgentDescription(agent.path);
      
      console.log(`${chalk.bold(agent.name)}`);
      console.log(`  Status: ${status}`);
      console.log(`  Descrizione: ${description}`);
      console.log();
    });
  }

  /**
   * Estrae la descrizione da un file agente
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
   * Processo principale di installazione degli agenti
   */
  async installAgents() {
    console.log(chalk.bold.blue('🤖 Claude Code Agent Installer'));
    console.log();

    // Verifica directory .claude
    if (!this.checkClaudeDirectory()) {
      console.log();
      const { createDir } = await inquirer.default.prompt([
        {
          type: 'confirm',
          name: 'createDir',
          message: 'Vuoi creare una cartella .claude qui?',
          default: true
        }
      ]);

      if (createDir) {
        fs.mkdirSync(this.claudeDir, { recursive: true });
        console.log(chalk.green('✅ Cartella .claude creata!'));
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
      console.log(chalk.red('❌ Nessun agente disponibile nel package.'));
      return;
    }

    // Mostra status corrente
    console.log(`📦 Agenti disponibili: ${availableAgents.length}`);
    console.log(`✅ Agenti già installati: ${installedAgents.length}`);
    console.log();

    // Prepara le opzioni per il selettore
    const choices = availableAgents.map(agent => ({
      name: this.formatAgentChoice(agent, installedAgents.includes(agent.name)),
      value: agent.name,
      checked: false, // Non pre-seleziona nessuno per default
      disabled: installedAgents.includes(agent.name) ? 'Già installato' : false
    }));

    if (choices.every(choice => choice.disabled)) {
      console.log(chalk.green('🎉 Tutti gli agenti sono già installati!'));
      return;
    }

    // Selettore multiplo degli agenti da installare
    const { selectedAgents } = await inquirer.default.prompt([
      {
        type: 'checkbox',
        name: 'selectedAgents',
        message: 'Seleziona gli agenti da installare:',
        choices: choices,
        pageSize: 15,
        validate: (answer) => {
          if (answer.length === 0) {
            return 'Devi selezionare almeno un agente.';
          }
          return true;
        }
      }
    ]);

    if (selectedAgents.length === 0) {
      console.log(chalk.yellow('⚠️  Nessun agente selezionato. Installazione annullata.'));
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
        
        console.log(chalk.green(`✅ ${agentName} installato con successo`));
        successCount++;
      } catch (error) {
        console.log(chalk.red(`❌ Errore nell'installazione di ${agentName}: ${error.message}`));
        errorCount++;
      }
    }

    // Riassunto finale
    console.log();
    console.log(chalk.bold.blue('📊 Riassunto Installazione:'));
    console.log(`✅ Agenti installati con successo: ${chalk.bold.green(successCount)}`);
    
    if (errorCount > 0) {
      console.log(`❌ Errori durante l'installazione: ${chalk.bold.red(errorCount)}`);
    }

    if (successCount > 0) {
      console.log();
      console.log(chalk.bold.green('🎉 Installazione completata!'));
      console.log(chalk.blue('ℹ️  Gli agenti sono ora disponibili in Claude Code.'));
      console.log(chalk.blue(`📂 Path: ${this.agentsTargetDir}`));
      
      // Esegui il comando Claude con le istruzioni
      await this.executeClaudeInstructions();
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
        console.log(chalk.green('✅ Claude Code configurato con successo!'));
        console.log(chalk.gray(stdout));
      }
      
      if (stderr && !stderr.includes('warning')) {
        console.log(chalk.yellow('⚠️  Avvisi durante la configurazione:'));
        console.log(chalk.gray(stderr));
      }
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  Impossibile eseguire automaticamente la configurazione Claude.'));
      console.log(chalk.blue('ℹ️  Puoi configurare manualmente eseguendo:'));
      console.log(chalk.cyan('   claude "Leggi il file KB.md del progetto e implementa le linee guida per utilizzare gli agenti installer appena installati"'));
    }
  }
}

module.exports = AgentManager;
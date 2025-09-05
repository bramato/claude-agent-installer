#!/usr/bin/env node

const { program } = require('commander');
const AgentManager = require('../lib/AgentManager');

program
  .version('2.5.0')
  .description('Claude Code Agent Installer - Installa e gestisce agenti Claude Code');

program
  .command('install')
  .description('Installa agenti Claude Code nella cartella corrente')
  .action(async () => {
    try {
      const agentManager = new AgentManager();
      await agentManager.installAgents();
    } catch (error) {
      console.error('❌ Errore durante l\'installazione:', error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('Lista tutti gli agenti disponibili')
  .action(() => {
    try {
      const agentManager = new AgentManager();
      agentManager.listAvailableAgents();
    } catch (error) {
      console.error('❌ Errore durante la lista:', error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Mostra lo stato degli agenti installati')
  .action(() => {
    try {
      const agentManager = new AgentManager();
      agentManager.showStatus();
    } catch (error) {
      console.error('❌ Errore durante il controllo status:', error.message);
      process.exit(1);
    }
  });

program
  .command('regenerate')
  .description('Rigenera il file CLAUDE.md con le istruzioni degli agenti installati')
  .action(async () => {
    try {
      const agentManager = new AgentManager();
      await agentManager.regenerateInstructions();
    } catch (error) {
      console.error('❌ Errore durante la rigenerazione:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

// Se nessun comando è specificato, mostra l'help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
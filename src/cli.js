#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { AgentCommander } from './agents/AgentCommander.js';
import { SpecializedRobot, ROBOT_DEFINITIONS } from './agents/SpecializedRobots.js';
import { ModelManager } from './utils/ModelManager.js';
import { WhatsAppBridge } from './tools/WhatsAppBridge.js';
import { TelegramBridge } from './tools/TelegramBridge.js';

const program = new Command();
const CONFIG_PATH = path.join(process.cwd(), 'config', 'user-config.json');

program
    .name('deep-inspire')
    .description('Deep Inspire Robots: Hybrid AI Agent System with WhatsApp & Telegram Bridge')
    .version('4.0.0');

program
    .command('setup')
    .description('Initialize Commander, Local Models, and API Keys')
    .action(async () => {
        console.log(chalk.bold.cyan('\n--- Deep Inspire Robots Hybrid Setup ---'));
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'version',
                message: 'Select Operation Mode:',
                choices: [
                    'Version 1: Baseline (Local First)',
                    'Version 2: Balanced (Hybrid)',
                    'Version 3: Advanced (Cloud Intensive)'
                ],
            },
            {
                type: 'list',
                name: 'provider',
                message: 'Select Strategic Cloud Provider:',
                choices: ['google', 'openai', 'anthropic'],
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model Name (e.g. gemini-1.5-flash):',
                default: (ans) => ans.provider === 'google' ? 'gemini-1.5-flash' : 'gpt-4o',
            },
            {
                type: 'password',
                name: 'apiKey',
                message: 'Enter your AI API Key:',
            },
            {
                type: 'password',
                name: 'telegramToken',
                message: 'Enter your Telegram Bot Token (from BotFather) [Optional]:',
            }
        ]);

        if (!fs.existsSync(path.dirname(CONFIG_PATH))) {
            fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(answers, null, 2));
        
        await ModelManager.setupLocalModels(answers.version);
        
        console.log(chalk.green('\n✅ System Initialized! Your Commander is ready for Local, VPS, WhatsApp, and Telegram use.'));
    });

program
    .command('telegram')
    .description('Start the Telegram Bridge')
    .action(async () => {
        if (!fs.existsSync(CONFIG_PATH)) {
            console.log(chalk.red('❌ Error: Configuration not found. Run "deep-inspire setup" first.'));
            return;
        }

        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
        if (!config.telegramToken) {
            console.log(chalk.red('❌ Error: Telegram Token not found in config. Run "deep-inspire setup" to add it.'));
            return;
        }

        const commander = new AgentCommander(config);
        ROBOT_DEFINITIONS.forEach(def => {
            commander.registerRobot(def.name, new SpecializedRobot(config, def.name, def.expertise, def.layer));
        });

        const bridge = new TelegramBridge(commander, config.telegramToken);
        bridge.init();
    });

program
    .command('whatsapp')
    .description('Start the WhatsApp Bridge')
    .action(async () => {
        if (!fs.existsSync(CONFIG_PATH)) {
            console.log(chalk.red('❌ Error: Configuration not found. Run "deep-inspire setup" first.'));
            return;
        }

        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
        const commander = new AgentCommander(config);
        ROBOT_DEFINITIONS.forEach(def => {
            commander.registerRobot(def.name, new SpecializedRobot(config, def.name, def.expertise, def.layer));
        });

        const bridge = new WhatsAppBridge(commander);
        await bridge.init();
    });

program
    .command('run')
    .description('Execute a mission through the CLI')
    .argument('<task...>', 'Task description')
    .action(async (taskArray) => {
        const task = taskArray.join(' ');
        if (!fs.existsSync(CONFIG_PATH)) {
            console.log(chalk.red('❌ Error: Configuration not found. Run "deep-inspire setup".'));
            return;
        }

        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
        const commander = new AgentCommander(config);

        ROBOT_DEFINITIONS.forEach(def => {
            commander.registerRobot(def.name, new SpecializedRobot(config, def.name, def.expertise, def.layer));
        });

        console.log(chalk.blue(`\n🚀 Deploying Mission: ${task}`));
        try {
            const result = await commander.delegateTask(task);
            console.log(chalk.green('\n--- Mission Report ---'));
            console.log(result);
        } catch (error) {
            console.log(chalk.red('\n❌ Critical Failure:'), error.message);
        }
    });

program.parse(process.argv);

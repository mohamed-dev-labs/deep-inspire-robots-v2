#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { AgentCommander } from './agents/AgentCommander.js';
import { SpecializedRobot, ROBOT_DEFINITIONS } from './agents/SpecializedRobots.js';

const program = new Command();
const CONFIG_PATH = path.join(process.cwd(), 'config', 'user-config.json');

program
    .name('deep-inspire')
    .description('Deep Inspire Robots: Hybrid AI Agent System')
    .version('3.0.0');

program
    .command('setup')
    .description('Initialize the Commander and configure Hybrid Layers')
    .action(async () => {
        console.log(chalk.bold.cyan('\n--- Deep Inspire Robots Hybrid Setup ---'));
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'version',
                message: 'Select Operation Mode (Versioning):',
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
                message: 'Enter your API Key:',
            }
        ]);

        if (!fs.existsSync(path.dirname(CONFIG_PATH))) {
            fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(answers, null, 2));
        console.log(chalk.green('\n✅ Hybrid System Initialized! Ready for deployment.'));
    });

program
    .command('run')
    .description('Execute a mission through the Orchestration Layer')
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

program
    .command('list')
    .description('List the 30 Sub-Agents and their Layers')
    .action(() => {
        console.log(chalk.bold.magenta('\n--- Deep Inspire: Sub-Agent Layer Fleet ---'));
        ROBOT_DEFINITIONS.forEach((def, index) => {
            console.log(`${chalk.yellow(index + 1 + '.')} [${def.layer}] ${chalk.bold(def.name)}: ${def.expertise}`);
        });
    });

program.parse(process.argv);

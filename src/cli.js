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
    .description('Deep Inspire Robots: The Ultimate AI Agent System')
    .version('2.0.0');

program
    .command('setup')
    .description('Initialize the Commander and configure AI providers')
    .action(async () => {
        console.log(chalk.bold.cyan('\n--- Deep Inspire Robots Setup ---'));
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'provider',
                message: 'Select Primary AI Provider (Commander):',
                choices: ['google', 'openai', 'anthropic'],
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter AI Model Name:',
                default: (ans) => ans.provider === 'google' ? 'gemini-1.5-flash' : (ans.provider === 'openai' ? 'gpt-4o' : 'claude-3-5-sonnet-20240620'),
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
        console.log(chalk.green('\n✅ Setup Successful! Your Agent Commander is ready.'));
    });

program
    .command('run')
    .description('Execute a task using the Agent Commander and its 30 Robots')
    .argument('<task...>', 'Task description')
    .action(async (taskArray) => {
        const task = taskArray.join(' ');
        if (!fs.existsSync(CONFIG_PATH)) {
            console.log(chalk.red('❌ Error: Please run "deep-inspire setup" first.'));
            return;
        }

        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
        const commander = new AgentCommander(config);

        // تسجيل الـ 30 روبوت
        ROBOT_DEFINITIONS.forEach(def => {
            commander.registerRobot(def.name, new SpecializedRobot(config, def.name, def.expertise));
        });

        console.log(chalk.blue(`\n🚀 Mission started: ${task}`));
        try {
            const result = await commander.delegateTask(task);
            console.log(chalk.green('\n--- Mission Report ---'));
            console.log(result);
        } catch (error) {
            console.log(chalk.red('\n❌ Mission Failed:'), error.message);
        }
    });

program
    .command('list')
    .description('List all 30 specialized robots and their expertise')
    .action(() => {
        console.log(chalk.bold.magenta('\n--- Deep Inspire: The 30 Robots Fleet ---'));
        ROBOT_DEFINITIONS.forEach((def, index) => {
            console.log(`${chalk.yellow(index + 1 + '.')} ${chalk.bold(def.name)}: ${def.expertise}`);
        });
    });

program.parse(process.argv);

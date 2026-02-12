#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { BaseAgent } from './agents/BaseAgent.js';
import { WebTool } from './tools/WebTool.js';

const program = new Command();
const CONFIG_PATH = path.join(process.cwd(), 'config', 'user-config.json');

program
    .name('deep-inspire')
    .description('Deep Inspire Robots CLI')
    .version('1.0.0');

program
    .command('setup')
    .description('Setup your AI providers and API keys')
    .action(async () => {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'provider',
                message: 'Choose your AI provider:',
                choices: ['google', 'openai', 'anthropic'],
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter the model name (e.g., gemini-1.5-flash, gpt-4o):',
            },
            {
                type: 'password',
                name: 'apiKey',
                message: 'Enter your API key:',
            }
        ]);

        if (!fs.existsSync(path.dirname(CONFIG_PATH))) {
            fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(answers, null, 2));
        console.log(chalk.green('\nSetup complete! Configuration saved.'));
    });

program
    .command('chat')
    .description('Start a chat session with an agent')
    .argument('[message]', 'Initial message')
    .action(async (message) => {
        if (!fs.existsSync(CONFIG_PATH)) {
            console.log(chalk.red('Please run "deep-inspire setup" first.'));
            return;
        }

        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
        const agent = new BaseAgent(config);

        const startChat = async (msg) => {
            console.log(chalk.blue('\nAgent is thinking...'));
            try {
                const response = await agent.chat(msg);
                console.log(chalk.cyan('\nAgent:'), response);
            } catch (error) {
                console.log(chalk.red('\nError:'), error.message);
            }
            promptUser();
        };

        const promptUser = async () => {
            const { nextMsg } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'nextMsg',
                    message: 'You:',
                }
            ]);
            if (nextMsg.toLowerCase() === 'exit') process.exit();
            startChat(nextMsg);
        };

        if (message) {
            startChat(message);
        } else {
            promptUser();
        }
    });

program
    .command('search')
    .description('Search the web using an agent')
    .argument('<query>', 'Search query')
    .action(async (query) => {
        console.log(chalk.yellow(`Searching for: ${query}`));
        const results = await WebTool.search(query);
        console.log(chalk.green('\nResults:'), results);
    });

program.parse(process.argv);

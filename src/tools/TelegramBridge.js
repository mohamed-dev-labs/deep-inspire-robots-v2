import TelegramBot from 'node-telegram-bot-api';
import chalk from 'chalk';

export class TelegramBridge {
    constructor(commander, token) {
        this.commander = commander;
        this.token = token;
        this.bot = new TelegramBot(this.token, { polling: true });
    }

    init() {
        console.log(chalk.blue('\n[TelegramBridge] Initializing Telegram Bot...'));

        this.bot.onText(/\/start/, (msg) => {
            this.bot.sendMessage(msg.chat.id, "🤖 Welcome to Deep Inspire Robots!\n\nI am your Agent Commander. Send me any task, and I will orchestrate my specialized robots to complete it.");
        });

        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const text = msg.body || msg.text;

            if (text && !text.startsWith('/')) {
                console.log(chalk.magenta(`[Telegram] Received Task: ${text}`));
                this.bot.sendMessage(chatId, "🚀 Commander is analyzing the task and deploying robots...");
                
                try {
                    const result = await this.commander.delegateTask(text);
                    this.bot.sendMessage(chatId, `✅ Mission Report:\n\n${result}`);
                } catch (error) {
                    this.bot.sendMessage(chatId, `❌ Mission Failed: ${error.message}`);
                }
            }
        });

        console.log(chalk.green('✅ Telegram Bridge is ONLINE!'));
    }
}

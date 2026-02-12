import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import chalk from 'chalk';

export class WhatsAppBridge {
    constructor(commander) {
        this.commander = commander;
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });
    }

    async init() {
        console.log(chalk.blue('\n[WhatsAppBridge] Initializing...'));

        this.client.on('qr', (qr) => {
            console.log(chalk.yellow('\n--- ACTION REQUIRED ---'));
            console.log(chalk.cyan('Scan this QR code with your WhatsApp to link Deep Inspire:'));
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log(chalk.green('\n✅ WhatsApp Bridge is ONLINE and connected!'));
        });

        this.client.on('message', async (msg) => {
            if (msg.body.toLowerCase().startsWith('run deep inspire')) {
                const task = msg.body.replace(/run deep inspire/i, '').trim();
                console.log(chalk.magenta(`[WhatsApp] Received Task: ${task}`));
                
                msg.reply('🤖 Deep Inspire is processing your request...');
                try {
                    const result = await this.commander.delegateTask(task);
                    msg.reply(`✅ Mission Report:\n\n${result}`);
                } catch (error) {
                    msg.reply(`❌ Mission Failed: ${error.message}`);
                }
            }
        });

        await this.client.initialize();
    }
}

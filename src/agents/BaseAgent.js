import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

export class BaseAgent {
    constructor(config) {
        this.config = config;
        this.client = null;
        this.initClient();
    }

    initClient() {
        const { provider, apiKey } = this.config;
        switch (provider) {
            case 'openai':
                // إذا كان المزود openai ولم يتم توفير مفتاح، نستخدم الإعدادات الافتراضية لمانوس
                if (!apiKey || apiKey === "MANUS_DEFAULT") {
                    this.client = new OpenAI();
                } else {
                    this.client = new OpenAI({ apiKey });
                }
                break;
            case 'google':
                this.client = new GoogleGenerativeAI(apiKey);
                break;
            case 'anthropic':
                this.client = new Anthropic({ apiKey });
                break;
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
    }

    async chat(message, history = []) {
        const { provider, model } = this.config;
        
        if (provider === 'openai') {
            const response = await this.client.chat.completions.create({
                model: model || 'gpt-4.1-mini',
                messages: [...history, { role: 'user', content: message }],
            });
            return response.choices[0].message.content;
        } else if (provider === 'google') {
            const modelName = model.startsWith('models/') ? model : `models/${model}`;
            const genModel = this.client.getGenerativeModel({ model: modelName });
            const result = await genModel.generateContent(message);
            return result.response.text();
        } else if (provider === 'anthropic') {
            const response = await this.client.messages.create({
                model: model || 'claude-3-5-sonnet-20240620',
                max_tokens: 1024,
                messages: [{ role: 'user', content: message }],
            });
            return response.content[0].text;
        }
    }
}

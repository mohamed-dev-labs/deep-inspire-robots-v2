import { BaseAgent } from './BaseAgent.js';
import { WebTool } from '../tools/WebTool.js';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export class SpecializedRobot extends BaseAgent {
    constructor(config, name, expertise, layer = 'Sub-Agent') {
        super(config);
        this.name = name;
        this.expertise = expertise;
        this.layer = layer;
    }

    async execute(task) {
        console.log(chalk.cyan(`[${this.name}] Executing: ${task}`));
        
        if (this.name === 'SearchBot' || this.name === 'BrowserBot' || this.name === 'ResearcherBot') {
            if (task.includes('http')) {
                const url = task.match(/https?:\/\/[^\s]+/)[0];
                return await WebTool.browse(url);
            }
            return await WebTool.search(task);
        }

        if (this.name === 'DesignBot') {
            return await this.generateWebsite(task);
        }

        if (this.name === 'DocBot') {
            return await this.generatePresentation(task);
        }

        if (this.name === 'CodeGenerator') {
            return await this.chat(`Write clean, efficient code for: ${task}. Include comments.`);
        }

        return await this.chat(`You are ${this.name}, expertise in ${this.expertise}. Task: ${task}`);
    }

    async generateWebsite(task) {
        const code = await this.chat(`Generate a complete single-file HTML/CSS/JS for: ${task}. Return ONLY code.`);
        const dir = path.join(process.cwd(), 'output');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), code);
        return `✅ Website generated at output/index.html`;
    }

    async generatePresentation(task) {
        const outline = await this.chat(`Create a professional slide-by-slide presentation outline for: ${task}`);
        const dir = path.join(process.cwd(), 'output');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'presentation.md'), outline);
        return `✅ Presentation outline saved at output/presentation.md`;
    }
}

export const ROBOT_DEFINITIONS = [
    { name: 'VisionProcessor', expertise: 'Analyzing images and video content' },
    { name: 'CodeGenerator', expertise: 'Writing and debugging multi-language code' },
    { name: 'DataParser', expertise: 'Extracting structured data from raw text/HTML' },
    { name: 'Embedder', expertise: 'Creating vector embeddings for RAG' },
    { name: 'ToolExecutor', expertise: 'Executing system commands and managing files' },
    { name: 'SearchBot', expertise: 'Real-time web searching and data retrieval' },
    { name: 'BrowserBot', expertise: 'Navigating websites and extracting content' },
    { name: 'ResearcherBot', expertise: 'Deep academic and technical research' },
    { name: 'AnalystBot', expertise: 'Data analysis and pattern recognition' },
    { name: 'SecurityBot', expertise: 'Cybersecurity and vulnerability assessment' },
    { name: 'WriterBot', expertise: 'Creative and professional content writing' },
    { name: 'TranslatorBot', expertise: 'Multi-language translation and localization' },
    { name: 'ArchitectBot', expertise: 'System architecture and design patterns' },
    { name: 'DevOpsBot', expertise: 'CI/CD pipelines and infrastructure as code' },
    { name: 'DataBot', expertise: 'SQL/NoSQL database optimization' },
    { name: 'MathBot', expertise: 'Complex mathematical calculations' },
    { name: 'LawBot', expertise: 'Legal document analysis and compliance' },
    { name: 'FinanceBot', expertise: 'Market analysis and financial forecasting' },
    { name: 'HealthBot', expertise: 'Medical information and wellness advice' },
    { name: 'MarketingBot', expertise: 'SEO and digital marketing strategies' },
    { name: 'SocialBot', expertise: 'Social media trends and management' },
    { name: 'HistoryBot', expertise: 'Historical facts and context analysis' },
    { name: 'ScienceBot', expertise: 'Scientific principles and discoveries' },
    { name: 'DesignBot', expertise: 'UI/UX principles and website generation' },
    { name: 'TestingBot', expertise: 'Unit testing and QA automation' },
    { name: 'CloudBot', expertise: 'AWS, Azure, and GCP configurations' },
    { name: 'LinuxBot', expertise: 'Terminal commands and shell scripting' },
    { name: 'ApiBot', expertise: 'REST and GraphQL API integration' },
    { name: 'IdeaBot', expertise: 'Brainstorming and innovation' },
    { name: 'ReviewBot', expertise: 'Code and document peer review' },
    { name: 'DocBot', expertise: 'Technical documentation and presentation design' }
];

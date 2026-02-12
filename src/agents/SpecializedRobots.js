import { BaseAgent } from './BaseAgent.js';
import { WebTool } from '../tools/WebTool.js';

export class SpecializedRobot extends BaseAgent {
    constructor(config, name, expertise, layer = 'Sub-Agent') {
        super(config);
        this.name = name;
        this.expertise = expertise;
        this.layer = layer;
    }

    async execute(task) {
        const systemPrompt = `You are ${this.name}, a specialized robot in the ${this.layer} layer with expertise in ${this.expertise}. Task: ${task}`;
        
        if (this.name === 'SearchBot' || this.name === 'BrowserBot') {
            if (task.includes('http')) {
                const url = task.match(/https?:\/\/[^\s]+/)[0];
                return await WebTool.browse(url);
            }
            return await WebTool.search(task);
        }

        // إضافة منطق خاص للـ Code Generator
        if (this.name === 'CodeGenerator') {
            return await this.chat(`Write clean, efficient code for: ${task}. Include comments.`);
        }

        return await this.chat(`${systemPrompt}\nUser Task: ${task}`);
    }
}

export const ROBOT_DEFINITIONS = [
    // --- Sub-Agent Layer (Core) ---
    { name: 'VisionProcessor', expertise: 'Analyzing images and video content', layer: 'Sub-Agent' },
    { name: 'CodeGenerator', expertise: 'Writing and debugging multi-language code', layer: 'Sub-Agent' },
    { name: 'DataParser', expertise: 'Extracting structured data from raw text/HTML', layer: 'Sub-Agent' },
    { name: 'Embedder', expertise: 'Creating vector embeddings for RAG and semantic search', layer: 'Sub-Agent' },
    { name: 'ToolExecutor', expertise: 'Executing system commands and managing files', layer: 'Sub-Agent' },
    
    // --- Specialized Robots Fleet ---
    { name: 'SearchBot', expertise: 'Real-time web searching and data retrieval', layer: 'Sub-Agent' },
    { name: 'BrowserBot', expertise: 'Navigating websites and extracting content', layer: 'Sub-Agent' },
    { name: 'ResearcherBot', expertise: 'Deep academic and technical research', layer: 'Sub-Agent' },
    { name: 'AnalystBot', expertise: 'Data analysis and pattern recognition', layer: 'Sub-Agent' },
    { name: 'SecurityBot', expertise: 'Cybersecurity and vulnerability assessment', layer: 'Sub-Agent' },
    { name: 'WriterBot', expertise: 'Creative and professional content writing', layer: 'Sub-Agent' },
    { name: 'TranslatorBot', expertise: 'Multi-language translation and localization', layer: 'Sub-Agent' },
    { name: 'ArchitectBot', expertise: 'System architecture and design patterns', layer: 'Sub-Agent' },
    { name: 'DevOpsBot', expertise: 'CI/CD pipelines and infrastructure as code', layer: 'Sub-Agent' },
    { name: 'DataBot', expertise: 'SQL/NoSQL database optimization', layer: 'Sub-Agent' },
    { name: 'MathBot', expertise: 'Complex mathematical calculations', layer: 'Sub-Agent' },
    { name: 'LawBot', expertise: 'Legal document analysis and compliance', layer: 'Sub-Agent' },
    { name: 'FinanceBot', expertise: 'Market analysis and financial forecasting', layer: 'Sub-Agent' },
    { name: 'HealthBot', expertise: 'Medical information and wellness advice', layer: 'Sub-Agent' },
    { name: 'MarketingBot', expertise: 'SEO and digital marketing strategies', layer: 'Sub-Agent' },
    { name: 'SocialBot', expertise: 'Social media trends and management', layer: 'Sub-Agent' },
    { name: 'HistoryBot', expertise: 'Historical facts and context analysis', layer: 'Sub-Agent' },
    { name: 'ScienceBot', expertise: 'Scientific principles and discoveries', layer: 'Sub-Agent' },
    { name: 'DesignBot', expertise: 'UI/UX principles and design feedback', layer: 'Sub-Agent' },
    { name: 'TestingBot', expertise: 'Unit testing and QA automation', layer: 'Sub-Agent' },
    { name: 'CloudBot', expertise: 'AWS, Azure, and GCP configurations', layer: 'Sub-Agent' },
    { name: 'LinuxBot', expertise: 'Terminal commands and shell scripting', layer: 'Sub-Agent' },
    { name: 'ApiBot', expertise: 'REST and GraphQL API integration', layer: 'Sub-Agent' },
    { name: 'IdeaBot', expertise: 'Brainstorming and innovation', layer: 'Sub-Agent' },
    { name: 'ReviewBot', expertise: 'Code and document peer review', layer: 'Sub-Agent' },
    { name: 'DocBot', expertise: 'Technical documentation and manuals', layer: 'Sub-Agent' }
];

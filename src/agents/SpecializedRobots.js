import { BaseAgent } from './BaseAgent.js';
import { WebTool } from '../tools/WebTool.js';

export class SpecializedRobot extends BaseAgent {
    constructor(config, name, expertise) {
        super(config);
        this.name = name;
        this.expertise = expertise;
    }

    async execute(task) {
        const systemPrompt = `You are ${this.name}, a specialized robot with expertise in ${this.expertise}. Task: ${task}`;
        
        // إذا كان الروبوت متخصصاً في البحث أو التصفح، يستخدم الأدوات الحقيقية
        if (this.name === 'SearchBot' || this.name === 'BrowserBot') {
            if (task.includes('http')) {
                const url = task.match(/https?:\/\/[^\s]+/)[0];
                return await WebTool.browse(url);
            }
            return await WebTool.search(task);
        }

        return await this.chat(`${systemPrompt}\nUser Task: ${task}`);
    }
}

export const ROBOT_DEFINITIONS = [
    { name: 'SearchBot', expertise: 'Real-time web searching and data retrieval' },
    { name: 'BrowserBot', expertise: 'Navigating websites and extracting content' },
    { name: 'CoderBot', expertise: 'Writing and debugging Node.js/Python code' },
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
    { name: 'DesignBot', expertise: 'UI/UX principles and design feedback' },
    { name: 'TestingBot', expertise: 'Unit testing and QA automation' },
    { name: 'CloudBot', expertise: 'AWS, Azure, and GCP configurations' },
    { name: 'LinuxBot', expertise: 'Terminal commands and shell scripting' },
    { name: 'ApiBot', expertise: 'REST and GraphQL API integration' },
    { name: 'LogicBot', expertise: 'Critical thinking and problem solving' },
    { name: 'IdeaBot', expertise: 'Brainstorming and innovation' },
    { name: 'ReviewBot', expertise: 'Code and document peer review' },
    { name: 'OptimBot', expertise: 'Performance tuning and optimization' },
    { name: 'DocBot', expertise: 'Technical documentation and manuals' },
    { name: 'SupportBot', expertise: 'Troubleshooting and user assistance' }
];

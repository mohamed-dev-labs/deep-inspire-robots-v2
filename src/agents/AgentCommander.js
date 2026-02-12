import { BaseAgent } from './BaseAgent.js';
import chalk from 'chalk';

export class AgentCommander extends BaseAgent {
    constructor(config) {
        super(config);
        this.robots = new Map();
        this.name = "Commander-In-Chief";
    }

    registerRobot(name, robotInstance) {
        this.robots.set(name, robotInstance);
    }

    async delegateTask(taskDescription) {
        console.log(chalk.magenta(`[${this.name}] Analyzing task: ${taskDescription}`));
        
        // التحليل الذكي لاختيار الروبوت المناسب
        const decisionPrompt = `
        You are the Commander of 30 specialized robots. 
        Available robots: ${Array.from(this.robots.keys()).join(', ')}.
        Task: "${taskDescription}"
        Which robot is best suited for this task? Return ONLY the robot name.
        `;
        
        const selectedRobotName = await this.chat(decisionPrompt);
        const robot = this.robots.get(selectedRobotName.trim());

        if (robot) {
            console.log(chalk.cyan(`[${this.name}] Delegating to: ${selectedRobotName}`));
            return await robot.execute(taskDescription);
        } else {
            console.log(chalk.yellow(`[${this.name}] No specialized robot found. Executing myself.`));
            return await this.chat(taskDescription);
        }
    }
}

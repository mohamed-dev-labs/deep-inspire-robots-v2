import { BaseAgent } from './BaseAgent.js';
import chalk from 'chalk';

export class AgentCommander extends BaseAgent {
    constructor(config) {
        super(config);
        this.robots = new Map();
        this.name = "Commander-In-Chief";
        this.version = config.version || "Version 3 (Advanced)";
    }

    registerRobot(name, robotInstance) {
        this.robots.set(name, robotInstance);
    }

    async delegateTask(taskDescription) {
        console.log(chalk.magenta(`[${this.name}] [${this.version}] Orchestrating Mission: ${taskDescription}`));
        
        // طبقة التخطيط (Planning Layer)
        const planningPrompt = `
        You are the Strategic Commander of an AI Agent System.
        Goal: "${taskDescription}"
        Available Sub-Agents: ${Array.from(this.robots.keys()).join(', ')}.
        
        Analyze the goal and return a JSON execution plan:
        {
          "steps": [
            {"agent": "AgentName", "task": "specific sub-task instruction"}
          ],
          "reasoning": "why this plan?"
        }
        Return ONLY valid JSON.
        `;
        
        try {
            const planResponse = await this.chat(planningPrompt);
            const plan = JSON.parse(planResponse.replace(/```json|```/g, '').trim());
            
            console.log(chalk.blue(`[${this.name}] Execution Plan Created: ${plan.reasoning}`));
            
            let finalResults = [];
            for (const step of plan.steps) {
                const robot = this.robots.get(step.agent);
                if (robot) {
                    console.log(chalk.cyan(`[Step] Delegating to ${step.agent}: ${step.task}`));
                    const result = await robot.execute(step.task);
                    finalResults.push(`[${step.agent}]: ${result}`);
                }
            }

            // تجميع النتائج (Synthesis)
            const synthesisPrompt = `
            Summarize the final outcome based on these execution steps:
            ${finalResults.join('\n\n')}
            Original Goal: ${taskDescription}
            `;
            return await this.chat(synthesisPrompt);

        } catch (error) {
            console.log(chalk.yellow(`[${this.name}] Plan parsing failed or error occurred. Falling back to direct execution.`));
            // البحث عن أنسب روبوت بشكل مباشر في حال فشل التخطيط المعقد
            const decisionPrompt = `Which robot is best for: "${taskDescription}"? Available: ${Array.from(this.robots.keys()).join(', ')}. Return ONLY name.`;
            const selectedRobotName = await this.chat(decisionPrompt);
            const robot = this.robots.get(selectedRobotName.trim());
            return robot ? await robot.execute(taskDescription) : await this.chat(taskDescription);
        }
    }
}

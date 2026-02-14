import { BaseAgent } from './BaseAgent.js';
import chalk from 'chalk';

export class AgentCommander extends BaseAgent {
    constructor(config) {
        super(config);
        this.robots = new Map();
        this.name = "Deep Inspire AI Agent Commander (Slime Agent Edition)";
        this.version = "V5.1";
    }

    registerRobot(name, robotInstance) {
        this.robots.set(name, robotInstance);
    }

    async delegateTask(taskDescription) {
        console.log(chalk.bold.green(`\n[${this.name}] [${this.version}]`));
        console.log(chalk.cyan(`[Thinking Architecture] Analyzing Mission: "${taskDescription}"`));
        
        // طبقة التخطيط المتقدمة (Advanced Planning Layer)
        const planningPrompt = `
        You are the Strategic Commander (Slime Agent).
        Mission Goal: "${taskDescription}"
        Available Sub-Agents: ${Array.from(this.robots.keys()).join(', ')}.
        
        Deconstruct this mission into a highly efficient multi-step execution plan.
        For each step, assign the most capable specialized robot.
        
        Return a JSON execution plan:
        {
          "steps": [
            {"agent": "AgentName", "task": "detailed instruction for the robot"}
          ],
          "reasoning": "Strategic explanation of this approach"
        }
        Return ONLY valid JSON.
        `;
        
        try {
            const planResponse = await this.chat(planningPrompt);
            const plan = JSON.parse(planResponse.replace(/```json|```/g, '').trim());
            
            console.log(chalk.blue(`[Commander Reasoning] ${plan.reasoning}`));
            
            let finalResults = [];
            for (const step of plan.steps) {
                const robot = this.robots.get(step.agent);
                if (robot) {
                    console.log(chalk.magenta(`\n[Orchestration] Deploying ${step.agent} for: ${step.task}`));
                    const result = await robot.execute(step.task);
                    finalResults.push(`### [Report from ${step.agent}]\n${result}`);
                }
            }

            // تجميع النتائج النهائي (Final Synthesis)
            const synthesisPrompt = `
            Compile a comprehensive and professional mission report based on these individual robot results:
            ${finalResults.join('\n\n')}
            
            Original Mission: ${taskDescription}
            Ensure the report is structured, factual, and addresses all parts of the mission.
            `;
            return await this.chat(synthesisPrompt);

        } catch (error) {
            console.log(chalk.yellow(`[Commander] Advanced planning encountered an issue. Falling back to sequential execution.`));
            const decisionPrompt = `Select the single best robot for: "${taskDescription}" from: ${Array.from(this.robots.keys()).join(', ')}. Return ONLY the robot name.`;
            const selectedRobotName = await this.chat(decisionPrompt);
            const robot = this.robots.get(selectedRobotName.trim()) || this.robots.get('ResearcherBot');
            return await robot.execute(taskDescription);
        }
    }
}

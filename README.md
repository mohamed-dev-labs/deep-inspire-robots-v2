# Deep Inspire Robots 🤖🚀

![Deep Inspire Robots Logo](logo.png)

**Deep Inspire Robots** is a high-performance, open-source AI Agent System built as a Node.js CLI terminal application. It features a sophisticated **Agent Commander** that orchestrates a fleet of **30 specialized robots**, each with unique expertise, real-time web search, and virtual browsing capabilities.

## 🌟 Overview

Inspired by the power of autonomous agents like OpenCloud, Deep Inspire Robots allows any user to run a local AI agency. By providing your own API keys (Google Gemini, OpenAI, or Anthropic), you activate a commander that can learn, understand context, and delegate complex tasks to specialized sub-agents.

## 🚀 Key Features

- **Agent Commander**: The central brain that analyzes user requests and selects the best robot for the job.
- **30 Specialized Robots**: A diverse fleet covering Search, Browsing, Coding, Security, Law, Finance, and more.
- **Real-Time Web Search**: Integrated search tools to fetch live data from the internet.
- **Virtual Browser**: Built-in Puppeteer-based browser for deep content extraction and terminal-based navigation.
- **Local & Private**: Your API keys and configurations are saved locally on your machine.
- **Multi-Model Support**: Switch seamlessly between Gemini, GPT-4o, and Claude 3.5.

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/deep-inspire-robots.git
cd deep-inspire-robots
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Link the CLI Tool
```bash
npm link
```

### 4. Initialize the Commander
Run the setup command to configure your AI provider and API key:
```bash
deep-inspire setup
```

## 🤖 The Fleet (30 Specialized Robots)

Use `deep-inspire list` to see the full fleet. Key robots include:
- **SearchBot**: Real-time web searching and data retrieval.
- **BrowserBot**: Navigating websites and extracting deep content.
- **CoderBot**: Writing, debugging, and explaining code.
- **SecurityBot**: Cybersecurity assessment and vulnerability checks.
- **AnalystBot**: Data analysis and pattern recognition.
- **ResearcherBot**: Deep academic and technical research.
- **LawBot**: Legal document analysis and compliance.
- **FinanceBot**: Market analysis and financial forecasting.
- ... and 22 more!

## 🎮 Usage Examples

### Run a Mission (Delegation)
Let the Commander decide which robot to use:
```bash
deep-inspire run "Search for the rarest types of robots in the world and summarize their features"
```

### Direct Search
```bash
deep-inspire search "Latest AI breakthroughs Feb 2026"
```

### List All Robots
```bash
deep-inspire list
```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by the Deep Inspire Team. Empowering the terminal with AI Agents.

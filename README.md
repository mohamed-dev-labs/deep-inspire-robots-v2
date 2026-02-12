# Deep Inspire Robots 🤖

Deep Inspire Robots is a powerful Node.js CLI tool designed to act as an autonomous agent system. It integrates multiple AI providers (Google Gemini, OpenAI, Anthropic) and includes built-in tools for web searching and browsing.

## Features

- **Multi-Agent Support**: Use different AI models as your personal agents.
- **Provider Integration**: Supports Google Gemini, OpenAI, and Anthropic.
- **Web Tools**: Built-in search and browser capabilities using Puppeteer.
- **CLI Interface**: Interactive terminal-based experience.
- **Open Source**: Easy to clone, modify, and contribute.

## Installation

### From NPM (Once published)
```bash
npm install -g deep-inspire-robots
```

### From Source
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/deep-inspire-robots.git
   ```
2. Install dependencies:
   ```bash
   cd deep-inspire-robots
   npm install
   ```
3. Link the CLI tool:
   ```bash
   npm link
   ```

## Usage

### 1. Setup
Configure your API keys and preferred models:
```bash
deep-inspire setup
```

### 2. Chat with Agent
Start an interactive chat session:
```bash
deep-inspire chat "Hello, how can you help me today?"
```

### 3. Web Search
Perform a web search directly from the terminal:
```bash
deep-inspire search "Latest AI trends 2026"
```

## Configuration
API keys are stored locally in `config/user-config.json`. Never share this file or commit it to version control.

## License
MIT

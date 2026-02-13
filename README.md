# Deep Inspire Robots 🤖🚀 (v4.0)

![Deep Inspire Robots Logo](logo.png)

**Deep Inspire Robots** is a high-performance, hybrid AI Agent System built as a Node.js CLI terminal application. It features a sophisticated **Agent Commander** (Orchestration Layer) that plans and deploys a fleet of **30 specialized robots**, now with **Telegram & WhatsApp Bridges** and **Visual Web Browsing**.

## 🌟 Key Features

- **Agent Commander (AI-Driven)**: Strategic orchestration and planning layer that breaks down complex tasks into executable steps for sub-agents.
- **30 Specialized Sub-Agents**: Covering Vision, Code, Deep Research, Security, Health, and more.
- **Visual Web Browsing (Headful Mode)**: Watch the robots browse the web in real-time as they research and collect data.
- **Multi-Platform Bridge**:
  - **WhatsApp Bridge**: Control agents via WhatsApp with QR code authentication.
  - **Telegram Bridge**: Full integration with Telegram bots via BotFather.
- **Local Model Manager**: Automatically pulls and configures local models (Llama 3, DeepSeek Coder, Qwen) for cost-effective execution.
- **Hybrid Intelligence**: Combines the power of Cloud models (GPT-4o, Gemini, Anthropic) with the privacy of Local models.
- **Deep Research Engine**: Enhanced search capabilities for scientific and technical investigations.

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mohamed-dev-labs/deep-inspire-robots-v2.git
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

### 4. Hybrid Setup
Run the setup command to configure your AI providers (OpenAI, Gemini, etc.), Telegram tokens, and local models:
```bash
deep-inspire setup
```

## 📱 Platform Integration

### WhatsApp Bridge
1. Run: `deep-inspire whatsapp`
2. Scan the QR Code with your WhatsApp.
3. Command: `Run deep inspire [your task]`

### Telegram Bridge
1. Run: `deep-inspire telegram`
2. Message your bot on Telegram to start the mission.

## 🤖 Deep Research Example
You can run complex scientific research tasks directly from the CLI:
```bash
deep-inspire run "قم بإجراء بحث مكثف حول الزئبق في التونة المعلبة وعلاقته بالسرطان"
```

## 📜 License
MIT License. Built for the open-source community.

---
Built with ❤️ by the Deep Inspire Team. Empowering the terminal and messaging apps with AI Agents.

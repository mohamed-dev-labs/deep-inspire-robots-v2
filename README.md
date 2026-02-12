# Deep Inspire Robots 🤖🚀

![Deep Inspire Robots Logo](logo.png)

**Deep Inspire Robots** is a high-performance, hybrid AI Agent System built as a Node.js CLI terminal application. It features a sophisticated **Agent Commander** that orchestrates a fleet of **30 specialized robots**, integrated **WhatsApp Bridge**, and support for **Local Models** (Llama, DeepSeek, Qwen).

## 🌟 Key Features

- **Agent Commander**: Strategic orchestration and planning layer.
- **30 Specialized Sub-Agents**: Covering Vision, Code, Search, Security, and more.
- **WhatsApp Bridge**: Control your AI agents via WhatsApp with QR code authentication.
- **Local Model Manager**: Automatically pulls and configures local models (Llama 3, DeepSeek Coder, Qwen) for cost-effective execution.
- **VPS Ready**: Optimized for deployment on Linux servers for 24/7 operation.
- **Hybrid Intelligence**: Combines the power of Cloud models (Gemini, OpenAI, Anthropic) with the privacy of Local models.

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

### 4. Hybrid Setup (Includes Local Models)
Run the setup command to configure your AI provider and automatically pull local models:
```bash
deep-inspire setup
```

## 📱 WhatsApp Integration

To control Deep Inspire from your phone:
1. Run the bridge command:
   ```bash
   deep-inspire whatsapp
   ```
2. **Scan the QR Code** that appears in your terminal using your WhatsApp.
3. Send a message to yourself or the bot starting with: `Run deep inspire [your task here]`.

## 🤖 Sub-Agent Layers

- **Strategic Layer**: Commander Agent (Planning & Reasoning).
- **Sub-Agent Layer**: 30 Specialized Robots (Execution).
- **Execution Layer**: Local/Cloud Model Abstraction.

## 📜 License
MIT License. Built for the open-source community.

---
Built with ❤️ by the Deep Inspire Team. Empowering the terminal and messaging apps with AI Agents.

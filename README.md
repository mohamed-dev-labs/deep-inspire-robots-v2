# Deep Inspire AI Agent Commander (Slime Agent Edition) 🤖🚀 (v5.1)

![Deep Inspire Robots Logo](logo.png)

**Deep Inspire Robots** is a state-of-the-art, hybrid AI Agent System. It is powered by the **Slime Agent Commander**, an advanced orchestration layer that manages a specialized fleet of **30 autonomous robots**. Designed for the terminal, VPS, and mobile via WhatsApp/Telegram.

---

## 📜 Version History & Roadmap

### 🟢 v1.0 - Baseline (The Beginning)
- Basic Node.js CLI structure.
- Support for OpenAI and Gemini APIs.
- First set of 5 basic sub-agents.
- Simple sequential task execution.

### 🟡 v2.0 - Specialization (The Fleet)
- Expanded to **30 specialized robots** (Researcher, Coder, Analyst, etc.).
- Introduction of the **Agent Commander** layer.
- Local model support (mock integration).
- Basic GitHub open-source repository structure.

### 🟠 v3.0 - Hybrid Architecture (VPS Ready)
- Strategic orchestration: breaking tasks into sub-tasks.
- **Hybrid Model Support**: Seamlessly switch between Cloud (GPT/Gemini) and Local (Llama/DeepSeek).
- Enhanced terminal UI with `chalk` for better readability.
- VPS-optimized execution loops.

### 🔴 v4.0 - Connectivity (The Bridge)
- **WhatsApp Bridge**: Initial integration using `whatsapp-web.js`.
- **Telegram Bridge**: Initial bot integration via `node-telegram-bot-api`.
- **Visual Browsing**: Introduction of Puppeteer for real-time web data extraction.
- **Headful Mode**: Option to see the browser while the agent works.

### 🟣 v5.0 - Slime Agent (Visual Identity)
- New Visual Identity: **Slime Agent Edition**.
- **Interactive Setup**: Bridges now request phone numbers and tokens interactively.
- **Multi-Mission Engine**: Orchestrate research, coding, and design in one command.
- Improved error handling and model compatibility.

### 💎 v5.1 - Thinking Architecture (Current Release)
- **Enhanced Thinking Architecture**: Commander now uses a multi-step "Planning & Reasoning" layer before execution.
- **Visible Terminal Browser**: Fixed "Headful Mode" to ensure the browser is fully visible and stable in the terminal environment.
- **Interactive Registration**: WhatsApp and Telegram bridges now have a more robust interactive flow for linking accounts.
- **Synthesis Layer**: Final reports are now synthesized from all sub-agent findings for a cohesive mission report.
- **Bug Fixes**: Resolved 404 model errors and improved Puppeteer stability.

---

## 🏗 Thinking Architecture (Orchestration Layer)
The **Slime Agent Commander** doesn't just run tasks; it *thinks*:
1. **Analysis**: Breaks down the user prompt into logical components.
2. **Planning**: Creates a JSON-based execution plan assigning specific robots.
3. **Reasoning**: Explains *why* a certain robot was chosen for a certain step.
4. **Execution**: Deploys robots (Search, Design, Doc, etc.) in parallel or sequence.
5. **Synthesis**: Collects all reports and writes a final, professional mission document.

## 🛠 Multi-Mission Execution
Deep Inspire v5.1 can handle complex, multi-layered workflows:
```bash
deep-inspire run "ابحث عن سمية الزئبق، أنشئ موقعاً يعرض النتائج، وصمم عرضاً تقديمياً ملخصاً"
```

## 📱 Platform Integration

### WhatsApp Bridge (Slime Mode)
```bash
deep-inspire whatsapp
# 1. Enter phone number
# 2. Scan QR code
# 3. Chat: "Run deep inspire [Task]"
```

### Telegram Bridge (BotFather Mode)
```bash
deep-inspire telegram
# 1. Enter Bot Token
# 2. Start chatting with your Commander bot.
```

## 🚀 Installation
```bash
git clone https://github.com/mohamed-dev-labs/deep-inspire-robots-v2.git
cd deep-inspire-robots
npm install
npm link
deep-inspire setup
```

## 📜 License
MIT License. Built for the future of autonomous agent orchestration.

---
Built with ❤️ by the Deep Inspire Team. **The Slime Agent is watching.**

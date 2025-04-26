<p align="center">
  <img src="coremcp.png" alt="coremcp Logo" width="300"/>
</p>

## 📦 CoreMCP – Solana Tool Server (MCP + CLI Ready)

> A plug-and-play MCP tool server to send SOL, transfer SPL tokens, deploy programs, and interact with smart contracts on the Solana blockchain — built for Claude Desktop, AI agents, and developers.

<div align="center">
  <h3>🌐 Official Links</h3>
  <a href="https://www.coremcp.pro/" target="_blank">
    <img src="https://img.shields.io/badge/🌍_Website-https://www.coremcp.pro/-blue?style=for-the-badge" alt="Website" />
  </a>
  &nbsp;&nbsp;
  <a href="https://x.com/CoreMCP" target="_blank">
    <img src="https://img.shields.io/badge/𝕏_Twitter-@CoreMCP-black?style=for-the-badge" alt="Twitter" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/CoreMCP/CoreMCP" target="_blank">
    <img src="https://img.shields.io/badge/💻_GitHub-CoreMCP/CoreMCP-green?style=for-the-badge" alt="GitHub" />
  </a>
</div>

---

### ⚙️ Core Capabilities

- 🔐 Secure token & native transfers via CLI or MCP
- 🧱 Interact with smart contracts (ABI/function-based)
- 🔄 Raydium integration for swaps & liquidity
- ⚙️ Create meme tokens & deploy SPL smart contracts
- 🧠 Native Claude Desktop integration via MCP
- 🔧 CLI-ready, MCP-compliant, developer-friendly
- 🔑 Password-protected private keys

---

## 🛠️ Installation & Setup

### 1. Install

```bash
npm install -g coremcp
```

### 2. Run the CLI Setup Wizard

```bash
coremcp --init
```

You'll be prompted to enter:

- ✅ **Solana Wallet Private Key** _(required)_
- ✅ **Wallet Password** _(required, must be 6 characters)_
- ✅ **Custom RPC URL** _(optional, defaults to:_ `https://api.mainnet-beta.solana.com` \*)

---

## 🧠 Claude Desktop Integration

After CLI setup, the tool can **auto-configure itself into Claude Desktop**.

📍 File modified:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Claude will detect and run this MCP server with your selected tools.

---

## 🔨 Supported MCP Tools

| Tool Name                  | Description                              |
| -------------------------- | ---------------------------------------- |
| `transferNativeToken`      | Send SOL to a wallet                     |
| `transferSPLToken`         | Transfer SPL token via symbol/address   |
| `raydiumSwap`              | Swap tokens via Raydium                  |
| `createFourMeme`           | Create meme token on Four.Meme           |
| `createSPLToken`           | Deploy an SPL token contract             |
| `getBalance`               | Get token + native balance               |
| `callContractFunction`     | Custom contract calls via ABI            |
| `getWalletInfo`            | Get wallet info for an address           |
| `securityCheck`            | Check token security on Solana           |
| `raydiumAddLiquidity`      | Add liquidity to Raydium                 |
| `raydiumMyPosition`        | View your Raydium positions              |
| `raydiumRemovePosition`    | Remove liquidity from Raydium            |
| `sellMemeToken`            | Sell meme token on Four.Meme             |
| ...and more coming soon 🔧 |

---

## 🧪 Development Workflow

### Compile TypeScript:

```bash
npm run build
```

### Start MCP Server:

```bash
npm start
# or
node build/index.js
```

### Re-configure:

```bash
coremcp --init
```

---

## 📘 Model Context Protocol (MCP)

This project is built on **Model Context Protocol** – a standard to help agents and models interact with structured tool APIs.

**MCP Benefits**:

- ✅ Structured input/output
- ✅ Claude + OpenAI compatible
- ✅ Secure + serverless-ready

---

## ✅ Roadmap

- [x] CLI Configuration Wizard
- [x] Claude Desktop Integration
- [x] Token Deploy + Transfer
- [ ] Token charting tools (Dexscreener, Gecko Terminal)
- [ ] Telegram auto-trading agent
- [ ] AI assistant with Solana on-chain brain

---

## 🤝 Contributing

Feel free to fork, PR, or raise issues.
We're building **tool-first, AI-ready infrastructure** for the next wave of Web3 agents. Join us!

---

## 🛡️ License

MIT — Use freely, contribute openly.

---

<div align="center">
<img width="1200" height="475" alt="GeoVerse Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🌍 GeoVerse AI

**未来派高精度 GIS 与认知分析平台，专为行星探索与战术观测而生。**

[探索应用](https://ai.studio/apps/63b9d377-7d6f-4e82-93b9-e34e5898293b) • [报告问题](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6) • [联系我们](#)

</div>

---

## 📖 项目简介

**GeoVerse AI** 是一款融合了地理信息系统 (GIS)、人工智能以及动态数据可视化的实验性平台。它不仅提供高精度的地形渲染和实时气候监控，还集成了 **Google Gemini AI** 作为智能引导系统 (NOVA)，为用户提供深度的地理成因分析和历史重现。

本项目旨在探索未来派的 UI/UX 设计模式，将复杂的地理大数据以直观、沉浸式的“战术面板”风格呈现。

## ✨ 核心功能

- 📡 **战术控制台 (Dashboard)**: 实时监控关键指标，获取系统概览。
- 👁️ **全息视野 (Vision)**: 针对特定区域的深度战术观测与分析。
- 🗺️ **深度探索 (Explore)**: 
  - **3D 地形渲染**: 以海南岛三亚地区为例的高精度地形展示。
  - **实时气候监控**: 动态显示气温、经纬度及海拔高度。
  - **NOVA AI 引导**: 集成 Gemini AI，提供智能化的环境分析与交互。
- 🎨 **创意工坊 (Creative)**: 模拟与自定义地理场景。
- 📜 **叙事重构 (Narrative)**: 
  - **历史重现**: 回溯地理演变过程。
  - **地貌成因**: 深入剖析地形构造背后的科学逻辑。
  - **万物之源**: 探索自然景观的原始动力。

## 🛠️ 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式处理**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **数据可视化**: [D3.js](https://d3js.org/), [Recharts](https://recharts.org/)
- **人工智能**: [Google Gemini AI](https://ai.google.dev/) (@google/genai)
- **动画效果**: [Motion for Vue](https://motion.dev/)
- **图标库**: [Lucide Vue Next](https://lucide.dev/)

## 🚀 快速启动

### 先决条件

- **Node.js**: 建议版本 v18.0 或更高
- **Package Manager**: npm, yarn 或 pnpm

### 1. 克隆与安装

```bash
# 安装依赖
npm install
```

### 2. 环境配置

在项目根目录下创建一个 `.env.local` 文件。您可以选择使用 Google Gemini (需联网) 或本地部署的大模型 (如 Qwen):

#### 方案 A: 使用 Google Gemini (推荐)
填入您的 Google Gemini API 密钥：

```env
GEMINI_API_KEY=您的_GEMINI_API_KEY
```

#### 方案 B: 使用本地部署模型 (如 Qwen)
如果您本地运行了 Ollama, LM Studio 或 vLLM (OpenAI 兼容接口)，请配置以下项：

```env
AI_BASE_URL="http://localhost:11434/v1"  # 本地服务地址
AI_MODEL_NAME="qwen2.5:7b"              # 模型名称
AI_API_KEY=""                            # 如有需要请填写
```

> 您可以在 [Google AI Studio](https://aistudio.google.com/) 免费获取 Gemini API 密钥。本地模型推荐使用 [Ollama](https://ollama.com/) 部署 Qwen 系列模型。

### 3. 本地运行

```bash
# 启动开发服务器
npm run dev
```

默认情况下，应用将在 [http://localhost:3000](http://localhost:3000) 运行。

### 4. 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📂 项目结构

```text
geoverse/
├── src/
│   ├── components/       # UI 组件
│   │   ├── narrative/    # 叙事模块子组件
│   │   ├── Sidebar.vue   # 侧边导航
│   │   └── ...           # 各功能模块视图
│   ├── lib/              # 工具函数库
│   ├── App.vue           # 应用入口组件
│   ├── main.ts           # 应用入口文件
│   └── index.css         # 全局样式 (Tailwind)
├── public/               # 静态资源
├── metadata.json         # 项目元数据
├── vite.config.ts        # Vite 配置
└── package.json          # 依赖与脚本
```

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

<div align="center">
Proudly powered by <b>GeoVerse AI Team</b>
</div>

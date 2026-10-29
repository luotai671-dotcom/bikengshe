# 梯子避坑社 (EscapeTrap) 极客网络技术与排障库

<p align="left">
  <a href="https://tizibks.com"><img src="https://img.shields.io/badge/官网-tizibks.com-10b981?style=flat-square&logo=google-chrome&logoColor=white" alt="官网" /></a>
  <a href="https://github.com/luotai671-dotcom/bikengshe/releases"><img src="https://img.shields.io/badge/Release-v1.0.0-10b981?style=flat-square&logo=github" alt="Release" /></a>
  <img src="https://img.shields.io/badge/Astro-5.0-ff5d01?style=flat-square&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SSG-156_Pages-success?style=flat-square" alt="SSG Pages" />
  <img src="https://img.shields.io/badge/Lighthouse-100-success?style=flat-square" alt="Lighthouse" />
</p>

基于 **Astro 5 + React Islands + Tailwind CSS (v3)** 构建的现代极简网络工程指南与性能评测站点。全量静态预渲染 (SSG)，极致 SEO 与 AI 搜索引擎（GEO）秒级抓取。

---

## 🌟 核心架构：Astro 5 静态预渲染 (SSG)

### 1. 纯 HTML 预渲染与岛屿架构 (Islands Architecture)
- **零 JS 纯净正文**：所有技术选型横评、网络拓扑证据、路由诊断指南及排障手册均在构建期通过编译输出为纯静态 HTML，爬虫与 AI 检索机器人无需执行 JS 即可获取 100% 内容。
- **React 岛屿交互**：仅在顶部导航的 Mega Menu、全站搜索弹窗、深色模式切换和移动端 Drawer 上采用轻量 React 岛屿（`client:load`），兼顾丝滑交互与极致性能（Lighthouse 跑分 100）。

### 2. 自动化 SEO / GEO 深度优化
- **元数据全自动化注入**：
  - 自动为每个页面动态生成精准的 `title`、`description` 和标准 `canonical` 规范链接。
  - 自动集成 Open Graph 与 Twitter Cards 社交分享元数据。
- **结构化数据 (Schema.org JSON-LD)**：
  - **全站级别**：自动注入 `WebSite` 结构化数据及站内搜索行为定义。
  - **技术文档页**：自动注入 `TechArticle` 结构化数据，增强专业度（E-E-A-T）背书。
  - **问答与排障页**：集成 `FAQPage` 结构化数据，提高被搜索引擎直接提取为问答摘要卡片（Direct Answer）的概率。
- **爬虫协议与站点地图**：
  - 集成 `@astrojs/sitemap`：构建时自动遍历全量路由并输出标准 `sitemap.xml`。
  - 规范 `robots.txt`：仅声明一个标准主索引入口，保障主流搜索引擎爬虫无阻碍抓取。

---

## 📚 站点核心内容矩阵

- **【稳定梯子选购直通车】** (`/rankings/*`)：2026 稳定节点综合推荐榜、晚高峰抗封锁专线评测榜、AI 生产力节点推荐、4K/8K 流媒体解锁榜、高性价比轻量月付榜、第三方独立测速与回国拓扑证据库。
- **【全景百科与 FAQ 库】** (`/wiki/*`)：协议与底层加密、线路拓扑与机房链路、大模型与流媒体风控、客户端内核调优、55 道高频疑难杂症 FAQ 矩阵。
- **【客户端配置实战教程】** (`/tools/tutorials/*`)：Windows / macOS / iOS / Android / Linux / 智能路由 全平台配置指南。
- **【网络排障急救库】** (`/troubleshooting/*`)：节点全红 Timeout 诊断、连通无网络排障、TUN 模式冲突修复、DNS 泄漏排查。
- **【关于我们与方法论】** (`/about/`)：独立实测准则、硬件测试资产公示与学术免责声明。

---

## 🚀 本地运行与生产构建

```bash
# 安装依赖
npm install

# 启动本地开发服务 (支持局域网访问，默认端口 5173)
npm run dev

# 执行全站静态预渲染打包 (生成纯静态 HTML 产物 + sitemap.xml)
npm run build

# 预览生产构建静态站
npm run preview
```

### Windows 用户便捷启动
双击项目根目录下的 **`双击启动网站.bat`** 即可自动运行开发服务并在默认浏览器中呼出。

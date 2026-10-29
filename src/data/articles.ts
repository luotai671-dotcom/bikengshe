export interface ArticleData {
  title: string
  category: string
  categorySlug: string
  lastUpdated: string
  readingTime: string
  tags: string[]
  description: string
  content: string
}

import { GUIDE_ARTICLES } from './guideArticles'
import { BUYING_AND_RANKINGS_ARTICLES } from './buyingArticles'
import { TROUBLESHOOTING_ARTICLES } from './troubleshootingArticles'
import { CLIENT_ARTICLES } from './clientArticles'
import { WIKI_ARTICLES_MAP } from './wikiArticles'
import { ABOUT_ARTICLE } from './aboutArticle'

export const ARTICLES_MAP: Record<string, ArticleData> = {
  ...GUIDE_ARTICLES,
  ...BUYING_AND_RANKINGS_ARTICLES,
  ...TROUBLESHOOTING_ARTICLES,
  ...CLIENT_ARTICLES,
  ...WIKI_ARTICLES_MAP,
  'about': ABOUT_ARTICLE,
  // ==========================================
  // 新手入门
  // ==========================================
  'getting-started': {
    title: '新手入门：从零开始配置科学上网',
    category: '新手指南',
    categorySlug: 'guide',
    lastUpdated: '2026-10-20',
    readingTime: '5 分钟',
    tags: ['新手必读', '基础认知', '客户端推荐'],
    description: '面向零基础读者的极简上手指引，理清订阅、客户端与网络分流的核心逻辑。',
    content: `
# 新手入门：从零开始配置科学上网

欢迎来到梯子避坑社 (EscapeTrap)。本篇指南专为首次接触网络代理与网络分流的用户编写，用最通俗易懂的语言，帮助你在 5 分钟内快速建立系统性认知并完成首次配置。

> [!TIP]
> 核心原则：**客户端 + 订阅链接 = 科学上网**。客户端是播放器，订阅是歌单，两者缺一不可。

---

## 02 先分清五样东西（核心概念与避坑清单）

很多新手在刚入门时容易混淆各种专业名词，甚至以为「买了服务商账号就能直接上网」或「装好客户端就能自动赠送节点」。其实逻辑非常清晰，先分清这五样核心要素：

> [!IMPORTANT]
> **【新手必看核心认知 / Direct Answer】**
> 科学上网的标准底层链路是：**服务商账号**管理套餐资产，**订阅链接**传输加密节点清单，**代理客户端**在本地设备负责流量接管，**配置与节点**决定物理出口，**分流模式（Rule/TUN）**决定哪些应用走代理。理清这 5 项职责与常见盲区，可避免 95% 的网络故障与充值踩坑。

| 核心要素 | 它负责什么（核心职责） | 常见误解（避坑盲区） | 推荐正确操作（内链指引） |
| :--- | :--- | :--- | :--- |
| **服务商账号**<br>\`(Provider Account)\` | 购买、续费流量套餐，登录个人控制台获取或重置订阅 URL，查看节点维护与节点倍率公告。 | 🛑 **账号不是客户端**！在浏览器登录后台不代表设备已经能用；不要轻信“永久买断”大额套餐。 | 👉 坚持月付原则，参阅 [服务商选购指南：避坑原则与横向对比](/buying) 与 [选型决策全景指南](/guide/selection/)。 |
| **订阅链接**<br>\`(Subscription URL)\` | 供客户端自动拉取最新节点列表、加密密钥、策略组和国内外分流规则的私有凭证。 | 🛑 **包含私有 Token 凭据**，并非普通网页！切勿截图发群或公开分享，泄露会导致流量被他人盗刷。 | 👉 导入指引与防泄露：[Clash 订阅导入全流程](/kb/clients/clash-import)；格式不符可使用 [在线订阅转换工具](/tools)。 |
| **代理客户端**<br>\`(Proxy Client)\` | 安装在电脑或手机设备上的工具软件，负责读取配置并按规则接管符合条件的系统网络流量。 | 🛑 **纯净开源客户端不会自动附送线路**！安装后仍需手动导入订阅链接或配置自建节点才能联网。 | 👉 前往 [多端配置上手指南](/guide/clients/)，Windows 首选 [Clash Verge Rev](/kb/clients/clash-verge-windows)，iOS 首选 [Shadowrocket 小火箭](/kb/clients/shadowrocket-guide)。 |
| **配置与节点**<br>\`(Profiles & Nodes)\` | 配置决定分流规则与策略分组；节点（如香港、日本、美国）是位于海外机房的具体网络出口。 | 🛑 **切换节点不等于更换服务商**，更不能解决套餐欠费；晚高峰严重断流主要由底层回程骨干网决定。 | 👉 辨析优质出口：[线路科普：直连、中转、IPLC 专线全方位解析](/kb/concepts/routes-explained) 与 [CN2 GIA/9929/CMI 区别](/kb/vps/cn2-9929-cmi-diff)。 |
| **Rule / 系统代理 / TUN**<br>\`(Routing Modes)\` | 决定本地哪些流量走直连、哪些走代理：系统代理接管浏览器，TUN 虚拟网卡接管游戏、命令行与全量数据。 | 🛑 **显示“已连接”只代表客户端核心启动**，不等于能打开外网；普通系统代理对终端、Telegram、游戏无效。 | 👉 开启虚拟网卡接管：[Clash TUN 模式虚拟网卡详解](/kb/clients/clash-tun-mode)；网络异常请看 [常见排障中心](/guide/faq/)。 |

---

<!-- STEP_FLOW_INSERTION -->

## 05 平台主流客户端推荐与对比

根据你的操作系统平台，认准主流推荐工具（建议优先从本站教程或官方 GitHub Releases 获取，切勿从不可信网盘或第三方渠道下载二次打包程序）：

| 系统平台 | 推荐客户端 | 备选工具 | 核心优势与特点 | 快速上手教程 |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** | **Clash Verge Rev** | FlClash, v2rayN | 界面现代、支持内核切换、自带 TUN 虚拟网卡 | [Windows 教程与配置 →](/kb/clients/clash-verge-windows) |
| **macOS** | **Clash Verge Rev** | Clash Party, Surge | 原生适配 Apple Silicon，内存占用极低 | [macOS 教程与配置 →](/kb/clients/clash-verge-macos) |
| **iOS / iPadOS** | **Shadowrocket (小火箭)** | Loon, Quantumult X | 普及率最高、操作最直观、全协议支持 | [iOS 小火箭新手指南 →](/kb/clients/shadowrocket-guide) |
| **Android** | **FlClash** | v2rayNG, Surfboard | 开源免费、Material You 极简设计、无广告 | [Android 客户端教程 →](/kb/clients/flclash-android) |
| **软路由/全屋** | **OpenClash** | ShellCrash | 全局智能分流、Apple TV/Switch 游戏全覆盖 | [全屋代理分流拓扑 →](/kb/vps/soft-router-proxy) |

---

## 06 新手高频避坑与常见疑问 (FAQ)

### Q1：客户端显示“已连接”或绿灯，为什么网页依然打不开？
> **Direct Answer**：客户端核心进程启动只代表本地代理端口开启，不等于节点真正通畅。最常见的 3 大原因：
> 1. **系统代理开关未勾选**：客户端未将自身设置为系统的默认代理，导致浏览器流量根本未经过客户端。
> 2. **节点超时不可用**：订阅中节点已被机房断流或套餐流量耗尽。请在客户端节点列表进行延迟测速（Ping 测试），选择有绿色数字（如 120ms）的可用节点。
> 3. **系统本地时间不准**：VMess / Trojan / VLESS 等协议要求客户端与服务器时间误差在 90 秒内。进入系统设置校准网络时间即可恢复。

### Q2：日常使用应该选哪个分流模式？全局（Global）还是规则（Rule）？
> **Direct Answer**：日常**必须始终保持「Rule（规则分流）」模式**！
> - **Rule（规则模式，推荐）**：自动识别流量，国内网站（百度、淘宝、微信、B站）走直连不耗跨境网络加速流量且不降速；仅海外被阻断网站走代理。
> - **Global（全局模式，排障专用）**：所有流量强制走代理，会导致国内 App 极卡、甚至触发网银和微信异地登录风控。
> - **Direct（全直连模式）**：不经过代理，所有请求直接访问原站。

### Q3：为什么终端 Git、Telegram 或 Steam 联机游戏无法科学出海？
> **Direct Answer**：普通「系统代理」只能自动接管支持 HTTP/Socks5 环境变量的浏览器流量，对不遵从系统代理的终端命令行（PowerShell / Git）、桌面客户端（Telegram）和大型网络游戏无效。
> **解决方法**：在客户端中一键开启 **TUN 模式（虚拟网卡接管）**，虚拟网卡会接管操作系统网络协议栈的所有流量，详情查阅 [Clash TUN 模式虚拟网卡详解](/kb/clients/clash-tun-mode)。
`
  },

  // ==========================================
  // 【基础概念】 (Concepts Pillar)
  // ==========================================
  'kb/concepts/routes-explained': {
    title: '线路科普：直连、中转、IPLC/IEPL 专线全方位解析',
    category: '基础概念',
    categorySlug: 'concepts',
    lastUpdated: '2026-10-26',
    readingTime: '8 分钟',
    tags: ['线路科普', 'IPLC', 'BGP中转', '网络拓扑', '核心概念'],
    description: '深度揭秘机场节点宣传中的直连、中转、IPLC 与 IEPL 专线的网络拓扑、晚高峰拥堵成因与性价比选型。',
    content: `
# 线路科普：直连、中转、IPLC/IEPL 专线全方位解析

购买节点或自建 VPS 时，大家经常会听到「普通直连」、「BGP 中转」、「IPLC 专线」、「IEPL 专线」等术语。为什么同样是香港节点，专线价格往往比普通直连贵 3 到 5 倍？为什么晚上 8 点后普通节点卡顿严重，而专线依旧流畅？本文带你彻底搞懂底层物理网络。

---

## 一、三大线路形态物理拓扑架构

\`\`\`text
1. 普通直连线路 (Direct):
   [用户客户端] ──(公网跨国骨干网 / 易拥堵+防火墙监控)──> [海外落地 VPS]

2. 国内 BGP 公网中转 (Relay / Tunnel):
   [用户客户端] ──(国内低延迟)──> [国内中转入口机] ──(跨国公网加密隧道)──> [海外落地机]

3. IPLC / IEPL 物理专线 (Private Leased Line):
   [用户客户端] ──(国内BGP入口)──> [专线内网网关] ════(点对点跨国海底物理光缆/合规跨国专线传输)════> [海外落地机]
\`\`\`

---

## 二、四大线路形态多维度对比横评

| 线路类型 | 物理传输方式 | 晚高峰丢包率 | 端到端 Jitter 抖动 | 是否过 国际网络出口网关 防火墙 | 相对带宽成本 | 典型适用业务场景 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **普通公网直连** | 经过 163/169 骨干网跨国传输 | **15% - 40%** (严重) | > 30ms (波动剧烈) | 是 (实时深度包检测) | 极低 ($0.1-0.5/Mbps) | 闲时大文件下载、备用低频访问 |
| **优化直连 (CN2 GIA/9929)** | 电信 AS4809 / 联通 AS9929 优质承载网 | **< 2%** (极优) | < 3ms (极稳) | 是 (但通道优先级最高) | 高 ($5-10/Mbps) | 远程开发 SSH、外贸交互、金融看盘 |
| **国内 BGP 公网中转** | 国内优质多线入口 + 跨境加密隧道 | **2% - 5%** (良好) | 5 - 10ms (平稳) | 是 (隧道加密流量) | 中等 ($1-3/Mbps) | 4K 追剧、YouTube、日常高性价比主力 |
| **IPLC / IEPL 专线** | 点对点跨境海缆/内网专用光纤通道 | **0% - 0.5%** (零丢包) | **< 1ms** (几乎零抖动) | **否 (不过防火墙)** | 极高 ($8-15/Mbps) | 外企跨国专线、跨国路由震荡期保障、海外游戏联机 |

---

## 三、主流线路深度解构

### 1. 普通直连 (Direct)
- **原理**：你的本地网络直接通过中国电信 163、中国联通 169 或中国移动 CMI 普通骨干网跨越国境直接连接到海外服务器。
- **致命瓶颈**：在晚高峰（20:00 - 23:30）国际出口总带宽极度拥塞，丢包率往往从白天的 1% 激增至 30% 以上。
- **进阶升级**：若必须使用直连，强烈建议搭配优质回程线路，具体技术评测请参考本站核心专题 [2026 最新节点线路 CN2 GIA、9929、CMI 区别与选购全景指南](/kb/vps/cn2-9929-cmi-diff)。

### 2. 国内 BGP 公网中转 (Relay)
- **原理**：服务商在国内部署高防 BGP 入口服务器（如江苏镇江、上海联通、广东移动），用户就近连接到国内入口机，入口机通过加密隧道协议跨洋中转到海外落地机。
- **优势**：
  1. 用户到国内入口 Ping 延迟通常在 10-30ms 之间，极大降低了本地宽带直连海外的握手损耗。
  2. 入口机具备 BGP 多线接入能力，电信、联通、移动用户均能分配最优入口。

### 3. IPLC / IEPL 专线 (International Private Leased Circuit)
- **核心秘密**：**真正的不经过 国际网络出口网关 防火墙**。
- **物理本质**：由电信运营商（如中国电信国际、香港 PCCW）铺设的跨境点对点私有物理光缆。流量在深圳入口进入，直接通过海底光缆内网直达香港机房，全程不走公网出口。
- **IEPL 区别**：IEPL（国际以太网专线）采用以太网封装，延时和稳定性与 IPLC 相当，两者在日常使用中几乎无感。

---

## 四、客户端节点选型与分流配置实操

在日常使用现代客户端（如 [Clash Verge Rev (Windows)](/kb/clients/clash-verge-windows) 或 [Shadowrocket 小火箭 (iOS)](/kb/clients/shadowrocket-guide)）时，建议采取以下节点搭配策略：

1. **日常视频与大下载**：选择 BGP 中转的大带宽香港/新加坡节点，成本低且 4K 秒开。
2. **终端命令行与外服游戏**：开启 [Clash TUN 模式虚拟网卡接管](/kb/clients/clash-tun-mode)，并强制分配 IPLC 专线或 CN2 GIA 节点，杜绝丢包重传。
3. **网络链路维护高发期备用**：始终在客户端中保留 1-2 条纯血 IPLC 专线作为应急通道。
`
  },

  'kb/concepts/protocols-explained': {
    title: '2026 跨境网络加速与主流协议选型深度指南（VLESS Reality / Hysteria2 / 专线科普）',
    category: '基础概念',
    categorySlug: 'concepts',
    lastUpdated: '2026-10-26',
    readingTime: '12 分钟',
    tags: ['2026 科学上网指南', 'VLESS Reality 配置', 'Hysteria2', 'IPLC 专线', '节点测速', '跨境网络加速客户端推荐', '分流规则优化'],
    description: '面向 2026 年网络对抗环境的跨境网络加速与主流代理协议选型指南。深度横评 VLESS Reality、Hysteria2、Trojan、Shadowsocks 与 IPLC/IEPL 专线拓扑，提供多端客户端配置与 ChatGPT/Claude 解锁方案。',
    content: `
# 2026 跨境网络加速与主流协议选型深度指南（VLESS Reality / Hysteria2 / 专线科普）

> [!IMPORTANT]
> **【核心定义与选型结论 / Direct Answer】**
> 在 2026 年现代网络对抗环境下，**网络加速架构已从单一协议加密转向“底层物理拓扑 + 顶层防封伪装”协同**。协议选型黄金法则：**日常办公与主力抗封锁首选 VLESS-Reality（借用大厂合规证书，彻底免疫 国际网络出口网关 主动探测）**；**晚高峰高丢包普通公网直连首选 Hysteria2（基于 QUIC/UDP Brutal 拥塞控制，弱网暴力提速）**；**企业跨国生产与外服低延迟联机必须选择 IPLC/IEPL 物理专线（内网海缆合规跨国专线传输，零丢包零抖动）**。普通公网直连配旧版 Shadowsocks/VMess 已被主动探测算法精准封锁，不建议作为主力方案。

---

## 一、2026 主流代理协议与网络传输技术综合横评

为了帮助开发者、跨境电商、AI 研发工程师与普通用户科学选型，以下针对 2026 年主流协议性能、加密机制、端口阻断抗性及适用场景整理全景对比矩阵：

| 协议 / 传输方案 | 传输层底层 | 核心加密与伪装机制 | 抗 国际网络出口网关 封锁能力 | 晚高峰弱网表现 | 握手与连接延迟 | 最佳适用业务场景 | 推荐支持客户端 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **VLESS Reality** | TCP (TLS 1.3) | **借用大厂合法证书 (SNI 借道)**<br>配合中间人反主动探测防御 | 极高 (目前公网最强防御机制) | 依赖回程网络（建议搭配 [CN2 GIA/9929 骨干网](/kb/vps/cn2-9929-cmi-diff)） | **0-1 RTT** (极速握手) | 自建 VPS、远程开发、AI 大模型交互、外企办公 | [Clash Verge Rev (Windows)](/kb/clients/clash-verge-windows), [Shadowrocket](/kb/clients/shadowrocket-guide), sing-box |
| **Hysteria2 (Hy2)** | UDP (QUIC) | **自定义 Brutal 拥塞控制**<br>标准 TLS 伪装 + 端口跳跃 (Port Hopping) | 极高 (免疫 TCP 重置与 RST 注入) | **极其强悍**（20% 丢包下依然跑满百兆） | **0-RTT** (即时恢复) | 晚高峰普通公网直连、4K/8K 视频流媒体、外网大文件下载 | [Clash Verge Rev](/kb/clients/clash-verge-macos), [FlClash Android](/kb/clients/flclash-android), v2rayNG |
| **Trojan (标准 TLS 伪装)** | TCP (TLS) | 真实域名证书 (Let's Encrypt)<br>443 端口伪装成合规 Nginx 网页 | 良好 (需自行维护域名与证书) | 遇高丢包会因 TCP 重传断崖式降速 | 2-RTT (含 TLS 证书校验) | 传统老牌稳定服务、中转线路落地端 | 全平台主流客户端通用 |
| **Shadowsocks (2022)** | TCP / UDP | AEAD 对称加密 (AES-256-GCM / 2022-blake3) | 较低 (公网直连极易被识别，**仅适合内网专线**) | 普通公网直连断流频繁 | 1-RTT | **IPLC / IEPL 物理专线专属内部传输** | 所有主流客户端全兼容 |
| **IPLC / IEPL 物理专线** | 点对点海底光缆 | 局域网内网传输（通常搭配轻量 SS/Trojan） | **绝对免疫 (完全不过 国际网络出口网关 防火墙)** | **零丢包** (丢包率 < 0.2%, 抖动 < 1ms) | 物理极限低延迟 (深港 3-5ms) | 证券交易、游戏联机、外贸实时协作、网络链路维护高发期应急容灾 | 配合任意主流客户端导入订阅 |

---

## 二、核心协议底层机制与技术演进深度解密

### 1. VLESS Reality：为何能彻底终结“买域名自建证书”的繁琐历史？
在传统的 Trojan 或 VMess+TLS 时代，自建用户面临巨大的维护痛点：必须花钱购买国际域名、解析到海外 VPS、申请申请 Let's Encrypt 证书并配置 Nginx 反向代理。一旦域名进入黑名单，整台服务器全部报废。

[VLESS Reality 搭建与反探测配置](/kb/vps/vless-reality) 采用了创新的 **SNI 伪装借道** 技术：
- **偷天换日**：客户端与服务端通信时，直接在 TLS Client Hello 握手中借用境外大型合规网站（如 Apple、Microsoft、Cloudflare、Yahoo）的真实合规证书。
- **反主动探测机制**：当防火墙监测到可疑流量并派出探测爬虫向你的 VPS 发起 TLS 握手时，Xray/sing-box 服务端会自动把探测请求重定向到真实的大厂服务器，探测爬虫拿到的是大厂官方原版响应，从而彻底判定该 IP 为合法境外节点，解除封锁风险。

### 2. Hysteria2：针对晚高峰高丢包的“暴力网络解药”
传统 TCP 协议存在经典的“慢启动与拥塞窗口退避”机制（如 Cubic / BBR）。只要跨洋国际骨干网在晚高峰产生 **10%~15%** 的丢包，TCP 协议栈就会认为网络拥堵，自动将发送速率调低 80% 以上，导致 4K 视频疯狂转圈。

[Hysteria2 极速搭建与端口跳跃](/kb/vps/hysteria2-setup) 采用魔改 QUIC 协议：
- **Brutal 强行发包算法**：无论网络丢包率有多高，客户端与服务端始终按照用户设定的带宽速率（如 100Mbps）强行发包，配合前向纠错码（FEC）实现零延迟补包。
- **端口跳跃 (Port Hopping)**：针对部分省份运营商（如某些地区的移动/电信）对长连接 UDP 流量实行的 QoS 限速与端口熔断，Hysteria2 可以在数秒内自动在预设端口范围（如 20000-50000）内平滑漫游跳跃，彻底规避单端口被封。

### 3. 专线内幕：直连、BGP 中转与 IPLC/IEPL 的本质物理差距
很多新手以为购买了高带宽套餐就能解决卡顿，但实际体验却天差地别。这是由底层物理网络拓扑决定的：
1. **普通公网直连 (Direct)**：本地电脑直接经过中国电信 163、中国联通 169 普通民用骨干网跨越太平洋直连海外机房。晚高峰出口总带宽过载，丢包率往往飙升至 30% 以上。
2. **优质优化回程 (CN2 GIA / 9929 / CMI)**：电信 AS4809（CN2 GIA）与联通 AS9929 属于运营商企业级 VIP 专网，具有独立光缆出口和极高的 QoS 调度优先级，丢包率通常可控制在 2% 以内。深度辨析请参阅 [CN2 GIA 与 9929 线路区别全景对比](/kb/vps/cn2-9929-cmi-diff)。
3. **IPLC / IEPL 物理专线 (Private Leased Line)**：服务商向电信或跨国运营商租赁点对点跨境专用光纤网络（如深圳内网机房点对点直达香港数据中心）。**流量在深圳内网即进入物理专网，全程不经过公网国际出口，根本不会触碰 国际网络出口网关 防火墙**。这就是为什么专线即便在网络链路维护高发期也永远保持 0 丢包和秒级响应。详细网络拓扑图解可参阅 [专线内幕科普：直连、中转、IPLC 专线全方位解析](/kb/concepts/routes-explained)。

---

## 三、主流操作系统客户端选型与高效配置指南

选择适配良好的客户端是发挥高速协议性能的关键。推荐只认准开源透明的官方发行版，切勿使用来源不明的打包客户端：

### 1. Windows / macOS 平台主力：Clash Verge Rev
- **核心优势**：基于 Tauri 框架打造，内存占用仅数十 MB；内置最新的 Mihomo (Clash.Meta) 开源核心，原生支持 VLESS Reality 与 Hysteria2 协议。
- **实战教程**：
  - Windows 端快速上手：请参阅 [Clash Verge Rev 订阅导入与配置教程 (Windows)](/kb/clients/clash-verge-windows)；
  - macOS 权限配置：请参阅 [Clash Verge Rev macOS M芯片适配与安装](/kb/clients/clash-verge-macos)。
- **关键技巧**：日常必须开启 **TUN 虚拟网卡模式**，并在「设置」中将内核切换为 Alpha/Meta 版本以获取最新协议加速。

### 2. iOS 平台神器：Shadowrocket (小火箭)
- **核心优势**：国内普及率最高、操作最直观的代理工具，全协议无缝支持，扫码即刻导入节点。
- **下载与配置**：由于国区 App Store 下架，需登录美区 Apple ID 获取。详细下载步骤请看 [Shadowrocket 小火箭美区下载与账号配置](/kb/clients/shadowrocket-apple-id) 与 [Shadowrocket 完整新手上手教程](/kb/clients/shadowrocket-guide)。

### 3. Android 平台主流：FlClash 与 v2rayNG 对比
- **FlClash**：采用 Google 现代 Material You 动态主题设计，动画丝滑，支持多订阅自动合并与定时测速，适合追求美观与易用性的新手。详见 [FlClash Android 极简配置教程](/kb/clients/flclash-android)。
- **v2rayNG**：老牌经典全协议工具，底层开销极低、省电性极优，支持极客深度自定义配置。两款工具的选型权衡请参阅 [Android 客户端深度横向对比](/kb/clients/android-clients-comparison)。

---

## 四、高频技术痛点：长尾搜索意图解决方案

### 1. TUN 模式网卡冲突解决
- **现象**：开启客户端 TUN 模式后，电脑右下角网络图标显示黄色叹号或“无 Internet 访问”，但浏览器依然能勉强访问部分网页，局域网共享打印机断联。
- **根因**：虚拟网卡与系统物理网卡（或 VMware / WSL / 校园网认证客户端）的默认网关跃点数（Metric）发生争抢。
- **解决方案**：
  1. 打开 [Clash TUN 模式虚拟网卡接管详解](/kb/clients/clash-tun-mode)；
  2. 在客户端「设置 -> 虚拟网卡 (TUN)」中，将网络栈从 \`gVisor\` 切换为 \`System\` 模式；
  3. 开启「严格路由 (Strict Route)」并勾选「绕过局域网地址 (Bypass Direct IPv4)」，避免局域网流量被拦截。

### 2. ChatGPT / Claude 访问被拒绝解决方案 (1020 / Access Denied)
- **现象**：打开 ChatGPT 提示 \`Access Denied (Error 1020)\`，或登录 Claude 提示 \`Unable to serve your request\`。
- **根因**：OpenAI 与 Anthropic 对访问出口的 IP 类型有严格风控。绝大多数普通数据中心 VPS 的机房 IP（Hosting IP）已被拉入封锁黑名单，只有纯净的家庭宽带住宅原生 IP（ISP Residential IP）才能顺畅通过 Cloudflare 质询。
- **应对方案**：
  1. 使用分流规则优化：在客户端规则中，将 \`openai.com\` 和 \`anthropic.com\` 域名策略组强制指定为「解锁专线节点」或「美国/日本住宅原生节点」；
  2. 避坑指南：参阅 [机场选购指南：流媒体与 AI 解锁测评](/buying) 挑选具备双 ISP 纯净原生 IP 的节点；
  3. 如果遇到浏览器 Cookie 污染，可使用 [实用工具箱](/tools) 提供的 WebRTC 与 DNS 泄漏在线检测，确认无本地 IP 泄漏后再在无痕模式下登录。

### 3. 分流规则优化：如何避免国内微信、网银触发异地风控？
- **铁律**：日常必须始终保持「**Rule（规则分流）**」模式！
- **进阶规则集**：推荐使用成熟的 [ACL4SSR 全球分流规则](/kb/concepts/glossary)。将国内主流应用（微信、百度、淘宝、拼多多、哔哩哔哩）以及中国大陆境内 IP（GeoIP:CN）全部加入 Direct 直连列表。只有被防火墙阻断的海外域名才走代理，既能节约跨境网络加速流量，又能彻底避免国内银行 App 提示“检测到海外登录”而冻结账户。

---

## 五、科学节点测速与选购决策指引

拥有一套高速可靠的网络加速系统，离不开科学的验证与选购方法：
1. **科学跑速四步法**：不要只看客户端里 30ms 的 Ping 值（那只是到国内中转机的延迟）。真正的测速需使用单线程吞吐与实际视频缓冲分析，详细操作流程请参考 [网络测速指南：看懂下行带宽、延迟与丢包率测试](/kb/concepts/speed-test-guide)。
2. **避坑坚持小额月付**：千万不要轻信网络上所谓“大额折扣买三年”或“永久买断套餐”。网络线路随时可能遭遇骨干网断流或封禁，坚持小额月付并在客户端保留 1~2 条容灾备用线路是唯一的安全法则。详细评测请参阅 [选购避坑原则与横向深度横评](/buying)。
3. **遇到故障分层排查**：当客户端显示绿灯但无法联网时，请勿盲目重装。按照 [常见排障手册与网络诊断决策树](/troubleshoot) 和 [常见问答 FAQ 速查](/guide/faq/)，从系统代理勾选、系统时间偏差到 DNS 污染，通常可在 60 秒内快速恢复网络。
`
  },

  'kb/concepts/speed-test-guide': {
    title: '网络测速指南：看懂下行带宽、延迟与丢包率测试',
    category: '基础概念',
    categorySlug: 'concepts',
    lastUpdated: '2026-10-24',
    readingTime: '6 分钟',
    tags: ['测速指南', '网络测速', '丢包率测试', 'Jitter抖动', 'YouTube跑分'],
    description: '科学辨析 Ping 延迟、多线程吞吐率、Jitter 抖动与视频加载缓冲的真实关系，杜绝测速误区。',
    content: `
# 网络测速指南：看懂下行带宽与真实丢包

很多用户在购买节点后，常常遇到这样的困惑：「为什么我在客户端测速显示延迟只有 30ms，但打开 YouTube 看 4K 视频却转圈卡顿？」「为什么 Speedtest 跑出了 300Mbps，刷推特图片却加载极慢？」本文教你用网络工程视角科学测试节点。

---

## 一、测速三大核心指标深度解读

### 1. ICMP Ping 延迟 vs HTTP 握手延迟
- **客户端中的绿色小数字（Ping）**：客户端默认仅仅是向节点入口发送一个极小（约 64 字节）的 ICMP 或 TCP SYN 探测包。
- **真相**：在 [国内 BGP 中转与专线线路](/kb/concepts/routes-explained) 中，你测出的 30ms 仅仅是你家电脑到国内中转服务器的距离，完全不代表从国内中转机到海外目标网站的真实跨洋时间！

### 2. 丢包率（Packet Loss）——流媒体流畅度的隐形杀手
TCP 协议具备重传校验机制。一旦网络丢包率超过 **5%**，TCP 窗口尺寸会瞬间缩小为初始值，你的带宽会直接缩水 80%。这就是为什么普通直连线路测速跑分好看，但实际追剧经常断流的根本原因。

### 3. Jitter（网络抖动）
Jitter 代表延迟波动的标准差。如果一个节点 Ping 值在 50ms 与 250ms 之间频繁跳变（高 Jitter），外服竞技游戏联机或在线视频会议会产生严重的瞬移和爆音。

---

## 二、标准四步科学测速法

1. **第一步：基础连通性与回程验证**
   在客户端中执行全节点连通性测试，剔除显示红色 Timeout 的失效节点（排查方法详见 [常见问答 FAQ：高频疑难杂症速查](/guide/faq/)）。
2. **第二步：单线程下行吞吐测试**
   打开 [Fast.com](https://fast.com) 或 [Speedtest.net](https://speedtest.net)。点击设置调整为「单连接（Single Connection）」，单连接跑分才能反映日常网页加载的真实性能。
3. **第三步：YouTube 4K Stats for Nerds 验证**
   在 YouTube 随意播放一段 4K 60FPS 视频，右键点击「详细统计信息 (Stats for Nerds)」：
   - **Connection Speed**：稳定在 60,000 Kbps 以上即可保证流畅播放。
   - **Buffer Health**：缓冲条维持在 20 秒以上说明节点具备充裕的冗余带宽。
4. **第四步：隐私与安全泄漏检测**
   使用本站 [实用在线工具箱](/tools) 验证 DNS 是否泄露或 IP 是否被标记。
`
  },

  'kb/concepts/glossary': {
    title: '科学上网与网络工程核心名词解释速查',
    category: '基础概念',
    categorySlug: 'concepts',
    lastUpdated: '2026-10-23',
    readingTime: '5 分钟',
    tags: ['名词解释', '网络术语', '新手速查', 'Fake-IP'],
    description: '涵盖节点、订阅、分流规则、TUN模式、Fake-IP、BGP、IPLC 等常用术语通俗定义。',
    content: `
# 科学上网与网络工程核心名词解释

为了方便新手读者查阅，本文汇集了网络工程与日常使用中最高频的核心术语解释。

---

## 核心名词速查表

### 1. 代理与节点类
- **节点（Node / Proxy）**：一台部署在境外的服务器实例，提供加密流量中转出口。
- **订阅链接（Subscription URL）**：服务商提供给用户的专属配置链接，导入客户端后可自动下载并同步最新节点列表。参见 [Clash 订阅导入与更新全流程](/kb/clients/clash-import)。
- **落地机（Exit Node）**：用户网络请求最终发出的海外服务器，决定了访问 Google/Netflix 时的地理定位 IP。

### 2. 路由与分流类
- **分流规则（Rule Routing）**：客户端根据访问域名的后缀、IP归属国家自动决定流量走向的机制（例如国内流量 DIRECT 直连，海外流量走 PROXY 代理）。
- **TUN 模式（Virtual Network Interface）**：通过在操作系统安装虚拟网卡，从网络三层接管设备所有数据包。详见 [Clash TUN 模式虚拟网卡接管详解](/kb/clients/clash-tun-mode)。
- **Fake-IP 模式**：Clash 等客户端内置的 DNS 处理机制，本地直接返回一个虚拟私有 IP，将真实的 DNS 解析延迟推迟到海外服务器进行，大幅提速并彻底避免本地 [DNS 泄漏](/kb/handbook/security-privacy)。

### 3. 线路与物理拓扑类
- **BGP 中转**：国内入口采用边界网关协议（BGP），让电信、联通、移动用户均能以最低延迟接入内网中转机。
- **IPLC 专线**：国际点对点内网专用海缆通道，不过 国际网络出口网关 防火墙，详见 [线路科普：直连、中转、IPLC 专线全方位解析](/kb/concepts/routes-explained)。
- **CN2 GIA**：中国电信下一代精品承载网，AS 号为 AS4809，晚高峰极度稳定，详见 [2026 最新节点线路 CN2 GIA、9929、CMI 区别与选购全景指南](/kb/vps/cn2-9929-cmi-diff)。
`
  },

  // ==========================================
  // 【客户端教程】 (Clients Cluster)
  // ==========================================
  'kb/clients/clash-verge-windows': {
    title: 'Clash Verge Rev (Windows) 完整使用教程与进阶配置',
    category: '客户端教程',
    categorySlug: 'clients',
    lastUpdated: '2026-10-26',
    readingTime: '9 分钟',
    tags: ['Windows', 'Clash Verge Rev', 'TUN模式', '规则分流', '内链集群'],
    description: '新一代跨平台主流 Clash Verge Rev 客户端从下载、订阅导入、TUN 模式虚拟网卡接管到搭配 VLESS Reality / Hysteria2 协议的全流程图文指南。',
    content: `
# Clash Verge Rev (Windows) 完整使用教程与进阶配置

Clash Verge Rev 是目前 Windows 平台最受欢迎、活跃度最高且界面最现代化的开源网络代理客户端，基于 Tauri 和 React 开发，内置 Mihomo (Clash Meta) 核心，全面兼容 [VLESS Reality 搭建与反探测配置指南](/kb/vps/vless-reality) 与基于 UDP 的极速 [Hysteria2 搭建与配置指南](/kb/vps/hysteria2-setup)。

> [!NOTE]
> Clash Verge Rev 是原 Clash Verge 停止维护后，由开源社区 Rev 团队继续维护的分支版本，完全兼容且功能更强大。

---

## 一、软件下载与安装规范

### 1. 官方开源仓库地址
请认准官方 GitHub Releases 页面，避免使用第三方搜索引擎下载到带有恶意代码的二次打包版本：
- 官方发布页：[GitHub Releases](https://github.com/clash-verge-rev/clash-verge-rev/releases)

### 2. 安装包架构选择
- 绝大多数 64 位 Intel / AMD 电脑选择：\`Clash.Verge_x.x.x_x64-setup.exe\`
- 便携绿色免安装版：\`Clash.Verge_x.x.x_x64_portable.zip\`

---

## 二、配置与订阅导入全流程

### 步骤一：获取并导入订阅链接
1. 打开 Clash Verge Rev 客户端主界面。
2. 点击左侧导航栏的 **「订阅 (Profiles)」**。
3. 在顶部的输入框中，粘贴你从服务商获取的 Clash 订阅地址。如持有其他格式链接，可先使用本站 [实用在线工具箱：订阅转换与隐私检测](/tools) 转换为 Clash 格式。
4. 点击右侧的 **「保存 (Save)」** 按钮并高亮激活配置卡片。

### 步骤二：节点选择与线路选型策略
在 **「代理 (Proxies)」** 页面选择期望使用的节点。节点的网络体验取决于底层网络线路：
- 日常大带宽追剧：优先选择香港或新加坡的 [中国移动 CMI 或 AS4837 优化线路](/kb/vps/cn2-9929-cmi-diff)。
- 晚高峰极致稳定办公：推荐选择经过 [电信 CN2 GIA 或联通 9929 骨干网](/kb/vps/cn2-9929-cmi-diff) 的节点。
- 更多网络拓扑与物理专线机制，请参阅本站核心专题 [线路科普：直连、中转、IPLC 专线全方位解析](/kb/concepts/routes-explained)。

### 步骤三：开启系统代理与分流模式
1. 点击左侧导航栏的 **「设置 (Settings)」**。
2. 在核心开关区域，打开 **「系统代理 (System Proxy)」**。
3. 在代理模式中保持选择 **「规则 (Rule)」**，以确保国内网站（如百度、微信、网银）自动走直连，海外网站走代理节点。

---

## 三、进阶技巧：开启 TUN 模式虚拟网卡接管

普通系统代理模式仅能接管支持系统代理设置的浏览器，对于 Telegram 桌面版、Git 命令行工具、Steam 社区以及外服竞技联机游戏无效。此时必须开启 TUN 模式。

> [!TIP]
> 针对局域网多设备透明代理，建议进阶用户阅读 [软路由与全屋代理分流拓扑配置](/kb/vps/soft-router-proxy)。

### 开启步骤
1. 点击左侧 **「设置 (Settings)」**。
2. 找到 **「服务模式 (Service Mode)」**，先点击旁边的 **「安装」** 按钮安装系统级底层驱动。
3. 驱动安装完成后，开启 **「TUN 模式 (Tun Mode)」** 开关。
4. 此时 Windows 系统的所有网络数据包均由虚拟网卡驱动接管分流。详细技术原理请阅读专题文章 [Clash TUN 模式虚拟网卡接管详解](/kb/clients/clash-tun-mode)。

\`\`\`yaml
# Mihomo 核心 TUN 虚拟网卡配置结构示例
tun:
  enable: true
  stack: mixed
  dns-hijack:
    - "tcp://any:53"
    - "udp://any:53"
  auto-route: true
  auto-detect-interface: true
\`\`\`

---

## 四、常见问题与故障排查速查

1. **节点全部显示红色 Timeout 超时？**
   - 90% 的突然超时是因为本地电脑系统时间与标准北京时间偏差超过 90 秒。请查看 [常见问答 FAQ：高频疑难杂症速查](/guide/faq/) 的标准排查流程。
2. **开启代理后打不开网页，提示 ERR_PROXY_CONNECTION_FAILED？**
   - 上次关机时未正常退出代理导致本地代理端口占用，完整排查步骤请参考 [综合故障排查诊断手册](/troubleshoot)。
3. **担心开启代理后真实 IP 暴露？**
   - 建议在本地使用 [安全与隐私防护：防泄漏全指南](/kb/handbook/security-privacy) 验证节点纯净度。
`
  },

  'kb/clients/clash-tun-mode': {
    title: 'Clash TUN 模式虚拟网卡接管详解：彻底解决终端与游戏绕过代理',
    category: '客户端教程',
    categorySlug: 'clients',
    lastUpdated: '2026-10-25',
    readingTime: '8 分钟',
    tags: ['TUN模式', 'Clash Verge Rev', '虚拟网卡', '终端代理', '外服游戏'],
    description: '深入剖析 TUN 模式与系统代理的区别，手把手教你配置服务模式（Service Mode）、DNS 劫持与游戏无感加速。',
    content: `
# Clash TUN 模式虚拟网卡接管详解

许多用户开启了客户端的「系统代理」后，发现浏览器能够正常打开 Google，但 Windows 的 CMD/PowerShell 命令行依然连不上 GitHub，Telegram 桌面版一直处于连接中，玩 Steam 外服竞技游戏依然丢包断线。这是为什么？

---

## 一、系统代理 vs TUN 虚拟网卡模式

\`\`\`text
普通系统代理 (System HTTP/SOCKS Proxy):
[应用程序] ──> (若程序不支持系统代理环境变量，直接绕过) ──> [公网直连/超时阻断]
[浏览器/Chrome] ──(主动读取系统注册表代理设置: 127.0.0.1:7890) ──> [Clash内核分流]

TUN 虚拟网卡模式 (Layer 3 Virtual NIC):
[系统内所有网络请求 (TCP/UDP/ICMP)] ──(驱动层强行捕获)──> [Clash TUN 网卡] ──> [智能分流规则]
\`\`\`

- **普通系统代理**：仅仅在 Windows 注册表中设置了一个 HTTP 代理端口。只有 Chrome、Edge 等主动读取该设置的程序才会走代理。
- **TUN 模式**：通过虚拟网卡驱动（Wintun），在操作系统的网络第三层（IP层）强行拦截设备流出的**所有数据包**，即使应用本身不支持代理也能实现全局接管。

---

## 二、Clash Verge Rev 开启 TUN 模式实战

### 第一步：安装服务模式 (Service Mode)
由于创建虚拟网卡需要操作系统的管理员权限，普通运行模式无法持久维持驱动：
1. 打开 [Clash Verge Rev (Windows) 配置指南](/kb/clients/clash-verge-windows) 界面。
2. 点击左侧 **「设置」**。
3. 找到 **「服务模式 (Service Mode)」**，点击右侧的 **「安装」** 按钮。
4. 允许系统 UAC 提权弹窗，安装成功后状态指示灯将变为绿色。

### 第二步：开启 TUN 模式
在设置页面找到 **「TUN 模式」** 开关，点击开启。此时在 Windows 的「网络连接」面板中，你会看到多出一张名为 \`Mihomo\` 或 \`clash-core\` 的虚拟网卡适配器。

---

## 三、防止 DNS 泄漏与 Fake-IP 配置

开启 TUN 模式后，最核心的一步是配置 DNS 劫持，避免本地运营商继续对域名进行 DNS 污染：

\`\`\`yaml
# 推荐的 TUN 模式 DNS 配置片段
dns:
  enable: true
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query

tun:
  enable: true
  stack: mixed # mixed / gvisor
  dns-hijack:
    - "tcp://any:53"
    - "udp://any:53"
  auto-route: true
  auto-detect-interface: true
\`\`\`

结合 [安全与隐私防护：防泄漏全指南](/kb/handbook/security-privacy)，开启 DNS 劫持后，本地所有 53 端口查询均被客户端捕获并交由海外远端安全解析。
`
  },

  'kb/clients/clash-import': {
    title: 'Clash 订阅导入与更新全流程：一键导入与订阅配置安全',
    category: '客户端教程',
    categorySlug: 'clients',
    lastUpdated: '2026-10-24',
    readingTime: '5 分钟',
    tags: ['Clash 订阅导入', '订阅导入', '配置更新', 'Subconverter'],
    description: '掌握 Clash 订阅链接获取、一键导入、手动配置添加、自动更新定时器与防止订阅泄露的最佳实践。',
    content: `
# Clash 订阅导入与更新全流程

订阅链接是你与服务商节点服务器通信的「通行证」。本篇教程将指导你如何在各类客户端中高效导入并管理订阅，并学会应对常见的更新失败与解析报错。

---

## 一、订阅链接的获取与识别

标准的 Clash 订阅链接通常为 URL 格式，以 \`https://\` 开头，访问时返回的是一段由 YAML 格式编码的配置文本。

> [!WARNING]
> 切勿将包含个人 Token 的订阅链接公开分享至 GitHub、聊天群或论坛。任何获取该链接的人都可以耗尽你的月度流量。

如持有其他格式（如 V2Ray 单节点链接、Shadowsocks 格式、Sing-Box 格式），可先借助本站 [实用在线工具箱：订阅转换与隐私检测](/tools) 转换为 Clash 专属 YAML。

---

## 二、标准导入流程（以 Clash Verge Rev 为例）

1. **复制订阅地址**：在服务商仪表盘点击「复制 Clash 订阅链接」。
2. **粘贴至客户端**：打开 [Clash Verge Rev (Windows) 配置指南](/kb/clients/clash-verge-windows)，进入「订阅 (Profiles)」界面。
3. **输入 URL 并下载**：在上方输入框粘贴，点击「保存 (Save)」或「导入」。客户端会自动发起 HTTP 请求下载节点列表。
4. **激活配置卡片**：在列表中左键点击刚刚导入的卡片，卡片变为高亮（出现绿色或高光边框）即表示当前生效。

---

## 三、高频异常排查

1. **导入提示 Network Error / SSL Handshake Failed？**
   - 本地网络暂时无法直连订阅服务器。可先在浏览器中尝试打开订阅链接；或开启手机热点尝试重新拉取。
2. **节点显示数量为 0 或出现 YAML Syntax Error？**
   - 证明订阅链接返回了纯文本错误信息（如提示「账号已过期」或「流量耗尽」）。
3. 更多排障策略请参考 [常见问答 FAQ：高频疑难杂症速查](/guide/faq/) 与 [综合故障排查诊断手册](/troubleshoot)。
`
  },

  'kb/clients/shadowrocket-guide': {
    title: 'Shadowrocket 小火箭 (iOS) 全方位使用指南：从下载到规则分流',
    category: '客户端教程',
    categorySlug: 'clients',
    lastUpdated: '2026-10-25',
    readingTime: '8 分钟',
    tags: ['Shadowrocket', '小火箭', 'iOS客户端', '美区AppleID', '规则分流'],
    description: '苹果 iPhone / iPad 最受欢迎的网络工具 Shadowrocket 购买下载、订阅导入、全局分流与全协议节点配置全攻略。',
    content: `
# Shadowrocket 小火箭 (iOS) 全方位指南

Shadowrocket（俗称「小火箭」）是 iOS 平台普及率最高、功能极其强大且性价比极高的网络代理工具。售价仅 $2.99 美元，支持全套现代协议（包括 [VLESS Reality 搭建与反探测配置指南](/kb/vps/vless-reality) 与 [Hysteria2 搭建与配置指南](/kb/vps/hysteria2-setup)）。

---

## 一、软件获取前提：美区 Apple ID

由于中国大陆 App Store 政策限制，小火箭无法在国区 App Store 搜索下载。
- **获取途径**：准备一个海外地区（推荐美区）的 Apple ID。详细注册指引可参考本站 [Shadowrocket 下载与美区账号获取指南](/kb/clients/shadowrocket-apple-id)。
- **切勿在系统设置登录**：务必仅在 **App Store** 应用内切换账号，切勿在 iPhone 的「设置」中登录未知 Apple ID，以免被锁机！

---

## 二、订阅极速导入操作

Shadowrocket 支持两种最便捷的导入方式：

### 方式一：二维码一键扫码
1. 在电脑端打开服务商后台，显示订阅二维码。
2. 打开手机 Shadowrocket，点击左上角的 **「扫描」** 图标。
3. 对准屏幕二维码扫描，所有节点瞬间自动载入。

### 方式二：URL 链接导入
1. 复制你的订阅 URL。
2. 点击 Shadowrocket 主界面右上角的 **「+」** 号。
3. 在「类型」一栏选择 **「Subscribe」**。
4. 在「URL」栏粘贴链接，点击右上角「完成 (Done)」。

---

## 三、全局路由模式推荐

在小火箭主界面的「全局路由」选项中，提供以下三种模式：
- **配置 (Config) —— 【强烈推荐】**：智能规则模式。国内应用直连，海外应用代理，杜绝无意义消耗节点流量。
- **代理 (Proxy)**：全部流量强制走代理。
- **直连 (Direct)**：全部流量直连。

配合本站 [线路科普：直连、中转、IPLC 专线全方位解析](/kb/concepts/routes-explained) 挑选优质低延迟节点，开启顶部主开关即可畅游跨境互联网！
`
  },

  'kb/clients/android-clients-comparison': {
    title: 'Android 客户端对比：FlClash vs v2rayNG vs Clash Meta 深度选型',
    category: '客户端教程',
    categorySlug: 'clients',
    lastUpdated: '2026-10-24',
    readingTime: '7 分钟',
    tags: ['Android', 'FlClash', 'v2rayNG', 'Clash Meta', '安卓客户端对比'],
    description: '横向对比安卓平台三大主流客户端的内存占用、耗电量、协议支持、Material You 界面与后台保活能力。',
    content: `
# Android 客户端对比：选型与兼容性分析

安卓生态下代理客户端百花齐放。如何在 FlClash、v2rayNG 与 Clash Meta for Android (CMFA) 之间做出最佳选择？本文为你带来全景实测对比。

---

## 一、三大客户端核心维度横向评测

| 客户端名称 | UI 设计风格 | 协议兼容性 | 内存常驻占用 | 后台保活抗杀能力 | 适用人群画像 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FlClash** | **Material You 现代设计** | Clash Meta 核心 (全面支持 Reality/H2) | 约 70MB (轻量) | ★★★★☆ | 追求颜值、界面极简的新一代年轻用户 |
| **v2rayNG** | 经典原生 Android | Xray 内核 (全协议支持首发更新) | 约 50MB (极低) | ★★★★★ | 极客玩家、单节点调试、老旧机型 |
| **Clash Meta (CMFA)** | 经典 Clash 侧边栏 | Clash Meta 核心 | 约 90MB | ★★★★☆ | 习惯传统 Clash 界面、重度配置用户 |

---

## 二、选型建议与组合搭配

1. **新手与追求视觉体验的首选**：阅读本站 [FlClash Android 极简配置教程](/kb/clients/flclash-android)。支持动态取色，节点分组清晰。
2. **自建节点调试首选**：阅读本站 [v2rayNG Android 教程与进阶配置](/kb/clients/v2rayng-android)。针对 [VLESS Reality 搭建](/kb/vps/vless-reality) 的各项密钥参数提供最精细的输入框。
3. **配合家庭局域网**：若外出时需要远程访问家庭 NAS，推荐结合 [软路由与全屋代理分流拓扑配置](/kb/vps/soft-router-proxy)。
`
  },

  // ==========================================
  // 【VPS 自建 & 骨干线路】 (VPS Pillar)
  // ==========================================
  'kb/vps/vless-reality': {
    title: 'VLESS Reality 搭建与反探测配置指南',
    category: 'VPS 自建',
    categorySlug: 'vps',
    lastUpdated: '2026-10-25',
    readingTime: '10 分钟',
    tags: ['VPS自建', 'VLESS', 'Reality', 'Xray', 'sing-box', '反探测'],
    description: '无需自备域名、抗主动探测能力极强的 VLESS-Reality 协议全流程搭建与客户端配置教程。',
    content: `
# VLESS Reality 搭建与反探测配置指南

VLESS Reality 是 Xray 团队推出的划时代反探测伪装协议。它彻底摒弃了以往自建节点「必须自备域名 + 申请 TLS 证书 + 配置 Nginx 反向代理」的繁琐流程，直接「借用」大公司的合法证书与 SNI 伪装，有效免疫主动探测。

> [!IMPORTANT]
> **Reality 核心优势：**
> 1. **零域名成本**：不需要购买域名，省去年费且彻底避免域名被防火墙污染标记。
> 2. **真实大厂背书**：借用真实大厂证书（如 Apple, Microsoft, Yahoo），阻断的主动探测无法分辨真伪。
> 3. **极低握手延迟**：支持 0-RTT / 1-RTT 握手，延迟显著优于传统套 CDN 方案。

---

## 一、服务器端环境准备与内核安装

连接你的海外 VPS（优质线路选型可参考 [2026 最新节点线路 CN2 GIA、9929、CMI 区别与选购全景指南](/kb/vps/cn2-9929-cmi-diff)），执行官方脚本安装最新 Xray 核心：

\`\`\`bash
# 更新系统包
apt update && apt upgrade -y

# 安装最新版 Xray 官方官方脚本
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
\`\`\`

---

## 二、生成 Reality 专属密钥与 ShortId

在 VPS 终端执行以下命令生成专属公私钥对：

\`\`\`bash
# 生成 x25519 密钥对
xray x25519

# 输出示例：
# Private key: [你的私钥，填入服务端]
# Public key:  [你的公钥，填入客户端]

# 生成 8 位十六进制 shortId
openssl rand -hex 8
\`\`\`

---

## 三、服务端 config.json 核心配置范本

编辑 \`/usr/local/etc/xray/config.json\`：

\`\`\`json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "你的-UUID-字符串",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "show": false,
          "dest": "itunes.apple.com:443",
          "xver": 0,
          "serverNames": [
            "itunes.apple.com"
          ],
          "privateKey": "你的服务端私钥",
          "shortIds": [
            "你的shortId"
          ]
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
\`\`\`

保存后运行 \`systemctl restart xray && systemctl status xray\` 启动服务。

---

## 四、客户端连接配置实践

客户端支持方面：
- **Windows / Mac**：使用 [Clash Verge Rev (Windows) 配置指南](/kb/clients/clash-verge-windows)，在 Mihomo 配置文件中指定 \`type: vless\`, \`security: reality\`。
- **iOS**：使用 [Shadowrocket 小火箭 (iOS) 全方位指南](/kb/clients/shadowrocket-guide)，协议选择 VLESS，传输方式选 TCP，TLS 打开并勾选 Reality。
- 如遇连接异常，请查阅 [常见问答 FAQ：高频疑难杂症速查](/guide/faq/) 与 [VPS IP 被墙排障与连通性检测](/kb/vps/vps-ip-blocked)。
`
  },

  'kb/vps/hysteria2-setup': {
    title: 'Hysteria2 极速搭建与配置指南：基于 UDP 的暴力抗丢包极速跨境协议',
    category: 'VPS 自建',
    categorySlug: 'vps',
    lastUpdated: '2026-10-25',
    readingTime: '9 分钟',
    tags: ['Hysteria2', 'UDP加速', '暴力抗丢包', 'QUIC', '自建节点'],
    description: '详解 Hysteria 2 基于定制 QUIC 协议的高丢包环境提速原理、服务端安装、端口跳跃防 QoS 与客户端快速接入。',
    content: `
# Hysteria2 极速搭建与配置指南

当你使用普通的 TCP 代理（如 Shadowsocks 或 VLESS）在晚高峰连接海外 VPS 时，经常会遇到丢包率高达 15%~30% 导致视频卡死的问题。这是由于 TCP 协议的退避机制。**Hysteria2** 专为恶劣网络环境而生，凭借基于 UDP 的 Brutal 算法，即便在 30% 丢包环境下依然能榨干宽带。

---

## 一、Hysteria2 核心优势与技术特性

1. **Brutal 拥塞控制算法**：放弃 TCP 盲目减半窗口的缺陷，按用户预设的带宽速率平滑推送数据包，暴力消除丢包引起的降速。
2. **0-RTT 握手**：利用 QUIC 协议特性，瞬间建立加密连接。
3. **端口跳跃（Port Hopping）**：支持在指定端口范围内动态跳跃，有效破解当地运营商对单个 UDP 端口的持续 QoS 限速，详情参阅 [运营商检测与应对：破解限速与阻断](/kb/handbook/isp-detection)。

---

## 二、服务端快速搭建命令

在 VPS 终端运行官方一键安装脚本：

\`\`\`bash
# 下载并安装官方 Hysteria 2
bash <(curl -fsSL https://get.hy2.sh/)

# 生成自签名 TLS 证书（Hysteria2 允许客户端跳过证书校验）
openssl req -x509 -nodes -newkey ec:<(openssl ecparam -name prime256v1) -keyout /etc/hysteria/server.key -out /etc/hysteria/server.crt -subj "/CN=bing.com" -days 3650
\`\`\`

### 配置文件范本 (\`/etc/hysteria/config.yaml\`)

\`\`\`yaml
listen: :8443

tls:
  cert: /etc/hysteria/server.crt
  key: /etc/hysteria/server.key

auth:
  type: password
  password: 你的高强度密码

masquerade:
  type: proxy
  proxy:
    url: https://bing.com
    rewriteHost: true

outbounds:
  - name: default
    type: direct
\`\`\`

启动服务：\`systemctl enable --now hysteria-server.service\`。

---

## 三、客户端无缝接入

- **Clash Verge Rev**：在配置中声明 \`type: hysteria2\`, \`skip-cert-verify: true\`。参考 [Clash Verge Rev (Windows) 配置指南](/kb/clients/clash-verge-windows)。
- **Shadowrocket**：节点类型选 Hysteria 2，开启允许不安全证书。
- **Android 用户**：使用 [FlClash Android 极简配置教程](/kb/clients/flclash-android) 直接导入畅享极速体验。
`
  },

  'kb/vps/cn2-9929-cmi-diff': {
    title: '2026 最新节点线路 CN2 GIA、9929、CMI 区别与选购全景指南（附 AS4837 深度对比与分流实测）',
    category: 'VPS 自建',
    categorySlug: 'vps',
    lastUpdated: '2026-10-26',
    readingTime: '12 分钟',
    tags: ['CN2 GIA', '联通9929', '移动CMI', 'AS4837', '骨干网选型', 'SEO优质'],
    description: '深度解析中国电信 CN2 GIA、中国联通 9929/4837 与中国移动 CMI/CMIN2 跨国回程线路原理、晚高峰丢包对比、真伪鉴别与路由分流配置。',
    content: `
# 2026 最新节点线路 CN2 GIA、9929、CMI 区别与选购全景指南（附 AS4837 深度对比与分流实测）

> [!IMPORTANT]
> **【核心结论 / Direct Answer】**
> 跨国网络连接体验的本质由**回程路由（Return Path）**决定。综合 2026 最新骨干网调度策略：**中国电信 CN2 GIA (AS4809)** 是综合稳定性的绝对标杆，晚高峰丢包率 <1%，适合外贸金融、高要求远程办公与预算充足用户；**中国联通 9929 (AS9929)** 是跨网性能之王，北方三网通吃，晚高峰表现紧随 GIA 之后且性价比更高；**中国移动 CMI (AS58453) / CMIN2 (AS58807)** 则是大带宽大流量首选，价格亲民，移动宽带体验绝佳；高性价比追剧推荐 **AS4837**。抗敏感封锁与极致稳定首选双程优化 CN2 GIA。

---

## 一、跨国骨干网络多维度性能对比横评表

为了让技术选型更加直观，下表基于 2026 年主流海外机房（美西洛杉矶、中国香港、日本东京）在**晚高峰（20:00 - 23:30）**的实测数据汇总：

| 线路规格 | 所属运营商 / AS 号 | 晚高峰丢包率 | 典型中美延迟 | 典型中日/中港延迟 | 吞吐稳定性 | 相对带宽成本 | 适用人群与业务场景 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **电信 CN2 GIA** | 中国电信 / **AS4809** | **< 1%** (极稳) | 130 - 150ms | 35 - 55ms | ★★★★★ (峰值无抖动) | 最高 (约 $5-10/Mbps) | 跨国金融交易、远程 SSH 开发、追求 24 小时零卡顿的高净值用户 |
| **联通 9929 (A网)** | 中国联通 / **AS9929** | **< 2%** (优秀) | 140 - 165ms | 40 - 60ms | ★★★★☆ (极少劣化) | 较高 (约 $3-6/Mbps) | 联通及北方电信/移动宽带用户、中高负载跨境业务、极客玩家 |
| **移动 CMIN2** | 中国移动 / **AS58807** | **< 3%** (良好) | 145 - 175ms | 45 - 65ms | ★★★★☆ (良好承载) | 中等 (约 $2-4/Mbps) | 移动宽带进阶用户，电信联通跨网互联良好的二线高性价比之选 |
| **移动 CMI** | 中国移动 / **AS58453** | **3% - 8%** (一般) | 160 - 200ms | 30 - 50ms | ★★★☆☆ (偶发拥堵) | 较低 (约 $1-2/Mbps) | 移动宽带主力、大流量 4K 追剧、轻量个人建站与日常加速 |
| **联通 AS4837 (CU169)**| 中国联通 / **AS4837** | **5% - 12%** (中等) | 165 - 210ms | 50 - 80ms | ★★★☆☆ (晚高峰轻拥) | 低 (约 $0.5-1/Mbps) | 追求超大带宽 (>1Gbps)、BT/PT 挂机下载、预算有限的学生与新手 |
| **普通 163 骨干网** | 中国电信 / **AS4134** | **15% - 40%** (严重) | 220 - 320ms | 80 - 150ms | ★☆☆☆☆ (严重丢包) | 极低 (廉价白菜价) | 仅适合闲时低速同步、离线备份，不建议作为主力梯子或交互节点 |

---

## 二、底层网络原理：为什么决定体验的是「回程」而不是去程？

在计算机网络工程中，很多新手容易被服务商的宣传迷惑。必须掌握的核心公理是：**跨国代理体验 90% 取决于海外机房发回本地的「回程路由（Return Route）」，而非本地发出的「去程路由」**。

### 1. 流量不对称法则（80/20 Rule）
当你在电脑上观看 4K YouTube 视频或拉取 GitHub 代码时：
- **去程数据包（Uplink）**：仅仅是你的浏览器向服务器发送极其轻量的 HTTP 请求头或 TCP ACK 确认包，带宽占用不足 **100 KB/s**。
- **回程数据包（Downlink）**：服务器向你本地设备推送包含视频流、代码包的庞大数据流，带宽占用高达 **20 MB/s - 100 MB/s**。

\`\`\`text
[本地客户端] ──(仅几KB的轻量请求/去程)──> [海外落地 VPS]
[本地客户端] <══(数MB-数十MB媒体数据/回程拥堵瓶颈)══ [海外落地 VPS]
\`\`\`

很多不良奸商会使用「**去程走优质 GIA 诱导测速，回程悄悄切换为廉价普通 163 骨干网**」的套路。由于测速软件发起连接阶段很顺畅，但实际看视频大包时直接发生严重丢包。因此，**回程路由的 AS 号才是判定线路等级的唯一金标准**。

---

## 三、主流跨国线路核心特征与优缺点深度剖析

### 1. 中国电信 CN2 GIA (AS4809)
中国电信构建的独立于 163 骨干网（AS4134）的高规格承载网。全网节点具备 MPLS-TE 流量工程支持，拥有独立国境出口光缆。晚高峰丢包率常年压制在 1% 以内，端到端 Jitter 极低。

### 2. 中国联通 9929 与 AS4837
- **联通 9929 (AS9929)**：原网通政企 A 网，过去专供大型跨国国企与金融机构使用的专网，负载率低，与电信 CN2 GIA 几乎并驾齐驱。
- **联通 AS4837 (AS4837)**：联通民用大带宽骨干网，性价比极高，千兆大口子视频秒开。

### 3. 中国移动 CMI 与 CMIN2
- **移动 CMI (AS58453)**：香港互联枢纽直连延时极低，广东移动直连常年 10-15ms。
- **移动 CMIN2 (AS58807)**：移动对标电信 CN2 GIA 打造的独立精品承载网。

---

## 四、实操验证：手把手教你鉴别真假 GIA / 9929 线路

切勿轻信商家宣传，在 VPS 终端运行现代路由跟踪工具 \`nexttrace\` 可以瞬间戳穿虚假伪造路由：

\`\`\`bash
# 安装开源下一代路由可视化追踪工具 NextTrace
curl -Nfp 'https://raw.githubusercontent.com/nxtrace/NXT-Trace/main/install.sh' | bash

# 1. 测试回程至中国电信（上海电信公共 DNS: 202.96.209.133）
nexttrace 202.96.209.133

# 2. 测试回程至中国联通（上海联通: 210.22.84.3）
nexttrace 210.22.84.3

# 3. 测试回程至中国移动（广东移动: 120.196.165.7）
nexttrace 120.196.165.7
\`\`\`

- **真·CN2 GIA**：数据包离开海外机房后，进入 IP 为 \`59.43.*.*\` 的跳数节点，且 AS 号标注为 **AS4809**，全程无 163 骨干介入。
- **假·CN2 GT / 伪 GIA**：海外出机房显示 \`59.43.*.*\`/AS4809，但在国境入口或国内中转跳数变成了 \`202.97.*.*\`（**AS4134 传统 163 骨干**）。

---

## 五、客户端分流策略配合

在生产环境中，配合 [Clash Verge Rev (Windows) 配置指南](/kb/clients/clash-verge-windows) 或 [Shadowrocket 小火箭 (iOS) 全方位指南](/kb/clients/shadowrocket-guide) 进行分流：让大流量视频走性价比极高的 CMI 或 AS4837，让远程开发、GitHub 与金融交易强制走 CN2 GIA / 9929 节点。
`
  },

  // ==========================================
  // 【参考手册 & 故障排查】 (Handbook Pillar)
  // ==========================================
  'kb/handbook/faq': {
    title: '常见问答 FAQ：高频疑难杂症速查',
    category: '参考手册',
    categorySlug: 'handbook',
    lastUpdated: '2026-10-24',
    readingTime: '6 分钟',
    tags: ['FAQ', '常见问题', '新手解答', '故障排查'],
    description: '涵盖延迟高、节点红、DNS 污染、流媒体提示使用代理等高频问题标准排查流程。',
    content: `
# 常见问答 FAQ：高频疑难杂症速查

汇聚日常技术社区与新手提问最频繁的典型问题，遇到网络故障请先对照速查！

---

## Q1：为什么我的所有节点突然都变成了红色「Timeout / 超时」？

**标准排查四步流程：**
1. **检查本地系统时间（占比 90%）**：电脑或手机时间比标准北京时间快/慢超过 90 秒。TLS 与各类现代协议基于时间戳验证，时间不准会导致握手直接被服务器拒绝。请前往系统设置点击「立即同步时间」。
2. **检查订阅是否欠费或流量耗尽**：登录服务商控制台确认套餐状态。
3. **更新订阅配置**：在客户端中点击「刷新/更新配置」，参考 [Clash 订阅导入与更新全流程](/kb/clients/clash-import)。
4. **更换当前网络接入点**：从 Wi-Fi 临时切换为手机 5G 热点，排查是否是路由器防火墙或本地运营商进行了拦截。

---

## Q2：为什么打开 Netflix / Disney+ 提示「您似乎正在使用代理或解锁工具」？

- **原因**：流媒体平台拥有全球最严苛的机房 IP 数据库。若你的节点 IP 被标识为机房 IDC 广播 IP，会被直接禁止播放版权内容。
- **对策**：切换至标注有 **「NF / 解锁 / 原生」** 的节点。

---

## Q3：自建 VPS 和购买商业服务商节点，到底如何抉择？

| 评估维度 | 自建 VPS (如 VLESS Reality) | 商业服务商 / 机场订阅 |
| :--- | :--- | :--- |
| **隐私与安全性** | ★★★★★ (完全独享、无审计日志) | ★★★☆☆ (依赖服务商商誉与运营) |
| **维护门槛** | 需熟悉 Linux 命令行与端口排障 | 零维护成本，一键导入即用 |
| **网络冗余度** | 单一机房，高峰期易受单线波动 | 几十个国家地区、BGP中转与专线容灾 |
| **推荐指南** | 参考 [VLESS Reality 搭建与反探测配置指南](/kb/vps/vless-reality) | 参考 [服务商选购指南：避坑原则与横向对比](/buying) |
`
  },

  'kb/handbook/security-privacy': {
    title: '安全与隐私防护：DNS 泄漏与 WebRTC 防护全指南',
    category: '参考手册',
    categorySlug: 'handbook',
    lastUpdated: '2026-10-25',
    readingTime: '7 分钟',
    tags: ['安全隐私', 'DNS泄漏', 'WebRTC', '纯净度', '防追踪'],
    description: '彻底杜绝真实公网 IP 泄露，详解 DNS 劫持防护、浏览器 WebRTC 禁用与原生 IP 纯净度检测实操。',
    content: `
# 安全与隐私防护：防泄漏全指南

很多用户以为开启了代理软件就高枕无忧了。但在现代网络追踪技术下，浏览器的 WebRTC API、本地运营商的 DNS 探针依然可能悄悄泄露你的真实家庭公网 IP 与地理位置。本文教你构建严密的隐私护盾。

---

## 一、两大致命泄漏途径与防范

### 1. DNS 泄漏（DNS Leak）
- **泄漏机制**：即使网页走代理，操作系统依然向本地宽带运营商（如当地电信/联通 DNS 202.96.*.*）发起域名解析请求。运营商可以完整记录你访问的所有网站域名。
- **防御手段**：
  1. 在客户端开启 Fake-IP 模式，详情参考 [科学上网与网络工程核心名词解释](/kb/concepts/glossary)。
  2. 启用 [Clash TUN 模式虚拟网卡接管详解](/kb/clients/clash-tun-mode) 中的 DNS 劫持（dns-hijack），强行将所有 53 端口流量转发至海外安全 DoH/DoT 递归解析器。

### 2. WebRTC 真实 IP 泄漏
- **泄漏机制**：网页通过 JavaScript 调用 WebRTC 的 \`RTCPeerConnection\` API，即使有代理也能直接枚举出你网卡的真实局域网 IP 和公网 IP。
- **防御对策**：在 Chrome/Firefox 安装扩展（如 WebRTC Control 或 uBlock Origin），或使用专业工具在 [实用在线工具箱：订阅转换与隐私检测](/tools) 中执行一键体检。
`
  }
}

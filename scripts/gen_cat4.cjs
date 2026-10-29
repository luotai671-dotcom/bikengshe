const fs = require('fs');
const path = require('path');

const cat4Articles = [
  {
    slug: 'tun-mode-vs-system-proxy',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'TUN 虚拟网卡与系统代理的本质区别：网络层（L3）接管全面科普',
    description: '深度解构操作系统“系统代理（System Proxy）”与“TUN 虚拟网卡模式”在 OSI 网络模型中的本质分工，彻底解决终端命令行、Git、Telegram 与外服游戏不走代理的终极难题。',
    tags: ['TUN模式', '系统代理', '虚拟网卡', 'L3网络层', '全局接管'],
    directAnswer: '系统代理仅在应用层（L7）通过修改操作系统注册表设置一个本地 HTTP/Socks5 端口变量，只有自觉遵循该系统设置的软件（如 Edge、Chrome 浏览器）才会把流量交给代理，而终端命令行（PowerShell/CMD）、Git、游戏客户端以及 Telegram 等应用完全不理会系统代理；而 TUN 模式是在网络层（L3）直接向操作系统内核注册一张高优先级的虚拟网卡，强制截获本地产生的所有原始 IP 数据包（TCP/UDP/ICMP），无需各软件单独配置即可实现 100% 真正的真全局分流接管。',
    sections: [
      {
        heading: '一、 两种代理模式的底层架构对比',
        content: `| 核心维度 | 系统代理 (System Proxy) | TUN 虚拟网卡模式 (TUN Mode) |
| :--- | :--- | :--- |
| **OSI 网络层级** | 位于第 7 层（应用层） | 位于第 3 层（网络层） |
| **实现原理** | 写入环境变量 \`http_proxy\` 或系统 IE 注册表 | 创建虚拟网络适配器，修改系统路由表最高优先级 |
| **支持流量类型** | 仅支持 HTTP/HTTPS/Socks 流量 | 支持所有 TCP、UDP 数据包甚至 ICMP Ping 报文 |
| **常见失效应用** | PowerShell、Git、Docker、Steam 联机、Telegram | 全局无死角强制接管，任何软件均可走代理 |
| **系统资源消耗** | 极低（零额外内核驱动开销） | 略有 CPU 损耗，依赖 Wintun 驱动的高效转发 |`
      },
      {
        heading: '二、 为什么开启 TUN 模式有时会导致本地断网？',
        content: `如果 TUN 虚拟网卡的跃点数（Metric）设置冲突，或者本地路由表发生了默认网关死锁，可能导致本地物理网卡的 DNS 解析无法回环。排查建议：
1. 检查客户端是否安装了官方最新的 Wintun 驱动。
2. 确保开启了 \`auto-route: true\` 与 \`strict-route: true\`。
3. 杜绝同时运行多款 VPN 或杀毒软件的网络防火墙。`
      }
    ],
    internalLinks: '遇到 TUN 模式启动失败或断网，请参考专门排障手册 [排障总览与故障诊断树](/troubleshooting/)；选购兼容性最佳的高性能节点请查看 [2026 稳定节点综合推荐榜](/rankings/best/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '玩外服联机游戏必须开启 TUN 模式吗？',
        a: '是的。绝大多数联机游戏（如 Steam、Apex、战区等）的游戏主通信进程采用的是纯 UDP 报文通信，系统代理对 UDP 完全不起作用，唯有开启 TUN 模式才能让游戏数据流被成功加速。'
      }
    ]
  },
  {
    slug: 'fake-ip-vs-redir-host',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'Fake-IP 模式 vs Redir-Host 模式：解析 Clash 核心原理与避免 DNS 污染',
    description: '深入解构 Clash/Mihomo 内核在 DNS 解析上的两大分水岭：Fake-IP 虚拟伪装 IP 与 Redir-Host 重定向主机，详解 Fake-IP 如何以零延迟规避国内 DNS 污染。',
    tags: ['Fake-IP', 'Redir-Host', 'Clash原理', 'DNS污染', '网络延迟'],
    directAnswer: 'Redir-Host 模式遵循传统网络逻辑：客户端遇到域名先等待内网上游 DNS 解析出真实境外真实 IP，然后再将 IP 与规则集匹配决定是否走代理，这不仅额外耗费一次跨国 DNS 往返时间（增加 50~200ms），而且极易遭受国内运营商的 DNS 劫持与污染；而 Fake-IP 模式进行了天才般的反向设计：客户端收到任何 DNS 查询，立即从预设的虚拟保留网段（如 \`198.18.0.0/16\`）秒级返回一个虚构 IP，浏览器直接向该 Fake-IP 建立 TCP 连接，Clash 核心在拦截到连接时瞬间通过反查表还原出原始域名并直接交由远端海外节点进行解析与连接，彻底消灭了本地 DNS 污染并实现了首包零延迟发出。',
    sections: [
      {
        heading: '一、 Fake-IP 为什么能彻底免疫国内 DNS 污染？',
        content: `国内运营商通常会在公网出口部署 DNS 关键字审查。当你查询 \`twitter.com\` 时，运营商抢答一个虚假的死地址。
在 Fake-IP 模式下：
1. 本地网络根本没有向运营商发送任何针对外网域名的真实 DNS 查询。
2. 本地系统收到的只是由 Clash 驱动秒级生成的 \`198.18.x.x\` 虚拟内部指针。
3. 真正的域名是在远端境外落地节点上、在安全可信的局域网内由海外顶级公共 DNS 完成解析的。`
      }
    ],
    internalLinks: '如果你的 Fake-IP 缓存导致特定国内软件异常，可参考 [排障总览与故障诊断树](/troubleshooting/) 中的 DNS 排查章节；想要搭配高素质节点请看 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: 'Fake-IP 模式下，为什么 Ping 任何国外网站都显示 198.18.x.x？',
        a: '这是 Fake-IP 正常生效的标志。不必惊慌，此 IP 仅是本地客户端用来映射连接会话的虚拟内存句柄，数据在流出设备时会被代理核心实时替换为真正的目标数据包。'
      }
    ]
  },
  {
    slug: 'dns-leak-doh-dot',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'DNS 泄漏排查：DoH、DoT 与内网 DNS 防运营商劫持完整指南',
    description: '深度剖析 DNS 泄漏对用户上网隐私的致命威胁，详细讲解 DNS-over-HTTPS (DoH) 与 DNS-over-TLS (DoT) 的加密原理，教你在客户端构建牢不可破的防劫持体系。',
    tags: ['DNS泄漏', 'DoH', 'DoT', '隐私安全', '防劫持'],
    directAnswer: 'DNS 泄漏是指用户虽然开启了网络代理，但操作系统在发起网络请求前，依然通过本地未加密的 UDP 53 端口向本地宽带运营商（如中国电信、联通、移动）发送了明文域名查询请求，使得运营商能够全量记录你访问过的全部境外网站域名列表；彻底消除 DNS 泄漏的方法是使用现代加密 DNS 协议（DoH/DoT）替换系统明文解析，并在客户端配置分流规则：境内域名严格走本地加密 DNS，境外域名强制委托代理节点在远端远程解析。',
    sections: [
      {
        heading: '一、 如何验证你的网络是否存在 DNS 泄漏？',
        content: `前往 [实用工具箱](/tools) 或国外专业检测平台（如 \`dnsleaktest.com\`）运行 Extended Test：
- 若结果列表中出现了任何中国大陆境内运营商（如 China Telecom / China Unicom）的 DNS 服务器名称与 IP，证明你正在发生**严重的 DNS 泄漏**！
- 合格的防护状态下，检测结果应当全部显示为你所连接的境外代理机房或 Cloudflare/Google 的海外 DNS 服务器。`
      }
    ],
    internalLinks: '立即使用在线检测工具排查：[实用工具箱](/tools)；深入排错请阅读 [排障总览与故障诊断树](/troubleshooting/)；高品质服务商优选请看 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: 'DoH 和 DoT 有什么区别，哪个更不容易被阻断？',
        a: 'DoT 运行在独立的 853 端口上，特征明显，容易被运营商直接封锁该端口；而 DoH（DNS over HTTPS）将加密 DNS 查询混淆在普通的 443 HTTPS 流量中，防火墙无法将其与普通网页浏览区分开来，因此生存抗阻断能力更强。'
      }
    ]
  },
  {
    slug: 'rule-providers-sub',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'Clash Rule-Providers 动态规则集配置：自动更新 GeoIP 与白名单',
    description: '教你掌握 Clash 与 Mihomo 内核的高阶特性：Rule-Providers 规则集外链订阅，实现国内外流量精准自动分流、防误杀以及无需手动维护庞大规则文件的极客方案。',
    tags: ['Rule-Providers', '规则集', 'GeoIP', '自动化分流', 'Clash配置'],
    directAnswer: '传统 Clash 配置将数万行域名和 IP 规则硬编码在本地单体 YAML 文件中，不仅启动臃肿占用数倍内存，而且无法跟随互联网新域名的变化而更新；Rule-Providers 引入了模块化动态规则集概念，客户端通过订阅远程维护的高质量开源规则库（如 Loyalsoldier、ACL4SSR 等），以二进制 MRS 或精简 YAML 格式在后台定时静默增量更新，既保持了客户端的轻盈极速，又确保了流媒体、AI 与国内网银的分流永不过期。',
    sections: [
      {
        heading: '一、 生产级 Rule-Providers 配置范例',
        content: `\`\`\`yaml
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400
  ai:
    type: http
    behavior: classical
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/ai.txt"
    path: ./ruleset/ai.yaml
    interval: 86400

rules:
  - RULE-SET,reject,REJECT
  - RULE-SET,ai,AI-Services
  - GEOIP,CN,DIRECT
  - MATCH,Final-Proxy
\`\`\``
      }
    ],
    internalLinks: '规则集配置完成需搭配高质量出口节点，大模型重度用户推荐选购 [AI 生产力节点推荐](/rankings/ai-services/)；如果遇到特定软件分流错误请查阅 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: 'Rule-Providers 更新失败会导致客户端无法上网吗？',
        a: '不会。客户端在首次下载规则集后会缓存在本地硬盘上。若某次远程拉取失败，内核会自动回退沿用本地历史缓存，不影响正常的网络转发。'
      }
    ]
  },
  {
    slug: 'clash-verge-rev-guide',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: '2026 Clash Verge Rev 极客调优指南：内置内核切换与 Script 扩展',
    description: '全面解析当前 Windows 与 macOS 平台最流行的开源代理神器 Clash Verge Rev，详解从 Meta (Mihomo) 内核参数调优、TUN 驱动配置到 JavaScript 扩展脚本的高阶实战。',
    tags: ['Clash Verge Rev', 'Mihomo', '内核调优', '扩展脚本', 'Windows客户端'],
    directAnswer: 'Clash Verge Rev 采用现代化的 Tauri + Rust 框架重构，彻底摆脱了老版 Clash for Windows 的 Electron 内存泄漏与安全隐患，成为 2026 年最主流的全能桌面客户端；其核心优势在于深度整合了 Mihomo 内核的高阶特性，支持无缝切换 Alpha 预览内核、原生集成 Wintun 高性能虚拟网卡驱动，并支持通过编写 JavaScript 扩展脚本对任意服务商订阅进行无感重写与策略注入，是兼顾易用性与无限扩展性的王者级工具。',
    sections: [
      {
        heading: '一、 Verge Rev 三大必开极客优化设置',
        content: `1. **启用 TUN 模式 + 严格路由**：彻底解决命令行与游戏不走代理问题。
2. **内核模式切换至 Mihomo Alpha**：享受最新版 QUIC 与 VLESS-Reality 协议的性能补丁。
3. **开启内置轻量 DNS 劫持防护**：在 DNS 设置中选用 Fake-IP 模式，并将 Nameserver 设置为可信的海外 DoH 节点。`
      }
    ],
    internalLinks: '获取推荐导入的优质订阅节点请参考 [2026 稳定节点综合推荐榜](/rankings/best/)；遇到 Verge 启动提示端口冲突请查看 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: '老版 Clash for Windows 还能继续用吗？',
        a: '强烈建议彻底卸载。原版 CFW 已停止维护多年，不支持新一代 VLESS、Hysteria2 协议，且存在已公开的内置内核 RCE 远程执行代码安全漏洞。'
      }
    ]
  },
  {
    slug: 'singbox-inbounds-outbounds',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'Sing-box 极简配置从入门到精通：Inbounds、Outbounds 与 Router 架构',
    description: '深度剖析通用网络代理通用平台 Sing-box 的模块化底层架构，详解入站（Inbounds）、出站（Outbounds）与路由规则（Route）三大核心组件的高性能协同实战。',
    tags: ['Sing-box', 'Inbounds', 'Outbounds', 'Router架构', '模块化设计'],
    directAnswer: 'Sing-box 摒弃了过往代理软件历史遗留的沉重包袱，采用纯粹的模块化微内核架构设计；系统仅由三部分构成：负责本地流量接管的 Inbounds（支持混合端口、TUN 虚拟网卡等）、负责连接外部服务器的 Outbounds（原生支持 VLESS、Hysteria2、TUIC、Shadowsocks 等全协议），以及负责决策流量走向的 Router 规则引擎；其内存占用比 Xray 减少 60%，启动耗时低至数十毫秒，已成为移动端与软路由平台的下一代中流砥柱。',
    sections: [
      {
        heading: '一、 Sing-box 架构哲学核心拓扑图',
        content: `\`\`\`text
[ 本地网络应用 ]
       │
       ▼ (L3/L7 捕获)
[ Inbounds 入站模块 ] (Mixed-Port / TUN-Driver)
       │
       ▼ (元数据提取: 目标IP、域名、进程名)
[ Router 路由规则引擎 ] (基于 Ruleset 与 GeoIP 快速匹配)
       │
  ┌────┴───────────────────────────┐
  ▼                                ▼
[ Outbounds: 直连 (Direct) ]   [ Outbounds: 节点代理 (VLESS/Hy2) ]
\`\`\``
      }
    ],
    internalLinks: '为 Sing-box 配备高并发、低延迟的优质线路，建议阅读 [2026 稳定节点综合推荐榜](/rankings/best/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '为什么 Sing-box 客户端在 iOS 上非常省电？',
        a: '因为 Sing-box 采用了高并发零拷贝架构，且规避了冗余的数据类型反射与序列化，在处于后台待机时系统 CPU 唤醒次数降低了 80% 以上。'
      }
    ]
  },
  {
    slug: 'shadowrocket-module-rule',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'Shadowrocket 小火箭模块与场景分流：移动端低耗电配置指南',
    description: 'iOS 最强代理工具 Shadowrocket（小火箭）的深度调优指南，详解 Module 模块规则扩展、HTTPS 解密、以及按不同 Wi-Fi 场景自动切换代理策略的省电秘籍。',
    tags: ['Shadowrocket', '小火箭', 'iOS配置', '场景分流', '移动端省电'],
    directAnswer: 'Shadowrocket（小火箭）是 iOS 平台上生态最成熟的代理工具，但在默认全局配置下持续运行容易引起手机发热与后台异常耗电；通过引入现代化的【模块（Module）】机制与【场景（Scene）】策略，用户可以指定在公司特定 Wi-Fi 下自动直连、在移动蜂窝网络下仅分流 AI 与社交软件，并对国内主流应用实施 UDP 本地旁路放行，从而在享受全天候无感外网的同时，让手机续航几乎与不挂代理时完全一致。',
    sections: [
      {
        heading: '一、 小火箭续航暴增的四项核心设置',
        content: `1. **路由模式设置为“配置（Config）”**，严禁使用“代理（Proxy）”全局硬挂。
2. **在“延迟测试方法”中选用 CONNECT**，关闭高频无效的后台心跳探活。
3. **启用场景功能（Scene）**：绑定家庭或办公室 SSID，实现进门自动待机，出门自动启用。
4. **排除国内常用应用**：在规则中将微信、支付宝、网易云等高频应用设置为 DIRECT。`
      }
    ],
    internalLinks: '初次使用小火箭的新手请先阅读基础指引：[新手入门](/getting-started)；选配高速节点推荐阅读 [高性价比轻量月付榜](/rankings/budget/) 与 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '为什么小火箭在美区 App Store 售价 2.99 美元？有免费下载渠道吗？',
        a: '该软件为独立开发者开发的付费商业软件。切勿在淘宝或公共网络上使用共享 Apple ID 登录 iCloud，否则可能导致手机被他人远程锁死或敲诈。'
      }
    ]
  },
  {
    slug: 'wintun-driver-architecture',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'Wintun 驱动与 TAP 驱动性能对比：零拷贝如何让吞吐暴涨 3 倍？',
    description: '深度剖析 Windows 虚拟网卡驱动技术的演进史，详解由 WireGuard 团队研发的 Wintun 驱动如何凭借无锁环形缓冲区与零内存拷贝，彻底淘汰老旧臃肿的 TAP 驱动。',
    tags: ['Wintun', 'TAP驱动', '零拷贝', '虚拟网卡', '性能压测'],
    directAnswer: '老旧的 TAP-Windows 驱动诞生于二打一的以太网模拟时代，每一次数据包转发都需要在内核空间与用户空间之间进行多次低效的上下文切换与内存复制，在千兆带宽压测下 CPU 单核瞬间打满，吞吐量往往被卡死在 300Mbps 瓶颈；而 Wintun 驱动是由 WireGuard 专门针对现代 64 位 Windows 内核重新打造的轻量级纯 L3 驱动，它直接废弃了无用的以太网帧伪造，采用高性能无锁环形缓冲区（Ring Buffer）实现真正的零拷贝内存交换，让代理客户端轻松跑满 2.5G/10G 局域网极限速率，CPU 消耗暴降 70%。',
    sections: [
      {
        heading: '一、 Wintun 与 TAP 驱动硬核实测对比表',
        content: `| 核心指标 | 老款 TAP-Windows6 驱动 | 现代化 Wintun 驱动 (推荐) |
| :--- | :--- | :--- |
| **工作层级** | 模拟第 2 层 (L2 以太网) | 纯粹第 3 层 (L3 IP 数据报) |
| **数据拷贝机制** | 多次内核/用户空间内存复制 | 零拷贝 (Zero-copy Ring Buffer) |
| **千兆压测最高吞吐** | ~320 Mbps (CPU 单核打满 100%) | ~950+ Mbps (轻松跑满本地千兆光纤) |
| **驱动体积极限** | ~2.5 MB (包含繁琐安装组件) | < 100 KB (单个便携 DLL 即可热载入) |`
      }
    ],
    internalLinks: '要发挥 Wintun 驱动的千兆吞吐潜力，必须搭配不限速的骨干网络，详见 [第三方独立测速与回国拓扑证据库](/rankings/speed-test-logs/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '安装 Wintun 驱动需要重启 Windows 电脑吗？',
        a: '不需要。现代客户端（如 Clash Verge Rev、Sing-box）在开启 TUN 模式时会动态释放 \`wintun.dll\` 并即时挂载虚拟网卡，退出客户端时会自动无损卸载，完全无需重启系统。'
      }
    ]
  },
  {
    slug: 'tcp-bbr-congestion',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: 'TCP BBRv3 拥塞控制算法：为什么高丢包网络下速率依然稳定？',
    description: '深度解密 Google 研发的革命性 BBR 拥塞控制算法，对比传统基于丢包退避的 CUBIC 算法，解析 BBRv3 如何精准测量瓶颈带宽与往返延迟，在恶劣网络中挽救吞吐。',
    tags: ['BBRv3', '拥塞控制', 'TCP调优', '抗丢包', '内核网络'],
    directAnswer: '传统 TCP 拥塞控制算法（如 CUBIC）遵循愚蠢的“丢包即拥堵”假设，一旦在跨国链路中遭遇 5% 的非拥塞性随机丢包，算法就会粗暴地将发送速率强行砍半；而 Google 原创的 BBR 算法彻底跳出了丢包视界，它通过周期性动态探测网络的物理瓶颈带宽（BtlBw）与最小传播往返延迟（RTprop），只要管道容量未满，无论丢包率多高依然保持最高速率持续灌注，配合最新的 BBRv3 算法更能有效兼顾链路公平性，是长距离跨国高丢包网络提速的绝对利器。',
    sections: [
      {
        heading: '一、 CUBIC 与 BBR 发送策略本质差异',
        content: `CUBIC 就像一个胆小谨慎的驾驶员，路面上只要有一粒小石子（随机丢包），就立刻猛踩刹车降速到 30 码重新慢慢加速；
而 BBR 拥有车载雷达（实时测量管道容积），只要雷达探测到前面的大路依然畅通，就算偶尔有石子颠簸，依然保持 120 码巡航疾驰。`
      }
    ],
    internalLinks: '对于自建 VPS 或对线路调优感兴趣的极客，建议阅读 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)；选购已经全线部署 BBRv3 优化的商业机房请看 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '客户端本地 Windows 电脑需要安装 BBR 吗？',
        a: '不需要。TCP 拥塞控制主要作用在数据发送端（即境外 VPS 或代理服务端）。只要服务端的 Linux 系统开启了 BBR 内核模块，你在本地就能享受到极速下行加成。'
      }
    ]
  },
  {
    slug: 'linux-nftables-transparent',
    categorySlug: 'clients',
    category: '客户端分流与系统网络内核',
    title: '透明网关（旁路由）原理：Linux iptables/nftables 全局分流实操',
    description: '深入浅出剖析家庭网络软路由（旁路由）的核心底层机制，详解通过 Linux nftables/iptables 的 TPROXY 与 REDIRECT 链，如何实现全屋所有智能设备无感免配置科学上网。',
    tags: ['旁路由', '透明网关', 'nftables', 'iptables', 'TPROXY', '软路由'],
    directAnswer: '旁路由透明代理的精髓在于利用 Linux 内核强大的防火墙子系统（nftables / iptables）截获局域网发来的原始 IP 报文；通过在 \`PREROUTING\` 链中配置 TPROXY（透明代理）规则，Linux 网关能够不篡改数据包原本的目的 IP 与端口，将其无损转交给本机监听的代理程序（如 OpenClash 或 Sing-box），从而使家中的 Apple TV、PlayStation 游戏机、智能家居无需安装任何客户端软件，只需将设备网关指向旁路由 IP，即可全屋静默享受秒开外网与智能分流。',
    sections: [
      {
        heading: '一、 旁路由标准网络拓扑架构图',
        content: `\`\`\`text
[ 光猫 / 外部互联网接入 ]
        │
[ 主路由器 (192.168.1.1) ] ── (负责 PPPoE 拨号与 DHCP 下发)
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ 旁路由 (192.168.1.2) ]     [ 普通家用设备 (192.168.1.100) ]
(运行 nftables + Clash/Sing-box) (网关手动指向 192.168.1.2)
\`\`\``
      }
    ],
    internalLinks: '配置透明网关时遇到局域网打印机打不开或微信打不开等冲突，请速看针对性自救指南 [排障总览与故障诊断树](/troubleshooting/)；选购适配旁路由大并发的高清节点请看 [4K/8K 流媒体解锁榜](/rankings/streaming/)。',
    faqs: [
      {
        q: '配置旁路由会导致国内网页访问变慢吗？',
        a: '只要旁路由的 CPU 性能足够（如 N100、J4125 等 x86 软路由），且内核正确配置了国内 IP 段 DIRECT 直连规则，国内流量只是在本机多经过了一次局域网千兆转发，延迟增加通常不超过 0.5 毫秒，人体完全无法感知。'
      }
    ]
  }
];

function generateMarkdown(item) {
  let md = `---
title: "${item.title}"
description: "${item.description}"
date: "2026-10-29"
category: "${item.category}"
tags: ${JSON.stringify(item.tags)}
---

# ${item.title}

## Direct Answer（核心结论速览）

> [!IMPORTANT]
> **【核心结论 / Direct Answer】**
> ${item.directAnswer}

---

`;

  for (const s of item.sections) {
    md += `${s.heading}\n\n${s.content}\n\n`;
  }

  md += `## 核心拓扑内链与选型闭环\n\n${item.internalLinks}\n\n---\n\n`;

  md += `## 核心延伸 FAQ\n\n`;
  for (const f of item.faqs) {
    md += `### Q: ${f.q}\n\n**A:** ${f.a}\n\n`;
  }

  return md;
}

cat4Articles.forEach(item => {
  const md = generateMarkdown(item);
  fs.writeFileSync(path.join('wiki/clients', `${item.slug}.md`), md, 'utf8');
  fs.writeFileSync(path.join('docs/wiki/clients', `${item.slug}.md`), md, 'utf8');
  console.log('Written:', item.slug);
});

module.exports = cat4Articles;

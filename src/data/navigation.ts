import { MegaMenuColumn, DropdownItem } from '../types/navigation'

export interface BuyingMenuItem {
  title: string
  href: string
  description: string
  badge?: string
}

export const BUYING_GUIDE_ITEMS: BuyingMenuItem[] = [
  {
    title: '2026 节点选型完全指南',
    href: '/buying/guide/',
    description: '从协议、线路、延迟三大维度重构选型流程',
    badge: '选型流程'
  },
  {
    title: '新手选购 8 大避坑法则',
    href: '/buying/traps/',
    description: '揭秘跑路套路、虚标专线与超售内幕',
    badge: '避坑必看'
  },
  {
    title: '订阅链接连接失败排查',
    href: '/buying/subscription-issues/',
    description: '精准截流搜索“订阅更新失败/无节点”长尾流量',
    badge: '故障排查'
  },
  {
    title: '订阅周期与月付防坑策略',
    href: '/buying/payment-risk/',
    description: '强调资金安全与小额月付原则，杜绝年付风险',
    badge: '资金安全'
  },
  {
    title: '免费公益节点隐患揭秘',
    href: '/buying/free-risks/',
    description: '从安全隐私、中间人攻击角度引流转化',
    badge: '安全合规'
  },
  {
    title: '科学网络选型评估方法论',
    href: '/buying/methodology/',
    description: '展示专业评测维度，提升权威度与 E-E-A-T 权重',
    badge: '方法论'
  }
]

export const BUYING_RANKING_ITEMS: BuyingMenuItem[] = [
  {
    title: '2026 稳定节点综合推荐榜',
    href: '/rankings/best/',
    description: '主打高权重年度核心总榜，兼顾速度与稳定性',
    badge: '年度核心'
  },
  {
    title: '晚高峰抗封锁专线评测榜',
    href: '/rankings/iplc-iepl/',
    description: '深耕真实专线与晚高峰不限速真实场景',
    badge: '晚高峰专线'
  },
  {
    title: 'AI 生产力节点推荐（ChatGPT/Claude 解锁）',
    href: '/rankings/ai-services/',
    description: '精准覆盖大模型访问报错 1020/403 的高频痛点词',
    badge: 'AI提效'
  },
  {
    title: '4K/8K 流媒体解锁榜（Netflix/Disney+/YouTube）',
    href: '/rankings/streaming/',
    description: '突出原生家庭宽带住宅 IP 解锁能力',
    badge: '流媒体解锁'
  },
  {
    title: '高性价比轻量月付榜',
    href: '/rankings/budget/',
    description: '用高性价比/月付取代廉价感，提升合规与转化',
    badge: '月付优选'
  },
  {
    title: '第三方独立测速与回国拓扑证据库',
    href: '/rankings/speed-test-logs/',
    description: '附带真实压测图表，极大提高 AI 搜索引擎 GEO 引用率',
    badge: '实测证据'
  }
]

export const BUYING_DROPDOWN_ITEMS: DropdownItem[] = [
  ...BUYING_GUIDE_ITEMS,
  ...BUYING_RANKING_ITEMS
]

export interface TroubleshootingMenuItem {
  title: string
  href: string
  description: string
  badge?: string
  iconName?: string
}

export const TROUBLESHOOTING_MENU_ITEMS: TroubleshootingMenuItem[] = [
  {
    title: '排障总览与故障诊断树',
    href: '/troubleshooting/',
    description: '全景索引页：按设备、客户端与现象分类的故障决策树',
    badge: '全景决策',
    iconName: 'Activity'
  },
  {
    title: '网络分流急救综合手册',
    href: '/troubleshooting/guide/',
    description: '三层金字塔排查法：本地系统代理 -> 虚拟网卡驱动 -> 远程服务节点',
    badge: '急救手册',
    iconName: 'Wrench'
  },
  {
    title: '订阅链接无法连接与更新报错',
    href: '/buying/subscription-issues/',
    description: '截流订阅解析失败、Token 损坏与 TLS 握手超时报错',
    badge: '订阅排查',
    iconName: 'RefreshCw'
  },
  {
    title: '节点全红 Timeout 与 0ms 诊断',
    href: '/troubleshooting/timeout/',
    description: '排查节点测速机制（TCP Ping vs Real Ping）、入站阻断与失效',
    badge: '超时全红',
    iconName: 'WifiOff'
  },
  {
    title: '连通成功但网页打不开 / 无法联网',
    href: '/troubleshooting/connected-no-internet/',
    description: '排查系统代理冲突、插件劫持、系统时间偏差与环回死锁',
    badge: '高频痛点',
    iconName: 'AlertTriangle'
  },
  {
    title: 'DNS 污染劫持与真实 IP 泄漏排查',
    href: '/troubleshooting/dns-leak/',
    description: 'Fake-IP 与 Redir-Host 原理差异、DoH/DoT 加密防运营商劫持方案',
    badge: 'DNS安全',
    iconName: 'ShieldAlert'
  },
  {
    title: 'TUN 虚拟网卡模式启动断网与驱动冲突',
    href: '/troubleshooting/tun-failure/',
    description: 'Wintun 驱动崩溃、多网卡跃点优先级冲突与局域网共享失效解决',
    badge: '网卡接管',
    iconName: 'Terminal'
  },
  {
    title: '延迟低但速率极慢与视频转圈',
    href: '/troubleshooting/slow-speed-low-latency/',
    description: '揭秘 ICMP 虚标延迟、QoS 丢包限速、单线程流速不足与严重超售真相',
    badge: '限速超售',
    iconName: 'Zap'
  },
  {
    title: 'AI 访问被拒与 ChatGPT/Claude 403 阻断',
    href: '/rankings/ai-services/',
    description: '复用 AI 专线横评，提供 IP 纯净度检测与分流规则，完成商业转化',
    badge: 'AI专线',
    iconName: 'Bot'
  }
]

export const KNOWLEDGE_BASE_COLUMNS: MegaMenuColumn[] = [
  {
    id: 'protocols',
    title: '协议与加密百科',
    badgeText: '底座技术',
    description: 'VLESS Reality、Hysteria2、Trojan 伪装与 TLS JA3 指纹技术深度解构',
    iconName: 'Shield',
    bottomLink: {
      title: '查看更多协议技术 →',
      href: '/wiki/protocols/'
    },
    items: [
      { title: 'VLESS 与 VMess 深度对比 (为什么全面淘汰 VMess)', href: '/wiki/protocols/vless-vs-vmess', badge: '核心推荐', description: '解构时间戳死锁、双重加密损耗与 跨国链路边界启发式识别' },
      { title: 'VLESS-Reality 握手原理与 SNI 伪装实战', href: '/wiki/protocols/reality-handshake', badge: '零证书', description: '借用国外大型白名单大厂证书，彻底杜绝证书特征探测' },
      { title: 'Hysteria2 传输协议深度剖析 (UDP 抗 QoS)', href: '/wiki/protocols/hysteria2-udp-boost', badge: '极限提速', description: '基于 QUIC 与 Brutal 拥塞控制对抗恶劣跨境丢包与限速' },
      { title: 'Trojan 伪装真实网站原理与流量指引', href: '/wiki/protocols/trojan-gfw-resistant', description: '完全伪装为标准 HTTPS 流量，未授权自动回落至真实网站' },
      { title: 'TLS 握手指纹 (JA3/JA4) 深度科普与 uTLS 伪造', href: '/wiki/protocols/tls-fingerprint-ja3', description: '剖析 Client Hello 明文指纹，复刻原生浏览器握手签名' },
      { title: 'Shadowsocks AEAD 加密现状：主动探测下为何不安全', href: '/wiki/protocols/shadowsocks-aead', description: '纯高熵密文识别机理，由公网直连全面退守专线内部' }
    ]
  },
  {
    id: 'routes',
    title: '专线拓扑与选型',
    badgeText: '物理专线',
    description: 'IPLC/IEPL 物理专线、CN2 GIA/9929/CMI 区别与三网晚高峰选路',
    iconName: 'Network',
    bottomLink: {
      title: '查阅专线网络拓扑 →',
      href: '/wiki/routes/'
    },
    items: [
      { title: 'IPLC 与 IEPL 专线本质区别大起底', href: '/wiki/routes/iplc-vs-iepl-explained', badge: '合规跨国专线传输', description: '二层物理光缆局域网传输内幕，晚高峰丢包率小于 0.1%' },
      { title: 'CN2 GIA、联通 AS9929 与移动 CMI 实测区别', href: '/wiki/routes/cn2-gia-vs-9929-cmi', badge: '三网选路', description: '电信双向 GIA、北方联通 A 网与华南移动出海骨干网实测' },
      { title: '原生双 ISP 住宅宽带为什么是绝对刚需', href: '/wiki/routes/dual-isp-residential', badge: '防风控', description: '突破 MaxMind 与风控数据库，非广播纯净机房 IP' },
      { title: 'BGP 多线中转入口的作用与单线断网陷阱', href: '/wiki/routes/bgp-multi-cloud-entrance', description: '解决国内跨网结算瓶颈，多地 Anycast 自动故障容灾' },
      { title: 'ASN 广播与 IP 欺诈分揭秘 (识别垃圾机房 IP)', href: '/wiki/routes/asn-ip-fraud-score', description: '用 IPinfo 快速自测 Fraud Score，规避 Cloudflare 验证码' },
      { title: '跨太平洋海缆 (TPE/NCP) 物理延迟极限推导', href: '/wiki/routes/submarine-cable-latency', description: '光纤折射率决定的理论下限，戳破 50ms 中美直连假延迟' }
    ]
  },
  {
    id: 'unblocking',
    title: 'AI 与流媒体解锁',
    badgeText: 'AI与流媒体',
    description: 'ChatGPT 403 破解、Claude 1020 防封、Netflix 原生住宅解锁实操',
    iconName: 'Bot',
    bottomLink: {
      title: '查阅解锁与防封指南 →',
      href: '/wiki/unblocking/'
    },
    items: [
      { title: 'ChatGPT 403 Forbidden 与 Cloudflare 拦截破解', href: '/wiki/unblocking/chatgpt-403-forbidden', badge: '403急救', description: '彻底消除 Access Denied 报错，纯净住宅节点与分流配置' },
      { title: 'Claude 1020 阻断与大面积封号本质防范', href: '/wiki/unblocking/claude-1020-account-ban', badge: '防封号', description: 'Anthropic 四重交叉风控检测破除，避免账号被封' },
      { title: 'Netflix 为什么只能看自制剧？非自制剧破解', href: '/wiki/unblocking/netflix-home-broadband', badge: '住宅解锁', description: '解锁非自制全球独家版权，家庭宽带 DNS 原生流媒体劫持' },
      { title: '大模型 SSE 流式输出频繁断流原因分析与 TCP 调优', href: '/wiki/unblocking/openai-sse-stream-timeout', description: '打字机生成一半卡死报错，Keep-Alive 与缓冲机制调优' },
      { title: 'WebRTC 真实公网 IP 泄漏攻防排查指南', href: '/wiki/unblocking/webrtc-ip-leakage-prevent', description: '防止浏览器 STUN 绕过系统代理泄露国内真实内网与公网 IP' },
      { title: 'Disney+ 报错 Error 83 / 73 排查与版权锁定', href: '/wiki/unblocking/disney-error-83-fix', description: 'Widevine L1 DRM 数字版权认证与落地节点支持' }
    ]
  },
  {
    id: 'faq',
    title: '高频 FAQ 与内核',
    badgeText: 'FAQ与内核',
    description: 'TUN 模式断网急救、Fake-IP 原理、防跑路征兆识别与月付避坑',
    iconName: 'HelpCircle',
    bottomLink: {
      title: '全景百科与 FAQ 库 →',
      href: '/wiki/'
    },
    items: [
      { title: 'TUN 虚拟网卡与系统代理本质区别 (L3接管)', href: '/wiki/clients/tun-mode-vs-system-proxy', badge: '网卡接管', description: '接管命令行、Git、Steam 游戏与 Telegram 的底层内核科普' },
      { title: 'Fake-IP 模式 vs Redir-Host 模式原理对比', href: '/wiki/clients/fake-ip-vs-redir-host', badge: '防DNS污染', description: '首包零延迟发出，彻底免疫国内运营商 DNS 污染' },
      { title: '【FAQ】如何一眼识别机场跑路前兆？', href: '/wiki/faq/airport-runaway-signs', badge: '防跑路', description: '群禁言、超低价终身传家宝大促背后的资金链断裂规律' },
      { title: '【FAQ】节点全部显示红字 Timeout 排查自救', href: '/wiki/faq/node-all-timeout-reasons', badge: '全红急救', description: '系统时间偏差、安全软件误杀与订阅过期五步排除' },
      { title: '【FAQ】为什么避坑社反复强调新手坚持月付？', href: '/wiki/faq/why-choose-monthly-pay', badge: '月付铁律', description: '拒绝年付被割韭菜，把风险降至一杯奶茶钱' },
      { title: '【FAQ】节点延迟 20ms 但打开网页极慢原因', href: '/wiki/faq/low-ping-slow-speed', description: 'ICMP 抢答假延迟、跨国海缆微丢包与单线程限速真相' }
    ]
  }
]

export interface ToolsDropdownItem {
  title: string
  href: string
  description: string
  badge?: string
  iconName?: string
}

export const TOOLS_TUTORIAL_ITEMS: ToolsDropdownItem[] = [
  {
    title: 'Windows 配置指南（Clash Verge / Sing-box）',
    href: '/tools/tutorials/#windows',
    description: 'Mihomo 核心内核、TUN 虚拟网卡模式、开机自启与全局路由',
    badge: '主流推荐',
    iconName: 'Laptop'
  },
  {
    title: 'macOS 苹果电脑教程（Verge / Stash）',
    href: '/tools/tutorials/#macos',
    description: 'Apple Silicon 原生架构、特权助手安装、规则分流与住宅代理',
    badge: 'M芯片适配',
    iconName: 'Apple'
  },
  {
    title: 'iOS 小火箭与 Stash 安装配置指南',
    href: '/tools/tutorials/#ios',
    description: '美区 Apple ID 获取、扫码一键订阅导入、按需连接与策略组分流',
    badge: '移动首选',
    iconName: 'Smartphone'
  },
  {
    title: 'Android 安卓客户端分流指南',
    href: '/tools/tutorials/#android',
    description: 'FlClash / v2rayNG / Sing-box，分应用代理绕行与省电低功耗',
    badge: '分应用代理',
    iconName: 'Bot'
  },
  {
    title: 'Apple TV 与软路由旁路分流指南',
    href: '/tools/tutorials/#tv',
    description: 'tvOS 17+ 原生支持与 OpenWrt / PassWall 全局透明网关配置',
    badge: '全屋透明',
    iconName: 'Tv'
  }
]

export const TOOLS_UTILITY_ITEMS: ToolsDropdownItem[] = [
  {
    title: '通用订阅格式转换工具',
    href: '/tools/#converter',
    description: '一键将通用节点链接转换为 Clash / Sing-box / Surge 专用规则配置',
    badge: '在线生成',
    iconName: 'RefreshCw'
  },
  {
    title: '真实出口 IP 纯净度与欺诈分检测',
    href: '/tools/#ip-check',
    description: '深度排查出口机房原生属性、双 ISP 住宅归属与 Fraud Score 欺诈分',
    badge: '风控自查',
    iconName: 'ShieldCheck'
  },
  {
    title: '客户端 DNS 泄漏与 WebRTC 安全自检',
    href: '/tools/#dns-leak',
    description: '防止浏览器 STUN 穿透与本地运营商 DNS 污染，确保物理 IP 零外泄',
    badge: '防侧漏',
    iconName: 'ShieldAlert'
  }
]


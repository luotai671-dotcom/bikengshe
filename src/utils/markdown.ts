import { marked } from 'marked'

export interface ParsedMarkdown {
  html: string
  headings: Array<{
    id: string
    text: string
    level: number
  }>
}

export interface TopicClusterRule {
  id: string
  keywords: string[]
  href: string
  title: string
  category: string
  categoryGroup: 'concepts' | 'clients' | 'vps' | 'handbook' | 'tools'
  relationNote: string
}

export const TOPIC_CLUSTER_RULES: TopicClusterRule[] = [
  // ==========================================
  // 【基础概念】 (Topic Cluster Pillar: Concepts)
  // ==========================================
  {
    id: 'routes-explained',
    keywords: ['线路科普', 'IPLC 专线', 'IPLC专线', 'IEPL 专线', 'IEPL专线', 'BGP 中转', '公网中转', '直连线路'],
    href: '/kb/concepts/routes-explained',
    title: '线路科普：直连、中转、IPLC 专线全方位解析',
    category: '基础概念',
    categoryGroup: 'concepts',
    relationNote: '深入理解网络物理拓扑、晚高峰拥堵与跨国路由震荡期稳定性'
  },
  {
    id: 'protocols-explained',
    keywords: ['协议科普', '代理协议演进', 'Shadowsocks 协议', 'VMess 协议', 'Trojan 协议', '代理协议'],
    href: '/kb/concepts/protocols-explained',
    title: '网络代理协议全方位科普：从 SS 到 Reality',
    category: '基础概念',
    categoryGroup: 'concepts',
    relationNote: '详解协议加密特征、握手开销与抗主动探测博弈历程'
  },
  {
    id: 'speed-test-guide',
    keywords: ['测速指南', '网络测速', '吞吐测速', '丢包率测试', 'Jitter 抖动', 'Jitter抖动'],
    href: '/kb/concepts/speed-test-guide',
    title: '网络测速指南：看懂下行带宽与真实丢包',
    category: '基础概念',
    categoryGroup: 'concepts',
    relationNote: '科学区分 ICMP Ping 延迟与高吞吐真实多线程带宽表现'
  },
  {
    id: 'glossary',
    keywords: ['名词解释', '网络术语解释', 'Fake-IP 模式', 'Fake-IP', 'DNS 污染', '分流规则'],
    href: '/kb/concepts/glossary',
    title: '科学上网与网络工程核心名词解释',
    category: '基础概念',
    categoryGroup: 'concepts',
    relationNote: '新手到进阶网络工程术语与核心概念全量汇总'
  },

  // ==========================================
  // 【客户端教程】 (Topic Cluster: Clients)
  // ==========================================
  {
    id: 'clash-verge-windows',
    keywords: ['Clash Verge Rev (Windows)', 'Clash Verge Rev Windows', 'Clash Verge Rev', 'Clash Verge 客户端', 'Clash Windows'],
    href: '/kb/clients/clash-verge-windows',
    title: 'Clash Verge Rev (Windows) 完整配置指南',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '新一代 Windows 平台主流开源客户端，自带 TUN 虚拟网卡'
  },
  {
    id: 'clash-verge-macos',
    keywords: ['Clash Verge Rev (macOS)', 'Clash Verge Mac', 'Clash macOS'],
    href: '/kb/clients/clash-verge-macos',
    title: 'Clash Verge Rev (macOS) 使用教程',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '适配 Apple Silicon 芯片的高性能低内存 Mac 客户端'
  },
  {
    id: 'clash-tun-mode',
    keywords: ['Clash TUN 模式', 'TUN 模式接管', 'TUN 模式', 'TUN模式', '虚拟网卡接管', '虚拟网卡模式', 'Service Mode 服务模式'],
    href: '/kb/clients/clash-tun-mode',
    title: 'Clash TUN 模式虚拟网卡接管详解',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '接管系统所有网络流量，解决终端与外服竞技游戏绕过代理'
  },
  {
    id: 'clash-import',
    keywords: ['Clash 订阅导入', 'Clash订阅导入', '订阅导入与更新', '订阅导入更新', '订阅配置导入'],
    href: '/kb/clients/clash-import',
    title: 'Clash 订阅导入与更新全流程',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '一键导入与订阅配置安全防泄漏实践'
  },
  {
    id: 'shadowrocket-guide',
    keywords: ['Shadowrocket 小火箭', 'Shadowrocket小火箭', 'Shadowrocket (iOS)', 'Shadowrocket 客户端', '小火箭客户端', 'Shadowrocket'],
    href: '/kb/clients/shadowrocket-guide',
    title: 'Shadowrocket 小火箭 (iOS) 全方位指南',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '苹果 iOS 平台最普及好用、支持全协议的规则代理工具'
  },
  {
    id: 'shadowrocket-apple-id',
    keywords: ['美区 Apple ID', '美区账号注册', 'Shadowrocket 下载与美区账号'],
    href: '/kb/clients/shadowrocket-apple-id',
    title: 'Shadowrocket 下载与美区账号获取指南',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '手把手教你免信用卡注册美区账号与正版下载'
  },
  {
    id: 'shadowrocket-import',
    keywords: ['Shadowrocket 订阅导入', '小火箭订阅导入', '小火箭扫码导入'],
    href: '/kb/clients/shadowrocket-import',
    title: 'Shadowrocket 订阅导入与分流配置',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '扫码与 URL 极速导入，配置智能分流规则'
  },
  {
    id: 'ios-clients-comparison',
    keywords: ['iOS 客户端对比', 'iOS 代理客户端对比', 'iOS 代理客户端选型', 'iOS客户端对比'],
    href: '/kb/clients/ios-clients-comparison',
    title: 'iOS 代理客户端全方位对比与选型指南',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '小火箭 vs Loon vs Quantumult X vs Surge 深度横评'
  },
  {
    id: 'android-clients-comparison',
    keywords: ['Android 客户端对比', '安卓代理客户端对比', '安卓客户端对比', 'Android 客户端选型'],
    href: '/kb/clients/android-clients-comparison',
    title: 'Android 客户端对比：选型与兼容性分析',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: 'FlClash vs v2rayNG vs Clash Meta 架构与功耗评测'
  },
  {
    id: 'flclash-android',
    keywords: ['FlClash Android', 'FlClash 教程', 'FlClash'],
    href: '/kb/clients/flclash-android',
    title: 'FlClash Android 极简配置教程',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: 'Material You 设计风格，无广告极简 Clash 客户端'
  },
  {
    id: 'v2rayng-android',
    keywords: ['v2rayNG Android', 'v2rayNG 教程', 'v2rayNG'],
    href: '/kb/clients/v2rayng-android',
    title: 'v2rayNG Android 教程与进阶配置',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '经典老牌全协议支持的 Android 客户端神器'
  },
  {
    id: 'custom-clients',
    keywords: ['机场专用客户端', '定制客户端'],
    href: '/kb/clients/custom-clients',
    title: '机场专用客户端与订阅使用注意事项',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '专用客户端便捷性与安全性权衡分析'
  },
  {
    id: 'clash-party',
    keywords: ['Clash Party', 'Clash Party 客户端'],
    href: '/kb/clients/clash-party',
    title: 'Clash Party 使用与节点配置教程',
    category: '客户端教程',
    categoryGroup: 'clients',
    relationNote: '现代化优雅界面的跨平台代理工具'
  },

  // ==========================================
  // 【VPS 自建 & 骨干线路】 (Topic Cluster: VPS)
  // ==========================================
  {
    id: 'vless-reality',
    keywords: ['VLESS Reality 搭建', 'VLESS Reality', 'Reality 协议', 'Reality协议', 'VLESS-Reality', 'Xray Reality'],
    href: '/kb/vps/vless-reality',
    title: 'VLESS Reality 搭建与反探测配置指南',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '免自备域名、直接借用大厂合法证书反主动探测'
  },
  {
    id: 'cn2-9929-cmi-diff',
    keywords: ['电信 CN2 GIA', 'CN2 GIA', '联通 9929', '联通9929', '移动 CMIN2', '移动 CMI', 'AS4837', 'AS4809', 'AS9929', 'AS58453'],
    href: '/kb/vps/cn2-9929-cmi-diff',
    title: '2026 最新节点线路 CN2 GIA、9929、CMI 区别与选购全景指南',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '三大运营商国际骨干网回程实测、晚高峰丢包与真伪鉴别'
  },
  {
    id: 'hysteria2-setup',
    keywords: ['Hysteria2 搭建', 'Hysteria2 协议', 'Hysteria2', 'Hysteria 2', '歇斯底里2'],
    href: '/kb/vps/hysteria2-setup',
    title: 'Hysteria2 极速搭建与配置指南',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '基于 UDP 的暴力抗丢包极速跨境协议，恶劣网络救星'
  },
  {
    id: 'sing-box-setup',
    keywords: ['sing-box 搭建', 'sing-box 服务端', 'sing-box', 'Sing-Box'],
    href: '/kb/vps/sing-box-setup',
    title: 'sing-box 通用核心服务端搭建指南',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '新一代多协议通用核心，高吞吐低资源消耗'
  },
  {
    id: 'soft-router-proxy',
    keywords: ['软路由与全屋代理', '全屋代理分流', '软路由分流', '软路由', '旁路由', 'OpenClash'],
    href: '/kb/vps/soft-router-proxy',
    title: '软路由与全屋代理分流拓扑配置',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '家庭局域网多设备无感分流，Apple TV/主机游戏全覆盖'
  },
  {
    id: 'vps-ip-blocked',
    keywords: ['VPS IP 被墙', 'IP 被墙', 'IP被墙', 'IP 阻断', 'TCP 阻断'],
    href: '/kb/vps/vps-ip-blocked',
    title: 'VPS IP 被墙排障与连通性检测',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '端口连通性检测、解封换 IP 与 CDN 反代急救'
  },
  {
    id: 'vps-guide',
    keywords: ['自建 VPS 指南', '自建 VPS', '自建VPS'],
    href: '/kb/vps/vps-guide',
    title: '自建 VPS 指南：机房选型与运维常识',
    category: 'VPS 自建',
    categoryGroup: 'vps',
    relationNote: '主流云厂商、线路延迟与安全防火墙最佳实践'
  },

  // ==========================================
  // 【参考手册 & 工具】 (Topic Cluster: Handbook & Tools)
  // ==========================================
  {
    id: 'faq',
    keywords: ['常见问答 FAQ', '高频疑难解答', '常见问答', '节点变红超时'],
    href: '/guide/faq/',
    title: '常见问答 FAQ：高频疑难杂症速查',
    category: '参考手册',
    categoryGroup: 'handbook',
    relationNote: '时间校准、节点红、超时与流媒体受阻一站式排错'
  },
  {
    id: 'security-privacy',
    keywords: ['安全与隐私防护', 'DNS 泄漏防护', 'DNS 泄漏', 'DNS泄漏', 'WebRTC 泄露', 'WebRTC泄露'],
    href: '/kb/handbook/security-privacy',
    title: '安全与隐私防护：防泄漏全指南',
    category: '参考手册',
    categoryGroup: 'handbook',
    relationNote: '杜绝真实家庭 IP 暴露，配置纯净 DNS 与防追踪'
  },
  {
    id: 'compliance-law',
    keywords: ['机场合规与法律', '合规与法律风险', '网络安全法合规'],
    href: '/kb/handbook/compliance-law',
    title: '网络合规与法律风险防范手册',
    category: '参考手册',
    categoryGroup: 'handbook',
    relationNote: '学术开发与技术跨境研究的安全边界与自保底线'
  },
  {
    id: 'isp-detection',
    keywords: ['运营商检测与应对', '运营商 QoS 限速', '运营商限速', 'UDP 封锁'],
    href: '/kb/handbook/isp-detection',
    title: '运营商检测与应对：破解限速与阻断',
    category: '参考手册',
    categoryGroup: 'handbook',
    relationNote: 'SNI 探测、UDP QoS 降速特征与针对性规避'
  },
  {
    id: 'site-directory',
    keywords: ['网站导航', '站点导航精选'],
    href: '/kb/handbook/site-directory',
    title: '网络技术优质站点与社区导航',
    category: '参考手册',
    categoryGroup: 'handbook',
    relationNote: '开源规则集、测速站与极客社区精选'
  },
  {
    id: 'tools',
    keywords: ['实用在线工具箱', '在线工具箱', '订阅格式转换', '订阅转换'],
    href: '/tools',
    title: '实用在线工具箱：订阅转换与隐私检测',
    category: '网络工具',
    categoryGroup: 'tools',
    relationNote: '多客户端格式互转与真实网络环境深度体检'
  },
  {
    id: 'troubleshoot',
    keywords: ['综合故障排查诊断', '综合故障排查', '故障排查手册', '故障排查'],
    href: '/troubleshoot',
    title: '综合故障排查诊断手册',
    category: '故障排查',
    categoryGroup: 'tools',
    relationNote: '分层排除法四步解决 95% 无法上网与断流问题'
  },
  {
    id: 'buying',
    keywords: ['服务商选购指南', '选购避坑原则', '节点选购指南', '选购指南'],
    href: '/buying',
    title: '服务商选购指南：避坑原则与横向对比',
    category: '选购指南',
    categoryGroup: 'tools',
    relationNote: '月付体验原则、晚高峰真实丢包鉴别与性价比测算'
  }
]

export function parseMarkdown(markdown: string, currentPath: string = ''): ParsedMarkdown {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const seenIds = new Map<string, number>()

  // 1. Inject Topic Cluster Internal Links contextually
  const linkedMarkdown = injectTopicClusterLinks(markdown, currentPath)

  // 2. Pre-process callouts (GitHub style alerts)
  const processedMarkdown = linkedMarkdown.replace(
    />\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*(?:\n|$))*)/gi,
    (match, type, content) => {
      const calloutType = type.toUpperCase()
      const lines = content
        .split('\n')
        .map((l: string) => l.replace(/^>\s?/, ''))
        .join('\n')
        .trim()

      let icon = 'ℹ️'
      let title = '提示'
      let borderClass = 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-950 dark:text-blue-100'

      if (calloutType === 'TIP') {
        icon = '💡'
        title = '小技巧 / 优化建议'
        borderClass = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 text-zinc-900 dark:text-zinc-100'
      } else if (calloutType === 'NOTE') {
        icon = '📝'
        title = '说明与背景'
        borderClass = 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/30 text-zinc-900 dark:text-zinc-100'
      } else if (calloutType === 'WARNING') {
        icon = '⚠️'
        title = '注意事项'
        borderClass = 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/30 text-zinc-900 dark:text-zinc-100'
      } else if (calloutType === 'IMPORTANT') {
        icon = '⚡'
        title = '核心结论 / Direct Answer'
        borderClass = 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-zinc-950 dark:text-zinc-50'
      } else if (calloutType === 'CAUTION') {
        icon = '🛑'
        title = '高风险警告'
        borderClass = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/30 text-zinc-900 dark:text-zinc-100'
      }

      let parsedLines = ''
      try {
        parsedLines = marked.parse(lines, { gfm: true }) as string
      } catch (_) {
        parsedLines = lines
      }

      return `<div class="my-6 p-4 sm:p-5 rounded-2xl border-l-4 ${borderClass} shadow-sm">
  <div class="font-extrabold flex items-center gap-2 mb-2 text-[14.5px] text-zinc-950 dark:text-white">
    <span>${icon}</span>
    <span>${title}</span>
  </div>
  <div class="text-[14.5px] leading-7 font-normal text-zinc-800 dark:text-zinc-200">${parsedLines}</div>
</div>\n`
    }
  )

  // 3. Configure marked custom renderer
  const renderer = new marked.Renderer()

  // Inline code styling
  renderer.codespan = ({ text }: any) => {
    const cleanText = String(text || '').replace(/^\\+|\\+$/g, '')
    return `<code class="px-1.5 py-0.5 mx-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[12.5px] border border-zinc-200/60 dark:border-zinc-700/60">${cleanText}</code>`
  }

  // Smart link handler: protects internal links, converts probe URLs to code tags, safely opens external links
  renderer.link = ({ href, title, text }: any) => {
    let cleanHref = String(href || '').trim()
    // Strip abnormal trailing backslashes or encoded backslashes
    cleanHref = cleanHref.replace(/\\`|%5C%60|\\/g, '')

    // If it is a test/probe URL (e.g. generate_204), render as inline code rather than a dead/unreachable link
    if (cleanHref.includes('generate_204') || cleanHref.includes('telnet://')) {
      return `<code class="px-1.5 py-0.5 mx-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">${cleanHref}</code>`
    }

    const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''

    // Internal link
    if (cleanHref.startsWith('/') || cleanHref.startsWith('#')) {
      return `<a href="${cleanHref}"${titleAttr} class="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">${text}</a>`
    }

    // Normal external link
    return `<a href="${cleanHref}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">${text}</a>`
  }

  renderer.heading = ({ tokens, depth }) => {
    const rawText = tokens.map(t => t.raw).join('')
    const cleanText = rawText.replace(/[*_`]/g, '')
    
    let id = cleanText
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\-_]+/g, '-')
      .replace(/^-+|-+$/g, '') || `heading-${headings.length}`

    const count = seenIds.get(id) || 0
    seenIds.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`

    if (depth === 2 || depth === 3) {
      headings.push({ id, text: cleanText, level: depth })
    }

    if (depth === 1) {
      return `<h1 class="text-2.5xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-800">${cleanText}</h1>`
    } else if (depth === 2) {
      const matchNum = cleanText.match(/^(\d{2})\s+(.+)$/)
      if (matchNum) {
        return `<h2 id="${id}" class="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">${matchNum[1]}</span>
          <span>${matchNum[2]}</span>
          <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity text-sm ml-1" aria-label="Anchor link">#</a>
        </h2>`
      }
      return `<h2 id="${id}" class="group flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        <span>${cleanText}</span>
        <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity text-sm ml-1" aria-label="Anchor link">#</a>
      </h2>`
    } else if (depth === 3) {
      const matchNum = cleanText.match(/^(\d{2})\s+(.+)$/)
      if (matchNum) {
        return `<h3 id="${id}" class="group flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 mt-7 mb-3">
          <span class="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs text-zinc-600 dark:text-zinc-400 font-medium">${matchNum[1]}</span>
          <span>${matchNum[2]}</span>
          <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity text-xs ml-1" aria-label="Anchor link">#</a>
        </h3>`
      }
      return `<h3 id="${id}" class="group flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 mt-7 mb-3">
        <span>${cleanText}</span>
        <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity text-xs ml-1" aria-label="Anchor link">#</a>
      </h3>`
    }
    return `<h${depth} class="font-bold my-4">${cleanText}</h${depth}>`
  }

  // Pre-process tables with marked v12+ token parsing with bulletproof cell fallback
  renderer.table = function (token: any) {
    const parseCellSafely = (cell: any): string => {
      if (cell === null || cell === undefined) return ''
      if (typeof cell === 'string') return cell
      if (typeof cell === 'number') return String(cell)
      if ((this as any).parser && typeof (this as any).parser.parseInline === 'function' && Array.isArray(cell.tokens)) {
        try {
          const res = (this as any).parser.parseInline(cell.tokens)
          if (typeof res === 'string') return res
        } catch (_) {}
      }
      if (typeof cell.text === 'string') return cell.text
      if (typeof cell.raw === 'string') return cell.raw
      if (typeof cell.value === 'string') return cell.value
      return ''
    }

    let headerHtml = ''
    if (Array.isArray(token.header)) {
      headerHtml = '<tr>' + token.header.map((cell: any) => {
        const content = parseCellSafely(cell)
        return `<th class="p-3 font-semibold text-zinc-900 dark:text-zinc-100">${content}</th>`
      }).join('') + '</tr>'
    } else if (typeof token.header === 'string') {
      headerHtml = token.header
    }

    let bodyHtml = ''
    if (Array.isArray(token.rows)) {
      bodyHtml = token.rows.map((row: any) => {
        return '<tr>' + row.map((cell: any) => {
          const content = parseCellSafely(cell)
          return `<td class="p-3 border-t border-zinc-200 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300">${content}</td>`
        }).join('') + '</tr>'
      }).join('')
    } else if (typeof token.rows === 'string') {
      bodyHtml = token.rows
    }

    return `<div class="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <table class="w-full text-left text-sm border-collapse">
        <thead class="bg-zinc-100/90 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-semibold border-b border-zinc-200 dark:border-zinc-800">${headerHtml}</thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>`
  }

  // Pre-process code blocks
  renderer.code = ({ text, lang }) => {
    const language = lang || 'text'
    return `<div class="relative group my-5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 shadow-md overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400 select-none">
        <div class="flex items-center gap-2">
          <span class="font-mono uppercase font-semibold text-[11px] tracking-wider text-emerald-400">${language}</span>
        </div>
        <button onclick="navigator.clipboard.writeText(this.closest('.relative').querySelector('code').innerText);this.innerText='已复制';setTimeout(()=>this.innerText='复制',2000)" class="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors cursor-pointer">
          复制
        </button>
      </div>
      <pre class="p-4 overflow-x-auto text-[13px] leading-6 font-mono text-zinc-200 m-0"><code>${escapeHtml(text)}</code></pre>
    </div>`
  }

  // Pre-process links to ensure security and compliance
  renderer.link = ({ href, title, text }) => {
    const isAffLink = href.startsWith('/go/') || href.startsWith('/go.html')
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    const titleAttr = title ? ` title="${title}"` : ''

    if (isAffLink) {
      return `<a href="${href}"${titleAttr} target="_blank" rel="nofollow sponsored noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">${text}</a>`
    }
    if (isExternal) {
      return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer nofollow" class="text-emerald-600 dark:text-emerald-400 hover:underline">${text}</a>`
    }
    return `<a href="${href}"${titleAttr} class="text-emerald-600 dark:text-emerald-400 hover:underline">${text}</a>`
  }

  const rawHtml = marked.parse(processedMarkdown, { renderer, gfm: true }) as string

  return {
    html: rawHtml,
    headings
  }
}

/**
 * Intelligent Topic Cluster Link Injector:
 * - Scans markdown text
 * - Protects headings (^#{1,6}\s+...) so TOC and heading IDs stay clean and valid
 * - Protects code blocks (``` and `), existing markdown links [text](url), and HTML tags
 * - Bypasses self-referential links (currentPath === rule.href)
 * - Sorts keywords by length descending so compound keywords match before substrings
 * - Automatically turns the FIRST occurrence of a topic keyword into a natural, contextual internal link anchor
 * - Limits to 1 link per target URL per article to prevent over-optimization
 */
export function injectTopicClusterLinks(markdown: string, currentPath: string): string {
  const normalizedCurrent = currentPath.replace(/\/$/, '')

  // Split content by code blocks, headings, existing links to protect them
  const protectedSegments: string[] = []
  const placeholderPrefix = '___TOPIC_CLUSTER_TOKEN_'
  let index = 0

  // 1. Code blocks (multiline)
  // 2. Inline code
  // 3. Headings (starts with #)
  // 4. Markdown links & images [text](url) or ![alt](url)
  // 5. HTML tags <...>
  const combinedProtectionRegex = /(```[\s\S]*?```|`[^`\r\n]+`|^#{1,6}\s+[^\r\n]+|!?\[[^\]\r\n]*\]\([^\)\r\n]*\)|<[^>]+>)/gm

  const maskedText = markdown.replace(combinedProtectionRegex, (match) => {
    const token = `${placeholderPrefix}${index++}___`
    protectedSegments.push(match)
    return token
  })

  // Build sorted list of keyword entries (longest first)
  interface FlatKeywordEntry {
    keyword: string
    rule: TopicClusterRule
  }

  const flatEntries: FlatKeywordEntry[] = []
  for (const rule of TOPIC_CLUSTER_RULES) {
    const rulePath = rule.href.replace(/\/$/, '')
    if (rulePath === normalizedCurrent) continue

    for (const kw of rule.keywords) {
      flatEntries.push({ keyword: kw, rule })
    }
  }

  // Sort descending by keyword length
  flatEntries.sort((a, b) => b.keyword.length - a.keyword.length)

  // Track applied target URLs to only link to each page ONCE per article
  const linkedTargetUrls = new Set<string>()
  const appliedKeywords = new Set<string>()

  let result = maskedText

  for (const entry of flatEntries) {
    const { keyword, rule } = entry
    const rulePath = rule.href.replace(/\/$/, '')

    if (linkedTargetUrls.has(rulePath)) continue
    if (appliedKeywords.has(keyword)) continue

    const escaped = escapeRegex(keyword)
    // Match standalone keyword not surrounded by English alphanumeric/underscore
    const regex = new RegExp(`(?<![A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`, 'i')

    if (regex.test(result)) {
      result = result.replace(regex, (m) => {
        linkedTargetUrls.add(rulePath)
        appliedKeywords.add(keyword)
        return `[${m}](${rule.href} "${rule.title}")`
      })
    }
  }

  // Restore protected segments
  for (let i = 0; i < protectedSegments.length; i++) {
    const token = `${placeholderPrefix}${i}___`
    result = result.replace(token, () => protectedSegments[i])
  }

  return result
}

/**
 * Intelligent Cross-Category Topic Cluster Recommendation:
 * For any given article, returns a 4-quadrant set of related topic cluster recommendations:
 * 1) 💡 基础概念 (Concepts)
 * 2) 💻 客户端实践 (Clients)
 * 3) 🚀 骨干线路与 VPS 自建 (VPS)
 * 4) 🛠️ 参考手册与排障 (Handbook/Tools)
 */
export function getRelatedTopicCluster(currentPath: string, currentCategoryGroup: string = ''): TopicClusterRule[] {
  const normalized = currentPath.replace(/\/$/, '')

  const concepts = TOPIC_CLUSTER_RULES.filter(r => r.categoryGroup === 'concepts' && r.href.replace(/\/$/, '') !== normalized)
  const clients = TOPIC_CLUSTER_RULES.filter(r => r.categoryGroup === 'clients' && r.href.replace(/\/$/, '') !== normalized)
  const vps = TOPIC_CLUSTER_RULES.filter(r => r.categoryGroup === 'vps' && r.href.replace(/\/$/, '') !== normalized)
  const handbook = TOPIC_CLUSTER_RULES.filter(r => (r.categoryGroup === 'handbook' || r.categoryGroup === 'tools') && r.href.replace(/\/$/, '') !== normalized)

  const selected: TopicClusterRule[] = []

  // Ensure 1 from each major pillar for full cross-category Link Equity
  if (currentCategoryGroup === 'concepts') {
    // Concepts page: recommend 2 Clients + 1 VPS + 1 Handbook
    if (clients[0]) selected.push(clients[0]) // Clash Verge Rev Windows
    if (clients[4]) selected.push(clients[4]) // Shadowrocket iOS
    if (vps[1]) selected.push(vps[1])         // CN2 GIA / 9929 / CMI
    if (handbook[0]) selected.push(handbook[0]) // FAQ
  } else if (currentCategoryGroup === 'clients') {
    // Clients page: recommend 1 Concept + 1 VPS + 1 Sibling Client + 1 Handbook
    if (concepts[0]) selected.push(concepts[0]) // 线路科普
    if (vps[0]) selected.push(vps[0])           // VLESS Reality
    if (clients[2]) selected.push(clients[2])   // TUN 模式
    if (handbook[0]) selected.push(handbook[0]) // FAQ
  } else if (currentCategoryGroup === 'vps') {
    // VPS page: recommend 1 Concept + 1 Client + 1 Sibling VPS + 1 Handbook
    if (concepts[0]) selected.push(concepts[0]) // 线路科普
    if (clients[0]) selected.push(clients[0])   // Clash Verge Rev Windows
    if (vps[0] && vps[0].href.replace(/\/$/, '') !== normalized) selected.push(vps[0])
    else if (vps[1]) selected.push(vps[1])
    if (handbook[1]) selected.push(handbook[1]) // 安全与隐私
  } else {
    // Handbook/Tools page: recommend 1 Concept + 1 Client + 1 VPS + 1 FAQ
    if (concepts[0]) selected.push(concepts[0])
    if (clients[0]) selected.push(clients[0])
    if (vps[0]) selected.push(vps[0])
    if (handbook[0]) selected.push(handbook[0])
  }

  // Fill up to 4 if needed
  while (selected.length < 4) {
    const fallback = TOPIC_CLUSTER_RULES.find(r => r.href.replace(/\/$/, '') !== normalized && !selected.includes(r))
    if (!fallback) break
    selected.push(fallback)
  }

  return selected.slice(0, 4)
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

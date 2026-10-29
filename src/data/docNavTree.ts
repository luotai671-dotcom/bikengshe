export interface DocNavItem {
  title: string
  href: string
  badge?: string
  description?: string
}

export interface DocNavCategory {
  id: string
  title: string
  iconName?: string
  items: DocNavItem[]
}

export const DOC_NAV_CATEGORIES: DocNavCategory[] = [
  {
    id: 'intro',
    title: '入门主路径',
    iconName: 'Compass',
    items: [
      { title: '新手配置极简上手', href: '/getting-started', badge: '新手必读' },
      { title: '5分钟极速上手指引', href: '/guide/quick-start/', badge: '快速入门' },
      { title: '选型决策全景指南', href: '/guide/selection/', badge: '选型核心' },
      { title: '多端配置上手指南', href: '/guide/clients/', badge: '全端覆盖' },
      { title: '场景化方案筛选器', href: '/guide/solution-picker/', badge: '场景匹配' },
      { title: '避坑原则与防骗指南', href: '/guide/avoid-scams/', badge: '避坑必看' },
      { title: '线路特征与网络分析', href: '/guide/line-analysis/' },
      { title: '隐私防范与安全基线', href: '/guide/security-privacy/' }
    ]
  },
  {
    id: 'clients',
    title: '客户端教程',
    iconName: 'Laptop',
    items: [
      { title: 'Clash 订阅导入全流程', href: '/kb/clients/clash-import', badge: '导入指引' },
      { title: '机场专用客户端与订阅', href: '/kb/clients/custom-clients' },
      { title: 'Clash Verge Rev (Windows)', href: '/kb/clients/clash-verge-windows', badge: 'Win首选' },
      { title: 'Clash Verge Rev (macOS)', href: '/kb/clients/clash-verge-macos', badge: 'Mac首选' },
      { title: 'Clash Party 使用与迁移', href: '/kb/clients/clash-party' },
      { title: 'Shadowrocket 小火箭 (iOS)', href: '/kb/clients/shadowrocket-guide', badge: 'iOS必装' },
      { title: 'Shadowrocket 下载与美区账号', href: '/kb/clients/shadowrocket-apple-id' },
      { title: 'Shadowrocket 订阅导入', href: '/kb/clients/shadowrocket-import' },
      { title: 'iOS 客户端对比', href: '/kb/clients/ios-clients-comparison' },
      { title: 'Android 客户端对比', href: '/kb/clients/android-clients-comparison' },
      { title: 'FlClash Android 教程', href: '/kb/clients/flclash-android', badge: 'Material' },
      { title: 'v2rayNG Android 教程', href: '/kb/clients/v2rayng-android' },
      { title: 'Clash TUN 模式详解', href: '/kb/clients/clash-tun-mode', badge: '接管必备' }
    ]
  },
  {
    id: 'buying',
    title: '选购机场',
    iconName: 'ShoppingBag',
    items: [
      { title: '2026 节点选型完全指南', href: '/buying/guide/', badge: '选型流程' },
      { title: '新手选购 8 大避坑法则', href: '/buying/traps/', badge: '防坑必看' },
      { title: '订阅链接连接失败排查', href: '/buying/subscription-issues/', badge: '故障排错' },
      { title: '订阅周期与月付防坑策略', href: '/buying/payment-risk/', badge: '资金安全' },
      { title: '免费公益节点隐患揭秘', href: '/buying/free-risks/' },
      { title: '科学网络选型评估方法论', href: '/buying/methodology/' }
    ]
  },
  {
    id: 'rankings',
    title: '机场榜单',
    iconName: 'Award',
    items: [
      { title: '2026 稳定节点综合推荐榜', href: '/rankings/best/', badge: '年度总榜' },
      { title: '晚高峰抗封锁专线评测榜', href: '/rankings/iplc-iepl/', badge: '晚高峰专线' },
      { title: '高性价比轻量月付榜', href: '/rankings/budget/', badge: '月付优选' },
      { title: '第三方独立测速证据库', href: '/rankings/speed-test-logs/', badge: '实测证据' }
    ]
  },
  {
    id: 'concepts',
    title: '基础概念',
    iconName: 'Lightbulb',
    items: [
      { title: '2026 主流协议选型指南', href: '/kb/concepts/protocols-explained', badge: '重磅必读' },
      { title: '专线内幕科普 (IPLC/IEPL)', href: '/kb/concepts/routes-explained' },
      { title: 'CN2 GIA / 9929 / CMI 区别', href: '/kb/vps/cn2-9929-cmi-diff', badge: '骨干线路' },
      { title: '真实测速方案：延迟与跑分', href: '/kb/concepts/speed-test-guide' },
      { title: '核心网络工程名词速查', href: '/kb/concepts/glossary' }
    ]
  },
  {
    id: 'ai',
    title: 'AI 访问',
    iconName: 'Bot',
    items: [
      { title: 'AI 生产力节点推荐 (ChatGPT/Claude)', href: '/rankings/ai-services/', badge: '解锁专线' }
    ]
  },
  {
    id: 'streaming',
    title: '流媒体解锁',
    iconName: 'Tv',
    items: [
      { title: '4K/8K 流媒体解锁榜 (Netflix/Disney+)', href: '/rankings/streaming/', badge: '住宅原生' }
    ]
  },
  {
    id: 'vps',
    title: 'VPS 自建',
    iconName: 'Server',
    items: [
      { title: '轻量 VPS 搭建 Reality 生产环境', href: '/kb/vps/vless-reality', badge: '防封必备' },
      { title: 'Hysteria2 极速搭建与端口跳跃', href: '/kb/vps/hysteria2-setup', badge: '抗丢包' },
      { title: 'Sing-Box 全协议自建服务端', href: '/kb/vps/sing-box-setup' },
      { title: '家庭网络软路由 / 透明代理图解', href: '/kb/vps/soft-router-proxy' },
      { title: 'VPS IP 被封诊断与弹性换 IP', href: '/kb/vps/vps-ip-blocked' },
      { title: '新手海外 VPS 选购指南', href: '/kb/vps/vps-guide' }
    ]
  },
  {
    id: 'troubleshoot',
    title: '排障症状',
    iconName: 'Activity',
    items: [
      { title: '排障总览与故障诊断树', href: '/troubleshooting/', badge: '决策全树' },
      { title: '网络分流急救综合手册', href: '/troubleshooting/guide/', badge: '三层模型' },
      { title: '节点全红 Timeout 与 0ms 诊断', href: '/troubleshooting/timeout/', badge: '超时全红' },
      { title: '连通成功但网页打不开 / 无法联网', href: '/troubleshooting/connected-no-internet/', badge: '连上无网' },
      { title: 'DNS 污染劫持与真实 IP 泄漏排查', href: '/troubleshooting/dns-leak/', badge: 'DNS安全' },
      { title: 'TUN 虚拟网卡模式启动断网与驱动冲突', href: '/troubleshooting/tun-failure/', badge: '网卡接管' },
      { title: '延迟低但速率极慢与视频转圈', href: '/troubleshooting/slow-speed-low-latency/', badge: '限速超售' },
      { title: '综合排障症状速查字典', href: '/troubleshoot' }
    ]
  },
  {
    id: 'handbook',
    title: '参考手册',
    iconName: 'BookOpen',
    items: [
      { title: '隐私保护与防泄漏规范', href: '/kb/handbook/security-privacy', badge: '安全防线' },
      { title: '新手高频避坑疑问速查 FAQ', href: '/guide/faq/', badge: '高频答疑' },
      { title: '跨境网络加速法律法规自保红线', href: '/kb/handbook/compliance-law' },
      { title: '本地运营商劫持与 QoS 检测', href: '/kb/handbook/isp-detection' },
      { title: '全网精选导航索引与实用工具箱', href: '/tools', badge: '工具合集' },
      { title: '网站全局目录索引', href: '/kb/handbook/site-directory' }
    ]
  }
]

export interface ClientTutorial {
  id: string
  platform: 'windows' | 'macos' | 'ios' | 'android' | 'tv' | 'router-linux'
  platformName: string
  name: string
  tagline: string
  rating: number // 1-5
  audienceBadge: string // e.g. "小白首选" | "极客必备" | "主力推荐"
  badgeColor?: 'emerald' | 'blue' | 'amber' | 'purple'
  tags: string[]
  coreEngine: string
  officialDownload: {
    title: string
    url: string
    hint: string
    versionTip: string
  }
  step1Download: {
    title: string
    desc: string
    notes?: string[]
  }
  step2Import: {
    title: string
    desc: string
    subSteps: string[]
    recommendedProviderText: string
  }
  step3Settings: {
    title: string
    desc: string
    switches: Array<{
      name: string
      action: '必开' | '推荐' | '可选'
      reason: string
    }>
  }
  step4Troubleshooting: {
    title: string
    items: Array<{
      q: string
      a: string
      link?: string
    }>
  }
}

export interface PlatformTab {
  id: 'windows' | 'macos' | 'ios' | 'android' | 'tv' | 'router-linux'
  name: string
  iconName: string
  badge: string
  count: number
}

export const PLATFORM_TABS: PlatformTab[] = [
  { id: 'windows', name: 'Windows 电脑', iconName: 'Laptop', badge: '桌面主力', count: 3 },
  { id: 'macos', name: 'macOS 苹果电脑', iconName: 'Apple', badge: 'M系列原生', count: 3 },
  { id: 'ios', name: 'iOS 苹果手机/iPad', iconName: 'Smartphone', badge: '小火箭首选', count: 3 },
  { id: 'android', name: 'Android 安卓端', iconName: 'Bot', badge: '分应用代理', count: 3 },
  { id: 'tv', name: 'TV & Apple TV', iconName: 'Tv', badge: '家庭大屏', count: 2 },
  { id: 'router-linux', name: '软路由 & Linux', iconName: 'Server', badge: '全屋透明', count: 2 },
]

export const CLIENT_TUTORIALS: ClientTutorial[] = [
  // ==========================================
  // 1. Windows 端精选
  // ==========================================
  {
    id: 'clash-verge-windows',
    platform: 'windows',
    platformName: 'Windows',
    name: 'Clash Verge Rev (Windows)',
    tagline: '基于 Tauri + Mihomo 核心的新一代 Windows 桌面王者，原生支持 TUN 虚拟网卡与全协议',
    rating: 5,
    audienceBadge: '强烈推荐 · 小白与极客首选',
    badgeColor: 'emerald',
    tags: ['Mihomo核心', 'TUN虚拟网卡', 'Script脚本扩展', '低内存占用'],
    coreEngine: 'Mihomo (Clash.Meta)',
    officialDownload: {
      title: 'GitHub 官方最新 Release 正版发布页',
      url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
      hint: '认准官方开源仓库，绝不使用任何第三方论坛修改版或包含加速插件的二次打包安装包。',
      versionTip: '建议下载 Clash.Verge_x.x.x_x64-setup.exe（64位 Windows 推荐标准安装包）'
    },
    step1Download: {
      title: '第一步：下载安装与运行时准备',
      desc: '从官方 Releases 下载安装包并完成系统安装。若弹出 Windows Defender 拦截，点击“更多信息 -> 仍要运行”即可。',
      notes: [
        '如果开启 TUN 模式提示缺少依赖，软件会自动提示下载安装 Wintun 驱动，点击“允许”即可。',
        '建议在软件“设置 (Settings)”中将语言切换为“简体中文”，并将外观设置为跟随系统或深色模式。'
      ]
    },
    step2Import: {
      title: '第二步：一键导入订阅节点',
      desc: '在订阅管理页面一键载入你的服务商订阅链接：',
      subSteps: [
        '首先在你的服务商控制台复制 Clash 订阅链接（或直接点击“一键导入 Clash”）。',
        '打开 Clash Verge Rev，在左侧导航栏点击【订阅 (Profiles)】。',
        '在顶部输入框粘贴订阅 URL，点击右侧【导入 (Import)】按钮。',
        '导入成功后，鼠标右键点击该订阅卡片，选择【使用 (Use)】将其激活为当前生效配置。'
      ],
      recommendedProviderText: '若尚未购买可靠订阅，可在 [2026 稳定梯子选购直通车](/rankings/best/) 选择支持一键导入的高速服务，或参考 [高性价比轻量月付榜](/rankings/budget/)。'
    },
    step3Settings: {
      title: '第三步：推荐核心开关与极客调优',
      desc: '在主界面或设置面板中配置以下关键选项，享受极致顺畅的外网体验：',
      switches: [
        { name: '系统代理 (System Proxy)', action: '必开', reason: '接管 Chrome、Edge、Firefox 等主流浏览器的网页外网访问流量。' },
        { name: 'TUN 模式 (Tun Mode)', action: '必开', reason: '以虚拟网卡形式接管 PowerShell、Git、游戏进程与 Telegram 等不走系统代理的软件。' },
        { name: '开机自启 (Start with Windows)', action: '推荐', reason: '电脑开机静默在后台启动，无需每次手动打开。' },
        { name: '静默启动 (Silent Start)', action: '推荐', reason: '开机启动时自动最小化到系统托盘，不弹窗打扰日常操作。' },
        { name: '严格路由 (Strict Route)', action: '可选', reason: '防止 WebRTC 与系统物理网卡侧漏，杜绝本地真实 IP 被大模型和流媒体探测。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '开启 TUN 模式后电脑突然无法上网，网页全部转圈？', a: '通常为多网卡路由跃点冲突或 Wintun 驱动损坏导致。先关闭系统代理和 TUN 模式，进入设置重新安装服务模式 (Service Mode)，详见排障指南。', link: '/troubleshooting/tun-failure/' },
        { q: '导入订阅后所有节点测速全红 Timeout？', a: '先核对 Windows 操作系统时间是否与北京时间一致（误差不得超过 60 秒），若时间正常请检查套餐是否过期。', link: '/troubleshooting/timeout/' },
        { q: '节点延迟很低，但打开 YouTube 视频一直缓冲？', a: '说明遇到了虚假 ICMP 抢答节点或晚高峰单线程限速，建议切换至专线节点或参阅排查章节。', link: '/troubleshooting/slow-speed-low-latency/' }
      ]
    }
  },
  {
    id: 'singbox-windows',
    platform: 'windows',
    platformName: 'Windows',
    name: 'Sing-box for Windows',
    tagline: '纯粹模块化设计的通用代理平台，单进程内存仅 20MB，极客开发者与高性能服务器首选',
    rating: 4.5,
    audienceBadge: '极客首选 · 极致轻量',
    badgeColor: 'purple',
    tags: ['模块化内核', 'Rule-Set规则集', '极低内存', '纯净开源'],
    coreEngine: 'Sing-box Core',
    officialDownload: {
      title: 'SagerNet 官方 GitHub 正版发布页',
      url: 'https://github.com/SagerNet/sing-box/releases',
      hint: '下载 Windows amd64 版本的图形客户端或命令行核心。',
      versionTip: '建议选用 sing-box-windows-amd64.zip 或第三方基于其打包的精简 GUI。'
    },
    step1Download: {
      title: '第一步：下载解压与目录规范',
      desc: '解压至无中文字符与空格的固定目录（如 D:\\Tools\\sing-box），将可执行文件加入环境变量或使用 GUI 外壳启动。',
      notes: [
        'Sing-box 官方注重通用核心，推荐搭配 GUI 前端（如 Sing-box Windows GUI）使用以获得最佳体验。'
      ]
    },
    step2Import: {
      title: '第二步：配置文件载入',
      desc: 'Sing-box 使用 JSON 语法组织配置，包含 Inbounds、Outbounds 与 Route 三大模块：',
      subSteps: [
        '在服务商后台直接导出 Sing-box 格式订阅或使用在线工具箱转换为 Sing-box JSON。',
        '将生成的 config.json 放置于运行目录下，或在图形客户端直接粘贴 URL 拉取。',
        '启动内核，控制台将输出启动日志并监听混合入站端口（默认 2080）。'
      ],
      recommendedProviderText: '选购提供原生 Sing-box 订阅的服务商，免除二次转换烦恼，详见 [2026 稳定梯子选购直通车](/rankings/best/)。'
    },
    step3Settings: {
      title: '第三步：推荐配置优化项',
      desc: '在 config.json 的 route 模块中配置自动规则集：',
      switches: [
        { name: 'TUN 驱动配置', action: '必开', reason: '在 inbounds 中配置 type: "tun"，配合 auto_route: true 获得全局加速。' },
        { name: 'Rule-Set 动态规则', action: '必开', reason: '采用官方二进制 srs 格式规则集，大幅提升毫秒级路由匹配速度。' },
        { name: 'Clash API 仪表盘', action: '推荐', reason: '配置 experimental.clash_api，即可使用 yacd 或 metacubexd 网页端可视化选点。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '启动提示 JSON syntax error 或找不到 outbound？', a: '说明订阅转换时的 JSON 格式存在语法错误或缺少默认 match 规则，建议使用 [实用工具箱](/tools) 校验。', link: '/tools' },
        { q: '命令行终端无法连接外网？', a: '检查环境变量是否缺少 HTTP_PROXY 设置，或者开启 Sing-box 的 TUN 虚拟网卡模式。', link: '/troubleshooting/connected-no-internet/' }
      ]
    }
  },
  {
    id: 'v2rayn-windows',
    platform: 'windows',
    platformName: 'Windows',
    name: 'v2rayN (Windows)',
    tagline: 'Windows 平台资历最深、受众最广的经典客户端，多 Core 内核自由切换与订阅快速更新',
    rating: 4.5,
    audienceBadge: '老牌稳健 · 多内核支持',
    badgeColor: 'blue',
    tags: ['Xray双内核', 'VLESS-Reality', '多订阅管理', '快捷托盘'],
    coreEngine: 'Xray-core / Sing-box',
    officialDownload: {
      title: '2dust 官方 GitHub Release 发布页',
      url: 'https://github.com/2dust/v2rayN/releases',
      hint: '建议下载带 Core 完整内核的发布包（v2rayN-With-Core.zip），解压即用无需单独配置内核。',
      versionTip: '必须从作者 2dust 官方仓库下载，切勿在各类第三方软件站下载附带推广软件的版本。'
    },
    step1Download: {
      title: '第一步：解压与初次运行',
      desc: '解压软件包到非系统保护目录，双击 v2rayN.exe 运行，软件将自动最小化在系统右下角托盘图标中。',
      notes: [
        '如果双击无法启动，说明电脑缺少 .NET 8.0 Desktop Runtime，按弹窗提示前往微软官网安装即可。'
      ]
    },
    step2Import: {
      title: '第二步：添加订阅与更新节点',
      desc: '通过订阅管理添加服务商链接：',
      subSteps: [
        '复制服务商后台提供的 V2Ray/Xray 订阅链接。',
        '打开 v2rayN 界面，点击顶部菜单栏【订阅分组 -> 订阅分组设置】。',
        '点击“添加”，在“可选地址 (url)”一栏粘贴你的订阅链接，别名随意填写后点击确定。',
        '返回主界面，点击顶部菜单【订阅分组 -> 更新全部订阅 (不通过代理)】，节点列表将瞬间刷新。',
        '选中任一高速节点，按回车键（Enter）或右键选择“设为主活动服务器”。'
      ],
      recommendedProviderText: '挑选低延迟晚高峰不限速专线服务，请参考 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。'
    },
    step3Settings: {
      title: '第三步：系统代理与路由模式选择',
      desc: '在主界面最底部状态栏进行代理模式切换：',
      switches: [
        { name: '自动配置系统代理', action: '必开', reason: '底部状态栏选择“自动配置系统代理”，图标变红即代表代理成功启动。' },
        { name: '路由模式：绕过大陆 (绕过大陆/黑名单)', action: '必开', reason: '实现国外网站走代理、国内网页直连保速，避免访问微信或网银被风控。' },
        { name: '开启 TUN 模式', action: '可选', reason: '顶部菜单开启 TUN 模式可接管终端命令行及外服联机游戏流量。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '更新订阅提示“基础连接已经关闭”或“未能解析此远程名称”？', a: '说明本地网络解析服务商订阅域名超时。可先开启临时代理再更新，或参阅订阅更新排障章节。', link: '/buying/subscription-issues/' },
        { q: '切换节点后依然无法上网，图标变红网页打不开？', a: '排查 Windows 系统代理端口是否被其他软件占用（默认 10809），检查系统时间同步。', link: '/troubleshooting/connected-no-internet/' }
      ]
    }
  },

  // ==========================================
  // 2. macOS 苹果电脑端
  // ==========================================
  {
    id: 'clash-verge-macos',
    platform: 'macos',
    platformName: 'macOS',
    name: 'Clash Verge Rev (macOS)',
    tagline: 'Apple Silicon (M1/M2/M3/M4) 原生适配，特权助手无感提权与高颜值多端统一配置',
    rating: 5,
    audienceBadge: 'Mac 强烈推荐 · M系列原生',
    badgeColor: 'emerald',
    tags: ['Apple Silicon', 'TUN增强模式', 'Mihomo核心', '沉浸式UI'],
    coreEngine: 'Mihomo (Universal)',
    officialDownload: {
      title: 'GitHub 官方最新 Release 正版发布页',
      url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
      hint: 'M1/M2/M3/M4 系列 Mac 电脑请下载 aarch64.dmg，Intel 处理器下载 x64.dmg。',
      versionTip: '例如：Clash.Verge_x.x.x_aarch64.dmg'
    },
    step1Download: {
      title: '第一步：拖拽安装与系统安全放行',
      desc: '打开 dmg 镜像，将 Clash Verge 图标拖入 Applications（应用程序）文件夹。',
      notes: [
        '如果打开时提示“来自无法确认的开发者”，进入 macOS【系统设置 -> 隐私与安全性】，滑到最底部点击“仍要打开”。'
      ]
    },
    step2Import: {
      title: '第二步：订阅导入与节点切换',
      desc: '在 Mac 端快速完成订阅载入：',
      subSteps: [
        '在服务商后台复制订阅链接。',
        '在 Clash Verge Rev 左侧菜单点击【订阅】，粘贴 URL 并点击【导入】。',
        '选中导入成功的订阅配置，右键设为启用。',
        '在【代理】面板中，展开“节点选择”策略组，点击挑选你想要连接的地区（如香港、日本）。'
      ],
      recommendedProviderText: '推荐搭配支持原生流媒体与大模型解锁的高速订阅，详见 [AI 生产力节点推荐](/rankings/ai-services/)。'
    },
    step3Settings: {
      title: '第三步：特权助手安装与 TUN 增强模式',
      desc: 'macOS 拥有严格的沙盒机制，必须安装特权助手才能完全发挥网卡级接管能力：',
      switches: [
        { name: '安装特权助手 (Service Mode)', action: '必开', reason: '在设置中点击安装并输入 Mac 锁屏密码授权，赋予客户端内核创建虚拟网卡的权限。' },
        { name: '开启 TUN 模式 (Tun Mode)', action: '必开', reason: '接管 Mac 终端 Terminal、Homebrew、Docker 及第三方未配置代理的应用。' },
        { name: '开机自启 (Launch at Login)', action: '推荐', reason: '确保每次打开电脑即刻享受无感高速网络。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: 'Mac 开启代理后 Wi-Fi 图标显示感叹号或提示无网络？', a: '属于典型 DNS 回环冲突。进入设置检查是否开启了系统自带的“专网代理 (Private Relay)”，如有冲突请关闭苹果私密转送。', link: '/troubleshooting/connected-no-internet/' },
        { q: 'Terminal 终端运行 brew 或 curl 依然不走代理？', a: '确保在 Clash Verge 设置中成功安装了特权助手并开启 TUN 模式，或者在 .zshrc 中配置 export http_proxy。', link: '/troubleshooting/tun-failure/' }
      ]
    }
  },
  {
    id: 'stash-mac',
    platform: 'macos',
    platformName: 'macOS',
    name: 'Stash for Mac',
    tagline: '深度遵循 iOS 规则哲学的精美 Mac 客户端，图表级流量监控与多策略组嵌套切换',
    rating: 4.8,
    audienceBadge: '美观典雅 · 规则神器',
    badgeColor: 'purple',
    tags: ['仪表盘监控', 'Clash规则兼容', '按需连接', '全协议'],
    coreEngine: 'Stash Core',
    officialDownload: {
      title: 'Stash 官方网站及 TestFlight 发布页',
      url: 'https://stash.ws/',
      hint: '可通过 Mac App Store 购买下载，或在官网获取独立 DMG 安装包。',
      versionTip: '与 iOS 端 Stash 账号互通，支持 iCloud 同步配置。'
    },
    step1Download: {
      title: '第一步：安装授权与初始向导',
      desc: '安装完成后启动应用，首次启动会提示安装 Network Extension（系统网络扩展），输入密码允许。',
      notes: ['Stash 采用原生 macOS 现代视觉语言，支持将实时网络上下行速率嵌入菜单栏。']
    },
    step2Import: {
      title: '第二步：导入配置与策略组呈现',
      desc: '支持通过远程 URL 或本地文件导入：',
      subSteps: [
        '点击左侧【配置】选项卡，选择【从 URL 下载】。',
        '粘贴你的商业专线订阅地址，点击下载解析。',
        'Stash 将自动为你生成多维度的策略组：AI 工具走美国、流媒体走住宅、国内网站自动直连。'
      ],
      recommendedProviderText: '挑选全面兼容 Stash 策略分流的品牌，请查看 [2026 稳定梯子选购直通车](/rankings/best/)。'
    },
    step3Settings: {
      title: '第三步：按需连接与增强功能',
      desc: '深度挖掘 Stash 的专属能力：',
      switches: [
        { name: '增强模式 (Enhanced Mode)', action: '必开', reason: '接管系统所有应用层流量，杜绝任何数据包旁路泄露。' },
        { name: '域名嗅探 (Domain Sniffing)', action: '必开', reason: '针对无 SNI 报文还原出真实域名，确保精准匹配分流规则。' },
        { name: '菜单栏实时网络指示器', action: '推荐', reason: '在顶部菜单栏一目了然监控当前节点往返延迟与瞬时下载速度。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '提示“未能安装网络扩展扩展”？', a: '打开 Mac 系统设置，在隐私与安全性中找到系统扩展，点击“允许 Stash”并重新启动软件。', link: '/troubleshooting/tun-failure/' }
      ]
    }
  },
  {
    id: 'singbox-gui-macos',
    platform: 'macos',
    platformName: 'macOS',
    name: 'Sing-box GUI (macOS)',
    tagline: '基于 Swift 原生打造的轻巧客户端，深色主题高度集成，为极客开发者量身定制',
    rating: 4.5,
    audienceBadge: '原生极简 · 开发者首选',
    badgeColor: 'blue',
    tags: ['SwiftUI打造', '零冗余开销', 'Universal通用架构', 'QUIC支持'],
    coreEngine: 'Sing-box Native',
    officialDownload: {
      title: 'Mac App Store 或 GitHub Releases',
      url: 'https://github.com/SagerNet/sing-box/releases',
      hint: '搜索 sing-box-darwin-universal 或从 Mac App Store 搜索 sing-box 安装。',
      versionTip: '官方提供免费开源版本，完全无任何内置商业广告。'
    },
    step1Download: {
      title: '第一步：获取与系统权限申请',
      desc: '直接通过 App Store 或 GitHub 下载安装，赋予后台驻留与网络配置修改权限。',
      notes: ['内存占用仅在 15~25MB 之间，即使在 8GB 内存的 MacBook Air 上全天候运行也完全无感。']
    },
    step2Import: {
      title: '第二步：添加 Profile 配置',
      desc: '在 Profile 标签页添加你的订阅：',
      subSteps: [
        '点击右上角【+】号，选择【New Profile】。',
        '类型选择【Remote】，粘贴服务商提供的 Sing-box 订阅链接。',
        '设置 Auto Reload 间隔为 1 天，点击 Save 并启动连接。'
      ],
      recommendedProviderText: '多端通用订阅选型参考：[高性价比轻量月付榜](/rankings/budget/)。'
    },
    step3Settings: {
      title: '第三步：网络路由参数校验',
      desc: '确保以下配置项处于启用状态：',
      switches: [
        { name: 'Network Extension', action: '必开', reason: '依赖 macOS 原生网络扩展框架接管全系统流量。' },
        { name: 'Strict Route', action: '推荐', reason: '防止系统在切换 Wi-Fi 与移动热点时出现 DNS 污染泄露。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '连接后无法解析外部域名？', a: '检查配置中的 dns 模块，确保指定了诸如 1.1.1.1 或 8.8.8.8 等有效的境外可信 DoH 服务器。', link: '/troubleshooting/dns-leak/' }
      ]
    }
  },

  // ==========================================
  // 3. iOS 苹果手机/平板端
  // ==========================================
  {
    id: 'shadowrocket-ios',
    platform: 'ios',
    platformName: 'iOS',
    name: 'Shadowrocket（小火箭）',
    tagline: 'iOS 生态装机量第一的绝对霸主，支持扫码秒导、全局与规则分流自由切换',
    rating: 5,
    audienceBadge: 'iOS 最普及 · 必装神器',
    badgeColor: 'emerald',
    tags: ['扫码导入', '美区App Store', '低耗电', '场景分流'],
    coreEngine: 'Shadowrocket Core',
    officialDownload: {
      title: '美区 App Store 官方正版下载页 (售价 $2.99)',
      url: 'https://apps.apple.com/app/shadowrocket/id932747118',
      hint: '由于大陆 App Store 已下架，必须登录海外区（如美区、港区）Apple ID 购买下载。',
      versionTip: '谨防山寨钓鱼 App！认准开发者名称为“Shadow Launch Technology Limited”。'
    },
    step1Download: {
      title: '第一步：准备美区 Apple ID 并下载',
      desc: '千万不要在系统设置（iCloud）登录陌生公共账号，防止手机被锁！',
      notes: [
        '正确操作：打开【App Store】商店 -> 点击右上角头像 -> 滑到最底部点击【退出登录】。',
        '在 App Store 内登录你的美区 Apple ID，搜索“Shadowrocket”，付费 2.99 美元（或兑换码）完成下载。',
        '下载完毕后立即退出该海外账号，换回你原本的大陆 Apple ID，已安装的小火箭终身可正常更新使用。'
      ]
    },
    step2Import: {
      title: '第二步：一键导入订阅或扫码添加',
      desc: '支持通过二维码扫描或订阅链接导入：',
      subSteps: [
        '方式一（扫码）：点击小火箭主界面左上角【扫描】图标，直接扫描服务商后台的节点二维码。',
        '方式二（链接）：点击右上角【+】号，类型选择【Subscribe】，在 URL 栏粘贴你的订阅链接，点击右上角【保存】。',
        '保存后小火箭会自动从云端拉取几百条高速节点列表，呈现各区域延迟排序。'
      ],
      recommendedProviderText: '挑选专为小火箭优化的大带宽服务商，详见 [2026 稳定梯子选购直通车](/rankings/best/)。'
    },
    step3Settings: {
      title: '第三步：全局路由与省电优化',
      desc: '首次连接时系统会弹窗提示“Shadowrocket 想添加 VPN 配置”，点击【允许】并输入 iPhone 锁屏密码：',
      switches: [
        { name: '全局路由：配置 (Config)', action: '必开', reason: '务必选择“配置”模式！国内网站直接走蜂窝直连保速，国外网站自动走代理，切勿选“代理”模式。' },
        { name: '自动更新订阅 (Auto Update)', action: '必开', reason: '在“设置 -> 订阅”中开启“打开应用时更新”，确保节点 IP 与域名永不过期。' },
        { name: '测速方式：CONNECT', action: '推荐', reason: '在设置中将延迟测试方法改为 CONNECT，测试真实跨国往返延迟，杜绝虚假 ICMP 抢答。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '小火箭右上角开关已打开（出现 VPN 标志），但依然打不开 Twitter/Google？', a: '先在节点列表中任意点击勾选一个带有具体国家名称的节点（有小黄点标识），然后检查延迟测试是否全部超时。', link: '/troubleshooting/connected-no-internet/' },
        { q: '在淘宝购买的共享美区 ID 会导致手机被远程锁死吗？', a: '只要严格遵循“仅在 App Store 内登录，绝对不在手机设置 iCloud 登录”，就不会有任何锁机风险。详见 [共享 Apple ID 安全避坑科普](/wiki/faq/shared-apple-id-safety)。', link: '/wiki/faq/shared-apple-id-safety' }
      ]
    }
  },
  {
    id: 'stash-ios',
    platform: 'ios',
    platformName: 'iOS',
    name: 'Stash (iOS)',
    tagline: '基于 Clash 规则架构的 iOS 高颜值代理神机，支持按需连接与极其精细的大模型分流',
    rating: 4.8,
    audienceBadge: '规则控首选 · 完美兼容Clash',
    badgeColor: 'purple',
    tags: ['按需连接', 'Clash规则', '精美UI', '流媒体解锁'],
    coreEngine: 'Stash Core for iOS',
    officialDownload: {
      title: '美区 App Store 官方正版下载页 (售价 $3.99)',
      url: 'https://apps.apple.com/app/stash-rule-based-proxy/id1596063349',
      hint: '需在美区或其他海外 App Store 搜索购买。',
      versionTip: '与 Mac 端互通，拥有当前 iOS 最美观的现代设计风格。'
    },
    step1Download: {
      title: '第一步：下载与 VPN 授权',
      desc: '在海外 App Store 完成购买下载，首次点击启动按钮时授权系统 VPN 描述文件配置。',
      notes: ['原生支持针对不同 Wi-Fi SSID 自动切换连接状态（回家自动直连、出门自动代理）。']
    },
    step2Import: {
      title: '第二步：添加 Clash 订阅',
      desc: '原生直接读取 Clash YAML 订阅文件，完全无需繁琐的订阅转换：',
      subSteps: [
        '在服务商控制台复制标准的 Clash 订阅链接。',
        '打开 Stash，点击底部【配置】标签，选择【从 URL 下载】。',
        '粘贴链接下载成功后，在首页切换策略组即可畅享。'
      ],
      recommendedProviderText: '高性价比月付订阅推荐：[高性价比轻量月付榜](/rankings/budget/)。'
    },
    step3Settings: {
      title: '第三步：按需连接 (On-Demand) 调优',
      desc: '在设置中开启 On-Demand：',
      switches: [
        { name: '按需连接 (On-Demand)', action: '必开', reason: '系统息屏待机时不产生无效发热，唤醒屏幕瞬间秒级重连。' },
        { name: 'DNS 劫持防泄漏', action: '必开', reason: '强制使用 Fake-IP 与内部 DoH 解析，杜绝运营商窥探。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: 'ChatGPT 或 Claude 频繁提示 403 阻断？', a: '在 Stash 策略组中将 OpenAI 域名分流单独绑定至原生双 ISP 住宅美国节点，详见 [大模型风控攻防百科](/wiki/unblocking/chatgpt-403-forbidden)。', link: '/wiki/unblocking/chatgpt-403-forbidden' }
      ]
    }
  },
  {
    id: 'loon-ios',
    platform: 'ios',
    platformName: 'iOS',
    name: 'Loon / Quantumult X',
    tagline: 'iOS 进阶极客的终极瑞士军刀，支持 JS 脚本自动化重写、MitM 证书解密与去广告',
    rating: 4.7,
    audienceBadge: '硬核极客 · 脚本自动化',
    badgeColor: 'blue',
    tags: ['JS脚本重写', 'MitM解密', '节点节点聚合', '分流去广告'],
    coreEngine: 'Loon / Quantumult X Engine',
    officialDownload: {
      title: '美区 App Store 官方正版下载页',
      url: 'https://apps.apple.com/us/app/loon/id1372230715',
      hint: '需使用海外 Apple ID 购买（售价约 $5.99）。',
      versionTip: '适合有一定网络基础、追求脚本自动化与高级规则的进阶用户。'
    },
    step1Download: {
      title: '第一步：下载安装与 CA 根证书配置',
      desc: '安装软件并在“配置 -> 证书管理”中生成专属的本地 CA 证书，若需 MitM 解密还需在 iOS 设置中手动勾选完全信任。',
      notes: ['若仅作为日常科学上网代理，无需配置证书解密功能。']
    },
    step2Import: {
      title: '第二步：订阅节点分流集绑定',
      desc: '通过订阅管理添加外部节点库与分流规则库：',
      subSteps: [
        '进入订阅界面，添加服务商提供的聚合订阅。',
        '绑定开源分流规则集（如分流去广告、流媒体定向落地）。',
        '开启主开关，长按底部策略节点随时切换出口。'
      ],
      recommendedProviderText: '参考榜单挑选支持高并发企业专线：[晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。'
    },
    step3Settings: {
      title: '第三步：核心功能开关',
      desc: '极客推荐参数设定：',
      switches: [
        { name: '自动测速优选', action: '必开', reason: '在策略组中启用 URL-Test，自动切换至当前往返延迟最低的健康节点。' },
        { name: 'UDP 转发与 QUIC 穿透', action: '必开', reason: '满足外服移动端游戏极速联机与 HTTP/3 网页加速。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '开启代理后部分国内 App 图片加载缓慢？', a: '检查分流规则列表中是否误将国内 CDN 域名匹配到了 REJECT 或代理策略组，调整规则优先级。', link: '/troubleshooting/dns-leak/' }
      ]
    }
  },

  // ==========================================
  // 4. Android 安卓移动端
  // ==========================================
  {
    id: 'clash-meta-android',
    platform: 'android',
    platformName: 'Android',
    name: 'Clash Meta for Android (CMFA) / FlClash',
    tagline: 'Material You 动态设计安卓客户端，支持分应用绕行、UDP 转发与原生 VLESS-Reality',
    rating: 5,
    audienceBadge: '安卓首选 · 界面现代',
    badgeColor: 'emerald',
    tags: ['Material You', '分应用代理', 'Meta内核', '低功耗'],
    coreEngine: 'Mihomo (Clash.Meta)',
    officialDownload: {
      title: 'GitHub 官方最新 Release APK 下载页 (FlClash / CMFA)',
      url: 'https://github.com/chen08209/FlClash/releases',
      hint: '若 CMFA 上游归档受限，统一推荐使用全新多端现代架构的 FlClash 官方最新 Release。',
      versionTip: '推荐下载 FlClash-xxx-android-arm64-v8a.apk（主流 64 位安卓机型）。'
    },
    step1Download: {
      title: '第一步：下载与安装安全设置',
      desc: '在手机浏览器中下载 APK 文件并安装。若系统提示“禁止安装未知来源应用”，在设置中临时勾选“允许来自此来源的应用”。',
      notes: ['安装后建议进入系统【电池管理】，将该软件的省电策略设为“无限制”，防止系统在后台休眠时切断网络。']
    },
    step2Import: {
      title: '第二步：添加配置并获取节点',
      desc: '一键载入你的商业订阅链接：',
      subSteps: [
        '打开 CMFA，点击主界面【配置 (Profiles)】。',
        '点击右上角【+】号，选择【URL (从 URL 导入)】。',
        '名称随意填写，在 URL 栏粘贴服务商提供的 Clash 订阅链接。',
        '将自动更新间隔设置为 1440 分钟（24小时），点击右上角保存软盘图标开始下载。',
        '下载完毕后勾选选中该配置文件，返回首页点击大开关启动连接。'
      ],
      recommendedProviderText: '挑选三网体验极佳的优质中转服务商：[2026 稳定梯子选购直通车](/rankings/best/)。'
    },
    step3Settings: {
      title: '第三步：分应用代理（绕过国内软件）',
      desc: '安卓平台最实用的神仙功能配置：',
      switches: [
        { name: '分应用代理 (Access Control)', action: '必开', reason: '在设置中勾选“绕过指定应用”或“仅代理选定应用”，将微信、支付宝、网易云等排除，省电且防风控。' },
        { name: '路由模式：规则分流 (Rule)', action: '必开', reason: '保持“Rule 规则模式”，杜绝全局硬代理带来的国内网站减速。' },
        { name: '自动测速 (Health Check)', action: '推荐', reason: '定时自动探测节点健康状态，节点超时自动秒切备用。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '锁屏后经常断网，解锁屏幕才恢复？', a: '属于国产安卓系统（小米 HyperOS、华为 HarmonyOS、vivo OriginOS 等）的后台强杀机制。必须锁定应用后台并开启“无限制电池优化”。', link: '/troubleshooting/timeout/' },
        { q: '连接后无法使用微信语音通话？', a: '在分应用代理设置中，将微信（com.tencent.mm）彻底勾选排除走直连通道即可。', link: '/troubleshooting/connected-no-internet/' }
      ]
    }
  },
  {
    id: 'v2rayng-android',
    platform: 'android',
    platformName: 'Android',
    name: 'v2rayNG (Android)',
    tagline: '安卓平台经久不衰的极简老将，VLESS-Reality 秒更新，配置极简且极端省电',
    rating: 4.6,
    audienceBadge: '老牌极简 · 低功耗神器',
    badgeColor: 'blue',
    tags: ['极低耗电', 'VLESS Reality', '分应用分流', '扫码一键导'],
    coreEngine: 'Xray-core',
    officialDownload: {
      title: '2dust 官方 GitHub Release 发布页',
      url: 'https://github.com/2dust/v2rayNG/releases',
      hint: '下载最新版 v2rayNG_x.x.x_arm64-v8a.apk。',
      versionTip: '支持绝大多数高通、联发科主流 64 位安卓智能手机。'
    },
    step1Download: {
      title: '第一步：下载与极速安装',
      desc: '体积小巧仅约 30MB，极度精简，不包含任何多余视觉动效，老旧低配机型也能流畅飞起。',
      notes: ['建议从 GitHub 或 Google Play 商店获取官方原生无修改正版。']
    },
    step2Import: {
      title: '第二步：添加订阅与更新',
      desc: '在左侧抽屉菜单中完成配置：',
      subSteps: [
        '点击左上角【三道杠】汉堡菜单，选择【订阅设置】。',
        '点击右上角【+】号，输入备注名称，粘贴服务商订阅 URL，点击右上角勾选保存。',
        '返回主界面，点击右上角【三个点】更多菜单，选择【更新订阅】。',
        '节点列表瞬间全部刷出，点击选中要使用的节点，点击右下角大 V 悬浮圆钮启动。'
      ],
      recommendedProviderText: '选购支持月付、不跑路的轻量专线：[高性价比轻量月付榜](/rankings/budget/)。'
    },
    step3Settings: {
      title: '第三步：核心路由分流设定',
      desc: '在设置中微调分流策略：',
      switches: [
        { name: '预定义规则：绕过局域网及大陆地址', action: '必开', reason: '确保访问百度、淘宝及内网设备不耗费境外节点流量。' },
        { name: '分应用代理', action: '推荐', reason: '指定特定海外应用（如 Twitter、YouTube）走代理，其他应用纯天然原生直连。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '节点列表显示 -1ms 或全部 Timeout？', a: '先点击右上角“TcpPing”或“RealPing”进行真连接测试，若依然全红请核对手机系统自动授时是否准确。', link: '/troubleshooting/timeout/' }
      ]
    }
  },
  {
    id: 'singbox-android',
    platform: 'android',
    platformName: 'Android',
    name: 'Sing-box for Android',
    tagline: 'Sing-box 官方独立 Android 客户端，支持最新 QUIC 栈及高吞吐企业内网专线',
    rating: 4.5,
    audienceBadge: '原生硬核 · 新一代内核',
    badgeColor: 'purple',
    tags: ['QUIC性能', '原生Android客户端', '低延迟', '多配置组'],
    coreEngine: 'Sing-box Core',
    officialDownload: {
      title: 'Google Play 或 SagerNet GitHub Release',
      url: 'https://github.com/SagerNet/sing-box/releases',
      hint: '搜索 SagerNet/sing-box/releases，下载 sing-box-x.x.x-android-arm64-v8a.apk。',
      versionTip: '推荐 Android 11 及以上系统运行。'
    },
    step1Download: {
      title: '第一步：安装与初次权限授予',
      desc: '安装后启动应用，首次连接时点击同意系统建立 VPN 隧道安全提示。',
      notes: ['原生集成 Material 3 设计标准，适配安卓动态主题调色板。']
    },
    step2Import: {
      title: '第二步：添加 Remote Profile',
      desc: '添加远程在线订阅：',
      subSteps: [
        '在【Profiles】标签点击右上角添加。',
        '选择【Remote】，粘贴你的 Sing-box 订阅链接。',
        '拉取解析成功后，点击 Dashboard 开关开启代理。'
      ],
      recommendedProviderText: '适合搭配支持低延迟 UDP 协议的节点：[晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。'
    },
    step3Settings: {
      title: '第三步：系统集成调优',
      desc: '关键设置开关：',
      switches: [
        { name: 'Per-app Proxy (分应用)', action: '必开', reason: '规避国内银行金融软件被境外 IP 触发异地风控。' },
        { name: 'Auto Start (开机自启)', action: '推荐', reason: '手机重启后自动恢复安全连接。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '无法导入普通 Clash 链接？', a: 'Sing-box 格式与 Clash YAML 不互通，需在服务商后台直接导出 Sing-box 订阅或使用 [实用工具箱](/tools) 转换。', link: '/tools' }
      ]
    }
  },

  // ==========================================
  // 5. 电视与大屏 (TV & Apple TV)
  // ==========================================
  {
    id: 'apple-tv-tvos',
    platform: 'tv',
    platformName: 'TV / 大屏',
    name: 'Apple TV (tvOS 17+ 原生支持)',
    tagline: 'tvOS 17 全面开放 VPN 框架，Shadowrocket / Stash tvOS 端一键作为全屋大屏极速网关',
    rating: 5,
    audienceBadge: '客厅影音旗舰 · 4K/8K 杜比视界',
    badgeColor: 'emerald',
    tags: ['tvOS 17+', '全屋代理网关', '4K杜比视界', '家庭无感接入'],
    coreEngine: 'Shadowrocket / Stash for tvOS',
    officialDownload: {
      title: 'Apple TV 内置 App Store 商店',
      url: 'https://apps.apple.com/app/shadowrocket/id932747118',
      hint: '需在 Apple TV 系统设置中登录已购买过 Shadowrocket 或 Stash 的海外 Apple ID。',
      versionTip: '只要 iOS 设备上购买过，在 Apple TV 上直接点击“云朵图标”即可免费下载，无需二次付费。'
    },
    step1Download: {
      title: '第一步：在 Apple TV 上下载安装',
      desc: '在 Apple TV【设置 -> 用户与账户】中添加美区 Apple ID，进入 tvOS App Store 搜索 Shadowrocket 直接安装。',
      notes: [
        'tvOS 系统版本必须在 tvOS 17.0 以上才支持原生 VPN 扩展功能。'
      ]
    },
    step2Import: {
      title: '第二步：通过局域网扫码或隔空投送配置',
      desc: '大屏电视遥控器输入文字不便，通过手机一键秒传：',
      subSteps: [
        '打开 Apple TV 上的 Shadowrocket，屏幕将呈现一个专门的局域网配置二维码及本地网页 IP（如 http://192.168.1.150:8080）。',
        '拿起你的 iPhone，打开相机扫描电视上的二维码，手机浏览器将直接打开电视端的管理后台。',
        '在手机网页中直接粘贴你的商业订阅链接并点击保存，电视端瞬间同步全部节点！',
        '用遥控器选中想要解锁的地区（如美国、新加坡），点击连接。'
      ],
      recommendedProviderText: '大屏观影推荐解锁奈飞非自制与迪士尼的原生住宅专线：[4K/8K 流媒体解锁榜](/rankings/streaming/)。'
    },
    step3Settings: {
      title: '第三步：开启家庭透明代理网关（可选神技）',
      desc: 'Shadowrocket tvOS 版独家黑科技：',
      switches: [
        { name: '允许来自局域网的连接 (Allow LAN)', action: '必开', reason: '开启后 Apple TV 变身软路由旁网关，家中其他电视、Switch 游戏机网关指向它即可全屋免配置外网。' },
        { name: '分流模式选择“配置”', action: '必开', reason: '确保国内流媒体（Bilibili、爱奇艺）直连不走代理，海外 4K/8K 原生直通。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: 'Disney+ 提示 Error 83 或 Netflix 只能看自制剧？', a: '说明落地节点未通过流媒体版权库校验，在策略组中切换至专用的“原生住宅”流媒体节点，详见 [Netflix 住宅解锁原理](/wiki/unblocking/netflix-home-broadband)。', link: '/wiki/unblocking/netflix-home-broadband' }
      ]
    }
  },
  {
    id: 'android-tv-box',
    platform: 'tv',
    platformName: 'TV / 大屏',
    name: 'Android TV (索尼/小米/外贸电视盒子)',
    tagline: '专为遥控器十字键适配的 Android TV 客户端，4K 影视不降频秒开拖拽',
    rating: 4.6,
    audienceBadge: '大屏遥控优化 · 盒子必备',
    badgeColor: 'blue',
    tags: ['遥控器适配', 'Android TV', '4K原画', '大字号UI'],
    coreEngine: 'Clash for Android TV / Surfboard',
    officialDownload: {
      title: 'U 盘侧载安装包或大屏适配版 Release',
      url: 'https://github.com/chen08209/FlClash/releases',
      hint: '推荐下载原生适配大屏遥控器的 FlClash Android TV 版 APK。',
      versionTip: '使用 U 盘插到电视 USB 口，通过电视自带的“文件管理器”点击安装。'
    },
    step1Download: {
      title: '第一步：U 盘安装到电视',
      desc: '在电脑上下载 APK 拷入 U 盘，插入索尼、小米或外贸机顶盒（如 Google TV Chromecast）完成安装。',
      notes: ['小米电视需在设置中开启“允许安装未知来源应用”。']
    },
    step2Import: {
      title: '第二步：局域网传配置或扫码',
      desc: '电视端无需繁琐按键输入：',
      subSteps: [
        '打开 TV 版客户端，选择“局域网配置同步”。',
        '在同一 Wi-Fi 下用手机打开提示的局域网网页，粘贴你的订阅链接即可传输到电视。',
        '电视端遥控器确认保存后，选择大带宽低延迟节点。'
      ],
      recommendedProviderText: '选购适合 4K 持续大码率压测的高速节点：[4K/8K 流媒体解锁榜](/rankings/streaming/)。'
    },
    step3Settings: {
      title: '第三步：电视端专用参数优化',
      desc: '针对大屏影视的调优配置：',
      switches: [
        { name: '自动开机启动', action: '必开', reason: '电视开机自动在后台静默建立连接，家中老人孩子拿起遥控器就能看 YouTube 4K。' },
        { name: '旁路局域网应用', action: '必开', reason: '防止电视投屏（AirPlay / DLNA）因代理发生搜索不到设备的故障。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '手机无法投屏到电视？', a: '客户端开启了局域网隔离所致。在设置中开启“绕过局域网”，并将内网 192.168.0.0/16 加入白名单直连。', link: '/troubleshooting/connected-no-internet/' }
      ]
    }
  },

  // ==========================================
  // 6. 极客与软路由 (Router & Linux)
  // ==========================================
  {
    id: 'openwrt-router',
    platform: 'router-linux',
    platformName: '软路由 / Linux',
    name: 'OpenWrt / iStoreOS (旁路由)',
    tagline: '家庭网络软路由透明代理终极方案，PassWall / OpenClash 实现全屋全设备无感免配置出海',
    rating: 5,
    audienceBadge: '全屋无感 · 终极极客折腾',
    badgeColor: 'emerald',
    tags: ['全屋透明代理', 'OpenClash', 'PassWall', 'TPROXY网关'],
    coreEngine: 'OpenClash / Mihomo / PassWall',
    officialDownload: {
      title: 'OpenClash / PassWall 官方开源插件库',
      url: 'https://github.com/vernesong/OpenClash',
      hint: '软路由固件（如 iStoreOS / OpenWrt）可在后台“软件包”直接安装或上传 ipk 安装。',
      versionTip: '推荐使用 x86 软路由（如 N100 / J4125）或高性能 ARM 路由器。'
    },
    step1Download: {
      title: '第一步：固件与插件环境准备',
      desc: '在软路由系统后台安装 luci-app-openclash，并上传下载对应的内核编译文件（clash_meta）。',
      notes: ['旁路由 IP 通常设置为 192.168.1.2，关闭自身 DHCP，作为从属网关接入主路由。']
    },
    step2Import: {
      title: '第二步：配置订阅与内核编译切换',
      desc: '在 OpenClash 插件后台导入订阅：',
      subSteps: [
        '进入【服务 -> OpenClash -> 配置订阅】。',
        '添加订阅，粘贴 Clash 订阅 URL，勾选“在线自动更新”。',
        '在【全局设置 -> 模式设置】中选用【Fake-IP (TUN 模式)】或【Redir-Host 模式】。',
        '保存并应用，等待核心运行状态变为绿灯，局域网全量生效。'
      ],
      recommendedProviderText: '软路由长期跑大并发流量推荐选用高承载内网专线：[晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。'
    },
    step3Settings: {
      title: '第三步：避免微信延迟与打印机断连的核心配置',
      desc: '软路由最容易踩坑的内网广播冲突修复：',
      switches: [
        { name: '绕过局域网地址 (Bypass LAN)', action: '必开', reason: '确保 NAS、内网打印机互通，解决局域网打不开后台的问题。' },
        { name: 'TCP MSS 钳制', action: '必开', reason: '解决部分网页打不开、微信图片一直发送失败的 MTU 分段截断难题。' },
        { name: '只在指定设备使用旁路由', action: '推荐', reason: '在电脑或电视上单独手动填写网关 192.168.1.2，家中其他普通设备依然走主路由，维护互不影响。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: '配置旁路由后微信收到消息有几分钟严重延迟？', a: '由于软路由 DNS 缓存没有及时放行国内长连接推送。详见 [旁路由微信延迟与局域网冲突修复指南](/wiki/faq/router-bypass-conflict)。', link: '/wiki/faq/router-bypass-conflict' }
      ]
    }
  },
  {
    id: 'linux-headless',
    platform: 'router-linux',
    platformName: '软路由 / Linux',
    name: 'Linux CLI / Docker 无头服务器',
    tagline: '无头服务器（Headless）、开发机与 VPS 自动化出海，Systemd 守护与环境变量一键配置',
    rating: 4.7,
    audienceBadge: '开发者必备 · 服务器出海',
    badgeColor: 'blue',
    tags: ['Systemd守护', 'Docker容器化', '环境变量代理', '无头服务器'],
    coreEngine: 'Sing-box Core / Mihomo CLI',
    officialDownload: {
      title: 'GitHub 官方二进制预编译 Release',
      url: 'https://github.com/MetaCubeX/mihomo/releases',
      hint: '下载 Linux amd64 或 arm64 的压缩包，解压出单一可执行二进制文件。',
      versionTip: '例如：mihomo-linux-amd64-v1.x.x.gz'
    },
    step1Download: {
      title: '第一步：下载二进制并赋予执行权限',
      desc: '通过 wget 或 curl 将核心直接拉取至 /usr/local/bin：',
      notes: [
        'curl -Lo /usr/local/bin/mihomo <下载链接>',
        'chmod +x /usr/local/bin/mihomo',
        'mkdir -p /etc/mihomo'
      ]
    },
    step2Import: {
      title: '第二步：拉取订阅生成 config.yaml',
      desc: '使用 curl 拉取你的服务商配置：',
      subSteps: [
        'curl -sSL "你的Clash订阅链接" -o /etc/mihomo/config.yaml',
        '编写 /etc/systemd/system/mihomo.service 守护进程单元文件。',
        '执行 systemctl enable --now mihomo 启动后台守护。'
      ],
      recommendedProviderText: '参考专为开发者调优的节点服务：[2026 稳定梯子选购直通车](/rankings/best/)。'
    },
    step3Settings: {
      title: '第三步：配置全局环境代理变量',
      desc: '让终端与自动化脚本自动走本地端口：',
      switches: [
        { name: '写入 /etc/profile', action: '必开', reason: 'export http_proxy="http://127.0.0.1:7890" 和 https_proxy，让 git clone 与 apt-get 提速 50 倍。' },
        { name: 'Docker Daemon 代理配置', action: '推荐', reason: '配置 /etc/docker/daemon.json 中的 proxy，彻底解决 Docker Hub 镜像拉取超时卡死。' }
      ]
    },
    step4Troubleshooting: {
      title: '第四步：常见突发问题秒查自救',
      items: [
        { q: 'Git 或 Docker 仍然无法拉取境外镜像？', a: '检查 systemd 服务状态 journalctl -u mihomo -f 查看是否有监听端口冲突或规则拦截。', link: '/troubleshooting/connected-no-internet/' }
      ]
    }
  }
]

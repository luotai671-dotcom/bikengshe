export interface AirportItem {
  rank: number
  id: string
  name: string
  isFeatured?: boolean // 主推品牌
  registerUrl: string
  promoCode?: string
  since: number
  minPayment: string
  starterPlan: string
  lineType: string
  protocol: string
  speed: string
  packetLoss: string
  unlockCapability: string
  score: string
  rating: string
  tier: string
  badge?: string
  slogan: string
  description: string
  pros: string[]
  cons: string[]
  suitableFor: string
}

export const AIRPORTS_LIST: AirportItem[] = [
  {
    rank: 1,
    id: 'sds',
    name: '闪电鼠',
    isFeatured: true,
    registerUrl: '/go/sds',
    promoCode: 'sd88',
    since: 2020,
    minPayment: '8 元/月',
    starterPlan: '96元/年 60GB/月',
    lineType: 'IEPL + 企业内网专线',
    protocol: 'VLESS',
    speed: '850 Mbps / 980 Mbps',
    packetLoss: '< 0.1% (近乎零丢包)',
    unlockCapability: '99.9% 解锁 (ChatGPT/Claude/Netflix 4K/Disney+)',
    score: '9.9 / 10',
    rating: '★★★★★',
    tier: '【主推品牌 · 梯队 A+】',
    badge: '👑 全网主推首选',
    slogan: '6年老牌企业专线 · 极速抗封 · 晚高峰零丢包王座',
    description: '自 2020 年稳定运营至今的老牌顶级专线机场，拥有纯血深港与沪日 IEPL 企业内网专线 + 骨干网物理冗余，全量节点搭载原生家庭住宅 ISP 纯净 IP 池，针对 OpenAI ChatGPT、Claude 3.5 Sonnet 与海外 4K/8K 流媒体全面解除风控。',
    pros: [
      '晚高峰黄金时段丢包率长期低于 0.1%，物理抖动 Jitter < 1.5ms',
      '纯血企业内网专线，完全规避国际公网拥堵与跨国路由震荡期阻断',
      '原生双 ISP 住宅宽带 IP，Claude 与 ChatGPT 秒过不封号',
      '专属优惠码【sd88】折后性价比极高，支持小额月付原则'
    ],
    cons: [
      '由于专线带宽成本高昂，高倍率节点更适合核心办公与生产力而非挂机 BT 下载'
    ],
    suitableFor: '企业跨国办公、涉外金融外贸、重度 ChatGPT/Claude 开发者与极致 4K 影音发烧友'
  },
  {
    rank: 2,
    id: 'dalaoyun',
    name: '大佬云',
    registerUrl: '/go/dalaoyun',
    promoCode: 'dly88',
    since: 2023,
    minPayment: '8 元/月',
    starterPlan: '年付约8元/月 60GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '680 Mbps / 880 Mbps',
    packetLoss: '0.4% ~ 0.9%',
    unlockCapability: '96.5% 解锁 (主流流媒体与 AI)',
    score: '9.6 / 10',
    rating: '★★★★★',
    tier: '【梯队 A】',
    badge: '🔥 8元平价高质',
    slogan: '纯血 IEPL 专线架构 · 亲民平价 · 全能生产力综合王',
    description: '2023 年上线的高口碑专线服务商，主打高性价比 IEPL 专线转发。入门低至 8 元/月即可享受物理专线级稳定性，全节点标配 VLESS 高效协议，完美兼顾大流量追剧与日常办公。',
    pros: [
      '月付门槛仅需 8 元起，坚决落实小额月付资金安全',
      '全线采用 IEPL 专线，抗网络抖动与公网拥堵表现极佳',
      '输入优惠码【dly88】立享专属折扣福利',
      '支持全平台主流客户端一键订阅导入'
    ],
    cons: [
      '入门轻量套餐每月 60GB 流量，超重度下载用户建议选购大流量进阶包'
    ],
    suitableFor: '追求高质价比的学生党、日常白领办公、4K 视频追剧党'
  },
  {
    rank: 3,
    id: 'sxjs',
    name: '神行加速',
    registerUrl: '/go/sxjs',
    promoCode: 'sx0077',
    since: 2023,
    minPayment: '16 元/月',
    starterPlan: '16元/月 150GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '620 Mbps / 820 Mbps',
    packetLoss: '0.6% ~ 1.2%',
    unlockCapability: '95.8% 解锁',
    score: '9.5 / 10',
    rating: '★★★★★',
    tier: '【梯队 A】',
    badge: '🚀 150GB充沛大流量',
    slogan: '150GB 大容量月付 · IEPL 专线吞吐 · 跨端协同利器',
    description: '2023 年创立的稳定专线服务商，入门提供 16元/月 150GB 的充裕流量，采用全 IEPL 物理链路与现代 VLESS 协议，网络高峰期吞吐强劲，支持团队协同与多设备常驻。',
    pros: [
      '16 元月付直接提供 150GB 超大容量，流量单价极具吸引力',
      '专属优惠码【sx0077】直减优惠',
      '全节点 1.0x 标准倍率，无任何暗扣扣费套路',
      '晚高峰大文件传输稳定不降速'
    ],
    cons: [
      '单月最低门槛为 16 元，较 8 元轻量机场略高，但流量翻倍'
    ],
    suitableFor: '中重度出海冲浪、跨国大文件协同传输、多设备共享用户'
  },
  {
    rank: 4,
    id: 'lly',
    name: '榴莲云',
    registerUrl: '/go/lly',
    promoCode: 'll88',
    since: 2023,
    minPayment: '8 元/月',
    starterPlan: '年付约8元/月 60GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '550 Mbps / 750 Mbps',
    packetLoss: '0.9% ~ 1.6%',
    unlockCapability: '94.2% 解锁',
    score: '9.3 / 10',
    rating: '★★★★☆',
    tier: '【梯队 A-】',
    badge: '🌿 亲民平价轻量',
    slogan: '低门槛 8 元起 · 纯净 IEPL · 学生科研首选',
    description: '2023 年开业的平价轻量化机场，专注于为预算有限的用户提供稳定 IEPL 节点。全平台支持 VLESS 协议，配置优惠码【ll88】可获实惠立减。',
    pros: [
      '8 元/月超低门槛，试错成本几乎为零',
      '优惠码【ll88】即用即减',
      '支持国内外精细化分流，有效避免套餐内流量浪费',
      '客户端兼容性优秀，新手友好'
    ],
    cons: [
      '高峰期极端网络压力下极速略微逊色于主推闪电鼠'
    ],
    suitableFor: '预算有限的高校师生、学术文献检索、日常轻量出海交流'
  },
  {
    rank: 5,
    id: 'hqt',
    name: '环球梯',
    registerUrl: '/go/hqt',
    promoCode: 'hq66',
    since: 2020,
    minPayment: '8 元/月',
    starterPlan: '年付约8元/月 60GB',
    lineType: '企业级内网专线 + IEPL',
    protocol: 'VLESS',
    speed: '580 Mbps / 780 Mbps',
    packetLoss: '0.8% ~ 1.5%',
    unlockCapability: '94.8% 解锁',
    score: '9.2 / 10',
    rating: '★★★★☆',
    tier: '【梯队 A-】',
    badge: '🛡️ 6年老牌内网',
    slogan: '2020年起稳定运维 · 企业级内网专线 + IEPL 混合架构',
    description: '与闪电鼠同为 2020 年成立的资深老牌服务商，具备成熟的企业级内网专线和 IEPL 混合热备容灾机制。历经多轮网络跨国路由震荡期考验，口碑扎实。',
    pros: [
      '6 年长线运营历史，信誉度高，杜绝跑路担忧',
      '企业级内网专线 + IEPL 双重链路，跨国路由震荡期抗封锁韧性强',
      '专属优惠码【hq66】专享优惠福利',
      '节点覆盖香港、日本、新加坡、美西等全球核心机房'
    ],
    cons: [
      '节点列表较长，建议新手配合精细化规则分流使用'
    ],
    suitableFor: '注重商家运营年限与长期信誉、需常备防断网专线的出海人士'
  },
  {
    rank: 6,
    id: 'yjx',
    name: '云界线',
    registerUrl: '/go/yjx',
    promoCode: 'yjx888',
    since: 2024,
    minPayment: '15 元/月',
    starterPlan: '年付约8元/月 150GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '500 Mbps / 700 Mbps',
    packetLoss: '1.2% ~ 2.0%',
    unlockCapability: '93.5% 解锁',
    score: '9.1 / 10',
    rating: '★★★★☆',
    tier: '【梯队 B+】',
    badge: '⚡ 150GB大容量',
    slogan: '新架构 IEPL 集群 · 150GB 大容量 · 优惠码 yjx888',
    description: '2024 年全新搭建的现代化 IEPL 专线集群，提供充足的 150GB 套餐，线路负载均匀，适合观看流媒体长视频与多任务并发。',
    pros: [
      '150GB 充足流量，年付折合仅约 8 元/月',
      '优惠码【yjx888】可享大额折扣',
      '现代化 VLESS 协议，网络握手开销极低'
    ],
    cons: [
      '2024 年新平台，仍在积累长周期运营声誉'
    ],
    suitableFor: '追求大流量、喜欢尝鲜新架构的影音与科技极客'
  },
  {
    rank: 7,
    id: 'jly',
    name: '极连云',
    registerUrl: '/go/jly',
    promoCode: 'jly888',
    since: 2023,
    minPayment: '18 元/月',
    starterPlan: '18元/月 100GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '480 Mbps / 680 Mbps',
    packetLoss: '1.2% ~ 2.2%',
    unlockCapability: '92.0% 解锁',
    score: '9.0 / 10',
    rating: '★★★★☆',
    tier: '【梯队 B+】',
    badge: '🌐 100GB月付专线',
    slogan: '稳定 IEPL 物理隧道 · 月付 18 元 100GB · 优惠码 jly888',
    description: '2023 年开业的 IEPL 专线服务商，主打 18元/月 100GB 的月付基准包，网络连接平稳，提供全天候节点可用性自检。',
    pros: [
      'IEPL 专线保障，无惧晚高峰公网国际互联拥堵',
      '支持优惠码【jly888】立减',
      '100GB 满足大多数日常办公与学术需要'
    ],
    cons: [
      '入门价格为 18 元/月，无 10 元以内的极小流量包'
    ],
    suitableFor: '日常需要 100GB 左右均衡流量的上班族与研究员'
  },
  {
    rank: 8,
    id: 'gnt',
    name: '光年梯',
    registerUrl: '/go/gnt',
    promoCode: '',
    since: 2025,
    minPayment: '7 元/月',
    starterPlan: '18元/月 轻量版',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '420 Mbps / 600 Mbps',
    packetLoss: '1.8% ~ 2.8%',
    unlockCapability: '90.5% 解锁',
    score: '8.9 / 10',
    rating: '★★★★☆',
    tier: '【梯队 B】',
    badge: '🏷️ 7元起超低门槛',
    slogan: '2025 新锐低门槛 · 最低 7 元/月起 · 备用防失联优选',
    description: '2025 年新上线的轻量化专线服务商，最低付款仅需 7 元/月，极大降低了新手试用门槛，非常适合作为防失联的第二应急备用通道。',
    pros: [
      '最低付款仅 7 元/月，是全榜门槛最低的服务商之一',
      '采用 IEPL 专线与现代 VLESS 协议',
      '非常适合作为备用主力梯子的兜底第二通道'
    ],
    cons: [
      '新上线服务商，建议严格遵守小额月付原则'
    ],
    suitableFor: '低预算尝鲜者、需要低成本备用防断网第二通道的用户'
  },
  {
    rank: 9,
    id: 'byjd',
    name: '边缘节点',
    registerUrl: '/go/byjd',
    promoCode: 'xk808',
    since: 2023,
    minPayment: '22 元/月',
    starterPlan: '22/月 120GB',
    lineType: '专线优化中转',
    protocol: 'VLESS',
    speed: '380 Mbps / 550 Mbps',
    packetLoss: '2.0% ~ 3.2%',
    unlockCapability: '89.5% 解锁',
    score: '8.8 / 10',
    rating: '★★★★☆',
    tier: '【梯队 B】',
    badge: '📡 120GB专线优化',
    slogan: '多边缘接入 · 22元/月 120GB · 优惠码 xk808',
    description: '2023 年稳定运营的边缘路由服务商，采用 VLESS 协议与智能边缘调度机制，入门套餐 22元/月 120GB，支持多地区落地自由切换。',
    pros: [
      '120GB 充裕月度流量，满足日常流媒体与出海需求',
      '优惠码【xk808】立享专属折扣',
      '节点切换延迟低，支持跨地区负载'
    ],
    cons: [
      '入门价格在 20 元以上，对超低预算用户门槛稍高'
    ],
    suitableFor: '注重边缘路由与节点多样性的开发者与外贸人员'
  },
  {
    rank: 10,
    id: 'sj',
    name: '速界',
    registerUrl: '/go/sj',
    promoCode: 'sujie80',
    since: 2026,
    minPayment: '15 元/月',
    starterPlan: '15元/月 50GB ~ 200元/月 1000GB',
    lineType: 'IPLC 专线',
    protocol: 'VLESS',
    speed: '450 Mbps / 620 Mbps',
    packetLoss: '1.5% ~ 2.8%',
    unlockCapability: '91.0% 解锁',
    score: '8.8 / 10',
    rating: '★★★★☆',
    tier: '【梯队 B】',
    badge: '✨ 纯血 IPLC 专线',
    slogan: '2026 新晋 IPLC 专线 · 阶梯 50GB~1000GB · 优惠码 sujie80',
    description: '2026 年新晋上线的高规格服务商，全线标配真正的 IPLC 国际专线与 VLESS 协议。提供从 15元/月 50GB 到 200元/月 1000GB 的丰富阶梯套餐。',
    pros: [
      '纯血 IPLC 专线链路，不过 国际网络出口网关 国际公网，延迟稳定',
      '阶梯套餐极其丰富（50GB 到 1000GB 自由选择）',
      '专属优惠码【sujie80】可享 8 折优惠'
    ],
    cons: [
      '新平台，建议优先选择小额月付套餐试用'
    ],
    suitableFor: '需要真正 IPLC 专线、需要大容量弹性流量包的高阶玩家'
  },
  {
    rank: 11,
    id: 'kl',
    name: '快狸',
    registerUrl: '/go/kl',
    promoCode: 'kuaili996',
    since: 2023,
    minPayment: '15 元/月',
    starterPlan: '15元/月 50GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '400 Mbps / 560 Mbps',
    packetLoss: '1.8% ~ 3.0%',
    unlockCapability: '90.0% 解锁',
    score: '8.7 / 10',
    rating: '★★★★☆',
    tier: '【候补精选】',
    badge: '🦊 15元轻量专线',
    slogan: 'IEPL 专线稳定月付 · 优惠码 kuaili996',
    description: '2023 年开业的 IEPL 专线机场，15 元/月 50GB，配专属优惠码【kuaili996】，轻巧实用。',
    pros: ['IEPL 物理专线', '优惠码立减', 'VLESS 轻量连接'],
    cons: ['基础流量 50GB 适合轻度用户'],
    suitableFor: '日常轻度出海、查资料与文字办公'
  },
  {
    rank: 12,
    id: 'kxy',
    name: '可信云',
    registerUrl: '/go/kxy',
    promoCode: 'lmao888',
    since: 2024,
    minPayment: '19 元/月',
    starterPlan: '19元/月 150GB',
    lineType: '企业级内网专线',
    protocol: 'VLESS / 多协议',
    speed: '420 Mbps / 600 Mbps',
    packetLoss: '1.6% ~ 2.6%',
    unlockCapability: '91.5% 解锁',
    score: '8.7 / 10',
    rating: '★★★★☆',
    tier: '【候补精选】',
    badge: '☁️ 150GB企业内网',
    slogan: '企业级内网专线 · 150GB 充沛容量 · 优惠码 lmao888',
    description: '2024 年企业级内网专线服务商，19 元月付提供 150GB 充沛流量，输入【lmao888】立享专属优惠。',
    pros: ['150GB 超大容量', '企业级内网专线架构', '多端兼容稳定'],
    cons: ['新品牌，建议坚持月付'],
    suitableFor: '追求大流量、多设备共享的高性价比用户'
  },
  {
    rank: 13,
    id: 'sy',
    name: '瞬云',
    registerUrl: '/go/sy',
    promoCode: '',
    since: 2024,
    minPayment: '18 元/月',
    starterPlan: '18元/月 100GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS / 混合协议',
    speed: '390 Mbps / 530 Mbps',
    packetLoss: '2.0% ~ 3.2%',
    unlockCapability: '89.0% 解锁',
    score: '8.6 / 10',
    rating: '★★★★☆',
    tier: '【候补精选】',
    badge: '⚡ 100GB专线包',
    slogan: 'IEPL 专线通道 · 18元/月 100GB · 节点快速响应',
    description: '2024 年创立的 IEPL 专线平台，18元/月 100GB 规格，流媒体播放顺畅，适合日常追剧与多端冲浪。',
    pros: ['IEPL 专线抗丢包', '100GB 均衡月流量', '连接响应迅速'],
    cons: ['暂无额外优惠码活动'],
    suitableFor: '需要 100GB 均衡流量的日常用户'
  },
  {
    rank: 14,
    id: 'yt',
    name: '云图',
    registerUrl: '/go/yt',
    promoCode: '',
    since: 2025,
    minPayment: '18 元/月',
    starterPlan: '18元/月 110GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '410 Mbps / 570 Mbps',
    packetLoss: '1.9% ~ 3.0%',
    unlockCapability: '89.5% 解锁',
    score: '8.6 / 10',
    rating: '★★★★☆',
    tier: '【候补精选】',
    badge: '🗺️ 110GB新锐专线',
    slogan: '2025 新锐专线 · 18元/月 110GB · VLESS 极速协议',
    description: '2025 年新上线的 IEPL 专线，入门提供 110GB 流量，采用 VLESS 纯净协议，覆盖亚太与欧美主流机房。',
    pros: ['新上线节点负载轻', '110GB 充沛规格', 'VLESS 现代协议'],
    cons: ['新平台，建议先按单月试用'],
    suitableFor: '喜欢低负载新节点、需要 110GB 左右流量的用户'
  },
  {
    rank: 15,
    id: 'kpjs',
    name: '鲲鹏加速',
    registerUrl: '/go/kpjs',
    promoCode: '',
    since: 2024,
    minPayment: '20 元/月',
    starterPlan: '20元/月 150GB',
    lineType: 'IEPL 专线',
    protocol: 'VLESS',
    speed: '430 Mbps / 600 Mbps',
    packetLoss: '1.7% ~ 2.9%',
    unlockCapability: '90.5% 解锁',
    score: '8.6 / 10',
    rating: '★★★★☆',
    tier: '【候补精选】',
    badge: '🦅 150GB大带宽',
    slogan: 'IEPL 专线大容量 · 20元/月 150GB · 晚高峰稳定吞吐',
    description: '2024 年开业的 IEPL 专线服务商，主打 20元/月 150GB 的大容量配置，全节点 VLESS 协议支持，跨端体验平稳。',
    pros: ['150GB 大流量包', 'IEPL 专线保障', '多协议支持'],
    cons: ['暂无优惠码抵扣'],
    suitableFor: '需要 150GB 充足月度流量的视频与大文件传输用户'
  }
]

export const FEATURED_AIRPORT = AIRPORTS_LIST[0] // 闪电鼠

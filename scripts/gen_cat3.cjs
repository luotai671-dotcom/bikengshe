const fs = require('fs');
const path = require('path');

const cat3Articles = [
  {
    slug: 'chatgpt-403-forbidden',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'ChatGPT 403 Forbidden 与 Cloudflare 拦截机制破解指南',
    description: '深入排查 ChatGPT 报错 403 Forbidden、1020 Access Denied 以及频繁循环人机验证的底层诱因，提供更换原生住宅 IP 与精准配置分流规则的完整解决方案。',
    tags: ['ChatGPT 403', 'Cloudflare拦截', '人机验证', 'AI风控', '分流规则'],
    directAnswer: 'ChatGPT 抛出 403 Forbidden 或“Access Denied”的根本原因是其前置边缘安全网关（Cloudflare WAF）对客户端出口 IP 进行了信誉判定；一旦检测到该 IP 属于被万人共用的低成本托管数据中心（Hosting ASN）、存在高频并发爬虫行为，或者客户端 TLS 指纹与系统语言环境严重冲突，就会被直接无条件拒绝服务；解决办法是切换至纯净的原生住宅 ISP 节点，并开启客户端全局分流接管 \`openai.com\` 域名。',
    sections: [
      {
        heading: '一、 Cloudflare 对 ChatGPT 流量的拦截阶梯',
        content: `OpenAI 使用了 Cloudflare 最高规格的企业级防机器人防护（Bot Management）：
1. **第一层：IP 信誉白名单检测**。查询 MaxMind、IPinfo 数据库，如果是公共机房 IP，直接标记风险。
2. **第二层：TLS/JA3 握手指纹比对**。校验客户端 Client Hello 是否与声称的浏览器 UA 吻合。
3. **第三层：浏览器环境画布指纹探测（Canvas & WebGL）**。
4. **第四层：Turnstile 交互式验证**。如果前置信誉太差，验证码将无限循环或直接返回 403。`
      },
      {
        heading: '二、 彻底解决 403 报错的三大黄金步骤',
        content: `1. **排查并更换出口节点**：立即放弃普通廉价机房节点，选用经过专门解锁优化、拥有原生住宅属性的节点。
2. **正确配置路由分流规则**：确保 \`*.openai.com\`、\`*.chatgpt.com\`、\`*.oaistatic.com\`、\`*.oaiusercontent.com\` 全量路由至指定解锁节点，杜绝直连污染。
3. **清理浏览器本地存储**：在开发者工具中清除 \`chatgpt.com\` 的 LocalStorage、SessionStorage 和 Cookies，必要时使用无痕隐私模式。`
      }
    ],
    internalLinks: '需要稳定使用大模型与代码生成的创作者，推荐参考专为 AI 调优的 [AI 生产力节点推荐](/rankings/ai-services/)；如果遇到客户端报错无法上网请参阅 [排障总览与故障诊断树](/troubleshooting/)；综合节点总榜推荐 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '换了节点依然提示 403，是什么原因？',
        a: '浏览器中可能残留了上一个被阻断 IP 写入的 Cloudflare 失败会话 Cookie（如 \`__cf_bm\`）。请彻底清除浏览器关于 OpenAI 的全部 Cookie 与缓存，或者更换另一个独立浏览器无痕模式尝试。'
      },
      {
        q: '使用香港节点为什么打不开 ChatGPT？',
        a: 'OpenAI 官方从未在中国香港及中国澳门地区开放服务。因此直接使用香港节点访问 ChatGPT 会被直接重定向至区域不支持页面或返回 403。必须选用日本、美国、新加坡或台湾等官方支持区域的节点。'
      }
    ]
  },
  {
    slug: 'claude-1020-account-ban',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'Claude 1020 阻断与大面积封号本质：纯净 IP 与指纹防风控实操',
    description: '深度剖析 Anthropic 对 Claude 实施的极端严格风控机制，揭示机房脏 IP、支付账单地址不符与时区指纹暴露导致频繁封号的深层诱因及防范实战。',
    tags: ['Claude 1020', 'Anthropic封号', '纯净IP', '账号风控', '指纹防护'],
    directAnswer: 'Anthropic 对 Claude 采取了业内最为激进的安全审查策略，其风控逻辑不仅包括 IP 欺诈分检测（严格排斥所有 Hosting 机房），还会对用户的浏览器时区、语言（Accept-Language）、WebRTC 真实公网 IP 以及支付信用卡发卡行进行四重交叉验证；任何一项参数露馅（例如使用美国节点却泄漏中国时区和内网 IP）均会立刻触发 Error 1020 拒绝访问甚至直接停封账号；使用原生美英住宅专线并配置防泄漏环境是安全运行 Claude 的先决条件。',
    sections: [
      {
        heading: '一、 Claude 风控系统的“零容忍”规则',
        content: `与 OpenAI 相对宽容的态度不同，Anthropic 在注册与登录阶段部署了全方位的交叉指纹审计：
- **IP 归属地漂移检测**：若同一个账号在 2 小时内从美国 IP 突然跳转至日本 IP，系统立刻判定账号异常。
- **WebRTC 本地 IP 穿透**：通过浏览器底层 STUN 协议刺探系统背后的真实局域网甚至真实公网 IP。
- **支付卡与账单地址一致性**：Claude Pro 必须绑定真实美国/欧洲本土商业信用卡。`
      }
    ],
    internalLinks: '追求极致纯净风控环境的用户请务必选配 [AI 生产力节点推荐](/rankings/ai-services/)；了解如何防范小作坊虚标请参阅 [新手选购 8 大避坑法则](/buying/traps/)；综合优选查看 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '被 Claude 提示 “Your account has been disabled”，还能申诉解封吗？',
        a: '由于 Anthropic 主要是通过自动化模型判定违规，普通用户的申诉邮件成功率极低（不足 5%）。建议更换全新干净的住宅节点与干净的全新邮箱重新注册。'
      }
    ]
  },
  {
    slug: 'netflix-home-broadband',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'Netflix 为什么只能看自制剧？非自制剧住宅 IP 强校验机制破解',
    description: '揭秘 Netflix 锁区机制的本质：为什么连接普通节点只能观看自制剧（如怪奇物语），无法搜索到绝代双骄等非自制独家内容？详解家庭宽带 DNS 原生解锁原理。',
    tags: ['Netflix解锁', '自制剧限制', '住宅IP', '流媒体版权', 'DNS解锁'],
    directAnswer: 'Netflix 拥有两套完全不同的版权风控策略：自制剧（Netflix Originals）拥有全球自主版权，允许任意 IP 观看；而非自制剧（如绝代双骄、老友记、各类好莱坞大片）受严苛的地域版权合同约束，Netflix 会调用第三方数据库（如 MaxMind GeoIP）强制审查接入 IP，一旦判定为机房 IP，便会屏蔽所有非自制内容（俗称“半解锁/仅自制”）；只有具备真实当地家庭宽带 ASN 或部署了优质住宅中继流媒体 DNS 劫持的节点，才能实现 100% 全球版权库全解锁。',
    sections: [
      {
        heading: '一、 如何自测 Netflix 解锁完整性？',
        content: `不要用首页推荐的自制剧做测试，直接在搜索框搜索非自制代表作：
- 搜索 **《Breaking Bad》（绝命毒师）** 或 **《Friends》（老友记）**
- 若能搜索出正片并正常播放，说明是真正的**全版权解锁（Full Unlock）**。
- 若搜索结果只展示类似题材的自制剧或毫无匹配，说明属于**仅限自制剧（Originals Only）**的受限状态。`
      }
    ],
    internalLinks: '想要在电视大屏与移动设备畅快追剧，请直接参考 [4K/8K 流媒体解锁榜](/rankings/streaming/)；若追求高性价比月付可看 [高性价比轻量月付榜](/rankings/budget/)；综合横评推荐 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: 'Netflix 提示“您似乎正在使用解除限制工具或代理”，怎么解决？',
        a: '这表明你当前使用的节点 IP 已被 Netflix 列入封禁名单。请在客户端切换到带有【原生解锁】或【流媒体专线】标识的备用节点，并在播放前刷新浏览器或重启 Netflix App。'
      }
    ]
  },
  {
    slug: 'disney-error-83-fix',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'Disney+ 报错 Error 83 / 73 排查：跨区域落地节点版权锁定排查',
    description: '详解 Disney+ 客户端与网页端高频出现的 Error 83、Error 73、Error 43 等报错代码的底层技术机理，提供设备 DRM 证书与节点 IP 纯净度的联合排查实操。',
    tags: ['Disney+报错', 'Error 83', 'Error 73', 'DRM级别', '流媒体排查'],
    directAnswer: 'Disney+ 报错 Error 83 通常代表系统在当前设备或网络环境下未能通过双向验证，主要由于节点所在 IP 被 Disney+ 风控标记为未知中继或设备硬件未能通过 Widevine L1 级 DRM 数字版权认证；而 Error 73 则直接代表“当前地区不可用”，说明落地节点的实际广播归属地与 Disney+ 开放区域不匹配；解决核心在于选用支持 Disney+ 解锁的原生节点，并确保播放设备（如电视盒子、手机）未被 Root 破坏硬件安全级密钥。',
    sections: [
      {
        heading: '一、 Disney+ 高频错误代码全速查',
        content: `| 错误代码 | 触发原因 | 推荐解决方案 |
| :--- | :--- | :--- |
| **Error 83** | IP 被风控拉黑，或浏览器/设备 DRM 兼容性失败 | 更换流媒体专用节点；使用原生 Chrome/Edge 浏览器 |
| **Error 73** | 节点 IP 所在国家/地区暂未开放 Disney+ 服务 | 切换至新加坡、日本、美国等成熟落地节点 |
| **Error 43** | 账号或登录凭据异常失效 | 重新登录并核对订阅有效期 |`
      }
    ],
    internalLinks: '如需挑选支持 Disney+ 与 4K HDR 杜比视界的优质专线，请查阅 [4K/8K 流媒体解锁榜](/rankings/streaming/)；遇到严重断网与排障请参阅 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: '安卓电视盒子看 Disney+ 提示 Error 83，电脑却正常？',
        a: '很多廉价外贸电视盒子没有取得 Google 的 Widevine L1 官方认证，仅支持最低级的 L3 软解，这会直接触发 Disney+ App 的硬件安全风控报错。建议选购认证规范的 Apple TV、Chromecast 或 Shield TV。'
      }
    ]
  },
  {
    slug: 'openai-sse-stream-timeout',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: '大模型 SSE 流式输出频繁断流原因分析与 TCP 长连接参数调优',
    description: '深入分析 ChatGPT、Claude 对话时经常生成一半卡死、提示“Network Error”的深层诱因，揭秘 Server-Sent Events 流式传输与中转网关 TCP 超时设定的冲突解决。',
    tags: ['SSE流式传输', '长连接超时', 'ChatGPT卡死', 'TCP调优', '网络断流'],
    directAnswer: '大模型生成的打字机效果基于 HTTP Server-Sent Events (SSE) 协议，它依赖服务端向客户端建立单向长期的无缓冲持久 TCP 连接；然而很多代理客户端、中转反代服务器（Nginx/Caddy）或运营商防火墙默认配置了激进的空闲连接超时（Idle Timeout）与中间缓存（Buffering），一旦网络发生哪怕 2 秒的静默微抖动，中间网关就会强行掐断 TCP 连接，导致前端页面立刻弹出“Network Error / Stream interrupted”；优化核心是开启客户端 HTTP 保活（Keep-Alive）与禁用网关响应缓冲。',
    sections: [
      {
        heading: '一、 SSE 长连接断流的三大幕后推手',
        content: `1. **Nginx 代理层缓冲（proxy_buffering on）**：导致网关试图等待接收完整响应后再一起转发，打乱流式下发节奏。
2. **TCP 保活心跳缺失**：在生成超长代码时，若模型推理思考时间较长，中间没有有效数据包，沿途路由器会判定连接僵死并回收 NAT 端口。
3. **节点丢包与拥塞重传超时**：公网直连节点在丢包高峰期无法及时完成 TCP SACK 重传，引发连接重置（RST）。`
      }
    ],
    internalLinks: '对于重度依赖大模型生产力的程序员与文字创作者，强烈建议选用具备高长连接稳定性与低丢包内网专线的 [AI 生产力节点推荐](/rankings/ai-services/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '如何快速测试我的节点长连接是否稳定？',
        a: '让 ChatGPT 输出一篇 3000 字以上的详细长文或长篇代码。如果多次测试均能一气呵成完整输出而没有任何卡顿报错，说明该节点的 TCP 长连接保持机制调优优秀。'
      }
    ]
  },
  {
    slug: 'youtube-premium-family',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'YouTube Premium 家庭组跨区防翻车：住宅节点锁区与风控自查',
    description: '深度剖析 Google 对 YouTube Premium 家庭组锁区审查的算法逻辑，指导用户如何通过固定纯净住宅 IP 与 Google Pay 账单地址统一，彻底避免被踢出家庭组。',
    tags: ['YouTube家庭组', '跨区风控', '住宅节点', 'GooglePay', '账号防封'],
    directAnswer: 'Google 对 YouTube Premium 家庭组实施了严格的“同区域判定”风控，家庭组所有成员必须在相同的国家或地区；Google 并不要求所有成员共享同一物理家庭 Wi-Fi，但会定期通过后台抓取各成员的定位 IP、Google Play 商店账单归属地以及常驻语言环境进行一致性校验；频繁使用杂乱的全球漂移机房节点登录，会导致账号被系统自动移出家庭组并被锁定跨区权限 12 个月；保持统一纯净的同区域节点登录是防翻车最核心的防线。',
    sections: [
      {
        heading: '一、 Google 家庭组判定的三大核查指标',
        content: `1. **Google Play 商店区域**：每个成员的付款资料必须位于同一国家（如乌克兰、土耳其、尼日利亚或菲律宾）。
2. **IP 归属地稳定性**：若一名成员长期在中国香港 IP 活跃，而组长在土耳其，极易触发风控邮件警告。
3. **家庭管理员账号信誉**：组长账号若频繁换卡或绑定高风险虚拟信用卡，将牵连整个家庭组全员翻车。`
      }
    ],
    internalLinks: '查看具备高稳定性与原生区域解锁的节点服务商，请参考 [4K/8K 流媒体解锁榜](/rankings/streaming/)；追求极佳性价比与资金安全请参阅 [高性价比轻量月付榜](/rankings/budget/)。',
    faqs: [
      {
        q: '被移出家庭组后提示“似乎不在同一个国家”，还能再加入吗？',
        a: '一旦被系统强制判定区域冲突移出，Google 规定每个 Google 账号每 12 个月只能切换一次家庭组。此时必须注销原付款资料或更换全新 Google 账号。'
      }
    ]
  },
  {
    slug: 'midjourney-discord-cdn',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'Midjourney 生成卡死与 Discord CDN 节点分流加速实操',
    description: '详细拆解 Midjourney 出图缓慢、生成进度 0% 卡死以及 Discord 频道图片打不开的技术痛点，提供基于智能分流规则接管 Discord Gateway 与 CDN 图片服务器的优化方案。',
    tags: ['Midjourney卡死', 'Discord CDN', '图片加载加速', '分流优化', 'AI绘图'],
    directAnswer: 'Midjourney 的前端交互依托 Discord Bot，但其庞大的图片渲染生成与成品高清图下发实际上托管在 Cloudflare 及全球分布式 CDN（如 \`cdn.discordapp.com\` 与 \`media.discordapp.net\`）上；很多用户的分流规则仅对 Discord 主域名做了代理，却将繁重的图片 CDN 误判为国内直连或走到了糟糕的被限速节点，导致消息发出去了但生成的图像永久处于白框加载状态；正确配置分流规则并选用低抖动高速专线，能让 4K 原图瞬间加载。',
    sections: [
      {
        heading: '一、 Midjourney 关键域名分流清单',
        content: `在 Clash 或 Sing-box 中，务必将以下域名全量加入策略组：
\`\`\`yaml
payload:
  - '+.discord.com'
  - '+.discordapp.com'
  - '+.discordapp.net'
  - '+.discord.gg'
  - '+.midjourney.com'
\`\`\``
      }
    ],
    internalLinks: '对于高强度出图的设计师，建议选用具备高带宽与低丢包保障的 [AI 生产力节点推荐](/rankings/ai-services/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '为什么网页版 Midjourney 经常报 504 Gateway Timeout？',
        a: 'Midjourney 网页端对 WebSocket 实时握手要求极高，若节点丢包严重会导致网关握手失败，建议开启客户端 TUN 模式以提升长连接稳定性。'
      }
    ]
  },
  {
    slug: 'tiktok-sim-region-lock',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'TikTok 拔卡防黑屏原理与 GPS/IP 双重防风控伪装方案',
    description: '全景解析 TikTok 针对中国大陆用户的多层阻断机理，深度揭开 MCC/MNC SIM 卡码校验、底层系统语言与网络 IP 双重风控面纱，提供海外运营必备的安全防黑屏实操。',
    tags: ['TikTok黑屏', 'SIM卡风控', '拔卡原理', '跨境出海', '原生伪装'],
    directAnswer: 'TikTok 通过客户端底层读取 SIM 卡的移动国家码（MCC 如中国大陆的 460）作为第一道绝对物理防线，一旦检测到大陆运营商 SIM 卡无论网络多好均直接黑屏；在拔卡或安装海外 SIM 卡后，TikTok 还会通过系统语言、时区、底层 GPS 经纬度以及接入 IP 的原生住宅属性进行交叉矩阵比对；任何包含机房属性的广播 IP 都会导致流量被判定为搬运作坊，零播放或限流；必须采用纯净双 ISP 住宅专线搭配完备的环境伪装才能稳定起号。',
    sections: [
      {
        heading: '一、 TikTok 运营级环境配置标准 checklist',
        content: `1. **硬件层**：建议使用海外无锁版 iPhone 或 Pixel 手机，拔出大陆实体 SIM 卡，或者插一张无月租的海外原生电话卡。
2. **系统层**：关闭系统定位服务（GPS），将系统语言改为英语或目标国家官方语言，时区更改为落地城市时区。
3. **网络层**：配置原生双 ISP 住宅出口节点，开启全量 TUN 虚拟网卡接管，杜绝任何本地流量旁路直连。`
      }
    ],
    internalLinks: '从事跨境电商与海外自媒体运营的团队，推荐参考 [AI 生产力节点推荐](/rankings/ai-services/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '新发布的 TikTok 视频播放量一直是 0，是节点被识别了吗？',
        a: '极其大概率是的。TikTok 算法对机房 IP 采用“无声限流”策略，前台虽然能正常刷视频，但系统已将你的账号发布权限降入沙盒，外部用户完全无法在推荐流刷到你的内容。'
      }
    ]
  },
  {
    slug: 'spotify-family-region',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'Spotify 提示账号与所在地区不匹配？落地节点 DNS 缓存刷新技巧',
    description: '深度排查 Spotify 提示“You are in a different region”报错原因，详述落地出口 DNS 缓存污染对音乐流媒体区域识别的负面影响与秒级恢复技巧。',
    tags: ['Spotify报错', '地区不匹配', 'DNS缓存', '流媒体风控', '音质优化'],
    directAnswer: 'Spotify 免费版账号每隔 14 天必须在注册地国家 IP 下完成一次重新登录，而付费家庭组则要求成员与主账号保持在同一区域；许多用户明明连接了指定国家节点却依然提示地区不匹配，根源在于客户端本地缓存了上一次连接的地理位置判定，或者服务商落地出口的 DNS 解析器被 Cloudflare Anycast 牵引到了错误的境外子网；通过手动清理应用本地缓存、刷新客户端 DNS 并绑定目标国家的专享解锁节点即可秒级恢复播放。',
    sections: [
      {
        heading: '一、 彻底解决 Spotify 地区报错实操步骤',
        content: `1. **客户端退出登录并强行停止进程**。
2. **连接对应国家的落地节点**（必须与你 Spotify 账号资料中设置的 Country 一致）。
3. **浏览器登录官方网页端**：在网页端个人中心重新核对并保存国家设置，成功后在 App 重新登录即可刷新 14 天免检期。`
      }
    ],
    internalLinks: '想要在多设备享受极致无损音质与免翻车体验，请查看 [4K/8K 流媒体解锁榜](/rankings/streaming/)；初次购买请阅读 [新手选购 8 大避坑法则](/buying/traps/)。',
    faqs: [
      {
        q: 'Spotify 家庭组锁区会被封号吗？',
        a: '不会直接封禁账号，但会被系统直接移出家庭组降级为免费版带广告状态。重新绑定正确区域后可重新加入。'
      }
    ]
  },
  {
    slug: 'webrtc-ip-leakage-prevent',
    categorySlug: 'unblocking',
    category: '大模型与流媒体风控',
    title: 'WebRTC 真实公网 IP 泄漏攻防：防范流媒体与 AI 平台真实地址检测',
    description: '深度揭密 WebRTC 穿透技术如何绕过系统代理直接暴露你的真实公网 IP，提供在 Chrome、Firefox 浏览器与 Clash TUN 模式下封堵泄露漏洞的专业级防御实操。',
    tags: ['WebRTC泄漏', '真实IP暴露', '隐私保护', '浏览器安全', 'TUN防御'],
    directAnswer: 'WebRTC 是浏览器内置的实时音视频通信标准协议，为了在点对点通话中寻找最佳路径，它会绕过操作系统的普通 HTTP/Socks5 代理设置，直接向 STUN/TURN 服务器发送底层 UDP 探测，从而将用户本地的局域网内网 IP 与运营商分配的真实公网 IP 明文泄露给网页 JavaScript 脚本；OpenAI、Google 及各大安全厂商利用此特性精准封锁使用代理的用户；唯一的彻底防护手段是在浏览器中安装 WebRTC Control 禁用该接口，或开启 TUN 虚拟网卡模式在 L3 网络层实现全局流量拦截。',
    sections: [
      {
        heading: '一、 如何快速自测你是否存在 WebRTC 泄漏？',
        content: `打开著名的在线泄露检测站点（如 [实用工具箱](/tools) 中的 WebRTC 检测工具）：
- 如果页面在“Public IP”栏目显示了你的中国大陆运营商真实 IP，说明泄漏已发生！你的任何外网操作在目标平台眼里均毫无掩饰。
- 只有当该项显示为空白，或者显示的完全是境外节点的代理 IP 时，才代表安全防护合格。`
      },
      {
        heading: '二、 彻底封堵 WebRTC 泄漏的专业方案',
        content: `1. **开启客户端 TUN 模式**：接管操作系统内核级网卡（L3 层），所有外出 UDP 探测包均被强行拉入加密通道。
2. **浏览器插件拦截**：安装 WebRTC Control 扩展，设置模式为 \`Disable WebRTC completely\`。`
      }
    ],
    internalLinks: '在线验证你的真实 IP 是否暴露，请立即使用 [实用工具箱](/tools)；需要从根本上保障环境纯净请参考 [AI 生产力节点推荐](/rankings/ai-services/) 与 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: '禁用 WebRTC 会影响正常的网页浏览吗？',
        a: '绝大多数日常网页浏览、视频播放、文字交流完全不受影响。只有在使用 Google Meet、网页版 Discord 语音聊天或某些在线视频会议系统时，才需要临时开放 WebRTC。'
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

cat3Articles.forEach(item => {
  const md = generateMarkdown(item);
  fs.writeFileSync(path.join('wiki/unblocking', `${item.slug}.md`), md, 'utf8');
  fs.writeFileSync(path.join('docs/wiki/unblocking', `${item.slug}.md`), md, 'utf8');
  console.log('Written:', item.slug);
});

module.exports = cat3Articles;

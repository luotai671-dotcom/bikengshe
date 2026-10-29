export interface WikiFaqItem {
  id: string
  category: 'work-trade' | 'ai-productivity' | 'clients-system' | 'routes-isp' | 'streaming-life'
  categoryName: string
  question: string
  answer: string
  tags: string[]
  internalLink: {
    title: string
    href: string
    ctaText: string
  }
}

export interface WikiFaqCategory {
  id: 'work-trade' | 'ai-productivity' | 'clients-system' | 'routes-isp' | 'streaming-life'
  name: string
  shortName: string
  iconName: string
  badge: string
  description: string
  internalLink: {
    title: string
    href: string
    ctaText: string
  }
}

export const WIKI_FAQ_CATEGORIES: WikiFaqCategory[] = [
  {
    "id": "work-trade",
    "name": "出海办公、外贸与社媒账号风控",
    "shortName": "出海与外贸风控",
    "iconName": "Globe",
    "badge": "11 题",
    "description": "针对 WhatsApp、PayPal、Facebook 广告、亚马逊店铺及境外网银的 IP 漂移与机房风控防范。",
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "ai-productivity",
    "name": "AI 生产力与大模型环境调优",
    "shortName": "AI大模型调优",
    "iconName": "Bot",
    "badge": "11 题",
    "description": "深入排查 ChatGPT 页面空白、Claude 区域弹窗、Midjourney 响应超时与 Cursor 补全断流。",
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "clients-system",
    "name": "全平台客户端与系统底层避坑",
    "shortName": "客户端与系统底层",
    "iconName": "Cpu",
    "badge": "11 题",
    "description": "彻底解决休眠断网、局域网共享失效、卸载代理断网、微信慢及手机端高耗电发热等底层痛点。",
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "routes-isp",
    "name": "网络线路、专线与运营商机制",
    "shortName": "专线与运营商机制",
    "iconName": "Network",
    "badge": "11 题",
    "description": "揭秘长城宽带晚高峰卡顿、中转机宕机全红、IPLC 假专线陷阱及运营商 QoS 丢包底层机理。",
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "streaming-life",
    "name": "流媒体、主机与海外生活娱乐",
    "shortName": "流媒体与主机娱乐",
    "iconName": "Tv",
    "badge": "11 题",
    "description": "解决奈飞代理阻断、PS5/Switch 局域网加速、Disney+ 转圈、Spotify 14 天及电报下载慢。",
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  }
]

export const WIKI_FAQ_MATRIX: WikiFaqItem[] = [
  {
    "id": "faq-01",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "外贸 WhatsApp 为什么一连节点就频繁被封号或提示环境异常？",
    "answer": "原因在于使用了频繁漂移的公共机房 IP，触发了 Meta 底层的 IP 风险评分（Fraud Score）与设备指纹交叉风控。解决步骤：1. 在客户端规则中将 web.whatsapp.com 与 *.whatsapp.net 绑定固定单一国家的静态独享 IP；2. 手机端关闭地理位置授权，修改系统时区与语言为目标国；3. 开启客户端 TUN 模式接管 UDP 协议防止通话直连漏水；4. 新号前三天只进行日常收发，杜绝批量群发。",
    "tags": [
      "WhatsApp",
      "外贸风控",
      "静态IP",
      "分流绑定"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-02",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "PayPal 跨境支付时如何防止因节点 IP 漂移被判定盗刷风控？",
    "answer": "PayPal 拥有最严苛的实时地理风控，若半小时内登录 IP 跨国漂移，系统会判定凭据被盗并冻结账户余额或触发 2FA 死锁。解决步骤：1. 在客户端建立独立策略组，指定低延迟、双 ISP 住宅归属节点专属访问 paypal.com；2. 支付前使用 ipinfo.io 确认出口 IP 与当前浏览器时区、DNS 归属完全一致；3. 杜绝在支付途中切换节点或开关客户端；4. 若遇阻断，静置 2 小时后清空 Cookie 重新发起。",
    "tags": [
      "PayPal",
      "支付风控",
      "IP漂移",
      "双ISP住宅"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-03",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "使用 Google 搜索时总是频繁弹出“人机身份验证”九宫格怎么解决？",
    "answer": "频繁弹出验证码是因当前节点出口承载了海量爬虫请求或过多并发连接，被 Google 识别为可疑自动化脚本聚集地。解决步骤：1. 切换至小众或冷门落地节点，避开万人挤占的热门公共出口；2. 开启客户端 Fake-IP 与远程 DoH 解析，防止本地运营商 DNS 污染将请求导向黑名单机房；3. 使用登录了个人 Google 账号的 Chrome 搜索，权重显著高于无痕模式；4. 私有节点可关闭 IPv6 优先解析。",
    "tags": [
      "Google搜索",
      "人机验证",
      "验证码",
      "IP信誉度"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-04",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "Facebook 广告账户总被误封，是因为节点机房 ASN 污染吗？",
    "answer": "是的。低价数据中心机房的 ASN 往往被大量灰产用于引流，Meta 安全引擎已对整个 IP 段打上高危标签，登录即触发人脸认证或封停 BM 资产。解决步骤：1. 投放必须采购原生双 ISP 住宅静态节点，确保在 IPinfo 中 type 显示为 isp/residential；2. 搭配指纹浏览器固定 Canvas、WebRTC 与硬件哈希；3. 每次登录前检查出口 IP 欺诈分低于 15 分，杜绝多节点轮询。",
    "tags": [
      "Facebook广告",
      "ASN污染",
      "机房黑名单",
      "防封策略"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-05",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "为什么跨境电商访问亚马逊 Seller Central 绝不能开启全局代理？",
    "answer": "全局代理会导致系统将所有网页流量统一经由代理节点发送，极易引发店铺多账号底层关联或被亚马逊识别为异地登录而触发账户降权。解决步骤：1. 客户端必须采用“规则模式（Rule）”，将 amazon.com 及卖家域名锁定至专属固定静态出口；2. 运营多店铺必须使用独立指纹环境与专用纯净双 ISP 节点一对一隔离绑定；3. 严禁不同店铺在同一节点交叉访问；4. 排查 WebRTC 泄漏防止暴露真实 IP。",
    "tags": [
      "亚马逊卖家",
      "全局代理危害",
      "店铺防关联",
      "分流白名单"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-06",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "Gmail 邮箱客户端（如 Foxmail/Outlook）配置 IMAP 无法收取邮件怎么办？",
    "answer": "Foxmail 等邮件客户端默认走直连网络，而国内运营商全面阻断了 Google IMAP（993 端口）与 SMTP（465 端口）的 TCP 握手。解决步骤：1. 开启电脑客户端 TUN 虚拟网卡模式接管所有进程流量；2. 或在 Foxmail 设置中勾选“使用系统代理”填入 127.0.0.1:7890 本地端口；3. 进入 Google 账户安全性页面开启两步验证，并生成专属 16 位“应用专用密码”替换原密码即可瞬间畅通。",
    "tags": [
      "Gmail",
      "Foxmail",
      "IMAP报错",
      "TUN接管"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-07",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "TikTok 网页端能看但手机端黑屏，需要开启哪些底层分流规则？",
    "answer": "TikTok 移动端 App 校验多重网络与硬件信息，不仅检查出口 IP，还主动探测 SIM 卡 MCC 编码与系统区域。解决步骤：1. 手机拔掉国内 SIM 卡或插海外免实名卡；2. 手机系统语言设为英语，地区设为美英，关闭手机定位；3. 客户端开启 TUN 模式或全局规则分流，确保 tiktokv.com、byteoversea.com 走美区原生住宅节点；4. 清空 TikTok 缓存并重启手机后再打开。",
    "tags": [
      "TikTok黑屏",
      "SIM卡检测",
      "原生住宅",
      "区域锁定"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-08",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "LinkedIn 领英登录提示账号受限，如何用干净静态节点避免关联？",
    "answer": "领英近期升级了风控算法，凡检测到单日内跨城市异地登录、机房低成本共享 IP 或浏览器指纹突变，系统会自动限制账号并要求上传证件。解决步骤：1. 在客户端规则组中将 linkedin.com 强制绑定一条固定城市、固定 ASN 的商业静态专线；2. 杜绝在节点列表中开启自动优选或负载均衡测速；3. 保持浏览器 Cookie 长期有效；4. 若已触发受限，静置 24 小时后使用固定节点走申诉通道。",
    "tags": [
      "领英LinkedIn",
      "账号受限",
      "静态节点",
      "防关联"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-09",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "外贸多店铺防关联运营，商业节点与防关联浏览器的网络层如何配合？",
    "answer": "防关联浏览器仅隔离本地设备指纹，若多个环境配置了同一个节点或同 C 段 IP，平台会瞬间在服务端判定关联。解决步骤：1. 为每个店铺单独配置一条独立静态双 ISP 住宅代理（Socks5 格式），实现“一店一号一 IP”；2. 防关联浏览器中开启 WebRTC 禁用或替换为代理公网 IP；3. 客户端开启 DNS 防泄漏，杜绝运营商解析侧漏；4. 登录店铺前确认代理地区、时区与伪装度达 100%。",
    "tags": [
      "多店铺防关联",
      "指纹浏览器",
      "Socks5代理",
      "静态住宅"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-10",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "Slack 与 Zoom 跨国视频会议频繁掉线、卡顿，如何开启 UDP 专线优化？",
    "answer": "跨国音视频通讯高度依赖实时低延迟的 UDP 协议传输，而普通廉价中转节点往往在入口屏蔽 UDP 或遭遇运营商 QoS 严重丢包限速。解决步骤：1. 在客户端配置中检查并勾选“启用 UDP 转发支持（UDP: true）”；2. 优先切换至物理内网传输的 IPLC/IEPL 专线，其丢包率小于 0.1%；3. 将 zoom.us 与 slack.com 添加至低延迟专线策略组；4. 电脑开启 TUN 模式接管底层网络套接字。",
    "tags": [
      "Zoom视频",
      "Slack会议",
      "UDP转发",
      "IPLC低延迟"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-11",
    "category": "work-trade",
    "categoryName": "出海办公与社媒风控",
    "question": "使用国外网银（如 Wise、OCBC）登录时，节点选择有哪些风控雷区？",
    "answer": "境外银行对跨国登录审查极严，雷区包括：万人共用机房节点（易被连带标记）、登录中途自动漂移切换国家、以及出口 IP 欺诈分高于 30。解决步骤：1. 登录 OCBC/Wise 时务必锁定对应开户国原生固定节点；2. 在客户端中为银行官网与 App 配置单独的分流策略组，严禁走负载均衡池；3. 登录 App 时开启全局 TUN 模式保持网络稳定；4. 绝不在开启大促下载时边挂网银，避免高并发流量触发审计。",
    "tags": [
      "Wise网银",
      "OCBC风控",
      "金融安全",
      "原生IP"
    ],
    "internalLink": {
      "title": "选购防封静态与高可用跨境专线",
      "href": "/rankings/best/",
      "ctaText": "查看【2026 稳定梯子选购直通车】→"
    }
  },
  {
    "id": "faq-12",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "ChatGPT 提示“Unable to load site”页面一片空白该如何秒级定位？",
    "answer": "出现该报错通常并非节点失效，而是 Cloudflare 质询脚本在加载时被浏览器缓存冲突或本地 DNS 污染拦截。解决步骤：1. 按 F12 查看 Console，若出现 403，立即切换至美国纯净住宅节点；2. 彻底清理 chatgpt.com 站点数据并强刷（Ctrl+F5）；3. 确保 cdn.oaistatic.com 走代理而非直连；4. 使用 Chrome 无痕模式登录即可恢复。",
    "tags": [
      "ChatGPT空白",
      "Unable to load",
      "Cloudflare",
      "CDN分流"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-13",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "Claude 提示“App unavailable in your region”，换了节点为何依然弹窗？",
    "answer": "Anthropic 对 Claude 实施了前端本地缓存与后端 IP 交叉判定的双重封锁。即便换了美国节点，若未清空被标记区域的持久化缓存，弹窗依然存在。解决步骤：1. 客户端切换至原生解锁 Claude 的美英日纯净节点；2. 打开浏览器按 F12 -> Application -> Storage -> 点击“Clear site data”；3. 关闭浏览器重开，确认 IPinfo 变为美区并重新登录。",
    "tags": [
      "Claude弹窗",
      "区域限制",
      "站点缓存清理",
      "大模型解锁"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-14",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "Midjourney 作图发送后无响应，是 Discord CDN 被本地拦截了吗？",
    "answer": "是的。Midjourney 的指令与图片分别走 gateway 与 cdn.discordapp 两个接口。国内运营商常将 cdn 域名劫持为 127.0.0.1 导致图片无法加载。解决步骤：1. 确认 *.discord.gg 与 *.discordapp.com 全部走代理节点；2. 客户端开启 Fake-IP 模式免疫 DNS 劫持；3. 开启 TUN 虚拟网卡接管 Discord 进程即可秒回作图。",
    "tags": [
      "Midjourney",
      "Discord CDN",
      "DNS劫持",
      "TUN网卡"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-15",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "OpenAI API 接口调用时频繁报 Connection Reset，如何配置反向代理？",
    "answer": "Connection Reset 是由于直连调用 api.openai.com 遭遇防火墙阻断 SNI 探测或本地 TLS 握手异常。解决步骤：1. 在请求代码中设置环境变量 https_proxy 指向本地 127.0.0.1:7890；2. 或在云服务器部署 Worker 反代 api.openai.com；3. 请求头设置 Connection: keep-alive 减少高频建连损耗；4. 开启客户端 TUN 模式接管终端。",
    "tags": [
      "OpenAI API",
      "Connection Reset",
      "反向代理",
      "终端代理"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-16",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "Cursor / Copilot 代码补全频繁断连，怎样让编辑器进程直走代理？",
    "answer": "Cursor 与 Copilot 采用内嵌 Node 进程与 Electron 开发，默认不继承操作系统的标准系统代理设置，导致补全频繁超时。解决步骤：1. 首选方案：客户端开启【TUN 虚拟网卡模式】，实现 L3 网络层无差别接管；2. 备选方案：在编辑器设置中将 Http: Proxy 填入 http://127.0.0.1:7890；3. 重启编辑器窗口即可实现毫秒级补全极速流式响应。",
    "tags": [
      "Cursor",
      "Copilot",
      "代码补全",
      "TUN网卡接管"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-17",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "为什么同一个节点，网页端 ChatGPT 能打开，手机 App 却无法登录？",
    "answer": "手机 App 端接入了苹果 App Attest 与安卓 Play Integrity 设备真实性校验，并强制调用底层接口探测 WebRTC 与真实 IP 归属，风控远超网页版。解决步骤：1. 手机端客户端必须开启 TUN/全局代理模式，杜绝局部绕过；2. 开启客户端 DNS 防泄漏，锁定境外 DoH 服务器；3. 切换至带有原生双 ISP 住宅标识的美国节点；4. 登录前关闭系统定位，手机时区同步设置为纽约时区。",
    "tags": [
      "ChatGPT手机端",
      "App Attest",
      "双ISP住宅",
      "DNS防泄漏"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-18",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "Sora / Suno 等多模态 AI 工具对落地节点住宅纯净度有何特殊要求？",
    "answer": "多模态音视频生成工具官方引入了企业级风控库（如 MaxMind）。任何云厂商机房 IP 会在提交生成指令瞬间触发黑名单静默拦截。解决步骤：1. 坚决使用原生家庭宽带住宅 IP 节点，欺诈分必须控制在 10 分以内；2. 在分流配置中将 *.suno.ai 与 *.sora.com 绑定至独立纯净出口策略组；3. 浏览器禁止开启 WebRTC 穿透；4. 保持账号在固定城市使用，杜绝节点秒级跨国漂移。",
    "tags": [
      "Sora",
      "Suno",
      "多模态AI",
      "家庭宽带住宅"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-19",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "Claude 提示“Your account has been disabled”封号申诉有用吗？",
    "answer": "Anthropic 对违反区域政策与涉嫌批量机房注册的封禁属于算法自动化判决，通常申诉成功率低于 5%。但若确系因误用脏 IP 被误杀且有正规支付凭证，仍可自救。解决步骤：1. 访问 support.anthropic.com 提交 Ticket，用地道英文说明跨国商务办公因公使用；2. 申诉过程必须使用固定美国纯净独享节点；3. 若 48 小时无果，果断使用纯净住宅节点与全新海外手机号重新注册。",
    "tags": [
      "Claude封号",
      "申诉策略",
      "账号禁用",
      "纯净注册"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-20",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "登录 OpenAI 账户时反复陷入 Cloudflare 验证码死循环怎么解决？",
    "answer": "陷入验证码死循环，是由于浏览器指纹异常叠加当前节点 IP 被 Cloudflare 判定为高风险网络，导致质询 Token 校验失败。解决步骤：1. 在客户端立即切换为冷门、少人使用的专线住宅节点；2. 检查浏览器是否安装了隐私拦截类插件（如 AdGuard），临时将其关闭；3. 确认电脑系统时钟已与国家授时中心对齐（偏差超 90 秒必死循环）；4. 更换 Chromium 原生无痕窗口重新登录。",
    "tags": [
      "Cloudflare死循环",
      "人机验证",
      "系统时钟同步",
      "插件冲突"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-21",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "在线大模型流式打字中途卡住，是 TCP Keep-Alive 参数没设置对吗？",
    "answer": "是的。ChatGPT 与 Claude 的打字机效果基于 HTTP SSE 长连接。如果节点中转机或客户端配置了过短的 TCP 超时时间，网络中间层会自动切断长连接导致卡住。解决步骤：1. 在客户端高级配置中将 tcp-keep-alive 调大至 30 秒；2. 优先切换至低丢包内网专线节点；3. 开启 TUN 模式增强套接字稳定性；4. 浏览器关闭省电性能冻结标签页模式。",
    "tags": [
      "SSE打字卡住",
      "长连接断流",
      "TCP Keep-Alive",
      "专线稳定性"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-22",
    "category": "ai-productivity",
    "categoryName": "AI生产力与大模型环境",
    "question": "Hugging Face 下载开源模型权重几十 KB 极慢，如何配置终端代理加速？",
    "answer": "Hugging Face 托管在大文件 CDN，在命令行运行 git clone 或 huggingface-cli 时由于未继承代理而遭遇限速。解决步骤：1. 终端运行：export https_proxy=http://127.0.0.1:7890（Windows 执行 set 变量）；2. 更优解：电脑开启 TUN 虚拟网卡模式，全面接管终端流量；3. 使用 hf-mirror 镜像源或多线程工具 aria2 加速模型拉取。",
    "tags": [
      "HuggingFace",
      "模型下载慢",
      "终端代理",
      "TUN接管"
    ],
    "internalLink": {
      "title": "ChatGPT/Claude 原生住宅防封推荐",
      "href": "/rankings/ai-services/",
      "ctaText": "查看【AI 生产力大模型推荐榜】→"
    }
  },
  {
    "id": "faq-23",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "电脑休眠唤醒后梯子无法联网，必须重启客户端才恢复是怎么回事？",
    "answer": "这是因为 Windows/macOS 休眠时网络网卡供电切断，唤醒后虚拟网卡（Wintun）路由表丢失或内核代理端口发生重连死锁。解决步骤：1. Windows 设备管理器找到网络适配器，右键属性 -> 电源管理，取消勾选“允许计算机关闭此设备以节约电源”；2. 客户端设置中打开“TUN 自动重连”；3. macOS 睡眠前点击断开代理，唤醒后再连；4. 唤醒后无网时在客户端一键“重启内核”即可。",
    "tags": [
      "休眠断网",
      "Wintun虚拟网卡",
      "电源管理",
      "自动重连"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-24",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "为什么开启梯子后局域网共享文件、网络打印机全部搜不到了？",
    "answer": "原因在于开启了全局代理或开启 TUN 模式时未配置局域网绕行，导致访问 192.168.x.x 本地私网地址被强行重定向到了境外远端节点。解决步骤：1. 客户端路由设置中务必将模式从“Global（全局）”切回“Rule（规则分流）”；2. 在设置中找到“绕行私有网络（Bypass Private/LAN）”并勾选开启；3. TUN 模式配置中确认将私有 IP 段（192.168.0.0/16 等）加入白名单即可正常访问。",
    "tags": [
      "局域网共享",
      "打印机连接",
      "私网绕行",
      "TUN白名单"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-25",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "手机端小火箭/Clash 后台运行发热严重且耗电飞快，该关掉哪些开关？",
    "answer": "手机端高发热高耗电主要源于频繁的后台定时测速、全量连接日志写入与无节制的 UDP 唤醒机制。解决步骤：1. 在客户端设置中关闭“自动后台定时测速”，改为手动测速；2. 将客户端日志级别（Log Level）从 Debug/Info 调低至 Error 或完全关闭日志输出；3. 开启“低内存/省电模式”；4. 安卓端开启分应用代理，仅允许海外应用走代理，杜绝国产常驻应用无休止消耗算力。",
    "tags": [
      "小火箭发热",
      "耗电优化",
      "日志关闭",
      "分应用代理"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-26",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "电脑卸载代理软件后彻底断网（打不开任何网页）如何 30 秒急救恢复？",
    "answer": "这是由于代理软件未关闭“系统代理”就退出或卸载，导致系统底层网络回环端口（如 127.0.0.1:7890）未被还原。解决步骤：1. Windows 打开“代理服务器设置”，找到“使用代理服务器”手动关闭；2. macOS 打开“系统设置 -> 网络 -> 代理”，将 Web 代理前勾选取消并保存；3. 若仍无法联网，在管理员命令行执行 netsh winsock reset 重置网络栈后重启。",
    "tags": [
      "卸载断网",
      "系统代理还原",
      "急救指南",
      "Winsock重置"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-27",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "电脑开机自启 Clash 后提示“系统代理设置失败，权限不足”怎么处理？",
    "answer": "出现该报错主要是因为代理软件尝试写入 Windows 注册表 Internet Settings 键值时，被系统 UAC 权限控制或本地安全软件（如火绒/360）静默拦截。解决步骤：1. 找到软件安装图标，右键属性 -> 兼容性 -> 勾选“以管理员身份运行此程序”；2. 在杀毒软件中将该代理进程添加至主动防御信任白名单；3. 若使用 TUN 模式，在软件内点击“安装服务模式（Service Mode）”即可彻底解决。",
    "tags": [
      "权限不足",
      "管理员运行",
      "Service服务模式",
      "注册表拦截"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-28",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "为什么微信、企业微信收发图片极慢？如何配置国内直连白名单？",
    "answer": "这是因为微信媒体资源 CDN 域名（如 *.qpic.cn、*.weixin.qq.com）未被正确分流，被错误丢进了境外代理池发生跨国绕路。解决步骤：1. 确认客户端处于“Rule（规则）”模式；2. 更新客户端 GeoSite 规则库，确保 geosite:cn 策略指向 DIRECT（直连）；3. 在自定义用户规则中追加 DOMAIN-SUFFIX,qpic.cn,DIRECT 即可秒发图片。",
    "tags": [
      "微信图片慢",
      "规则分流",
      "GeoSite",
      "国内直连白名单"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-29",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "Mac 端 Safari 能正常跨境网络加速但 Chrome 却打不开网页，该查哪里？",
    "answer": "Safari 默认走系统全局代理，而 Chrome 支持自主扩展与安全 DNS，常因内部扩展冲突导致跨境网络加速失效。解决步骤：1. 检查 Chrome 是否安装了 SwitchyOmega 插件，将其切换为“使用系统代理”；2. 打开 Chrome 设置 -> 安全 -> 关闭“使用安全 DNS”；3. 地址栏输入 chrome://net-internals/#sockets 点击“Flush socket pools”清空连接池。",
    "tags": [
      "Mac Chrome打不开",
      "SwitchyOmega",
      "安全DNS冲突",
      "Socket清空"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-30",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "为什么测速节点延迟极低（10ms），但下载文件速度却只有几百 KB？",
    "answer": "客户端列表中看到的 10ms 仅是本地到国内中转入口的 TCP Ping 延迟，根本无法代表跨境骨干网与真实落地服务器的实际吞吐能力。解决步骤：1. 摒弃表面 TCP Ping，在客户端右键运行“真实连接测速（Real Web Latency）”；2. 几百 KB 限速通常因服务商对单线程流速进行了严重超售限速，建议更换晚高峰大带宽 IPLC 物理专线；3. 客户端开启多线程并发拉取以测出真实峰值速率。",
    "tags": [
      "假延迟真相",
      "TCP Ping骗局",
      "单线程限速",
      "晚高峰超售"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-31",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "安卓手机开启代理后状态栏钥匙图标频繁消失闪退，如何锁定常驻？",
    "answer": "国内安卓系统定制 ROM（如澎湃、鸿蒙、OriginOS）具备激进的后台杀进程机制，会将持续占用 VPN 接口的客户端判定为高耗电直接强杀。解决步骤：1. 手机系统设置 -> 电池 -> 找到代理 App，后台耗电策略从“智能省电”改为【无限制】；2. 在多任务后台界面长按该应用卡片点击“加锁（锁定后台）”；3. 在系统设置中搜索“VPN”，勾选【始终开启的 VPN】；4. 开启自启权限。",
    "tags": [
      "安卓闪退",
      "后台保活",
      "常驻钥匙图标",
      "电池无限制"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-32",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "订阅转换后的节点链接导入客户端提示“Invalid YAML/Config”怎么修复？",
    "answer": "Invalid YAML 错误通常由于节点别名包含中文全角冒号引起 YAML 语法缩进崩塌，或公共订阅转换后端返回了防刷防盗链报错页。解决步骤：1. 用浏览器直接打开转换链接，检查返回的是否为纯文本 YAML 配置还是 HTML 报错；2. 在客户端首选项中切换转换后端为备用后端；3. 更新客户端内置内核（Mihomo/Meta）至最新版以兼容新语法；4. 优先使用服务商后台下发的原生免转换订阅链接直接导入。",
    "tags": [
      "Invalid YAML",
      "配置报错",
      "订阅转换失败",
      "内核更新"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-33",
    "category": "clients-system",
    "categoryName": "客户端与系统底层避坑",
    "question": "为什么有的节点标记“0.1x倍率”，低倍率节点真的划算吗？",
    "answer": "0.1x 倍率意味着消耗 10GB 实际流量只在账单中扣除 1GB 额度。但这类节点通常部署在低成本公网直连回国线路或冷门机房中，晚高峰丢包率可能高达 30% 以上，容易发生频繁断流。使用建议：1. 0.1x 节点极其适合挂机后台下载大体积开源数据集、网盘备份或同步 Steam 游戏更新；2. 绝不可用于视频会议、实时竞技网游或登录重要账户；3. 日常核心办公仍应首选 1.0x 稳定专线节点。",
    "tags": [
      "0.1x低倍率",
      "超售线路",
      "大文件下载",
      "性价比权衡"
    ],
    "internalLink": {
      "title": "客户端崩溃、TUN报错与断网秒级自救",
      "href": "/troubleshooting/",
      "ctaText": "查阅【排障总览与故障诊断树】→"
    }
  },
  {
    "id": "faq-34",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "家里宽带是长城宽带/广电网络，为什么用什么节点晚高峰都卡？",
    "answer": "二级宽带运营商自身没有一级国际出海骨干网出口，全靠向电信、联通购买国内转售带宽。晚高峰期间，其跨网穿透结算带宽被严重压缩拥塞。解决步骤：1. 严禁使用普通直连节点，必须选择具备多地 BGP 入口与三网动态接入能力的节点；2. 优先选用 Hysteria2 或 TUIC 等基于 UDP 的协议，依靠暴力丢包抢跑突破跨网 QoS 压制；3. 根本性解决方案：宽带到期后更换为中国电信或联通光纤。",
    "tags": [
      "长城宽带",
      "广电宽带",
      "跨网结算",
      "Hysteria2协议"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-35",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "为什么移动宽带连香港节点很顺畅，连日本/美国节点延迟却极高？",
    "answer": "中国移动拥有自主搭建的华南出海王牌通道——CMI 直连海缆，在广州与香港之间带宽冗余极大。但移动在日美方向骨干网与当地运营商的跨国 Peering 互联较差，走公网往往绕道欧美一大圈。解决步骤：1. 移动宽带用户日常首选“香港 CMI”线路节点，延迟可低至 15ms；2. 若必须访问美国服务，选用服务商提供的“香港中转至美国（内网互联）”专线节点，避免公网绕路。",
    "tags": [
      "中国移动CMI",
      "香港海缆",
      "三网选路",
      "跨国绕路"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-36",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "晚高峰 20:00 到 23:00 骨干网 QoS 限速到底是什么网络机制？",
    "answer": "晚高峰跨境流量暴增至日常峰值的 3-5 倍，运营商骨干网路由器会开启服务质量管理（QoS），优先保障政企专线与高优先级大客户。普通公网直连流量（特别是高熵特征密文）会被路由器无差别丢弃，丢包率瞬间飙升至 40% 以上。解决对策：唯一能免疫 QoS 压制的是走局域网内网传输的 IPLC/IEPL 物理专线，其物理隔离不走公网防火墙，全时段丢包率低于 0.1%，全天速度跑满。",
    "tags": [
      "晚高峰QoS",
      "骨干网拥堵",
      "高熵特征丢包",
      "IPLC专线"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-37",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "什么是“中转机宕机”？为什么入口挂了即使落地节点活着也会全红？",
    "answer": "现代节点采用“国内入口中转机 -> 跨境传输通道 -> 境外落地机”的三层拓扑。客户端测速和发包首先要连接国内中转服务器。一旦国内中转机遭上游通报拔线、DDoS 攻击或云厂商阻断，流量根本无法到达境外落地服务器，导致所有挂在同一入口下的全部节点瞬间飘红 Timeout。判断标准：若同服务商多国节点同时全红，99% 是国内入口宕机，只需等待运维更换灾备入口即可自动恢复。",
    "tags": [
      "中转机宕机",
      "网络拓扑",
      "入口拔线",
      "全红Timeout"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-38",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "节点名字里的“BGP 多线中转”相比“单线中转”有什么决定性优势？",
    "answer": "单线中转服务器通常只接入单一运营商（如纯电信单线），移动或联通用户连入时需经历恶劣的跨网穿透，延迟暴增。而 BGP 多线中转在入口侧同时聚合了电信、联通、移动与教育网 BGP 路由协议，无论用户使用什么宽带，路由器均能毫秒级实现同网就近接入，且当某条入站链路发生割接中断时，BGP 协议可在 5 秒内自动秒切备用光纤容灾，保障全天候不掉线，跨网零丢包体验极佳。",
    "tags": [
      "BGP多线",
      "智能选路",
      "自动容灾",
      "跨网零丢包"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-39",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "为什么有些服务商标注的 IPLC 专线在网络链路维护高发期也会出现波动维护？",
    "answer": "市场上充斥着大量虚假劣质的“假专线”。有些黑心商家为了节省成本，实际使用的是普通公网中转伪装为专线；另一些即便租用了正规专线，在跨国路由震荡期也会因上游合规整顿被工信部拉闸审查国内入站端点。真正的企业级物理专线具备双向二层透明光缆（点对点私网），且常备香港/上海双入口灾备切换。遇到跨国路由震荡期全红的所谓专线，多为廉价合租小作坊盘，建议尽早更换为拥有多活冗余的大厂正规服务。",
    "tags": [
      "真假IPLC",
      "假专线陷阱",
      "合规拉闸",
      "双入口灾备"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-40",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "落地节点的原生 IP 和广播 IP 在实际使用中有哪些肉眼可见的区别？",
    "answer": "原生 IP 指 IP 物理注册属地、BGP 广播地与机房地理位置完全一致且从未变更；广播 IP 则是将欧美甚至非洲注册的廉价 IP 段通过 BGP 宣告广播到香港机房使用。肉眼可见区别：广播 IP 打开 Google 经常强跳其他中东国家、无法完整解锁奈飞非自制剧或弹 403、注册大模型账号极易秒封；而原生 IP 打开流媒体即显示本地全部片源，登录网银与风控平台畅通无阻。",
    "tags": [
      "原生IP",
      "广播IP区别",
      "流媒体版权",
      "防封风控"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-41",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "什么是 DNS 缓存投毒？节点开启远程 DNS 解析为什么能彻底免疫？",
    "answer": "国内运营商通过网关对未经加密的 UDP 53 端口 DNS 请求进行抢答式污染，篡改真实 IP 并下发虚假回环地址（如 127.0.0.1）。如果节点依然依赖本地解析，即便开启跨境网络加速网页依然打不开。解决步骤：在客户端中将 DNS 模式修改为【Fake-IP】并开启远程解析，本地完全不发起真实解析，而是由境外的出口服务器向 Google/Cloudflare 发起加密 DoH 解析，从而在架构层彻底免疫 DNS 投毒。",
    "tags": [
      "DNS投毒",
      "运营商劫持",
      "Fake-IP模式",
      "DoH加密"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-42",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "为什么手机连 5G 信号用梯子比连家里 Wi-Fi 更稳定、丢包更少？",
    "answer": "一方面，家庭 Wi-Fi 路由器常存在信道干扰、2.4GHz 频段拥塞以及本地宽带在晚高峰针对国际连接的激进 QoS 丢包；另一方面，三大运营商的 5G 基站移动蜂窝核心网（5GC）直连省际骨干核心交换机，拥有极高的链路优先级与更短的跳数。解决步骤：若在家里 Wi-Fi 玩游戏或开会频繁卡顿，可尝试直接切换为手机 5G 热点，或在客户端中开启 Hysteria2 协议对抗本地宽带丢包。",
    "tags": [
      "5G网络优势",
      "Wi-Fi干扰",
      "基站优先级",
      "丢包排查"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-43",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "梯子被运营商检测并阻断端口后，节点是永久失效还是会自动更换？",
    "answer": "公网直连节点一旦遭到防火墙探测并拉黑端口/IP，该地址在封锁周期内无法恢复直连。正规大型服务商配备了全自动探测与动态迁移系统：当后台监测到某入口丢包率达 100% 时，健康检查脚本会在 2-5 分钟内自动将 DNS 域名解析热切换至备用 Anycast 入口或更替备用 IP 段，用户在客户端执行一次“更新订阅”即可拉取全新可用节点，无需手动更改配置，保障服务高可用。",
    "tags": [
      "端口阻断",
      "动态迁移",
      "自动容灾",
      "更新订阅"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-44",
    "category": "routes-isp",
    "categoryName": "专线拓扑与运营商机制",
    "question": "为什么有些节点看 YouTube 识别为阿联酋或罗马尼亚？如何纠正定位？",
    "answer": "这是由于该节点的公网 IP 历史归属地在 MaxMind 或 IPinfo 数据库中曾注册于该国，而 Google 没有完全更新该 IP 的最新 BGP 落地定位。解决步骤：1. 在客户端规则组中更换为标有“原生/本地”字样的节点；2. 打开浏览器访问 google.com/preferences，在最底部的“区域设置（Region Settings）”中手动将当前国家强制锁定为中国香港或美国；3. 清理浏览器地理位置权限与缓存。",
    "tags": [
      "YouTube定位错误",
      "IP数据库延迟",
      "区域设置",
      "原生纠偏"
    ],
    "internalLink": {
      "title": "晚高峰合规跨国专线传输物理内网专线实测",
      "href": "/rankings/iplc-iepl/",
      "ctaText": "查看【晚高峰抗封锁专线评测榜】→"
    }
  },
  {
    "id": "faq-45",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "奈飞 Netflix 提示“您似乎正在使用解除封锁工具或代理”怎么解？",
    "answer": "出现该报错意味着 Netflix 版权风控系统已将当前节点的 IP 识别为机房托管代理服务器，并对所有非自制独家版权影片实施了地域封锁。解决步骤：1. 客户端切换至带有“NF/Netflix 原生解锁”标记的专线住宅节点；2. 客户端分流策略组中将 Netflix 单独指定到解锁出口；3. 浏览器按 Ctrl+Shift+Delete 清空 Cookie 缓存；4. 电视盒子强制清除 Netflix 数据后重登。",
    "tags": [
      "Netflix代理报错",
      "非自制剧解锁",
      "原生住宅",
      "流媒体风控"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-46",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "PS5 / Switch 主机怎样通过电脑客户端做局域网代理加速联机？",
    "answer": "游戏主机自身无法安装代理软件，可通过局域网共享代理或软路由实现流量中转。解决步骤：1. 确保电脑与 PS5/Switch 连接在同一个路由器 Wi-Fi 下；2. 电脑客户端开启“允许来自局域网的连接（Allow LAN）”，并记下电脑的内网 IP（如 192.168.1.5）与端口 7890；3. 主机进入网络设置 -> 自定义 Wi-Fi 连接 -> 代理服务器选【使用】，填入电脑内网 IP 与端口即可极速联机更新。",
    "tags": [
      "PS5加速",
      "Switch局域网代理",
      "Allow LAN",
      "主机联机"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-47",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "Steam 商店转区后购买游戏提示“发生意外错误”，是节点被标记了吗？",
    "answer": "是的。Steam 为打击低价区薅羊毛引入了极其严格的风控机制：不仅核对当前登录 IP 是否为目标国住宅宽带，还会校验支付方式是否为当地发行的银行卡。解决步骤：1. 必须使用目标国原生独享住宅节点，且全程关闭 WebRTC 穿透；2. 严禁使用国内发行的万事达/Visa 双币卡强刷阿根廷/土耳其区，必须使用当地充值卡兑换余额；3. 购前确认客户端已开启 TUN 模式接管 Steam 平台流量。",
    "tags": [
      "Steam转区",
      "意外错误",
      "住宅节点",
      "支付风控"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-48",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "为什么 Disney+ 登录后只显示转圈，连首页海报都刷不出来？",
    "answer": "Disney+ 采用了高度严苛的 DRM 证书链验证与边缘分发网络。首页海报转圈通常是因为静态资源域名 *.bamgrid.com 或认证 API 被客户端误判为直连，或者落地机未通过 Widevine L1 认证。解决步骤：1. 客户端更新至最新内置分流规则，确保 Disney+ 策略组内所有子域名完整走代理；2. 换用具备双 ISP 住宅属性的美国/新加坡原生节点；3. 浏览器关闭硬件加速尝试重新加载。",
    "tags": [
      "Disney+转圈",
      "DRM版权认证",
      "Widevine",
      "住宅节点"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-49",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "苹果手机 App Store 切换美区账号后无法搜索到 TikTok/小火箭怎么办？",
    "answer": "搜不到小火箭通常有两个原因：1. 账号并没有真正成功切换至美区，当前仍停留在国区缓存；2. 在设置中错误登录了 iCloud 而非 App Store。解决步骤：1. 打开 App Store 软件，点击右上角头像滑动至最底部点击【退出登录】；2. 重新输入美区 Apple ID 密码登录（切记不要在手机系统设置里登录）；3. 搜索栏输入 Shadowrocket，能看到售价 2.99 美元的官方正版小火箭即代表成功切区。",
    "tags": [
      "美区AppleID",
      "小火箭搜索",
      "AppStore切换",
      "防锁机"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-50",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "YouTube 视频经常自动降画质到 480P，如何锁死默认 4K 分辨率？",
    "answer": "自动降画质是 YouTube 根据当前连接的 TCP 缓冲区流速动态调整的保护策略，反映了当前节点晚高峰下行带宽抖动严重。解决步骤：1. 换用晚高峰真实测速大于 100Mbps 的优质专线节点；2. 在 Chrome 扩展商店安装“Enhancer for YouTube”插件，将默认画质锁死为【2160p 4K】；3. 客户端开启 TUN 模式增大 TCP 缓冲窗口；4. 关闭 QUIC 强制走 TCP BBR 加速。",
    "tags": [
      "YouTube画质",
      "锁死4K",
      "Enhancer插件",
      "缓冲抖动"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-51",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "Spotify 网页端提示“国家/地区限制，请在 14 天内出境使用”怎么破？",
    "answer": "Spotify 免费版限制了非注册所在国漫游时间（最长 14 天），到期后会强制下线。解决步骤：1. 在客户端连接注册时所属国家（如美区/港区/菲区）的节点；2. 登录 spotify.com 官网个人中心，点击“编辑个人资料”，确认国家/地区已被选中为节点所在国家并点击保存；3. 重新登录客户端即可再畅享 14 天；4. 根本解决方案：加入 Spotify 家庭组 Premium 会员，彻底永久解除漫游时限。",
    "tags": [
      "Spotify漫游",
      "14天限制",
      "跨区锁定",
      "家庭组会员"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-52",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "Twitch 弹幕和直播画面不同步、频繁卡顿，该切换哪类分流规则？",
    "answer": "Twitch 的直播视频流与聊天室弹幕分别运行在 HLS 切片分发和 WebSocket 长连接协议上。廉价节点经常因为 TCP 拥塞导致 WebSocket 心跳重连。解决步骤：1. 在分流规则中将 *.twitch.tv 与 *.ttvnw.net 强制加入代理策略组；2. 切换至物理延迟低于 50ms 的近场香港或台湾 BGP 中转节点；3. 客户端关闭激进的广告拦截插件；4. 播放器设置内开启低延迟模式。",
    "tags": [
      "Twitch卡顿",
      "弹幕不同步",
      "WebSocket长连接",
      "低延迟策略"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-53",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "为什么用梯子下载 Telegram 大视频和文件很慢？有专门的加速参数吗？",
    "answer": "Telegram 采用分布式的 DC（数据中心）架构，大文件通常存储在远端（如阿姆斯特丹 DC4 或新加坡 DC5），单线程传输容易遭遇跨大西洋海缆瓶颈。解决步骤：1. 客户端规则必须将 *.telegram.org 与相关 CDN 网段加入直连或专线代理；2. 在 Telegram 桌面端设置 -> 高级中手动设置本地 Socks5 代理（127.0.0.1:7890）；3. 安装第三方客户端（如 Nekogram）开启多线程加速。",
    "tags": [
      "Telegram下载慢",
      "DC数据中心",
      "Socks5代理",
      "多线程加速"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-54",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "港区原生节点为什么有时候无法观看 TVB 或 ViuTV 的限区直播？",
    "answer": "TVB Anywhere 与 ViuTV 对香港本土版权实施了更严苛的 ISP 白名单校验，普通的香港机房托管 IP（如 Hosting 广播 IP）会被一律拦截。解决步骤：1. 必须使用香港原生 HKT（香港电讯）或 HKBN（香港宽频）家庭住宅宽带节点；2. 客户端开启 Fake-IP 模式并指定香港本地 DoH 解析，杜绝境外公共 DNS 将请求解析至海外 CDN 边缘节点；3. 清理浏览器地理位置缓存后即可正常开播。",
    "tags": [
      "TVB直播",
      "ViuTV限区",
      "香港原生住宅",
      "HKT宽带"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  },
  {
    "id": "faq-55",
    "category": "streaming-life",
    "categoryName": "流媒体娱乐与海外生态",
    "question": "什么是家庭组“合租车”？合租 Netflix/Disney+ 会导致梯子节点被封吗？",
    "answer": "合租车是多位用户平摊官方家庭账号费用的合规拼车行为。合租本身不会导致节点被封，但若车内其他成员使用了带有恶意扫描行为的脏节点登录，容易导致流媒体账号触发“异地同享风控”甚至全车被退款封号。避坑建议：1. 车内成员尽量保持同国同区登录；2. 个人使用稳定合规的专线节点，不频繁跨大洲漂移；3. 优先选择正规自动发卡、具备翻车包赔的合租平台，保障账号长期稳定与资金安全。",
    "tags": [
      "家庭组合租",
      "Netflix拼车",
      "同享风控",
      "安全避坑"
    ],
    "internalLink": {
      "title": "Netflix/Disney+ 4K原生家庭宽带解锁",
      "href": "/rankings/streaming/",
      "ctaText": "查看【4K/8K 流媒体解锁榜】→"
    }
  }
]

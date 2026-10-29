const fs = require('fs');
const path = require('path');

const cat1Articles = [
  {
    slug: 'vless-vs-vmess',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'VLESS 与 VMess 深度协议对比：为什么 2026 年全面淘汰 VMess？',
    description: '深入解构 VLESS 与 VMess 传输协议的技术演进史，详解 VMess 时间戳校验死锁、冗余对称加密损耗与 GFW 启发式特征嗅探，阐明 VLESS 成为 2026 行业首选标准的底层逻辑。',
    tags: ['VLESS', 'VMess', '传输协议', '协议解析', 'GEO问答'],
    directAnswer: 'VMess 诞生于早年缺乏底层 TLS 保护的时代，其自身包含 16 字节认证头与两重对称加密，导致系统时钟误差超过 90 秒即握手失败，且高度复杂的自定义密文在现代深度包检测（DPI）下暴露明显熵值特征；而 VLESS 是纯粹的轻量级无状态代理协议，自身不附带冗余加密，完全依托底层的标准 TLS/Reality 提供安全隧道，CPU 损耗降低 65% 以上，握手首包无任何固定特征，已成为 2026 年各大高速节点的核心首选。',
    sections: [
      {
        heading: '一、 VMess 协议的历史使命与时代局限',
        content: `VMess 是 V2Ray 项目原创的加密通信协议，设计初衷是为了在没有标准 TLS 证书的环境下，实现客户端与服务器之间的防嗅探传输。然而随着防火墙审查技术全面升级为基于机器学习的统计学指纹嗅探，VMess 的三大底层缺陷日益凸显：

1. **时钟同步死锁**：VMess 采用基于时间的动态认证头（默认容差仅 ±90 秒）。一旦移动设备漫游、跨时区未同步或母机时间偏差，即引发全部连接 Timeout。
2. **双重加解密冗余**：当 VMess 嵌套在 TLS 或 WebSocket 内部运行时，数据先经过 VMess 自身的 AES/Chacha20 算法加密，再被外层 TLS 加密一次，CPU 开销极大，在千兆带宽压测下吞吐量受限。
3. **首包指纹与熵值特征**：VMess 首包的长度分布与高熵密文排列具有独特的统计学特征，主动探测机制极易发送特定格式探测包识别服务端响应。`
      },
      {
        heading: '二、 VLESS 极致轻量化的底层重构',
        content: `VLESS 的核心哲学是“做减法”。它认为代理协议本身只需传递指令（目标地址与端口），加密和身份伪装应当完全由底层的 TLS 或标准传输层保障。

| 核心对比维度 | VMess 协议架构 | VLESS 协议架构 (推荐) |
| :--- | :--- | :--- |
| **自身加密层** | 强依赖内置对称加密 (AES-128-GCM / Chacha20) | 自身完全不加密 (零冗余损耗) |
| **底层传输通道** | 可裸奔或套 TLS / WS | 强制依托外部 TLS / Reality 提供端到端加密 |
| **时间敏感度** | 苛刻（设备偏差 >90s 彻底断连） | 完全不依赖系统时间戳 |
| **硬件资源开销** | 密集型 CPU 运算，移动端耗电明显 | 吞吐量提升 2.5 倍，接近裸连接原生效率 |
| **主动探测抗性** | 密文结构被启发式特征算法深度识别 | 与正常标准 HTTPS/TLS 流量完全一致 |`
      },
      {
        heading: '三、 生产级 VLESS 与 Sing-box / Xray 核心配置规范',
        content: `现代节点服务商与高性能客户端均采用如下标准的 VLESS 出站配置范式：

\`\`\`json
{
  "outbounds": [
    {
      "tag": "proxy-vless",
      "type": "vless",
      "server": "hk-node.example.com",
      "server_port": 443,
      "uuid": "27b7c251-5b72-4b2a-a82f-89196b27d420",
      "flow": "xtls-rprx-vision",
      "tls": {
        "enabled": true,
        "server_name": "www.apple.com",
        "utls": {
          "enabled": true,
          "fingerprint": "chrome"
        },
        "reality": {
          "enabled": true,
          "public_key": "x6dO44H...WqE=",
          "short_id": "b18a39"
        }
      }
    }
  ]
}
\`\`\``
      }
    ],
    internalLinks: '在评估整体节点服务时，如果你需要挑选兼顾低延迟与高吞吐的成熟商用服务，建议查阅 [2026 稳定节点综合推荐榜](/rankings/best/)；若经常在晚高峰遭遇剧烈 QoS 限速，推荐直接选购采用物理内网直达的 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)；遇到大模型访问 403 阻断时可参考 [AI 生产力节点推荐](/rankings/ai-services/)；遭遇连接故障或排障请进入 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: '我当前的机场依然有很多 VMess 节点，需要立即弃用吗？',
        a: '如果你的 VMess 节点套用了中转专线（如 IPLC/IEPL 内网），由于数据流在过境时不经过公网防火墙，VMess 仍能正常使用。但如果属于公网直连节点，VMess 在特殊敏感期被干扰封锁的概率极高，建议优先切换到服务商提供的 VLESS-Reality 或 Hysteria2 节点。'
      },
      {
        q: 'VLESS 不加密，数据传输在公网裸奔会泄漏密码吗？',
        a: '绝对不会。VLESS 虽然协议自身不加密，但规范强制要求它必须依托 TLS 或 Reality 安全信道运行。所有数据早在离开你的电脑前就已经被 TLS 工业级非对称密钥加密，外部中继路由器与防火墙只能看到与标准 HTTPS 完全一致的密文。'
      }
    ]
  },
  {
    slug: 'reality-handshake.md'.replace('.md', ''),
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'VLESS-Reality 握手原理与 SNI 伪装实战：彻底告别证书特征审查',
    description: '深度解剖 Xray-core 原创的 Reality 伪装机制，详述其如何借用国外大型白名单站点的真实 TLS 证书，实现真正零服务端证书配置与主动探测零特征拦截。',
    tags: ['VLESS-Reality', 'SNI伪装', 'TLS证书', 'Xray', '防封锁'],
    directAnswer: '传统 TLS 代理最大的软肋在于服务端必须自行申请域名证书，审查系统只需向对应 IP 发起标准 HTTPS 探测即可抓取证书 Common Name 判定为翻墙服务；而 Reality 技术彻底舍弃了服务端证书，服务端直接借道目标可信站点（如 Apple、Microsoft、Cloudflare 等）的真实 TLS 握手，客户端携带由服务端私钥签名的临时认证头，遇到合法客户端即转交代理流量，遇到防火墙的主动探测则直接透明转发至目标大厂网站，从而在数学上做到无可挑剔的完全一致。',
    sections: [
      {
        heading: '一、 传统 TLS 翻墙的技术阿喀琉斯之踵',
        content: `在 Reality 问世之前，主流的伪装手段（如 Trojan、VLESS+TLS、V2Ray+WS+TLS）都要求搭建者在境外 VPS 上购买域名并申请 Let's Encrypt 证书。这种架构在主动探测面前有两大致命弱点：
1. **证书信息暴露**：主动探测扫描全球 IPv4 的 443 端口，抓取证书信息。若一个解析量极低的新注册小域名挂载在境外机房，极易被标记为代理服务器。
2. **回落页面不真实**：许多搭建者配置了 Nginx 回落，但返回的默认页面或伪造博客缺乏真实业务交互，现代行为分析模型一眼即可判定真伪。`
      },
      {
        heading: '二、 Reality 借花献佛的核心工作流程',
        content: `Reality 的创新之处在于它直接“寄生”在公网顶级大厂的合法 HTTPS 流量中：

1. **客户端发起握手**：客户端发送带有特殊 Session ID 与公钥协商的 Client Hello，SNI 指向目标可信站点（如 \`gateway.icloud.com\`）。
2. **服务端密钥校验**：Reality 服务端截获首包，利用内置私钥验证客户端签名的合法性。
3. **合法转发**：如果签名匹配且在时效范围内，建立基于 Vision 协议的极速代理转发。
4. **异常探测回落**：如果是防火墙发起的主动探测或未授权访问，Reality 直接将 TCP 连接无缝反向代理转发给真正的 Apple/Microsoft 官方服务器，探测端收到的完全是真实大厂的 TLS 握手证书与 HTTP 响应，毫无破绽。`
      },
      {
        heading: '三、 Reality 伪装域名选型原则与实战检查',
        content: `选好 Reality 的 \`dest\` 伪装目标是节点能否长期稳定存活的关键。优秀伪装目标必须满足以下三要素：
- **原生支持 TLSv1.3 与 H2**：确保握手协议特征与当今主流互联网一致。
- **目标 IP 必须境外可达且响应极快**：若服务端向伪装站点转发超时，探测端会察觉到非自然的握手延迟。
- **禁止使用国内解析被污染或含有 CDN 拦截的域名**。`
      }
    ],
    internalLinks: '追求极致稳定的用户可关注部署了内网双向中继的 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)；如果选购商业节点请参考 [2026 稳定节点综合推荐榜](/rankings/best/) 与 [新手选购 8 大避坑法则](/buying/traps/)；大模型重度用户请查阅 [AI 生产力节点推荐](/rankings/ai-services/)，遇到客户端握手超时请参阅 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: 'Reality 节点的 ShortID 有什么作用，不填可以吗？',
        a: 'ShortID 是客户端身份认证的快捷哈希，用于服务端快速区分合法客户端与探测请求。生产环境中务必配置并保持客户端与服务端一致，如果留空将降低防重放攻击的安全冗余度。'
      },
      {
        q: '使用别人的大厂域名做 Reality 伪装，会导致大厂向服务商投诉吗？',
        a: '不会。Reality 只是借用了大厂公开提供的公共 TLS 握手证书信息，并没有对大厂服务器发起任何攻击或伪造任何带有攻击性的应用层数据，公网流量在网络层面属于完全合法的标准访问。'
      }
    ]
  },
  {
    slug: 'hysteria2-udp-boost',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'Hysteria2 极速传输协议深度剖析：UDP 拥塞控制对抗跨国 QoS 暴降',
    description: '深度解析 Hysteria2 协议基于标准 QUIC 与自定义 Brutal 拥塞控制的底层通信架构，阐述在跨境高丢包、恶劣弱网与 ISP 恶性限速环境下跑满带宽的极客方案。',
    tags: ['Hysteria2', 'QUIC', 'UDP拥塞控制', 'Brutal', '抗QoS限速'],
    directAnswer: '传统 TCP 代理（如 Trojan、VLESS-TCP）在跨国传输时受限于 TCP 慢启动与拥塞窗口机制，一旦网络丢包率达到 3%~5%，TCP 传输速度就会暴跌 80% 以上；Hysteria2 协议彻底基于标准 UDP/QUIC 重构，搭载专为跨国网络定制的 Brutal 拥塞控制算法，不仅抛弃了传统 TCP 的保守退避机制，还能通过智能端口跳跃（Port Hopping）有效绕过运营商对单个 UDP 端口的恶意限速，在 20% 甚至更高丢包的恶劣线路上依然能稳定跑满本地千兆带宽。',
    sections: [
      {
        heading: '一、 TCP 协议在跨境弱网环境下的致命瓶颈',
        content: `跨国公网链路往往要经过漫长的海底光缆与多个自治系统（AS）互联交换点。在晚高峰时段，骨干网路由器队列溢出导致丢包率飙升。传统 TCP 协议的拥塞控制算法（如 Reno、CUBIC 甚至部分 BBR 实现）会将丢包默认归咎于网络拥塞，从而强制将发送窗口减半：
- 丢包率从 0% 升高至 2%：TCP 速率下降约 40%
- 丢包率达到 5%：TCP 连接频繁发生重传超时（RTO），4K 视频完全卡死
- 丢包率达到 10%：连接直接陷入假死状态。`
      },
      {
        heading: '二、 Hysteria2 Brutal 算法与端口跳跃工作原理',
        content: `Hysteria2 针对上述痛点进行了革命性的底层优化：

1. **Brutal 恒定速率灌包**：与传统算法被动等待 ACK 确认不同，Brutal 算法允许客户端告知服务端目标带宽（如 100Mbps），服务端以恒定速率持续发送数据包，只要丢包率没有超出物理极限，就不减小发送窗口，利用前向纠错与快速选择性重传（SACK）瞬间填补空缺。
2. **UDP 端口跳跃（Port Hopping）**：针对国内部分运营商（如移动 CMI、部分省份电信）对长期大流量 UDP 连接进行的 QoS 熔断限制，Hysteria2 客户端与服务端支持以秒级间隔在预设端口范围（如 20000:50000）内动态同步跳跃，使运营商 DPI 无法识别长期持续的单端口大流。`
      },
      {
        heading: '三、 Hysteria2 客户端配置样例 (Sing-box 规范)',
        content: `\`\`\`json
{
  "type": "hysteria2",
  "tag": "hy2-out",
  "server": "us-hy2.example.com",
  "server_port": 443,
  "up_mbps": 50,
  "down_mbps": 300,
  "password": "your-secret-token",
  "tls": {
    "enabled": true,
    "server_name": "us-hy2.example.com",
    "insecure": false
  }
}
\`\`\``
      }
    ],
    internalLinks: '如果你的主要用途是追番与超高清影视，可参阅 [4K/8K 流媒体解锁榜](/rankings/streaming/)；需要保障资金安全避免踩坑请务必先读 [新手选购 8 大避坑法则](/buying/traps/) 与 [高性价比轻量月付榜](/rankings/budget/)；如需全网综合考量请移步 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: 'Hysteria2 会不会因为抢占带宽导致被运营商彻底封禁宽带？',
        a: '合理设置上下行带宽（例如设置为本地宽带上限的 80%）不会触发宽带断网。但若盲目设置数吉比特的虚高带宽进行全天候灌包，可能引发当地城域网防火墙的 UDP 异常告警，导致该 IP 的 UDP 流量被单向阻断 24 小时。'
      },
      {
        q: 'Hysteria2 与 TUIC 协议都是基于 QUIC，该如何选择？',
        a: '在丢包率极高的普通公网线路上，Hysteria2 凭借 Brutal 拥塞控制具备更强劲的极限爆发速率；而在对握手延迟极致敏感的移动办公与聊天场景下，遵循原生标准拥塞控制的 TUIC 往往更加省电与平滑。'
      }
    ]
  },
  {
    slug: 'trojan-gfw-resistant',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'Trojan 伪装真实网站原理与流量指引：HTTPS 标配时代如何生存',
    description: '全面剖析经典 Trojan 协议在 HTTPS 时代的生存之道，详述其反向代理回落、标准 TLS 证书伪装机制以及在被探测识别下的防护策略。',
    tags: ['Trojan', 'HTTPS伪装', 'TLS代理', '流量指引', '防主动探测'],
    directAnswer: 'Trojan 协议的设计理念是不创造任何自定义加密算法，而是完全将代理数据封装在全世界互联网最通用的标准 TLSv1.3 流量之中，只有通过正确的密码校验才会将后续流量解密转交，未授权请求直接回落至真实的 HTTPS 商业网站；在当今全网 HTTPS 化的背景下，Trojan 依然以出色的系统兼容性、较低的维护复杂度成为海量商业节点与老牌客户端的基础支柱。',
    sections: [
      {
        heading: '一、 Trojan 协议的极简通信哲学',
        content: `Trojan 认为：越是复杂的自定义加密特征，越容易在人工智能与大数据统计面前无所遁形。因此它直接借用了标准 HTTPS 架构：
- 客户端使用合法的 TLS 握手连接服务端的 443 端口。
- 建立安全会话后，发送长度为 56 字节的密码 SHA-224 哈希认证串。
- 若密码正确，建立透明双向数据通道；若密码错误或遭遇外部探测，直接反向代理转给本地 Nginx/Caddy 上托管的真实网页。`
      },
      {
        heading: '二、 2026 年 Trojan 的现实挑战与改进方案',
        content: `尽管 Trojan 设计理念精巧，但在当今对抗环境中仍面临挑战：
1. **客户端 TLS 指纹（JA3/JA4）固定**：若使用早期客户端，其握手密码套件与浏览器存在微小差异，可能被特征识别。
2. **域名真实性关联**：若绑定的域名无公网正常访问记录，流量突增容易引起审查系统的统计学关注。
解决方案是结合主流客户端的 uTLS 伪造技术，模拟原生 Chrome/Edge 浏览器指纹，并将域名解析至 Cloudflare 或高信誉机房。`
      }
    ],
    internalLinks: '对于追求极高稳定性的企业级办公用户，我们推荐直接采用 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)；如果正在为多款节点做性价比筛选，请阅读 [2026 稳定节点综合推荐榜](/rankings/best/) 与 [新手选购 8 大避坑法则](/buying/traps/)。',
    faqs: [
      {
        q: 'Trojan 协议与 Trojan-Go 有什么区别？',
        a: 'Trojan-Go 是使用 Go 语言重构的高级分支，额外支持了多路复用（Mux）、WebSocket 传输以及 CDN 穿透能力；原版 Trojan 则以 C++ 开发，具备极低的内存占用和超高的并发处理性能。'
      }
    ]
  },
  {
    slug: 'shadowsocks-aead',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'Shadowsocks AEAD 加密现状：在主动探测下为何不再安全？',
    description: '深入分析 Shadowsocks 从早期流加密到 AEAD 认证加密的演化历史，详解现代重放攻击、重定向探测与深度包检测如何瓦解 SS 协议在公网直连中的抗封锁能力。',
    tags: ['Shadowsocks', 'AEAD', '主动探测', '重放攻击', '协议安全性'],
    directAnswer: '早期 Shadowsocks 由于密文缺乏完整性校验，遭到了著名的重放攻击探测；随后引入的 AEAD（如 chacha20-ietf-poly1305）虽然解决了密文防篡改问题，但由于其报文缺乏类似 TLS 的合法公网协议外壳，任何未知协议的纯密文数据在公网骨干路由上都会被判定为“不可识别高熵值流量”，触发防火墙的主动多轮探测，因此在 2026 年，裸跑 Shadowsocks-AEAD 在公网直连环境下几乎无法长期存活，目前仅能作为 IPLC/IEPL 物理专线内部的轻量传输协议。',
    sections: [
      {
        heading: '一、 Shadowsocks AEAD 的技术演进与主动探测破防',
        content: `Shadowsocks 经历了从 OTA（One Time Auth）到 AEAD（Authenticated Encryption with Associated Data）的升级，成功杜绝了位翻转攻击。然而，审查系统随后研发了更为激进的统计识别策略：
- **无特征就是最大特征**：现代互联网 90% 以上的流量均被包裹在 TLS、QUIC 或 HTTP 协议头中。一段完全没有任何明文协议头的纯随机密文，本身就是最显眼的靶子。
- **重放攻击与端口熔断**：探测端复制捕获的数据包向服务端重新发送，若服务端响应呈现特定重放错误模式，该 IP 与端口会在 15 分钟内遭到直接阻断。`
      },
      {
        heading: '二、 为什么商业专线依然大量使用 Shadowsocks？',
        content: `许多用户在主流商业机场中仍能看到大量 SS 节点，这并不代表它过时，而是由于场景迁移：
- **专线内部传输无审查风险**：在 IPLC 物理专线内部，数据在局域网内传输，根本不过公网 GFW，无需花费昂贵算力进行 TLS 伪装。
- **性能吞吐登峰造极**：SS-AEAD 算法在各类路由器与移动端芯片中均有硬件级 AES-NI 加速，延迟极低，系统资源开销几乎为零。`
      }
    ],
    internalLinks: '了解专线内部如何运行 Shadowsocks，请详细阅读 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)；若你经常遇到节点被封锁或超时，建议进入 [排障总览与故障诊断树](/troubleshooting/) 查找自救方案。',
    faqs: [
      {
        q: '如果我自建 VPS，还能用 Shadowsocks 吗？',
        a: '强烈不建议在境外 VPS 上直接使用裸跑的 Shadowsocks 端口。若坚持使用，必须在其外层嵌套 Simple-Obfs、ShadowTLS 或 V2Ray-Plugin 进行 TLS 流量混淆，否则通常存活时间不超过 48 小时。'
      }
    ]
  },
  {
    slug: 'tuic-quic-performance',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'TUIC 协议基于 QUIC 的弱网优化表现：移动端极限低延迟体验',
    description: '解析 TUIC 协议基于标准 QUIC 实现的单连接多路复用与 0-RTT 极速握手机制，展示移动设备在地铁、电梯等弱网切网场景下的极速恢复能力。',
    tags: ['TUIC', 'QUIC', '0-RTT', '多路复用', '移动端网络'],
    directAnswer: 'TUIC 是基于标准 IETF QUIC 协议直接定制的轻量级代理协议，其核心优势在于原生具备 0-RTT 快速连接恢复能力与天然无队头阻塞（Head-of-Line Blocking）的多路复用特性；在移动手机从 Wi-Fi 切换至 5G 基站，或在弱信号区域时，传统 TCP 代理需要重新进行三次握手与 TLS 协商，导致数秒断流，而 TUIC 连接能做到毫秒级无感热迁移，带来丝滑顺畅的极速交互体验。',
    sections: [
      {
        heading: '一、 QUIC 原生连接迁移打破队头阻塞',
        content: `在 HTTP/2 和传统 TCP 代理中，多个请求共用一条 TCP 流。只要其中一个数据包在网络中丢失，后续所有请求都必须停下来等待该数据包重传，这被称为 TCP 队头阻塞。
TUIC 依托 QUIC 协议，在 UDP 传输层上实现了多个相互独立的虚拟数据流：
- 网页图片请求丢包，不会影响文字内容的继续流式下发。
- 支持 Connection ID 机制：当手机网络从家里的 Wi-Fi 切换到室外蜂窝数据时，IP 地址发生改变，但由于 Connection ID 保持不变，TUIC 无需重新握手即可立即继续传输数据。`
      }
    ],
    internalLinks: '对于经常在移动端进行 AI 对话与轻量办公的用户，建议查阅 [AI 生产力节点推荐](/rankings/ai-services/) 与 [高性价比轻量月付榜](/rankings/budget/)。',
    faqs: [
      {
        q: 'TUIC 与 Hysteria2 谁更适合在手机上长期挂后台？',
        a: 'TUIC 更加适合手机全天候后台运行。因为 TUIC 的拥塞控制机制更加符合标准工业规范，对手机电量与发热的控制显著优于采用暴力发包策略的 Hysteria2。'
      }
    ]
  },
  {
    slug: 'wireguard-censorship',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'WireGuard 为什么无法直接翻墙？UDP 特征封锁与混淆过墙技巧',
    description: '探究 WireGuard 作为下一代 Linux 内核级 VPN 在公网防火墙面前被秒封的技术机理，揭示其清晰的握手特征头与通过 AmneziaWG 混淆改造实现防封的技术路线。',
    tags: ['WireGuard', 'AmneziaWG', 'UDP封锁', 'VPN混淆', '内核网络'],
    directAnswer: 'WireGuard 是一款追求极简高效的企业级安全 VPN 协议，其设计目标是在互信的公网节点间建立高速点对点隧道，因此完全没有考虑“对抗深度包检测（DPI）”的需求；其握手数据包拥有极度明确且固定的 4 字节消息类型标识（Type 1/Type 2）与固定的首包长度，防火墙只需一行规则就能对其进行 100% 精准识别与丢包拦截，目前必须借助 AmneziaWG 等混淆变种注入随机垃圾数据头才具有公网穿透能力。',
    sections: [
      {
        heading: '一、 WireGuard 握手协议的固定特征剖析',
        content: `WireGuard 的通信协议极为干净规整，这反倒成为了公网穿墙的最大破绽：
- 握手发起包（Handshake Initiation）：固定 148 字节，第一字节始终为 \`0x01\`。
- 握手响应包（Handshake Response）：固定 92 字节，第一字节始终为 \`0x02\`。
- Cookie 回复包：固定 64 字节，第一字节始终为 \`0x03\`。
- 数据传输包：第一字节始终为 \`0x04\`。
审查系统只需对境外 UDP 数据包进行首字节与包长比对，即可实现秒级精准识别并立刻对目标端口下发丢包策略。`
      },
      {
        heading: '二、 现代化混淆救赎：AmneziaWG 的随机垫片原理',
        content: `AmneziaWG 针对 WireGuard 的上述死穴进行了魔改：
- 在握手包头部与载荷中引入可自定义的随机垃圾字节（Junk Packet）。
- 将原本固定的 Message Type 字节映射为随机分配的整数。
- 使得每一个握手包的长度与内容分布在统计学上均呈现完全不可预测的噪声状态。`
      }
    ],
    internalLinks: '对于普通用户而言，自建 VPN 维护成本极高，直接参考 [2026 稳定节点综合推荐榜](/rankings/best/) 选择工业级成熟节点更为省心；如果是初次购买建议先行阅读 [新手选购 8 大避坑法则](/buying/traps/)。',
    faqs: [
      {
        q: 'Cloudflare WARP 也是基于 WireGuard，为什么它有时能连上？',
        a: 'Cloudflare WARP 连接的是其庞大的 Anycast 边缘节点网络，且在客户端集成了特定混淆与端点协商算法，并非标准的原始裸跑 WireGuard 握手。'
      }
    ]
  },
  {
    slug: 'tls-fingerprint-ja3',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'TLS 握手指纹（JA3/JA4）深度科普：防封锁客户端如何伪造浏览器指纹',
    description: '深度解密 TLS Client Hello 握手指纹机制（JA3/JA4），剖析为什么客户端加密了流量依然被精准识别，以及 uTLS 如何在网络层实现无懈可击的浏览器指纹伪装。',
    tags: ['TLS指纹', 'JA3', 'JA4', 'uTLS', 'ClientHello', '防主动识别'],
    directAnswer: '虽然 TLS 握手成功后通信内容是全加密的，但在握手的第一阶段，客户端必须通过明文发送 Client Hello 数据包，其中包含的 TLS 版本、加密套件列表、支持的压缩算法、SNI 扩展顺序等参数组合，构成了全球唯一的软硬件签名指纹（即 JA3/JA4 哈希）；防火墙与安全风控系统通过比对该指纹，能轻而易举判断请求究竟来自真实 Chrome 浏览器，还是由特定开源代理软件（如 Go 标准库）发起，现代客户端必须借助 uTLS 库动态模拟合法的浏览器握手指纹才能安全过墙。',
    sections: [
      {
        heading: '一、 JA3 指纹算法的生成原理',
        content: `JA3 算法通过提取明文 Client Hello 中的以下 5 个关键字段，用逗号拼接并计算 MD5 哈希：
\`\`\`text
SSLVersion,CipherSuites,Extensions,EllipticCurves,EllipticCurvePointFormats
\`\`\`
例如，Go 语言标准库（net/http）由于加密套件排列顺序与主流浏览器存在明显差异，其生成的 JA3 指纹极为固定，防火墙可直接将命中该特征的境外未知目标连接列为可疑流量。`
      },
      {
        heading: '二、 uTLS 如何解决指纹暴露难题',
        content: `现代成熟客户端（如 Clash Verge Rev、Sing-box、Xray）普遍引入了 uTLS 库：
- 能够按字节级别完全复刻最新版本 Chrome、Edge、Firefox 或 iOS Safari 的 Client Hello 首包结构。
- 随机填充 GREASE（保留拓展关键字）字段，彻底抹平与原生操作系统的特征差异。`
      }
    ],
    internalLinks: '在客户端选型方面，建议查阅具备完整 uTLS 支持的 [2026 稳定节点综合推荐榜](/rankings/best/)；若大模型提示 1020 报错拦截，往往与指纹风控相关，请参考 [AI 生产力节点推荐](/rankings/ai-services/)。',
    faqs: [
      {
        q: 'JA4 相比 JA3 有哪些升级？',
        a: 'JA4 增加了对 ALPN 协议扩展、TCP 协议栈特征以及时间特征的更精细采样，生成的可读性字符串比单纯的 MD5 哈希更易于网络设备进行流式实时过滤。'
      }
    ]
  },
  {
    slug: 'shadowtls-v3-upgrade',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'ShadowTLS v3 原理解析：如何借用真实顶级大厂域名证书防封',
    description: '深入分析 ShadowTLS v3 的中继转发哲学，解析其如何无需持有任何目标网站私钥即可借用微软、微软等大厂真实证书，让审查系统完全无法区分代理与合法访问。',
    tags: ['ShadowTLS', 'TLS代理', '中继伪装', '防封锁', '流量混淆'],
    directAnswer: 'ShadowTLS 是一种独特的双层 TLS 伪装协议。在连接建立初期，它让客户端与真实的大厂可信服务器（如 \`login.microsoftonline.com\`）完成一段完全真实的 TLS 握手，审查系统抓包看到的是没有任何破绽的真正大厂公钥与签名；握手完成后，ShadowTLS 服务端通过劫持会话密钥，将随后的加密数据流透明切入后台的代理服务中，在不泄露私钥的前提下实现了顶级的伪装存活率。',
    sections: [
      {
        heading: '一、 ShadowTLS 与 Reality 的理念异同',
        content: `两者都致力于摆脱“自建自签证书”的传统包袱：
- **Reality**：由 Xray 开发，客户端发起带有认证的 Client Hello，服务端接管握手并在内部直接处理分流，依赖服务端的私钥签名。
- **ShadowTLS**：纯中继架构，客户端直接向目标大厂发起握手，服务端透明透传大厂服务端的证书，在完成握手特征伪装后切入内层代理，兼容性极高。`
      }
    ],
    internalLinks: '对于追求极速不卡顿的高清观影，建议了解 [4K/8K 流媒体解锁榜](/rankings/streaming/)；需要避免踩坑被割韭菜可参考 [新手选购 8 大避坑法则](/buying/traps/)。',
    faqs: [
      {
        q: 'ShadowTLS 会导致传输延迟显著增加吗？',
        a: '由于握手阶段需要与目标真实网站进行往返交互，首次建立连接的延迟会比直接连接略高约 10~30 毫秒，但在连接建立后传输吞吐量不会受到影响。'
      }
    ]
  },
  {
    slug: 'http3-quic-future',
    categorySlug: 'protocols',
    category: '协议与加密底层解析',
    title: 'HTTP/3 与 QUIC 协议对科学上网生态的重塑与未来趋势',
    description: '全面前瞻 HTTP/3 与标准 QUIC 协议在全球互联网的普及趋势，剖析未来代理软件如何全量融入公共 UDP 传输，打破 TCP 时代传统代理的审查格局。',
    tags: ['HTTP3', 'QUIC', '未来趋势', '网络生态', '协议演进'],
    directAnswer: '随着 Google、Meta、Cloudflare 等巨头全面普及 HTTP/3，基于 UDP 的 QUIC 流量已经占据全球公网流量的 30% 以上；这从根本上终结了“境外大流量 UDP 等于非正常行为”的历史假设，为基于 QUIC 的新一代翻墙协议（如 Hysteria2、TUIC、MASQUE）提供了广阔的正常背景噪音掩护，科学上网生态正在从“绞尽脑汁伪装 TCP HTTPS”全面迈向“原生依托 HTTP/3 标准基础设施”的新纪元。',
    sections: [
      {
        heading: '一、 全网 QUIC 化带来的天然红利',
        content: `在过去，运营商对 UDP 流量往往采取简单粗暴的限速甚至一刀切阻断策略。然而如今：
- 几乎所有现代浏览器均默认启用 HTTP/3。
- 大型跨国 CDN、视频流媒体与云游戏全面依赖 QUIC 降低延迟。
- 运营商若对 UDP 进行无差别 QoS 限速，将直接导致本地用户的 YouTube、TikTok 等官方合规业务卡顿投诉。这为代理协议创造了前所未有的生存空间。`
      }
    ],
    internalLinks: '更多高阶技术与选型指南请关注 [2026 稳定节点综合推荐榜](/rankings/best/) 与专为高负载设计的 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '未来还需要专线吗？',
        a: '协议再先进也无法突破光速和公网路由拥堵的物理限制。基于公网的抗封锁协议解决了“连得上”的问题，而物理专线解决了晚高峰骨干网“绝不丢包”的品质问题，两者长期互补共存。'
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

cat1Articles.forEach(item => {
  const md = generateMarkdown(item);
  fs.writeFileSync(path.join('wiki/protocols', `${item.slug}.md`), md, 'utf8');
  fs.writeFileSync(path.join('docs/wiki/protocols', `${item.slug}.md`), md, 'utf8');
  console.log('Written:', item.slug);
});

module.exports = cat1Articles;

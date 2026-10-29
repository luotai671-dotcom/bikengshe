const fs = require('fs');
const path = require('path');

const cat5Articles = [
  {
    slug: 'airport-runaway-signs',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】如何一眼识别机场跑路前兆？促销打折背后的资金链断裂规律',
    description: '盘点机场跑路前的六大经典反常征兆，拆解低价年付大促背后的庞氏资金链断裂机理，帮助用户建立敏锐的风险嗅觉，保卫个人财产安全。',
    tags: ['机场跑路', '资金链断裂', '低价年付', '跑路前兆', '防坑避雷'],
    directAnswer: '机场跑路绝非突然发生，往往伴随着明显的“临终套现三部曲”：第一阶段是工单与客服失联，Telegram 官方群开启全员禁言；第二阶段是线路频繁故障且长达数周不修复，理由推诿给“上游光缆维修”；第三阶段是突然推出毫无底线的打折大促（如“5折终身传家宝”、“充三年送两年”），以极端低价疯狂吸纳最后一批现金流后卷款失联；坚持小额月付是唯一能立于不败之地的铁律。',
    sections: [
      {
        heading: '一、 跑路前夕的六大高危红色预警信号',
        content: `1. **官方群聊突然禁言**：理由通常是“防黑客炸群”或“净化讨论环境”。
2. **反常的极端骨折大促**：在非正常节假日突然发布超低价年付、三年付甚至永久套餐。
3. **节点大面积标红且长期装死**：客服承诺“两小时内修好”，但拖延数天甚至两周毫无动静。
4. **更换不知名的小白支付网关**：原本正规的第三方免签或企业收银台突然换成私人转账二维码。
5. **节点倍率暗中大幅调高**：1 倍率节点偷偷变成 3 倍率甚至 5 倍率，迅速消耗用户余额。
6. **运营团队内讧或频繁换皮**：通知频道发出措辞奇怪的纠纷声明。`
      }
    ],
    internalLinks: '牢记资金安全铁律，请务必研读避坑社官方出品的 [新手选购 8 大避坑法则](/buying/traps/)；挑选财务健康、口碑长期在线的成熟品牌请参阅 [高性价比轻量月付榜](/rankings/budget/) 与 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '如果我刚买了年付机场就跑路了，有什么追回资金的办法吗？',
        a: '如果使用支付宝或微信付款，由于绝大多数涉案收银台使用的是洗钱虚拟商户或境外空壳通道，普通用户申请投诉争议的追回成功率基本为零。切痛止损，吸取教训后续坚决只选月付。'
      }
    ]
  },
  {
    slug: 'low-ping-slow-speed',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】为什么节点延迟只有 20ms，但打开网页却一直转圈极慢？',
    description: '揭秘为什么在客户端测得超低 Ping 延迟却依然无法看视频或加载网页的物理根源，剖析 ICMP 虚假响应、严重超售丢包与单线程限速真相。',
    tags: ['延迟低速度慢', '网页转圈', 'ICMP假延迟', '单线程限速', '排错诊断'],
    directAnswer: '客户端测出的“20ms”通常仅仅代表你的本地电脑与服务商部署在境内的“前置中转机房”之间的 ICMP/TCP 单向握手延迟，完全无法反映中转机房跨国出海的真实工况；如果该服务商出海骨干网严重超售、跨国丢包率高达 30%，或者单线程带宽被运营商下发 QoS 熔断限速，就会造成“表面绿灯 20ms、实际传输断流卡死”的虚假繁荣；真正的网络品质必须通过 Real Delay（真实端到端往返）与单线程测速综合判定。',
    sections: [
      {
        heading: '一、 为什么 ICMP Ping 会欺骗你？',
        content: `ICMP 是网络诊断中最简单的轻量级协议。很多不良服务商在境内中转机上开启了 ICMP 抢答功能：
- 你的客户端发包过去，中转机毫秒级回复 Pong。
- 但实际上中转机到境外落地的物理链路早已被几千人挤爆。
- 视频加载依赖持续高吞吐的 TCP/UDP 数据流，一旦丢包，TCP 拥塞算法强制将速率降至冰点。`
      }
    ],
    internalLinks: '遇到此类低延迟但卡顿的假节点，请进入 [排障总览与故障诊断树](/troubleshooting/) 对照检查；查看具有真实高吞吐压测记录的专线请参阅 [第三方独立测速与回国拓扑证据库](/rankings/speed-test-logs/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '如何测出节点的真实延迟而不是前置延迟？',
        a: '在 Clash Verge Rev 或 Sing-box 中，将延迟测试 URL 设置为境外的标准服务（如 \`https://www.google.com/generate_204\` 或 \`https://cp.cloudflare.com/\`），此时测试的是经过境外落地节点回传的端到端真实用时。'
      }
    ]
  },
  {
    slug: 'node-all-timeout-reasons',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】客户端导入订阅后节点全部显示红字 Timeout，该如何排查？',
    description: '针对新手最常遇到的“订阅导入成功，但所有节点测速全红 Timeout/超时”故障，提供系统时间偏差、本地防火墙死锁、订阅凭证过期等五步快速自救指南。',
    tags: ['节点全红', 'Timeout超时', '订阅故障', '系统时间偏差', '排障急救'],
    directAnswer: '节点全红 Timeout 最常见的三大诱因：一是本地设备操作系统时间偏差超过 90 秒（导致 VMess/Reality 握手时间戳校验失败）；二是本地防火墙、杀毒软件（如 360、火绒、迈克菲）截断了客户端代理内核进程的入站与出站网络访问；三是订阅套餐已经欠费过期或流量耗尽，服务商认证网关直接切断了全部出口权限；通过校准系统时间、关闭冲突防护、检查服务商后台状态通常即可在 3 分钟内排除故障。',
    sections: [
      {
        heading: '一、 五分钟排查全红自救清单',
        content: `1. **校准系统时间**：在 Windows 设置中点击“立即同步时间”，误差必须小于 1 分钟。
2. **确认套餐有效性**：登录服务商控制台，查看套餐是否到期、流量是否已经归零。
3. **检查节点测速方法**：确保客户端测速 URL 可用，建议设置为 \`http://www.gstatic.com/generate_204\`。
4. **排除杀毒软件误杀**：检查是否有核心进程（如 \`verge-mihomo.exe\`）被安全软件隔离。`
      }
    ],
    internalLinks: '详细的分步图文排查指引请参考 [排障总览与故障诊断树](/troubleshooting/)；选购稳定耐用的工业级节点请参考 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '重新拉取订阅后还是全红，需要重装软件吗？',
        a: '通常不需要重装。先在控制台中重置你的订阅 Token，然后在客户端删除原有订阅配置重新粘贴导入，排除旧节点缓存阻断的可能。'
      }
    ]
  },
  {
    slug: 'sub-convert-token-leak',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】在线订阅转换平台是否会盗取用户节点 Token 与真实访问记录？',
    description: '深入分析公共第三方在线订阅转换平台的安全风险，揭示黑心转换站如何暗中收集用户订阅 Token、盗刷套餐流量甚至注入恶意劫持规则的黑幕。',
    tags: ['订阅转换', 'Token泄露', '盗刷流量', '安全合规', '私有部署'],
    directAnswer: '公共在线订阅转换平台（SubConverter）由于数据完全经过其第三方服务器，运营者拥有查看并记录你原始订阅链接中所有私有 Token 的全部权限；不良站长会定期扫描用户提交的高速专线订阅，将其提取并打包成“免费白嫖节点”转卖或供自身下载消耗，更有甚者会在下发的配置中植入中间人劫持规则替换你的分流策略；强烈建议使用本地离线转换工具，或使用我们官方开源的 [实用工具箱](/tools) 进行安全转换。',
    sections: [
      {
        heading: '一、 订阅泄露后可能面临的三大后果',
        content: `1. **高速专线流量被瞬间盗刷一空**。
2. **账号触发服务商“多地异地登录风控”导致被封禁**。
3. **恶意规则注入**：某些网站转换出的配置会将部分原本走代理的私密域名导向其自建的镜像劫持服务器。`
      }
    ],
    internalLinks: '安全转换请使用官方提供的离线安全工具：[实用工具箱](/tools)；挑选自带全格式适配、无需转换的服务商请参阅 [2026 稳定节点综合推荐榜](/rankings/best/)；资金防坑指南参考 [新手选购 8 大避坑法则](/buying/traps/)。',
    faqs: [
      {
        q: '我如果不小心在公共转换站用过，该怎么补救？',
        a: '立刻登录你所购买的服务商后台，找到“重置订阅链接”按钮并确认。重置后旧 Token 会立即作废，盗取者将无法再通过旧链接拉取你的任何节点。'
      }
    ]
  },
  {
    slug: 'shared-apple-id-safety',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】购买或使用公共共享美区 Apple ID 下载客户端有哪些资金被锁风险？',
    description: '警示 iOS 用户切勿在 iPhone 系统设置的 iCloud 中登录任何公共共享美区 Apple ID，详解勒索锁机、照片通讯录泄露的惨痛代价与自主注册正规美区账号实操。',
    tags: ['美区Apple ID', '小火箭下载', '锁机勒索', 'iCloud安全', 'iOS防坑'],
    directAnswer: '许多新手为了在 iPhone 上下载 Shadowrocket（小火箭），盲目在网上购买廉价公共美区 Apple ID 并错误地登录了手机的“系统设置 (iCloud)”，导致手机被黑客通过“查找我的 iPhone”功能远程恶意锁死变砖，并索要上千元勒索赎金；正确的铁律是：共享 Apple ID **只能在 App Store 商店内登录**，绝对禁止在手机系统设置（iCloud）登录！最安全的方案是花费 10 分钟自主免费注册专属于自己的正规美区账号。',
    sections: [
      {
        heading: '一、 正确下载小火箭的安全三原则',
        content: `1. **打开 App Store 商店**：点击右上角个人头像，滑到最底部点击“退出登录”。
2. **仅在 App Store 内登录美区 ID**：弹窗提示“升级到双重认证”时选择“其他选项 -> 不升级”。
3. **下载完毕立即退出**：完成 Shadowrocket 下载后，立即退回你原本的大陆 Apple ID，已下载的软件可永久正常使用。`
      }
    ],
    internalLinks: 'iOS 完整安全配置指南请参考 [新手入门](/getting-started)；选配高品质月付节点请看 [高性价比轻量月付榜](/rankings/budget/) 与 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '自主注册美区 Apple ID 需要美国信用卡吗？',
        a: '完全不需要。在苹果官网网页端注册时，支付方式选择“None（无）”，地址使用美国免税州（如俄勒冈、特拉华）的虚拟生成地址即可轻松过审。'
      }
    ]
  },
  {
    slug: 'vless-no-speed-causes',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】VLESS Reality 节点突然断连，是节点被封了还是本地时间没同步？',
    description: '系统化排查 VLESS-Reality 节点突然失去连接的深层诱因，结合 TLS 握手特征、服务端 SNI 目标网站屏蔽以及本地客户端核心版本兼容性展开精准定位。',
    tags: ['VLESS断连', 'Reality排查', 'SNI阻断', '内核版本', '排障方案'],
    directAnswer: 'VLESS Reality 节点突然断连并不一定是节点 IP 被防火墙阻断，更大概率是服务端的伪装目标（dest 网站）发生变更或遭到防火墙单向 SNI 重置拦截；另外，由于 Reality 依赖最新的 Xray-core / Mihomo 协议特性，若客户端软件长期未更新导致内核不兼容，也会引发连接瞬间断开；排查时应先观察客户端报错日志（Log），若出现 \`handshake failed\` 通常是伪装域名异常，若直接 \`connection refused\` 才是服务端宕机。',
    sections: [
      {
        heading: '一、 Reality 断连排障的三大核心切入点',
        content: `1. **检查客户端内核版本**：确保客户端（如 Clash Verge Rev、v2rayN）已升级至最新版，旧版内核不支持 Reality 最新的指纹协商。
2. **测试目标伪装域名境外连通性**：如果服务端配置的 dest 域名本身宕机，Reality 握手回落失败，所有客户端请求都将被挂起。
3. **检查短 ID (ShortID) 与公钥匹配**：任何字符串配置的微小错误都会导致服务端认证不通过。`
      }
    ],
    internalLinks: '系统化故障定位请查阅 [排障总览与故障诊断树](/troubleshooting/)；了解 Reality 底层协议请参阅百科专文 [VLESS-Reality 握手原理与 SNI 伪装实战](/wiki/protocols/reality-handshake)；选购顶级专线推荐 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: 'Reality 会不会像传统协议那样导致整个 IP 的 443 端口被彻底拉黑？',
        a: '概率极低。因为防火墙主动探测发往该 IP 的 443 端口时，收到的完全是真实大厂（如 Apple/Microsoft）的标准合法证书和真实网页，缺乏判定为翻墙服务器的确凿证据。'
      }
    ]
  },
  {
    slug: 'router-bypass-conflict',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】家中配置旁路由后微信消息延迟、局域网打印机无法连接怎么解决？',
    description: '彻底解决软路由（旁路由）拓扑中令人头疼的内网穿透冲突，详解微信图片发不出去、NAS 访问变慢与局域网打印机失联的 iptables 修复实操。',
    tags: ['旁路由冲突', '微信延迟', '局域网打印机', '内网穿透', '软路由排障'],
    directAnswer: '家中配置旁路由后出现局域网打印机断连与内网 NAS 访问慢，核心根源在于旁路由默认配置了全局 NAT/MASQUERADE 规则，将局域网内部设备互访的数据包来源 IP 全部强行伪装成了旁路由自身的 IP，破坏了设备之间的二层直通感知；而微信消息延迟则是由旁路由 DNS 缓存没有及时剔除国内推送长连接服务器造成；只需在旁路由防火墙中添加内网网段豁免规则并开启 MSS 钳制即可完美修复。',
    sections: [
      {
        heading: '一、 旁路由防火墙修复核心命令',
        content: `在 OpenWrt 网页后台“网络 -> 防火墙 -> 自定义规则”中加入以下指令：
\`\`\`bash
# 解决局域网回环与设备互访问题
iptables -t nat -A PREROUTING -d 192.168.0.0/16 -j ACCEPT
iptables -t nat -A PREROUTING -d 10.0.0.0/8 -j ACCEPT

# 开启 MSS 钳制，解决微信大图发不出去与网页加载假死
iptables -t mangle -A POSTROUTING -p tcp --tcp-flags SYN,RST SYN -o eth0 -j TCPMSS --clamp-mss-to-pmtu
\`\`\``
      }
    ],
    internalLinks: '详细软路由原理请阅读 [透明网关（旁路由）原理：Linux nftables 全局分流实操](/wiki/clients/linux-nftables-transparent)；更多网络急救方案请看 [排障总览与故障诊断树](/troubleshooting/)。',
    faqs: [
      {
        q: '旁路由与主路由谁来开 DHCP 比较好？',
        a: '推荐主路由开启 DHCP，在需要科学上网的特定设备（如电视盒子、电脑）上，手动将默认网关与首选 DNS 修改为旁路由 IP。这样即使旁路由死机维护，家中老人与普通智能家居也绝不会断网。'
      }
    ]
  },
  {
    slug: 'speedtest-fake-peak',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】Speedtest 测速跑满千兆，为什么看 YouTube 4K 依然卡顿？',
    description: '揭开网络测速与真实流媒体播放体验脱节的真相，剖析 Speedtest 多线程突发冲刺与 YouTube 单线程持续码率压力的核心指标差异。',
    tags: ['Speedtest测速', 'YouTube卡顿', '多线程测速', '单线程吞吐', '真实压测'],
    directAnswer: 'Speedtest 测速软件采用的是“多连接（通常 16~32 线程）并发突发冲刺”，且测速节点通常优先匹配物理距离极近的大带宽 CDN 节点，这相当于十几个人一起推一辆空车，极易瞬间冲上数百兆峰值；而 YouTube 4K 视频加载在底层是单条 TCP/QUIC 连接持续平稳拉取，极其考验单线程传输能力与长距离抗丢包性能；一旦跨国网络存在 3% 的微丢包，单线程吞吐量立刻雪崩，导致千兆测速与 4K 卡死形成鲜明讽刺的对比。',
    sections: [
      {
        heading: '一、 衡量真实视频体验的关键指标',
        content: `真正决定 4K/8K 视频是否流畅的指标只有两个：
1. **单线程持续下载速率**：至少稳定在 45 Mbps 以上。
2. **连接稳定性与丢包率**：晚高峰跨国丢包率必须控制在 0.5% 以下。
若服务商虽然带宽总管很大但丢包严重，Speedtest 测速数据好看但毫无实际用处。`
      }
    ],
    internalLinks: '查阅杜绝虚假测速、具备真实单线程压测证据的专线，请移步 [第三方独立测速与回国拓扑证据库](/rankings/speed-test-logs/)；超高清流媒体专线推荐 [4K/8K 流媒体解锁榜](/rankings/streaming/)。',
    faqs: [
      {
        q: '看 YouTube 4K 视频需要多少真实带宽？',
        a: 'YouTube 4K 60帧视频的平均码率大约在 25~35 Mbps 之间。只要你的出口节点具备稳定 50 Mbps 以上的无丢包带宽，即可实现随拖随放秒开。'
      }
    ]
  },
  {
    slug: 'why-choose-monthly-pay',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】为什么避坑社反复强调新手一定要坚持小额月付、拒绝年付？',
    description: '从网络服务商的商业变现周期、上游机房封禁风险以及资金博弈心理学，全面论证小额月付原则在科学上网选购中的绝对统治地位。',
    tags: ['小额月付', '拒绝年付', '资金安全', '避坑原则', '理性消费'],
    directAnswer: '科学上网服务是一个面临极高不可抗力风险的高危行业：上游跨境专线可能随时被查封拔线、境外机房可能因滥用遭遇封锁、服务商运营者可能随时面临监管或资金链断裂跑路；年付方案本质上是把未来一整年的全部运营风险转嫁给用户自己承担，而月付则将选择权牢牢掌握在自己手中，一旦遇到服务商劣化或跑路，最大的损失不过是一杯奶茶钱，因此“小额月付”是避坑社至高无上的第一原则。',
    sections: [
      {
        heading: '一、 年付陷阱的三大约束魔咒',
        content: `1. **沉没成本绑定**：付了一整年，就算第三个月线路天天断流，你也舍不得换，白白忍受恶劣网络折磨。
2. **缺乏议价权**：用户全款付清后，服务商往往将资源倾斜给新客，老用户的工单响应速度直线下降。
3. **跑路重灾区**：跑路的机场中有 98% 都是在年付大促销吸纳大量资金后人间蒸发。`
      }
    ],
    internalLinks: '详细了解避坑社推荐的月付优质服务商，请查看 [高性价比轻量月付榜](/rankings/budget/)；深度揭露行业内幕请必看 [新手选购 8 大避坑法则](/buying/traps/) 与 [2026 稳定节点综合推荐榜](/rankings/best/)。',
    faqs: [
      {
        q: '年付确实比月付便宜好几十块钱，难道真的一点都不值得考虑吗？',
        a: '省下的几十元差价，远远无法对冲一旦服务商跑路或线路劣化所带来的本金全损风险。坚持月付多花几元钱，实质上是为你的个人资产与网络心情购买一份安全保险。'
      }
    ]
  },
  {
    slug: 'airport-vs-self-build',
    categorySlug: 'faq',
    category: '高频疑难杂症与常见 FAQ',
    title: '【FAQ】小白该买商业机场还是自己买 VPS 搭建？从维护成本与抗封锁全面对比',
    description: '客观对比商业机场服务与自购境外 VPS 搭建节点在时间成本、抗封锁能力、IP 解锁与综合花销上的本质优劣，破除“自建一定比购买好”的盲目迷信。',
    tags: ['自建VPS', '商业机场', '选型对比', '维护成本', '流媒体解锁'],
    directAnswer: '“自建 VPS”拥有完全属于自己的独享隐私与控制权，但缺点是单人购买优质线路（如 CN2 GIA/9929）成本高昂（每年需 50~100 美元以上），且一旦 IP 被 GFW 识别封锁需自费更换，且机房 IP 几乎 100% 无法解锁 ChatGPT 与 Netflix 非自制剧；而商业机场通过数千人共享租用多条物理专线与动态住宅落地，不仅晚高峰零丢包、全平台原生解锁，且遇到故障有专职运维团队 24 小时排修；除非是出于网络技术研究学习目的，否则绝大多数普通用户选择商业月付专线在体验和性价比上均拥有压倒性优势。',
    sections: [
      {
        heading: '一、 自建与商业服务核心指标全景对照表',
        content: `| 对比维度 | 个人自建 VPS 搭建 | 优质商业专线机场 |
| :--- | :--- | :--- |
| **年投入成本** | 300 - 800 元/年 (优质线路单人承担) | 100 - 200 元/年 (万人均摊成本) |
| **晚高峰抗丢包** | 极差 (除非花重金购买企业专线) | 极强 (拥有物理内网 IPLC 专线) |
| **IP 被封风险** | 需个人承担换 IP 费用 (约 2-5 美元/次) | 服务商自动切换备用节点，用户无感 |
| **大模型/流媒体解锁** | 极难 (机房 IP 普遍被风控拦截) | 原生双 ISP 住宅落地，100% 解锁 |
| **维护时间消耗** | 每周需花费数小时排查故障与更新脚本 | 开箱即用，一键导入多端客户端 |`
      }
    ],
    internalLinks: '理性评估网络选型，请参阅避坑社权威指导 [新手选购 8 大避坑法则](/buying/traps/)；查看目前市场上表现最优的专线服务商请看 [2026 稳定节点综合推荐榜](/rankings/best/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。',
    faqs: [
      {
        q: '如果我只想学习 Linux 和网络协议知识，推荐自建吗？',
        a: '非常推荐！自己买台便宜的 VPS 亲自动手搭建 VLESS-Reality 或 Hysteria2，是深入理解计算机网络、TLS 握手与路由内核最好的实战教科书。但若日常主力使用，建议备用一条成熟商业专线。'
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

cat5Articles.forEach(item => {
  const md = generateMarkdown(item);
  fs.writeFileSync(path.join('wiki/faq', `${item.slug}.md`), md, 'utf8');
  fs.writeFileSync(path.join('docs/wiki/faq', `${item.slug}.md`), md, 'utf8');
  console.log('Written:', item.slug);
});

module.exports = cat5Articles;

import { ARTICLES_MAP, ArticleData } from '../data/articles'
import { KNOWLEDGE_BASE_COLUMNS } from '../data/navigation'
import { TOPIC_CLUSTER_RULES } from './markdown'

export function getArticleData(path: string): ArticleData {
  const cleanPath = path.replace(/^\//, '').replace(/\/$/, '')

  if (ARTICLES_MAP[cleanPath]) {
    return ARTICLES_MAP[cleanPath]
  }

  // Find from knowledge base
  for (const col of KNOWLEDGE_BASE_COLUMNS) {
    for (const item of col.items) {
      const itemPath = item.href.replace(/^\//, '')
      if (itemPath === cleanPath) {
        return generateFallbackArticle(item.title, col.title, col.id, item.description)
      }
    }
  }

  // Find from topic clusters
  for (const rule of TOPIC_CLUSTER_RULES) {
    const rulePath = rule.href.replace(/^\//, '')
    if (rulePath === cleanPath) {
      return generateFallbackArticle(rule.title, rule.category, rule.categoryGroup || 'docs', rule.relationNote)
    }
  }

  // Fallback for special routes like buying, tools, troubleshoot
  if (cleanPath.startsWith('buying')) {
    return {
      title: '机场与节点选购指南：避坑与深度横评',
      category: '选购指南',
      categorySlug: 'buying',
      lastUpdated: '2026-10-24',
      readingTime: '6 分钟',
      tags: ['选购指南', '性价比', '专线机场', '防坑策略'],
      description: '客观公正的节点服务商评测指标与选购建议。',
      content: generateBuyingContent()
    }
  }

  if (cleanPath.startsWith('tools')) {
    return {
      title: '实用工具箱：订阅转换与在线检测集合',
      category: '网络工具',
      categorySlug: 'tools',
      lastUpdated: '2026-10-25',
      readingTime: '4 分钟',
      tags: ['工具集合', '订阅转换', 'WebRTC检测', 'DNS泄漏'],
      description: '提供主流开源订阅转换、DNS泄漏检测、IP归属与测速节点推荐工具。',
      content: generateToolsContent()
    }
  }

  if (cleanPath.startsWith('troubleshoot')) {
    return {
      title: '综合故障排查手册：从断连到慢速全场景诊断',
      category: '故障排查',
      categorySlug: 'troubleshoot',
      lastUpdated: '2026-10-25',
      readingTime: '7 分钟',
      tags: ['排障', '网络诊断', 'DNS污染', '无法上网'],
      description: '节点测速正常但打不开网页、DNS污染、端口冲突等高频故障解决指南。',
      content: generateTroubleshootContent()
    }
  }

  // Default article
  return {
    title: '网络技术与指南文档',
    category: '技术指南',
    categorySlug: 'docs',
    lastUpdated: '2026-10-26',
    readingTime: '5 分钟',
    tags: ['文档', '技术指南'],
    description: '欢迎查阅梯子避坑社技术知识库文档。',
    content: `# 网络技术指南\n\n该文档正在整理更新中，请查看其他章节内容。`
  }
}

function generateFallbackArticle(title: string, category: string, categorySlug: string, desc?: string): ArticleData {
  return {
    title,
    category,
    categorySlug,
    lastUpdated: '2026-10-23',
    readingTime: '5 分钟',
    tags: [category, '实战指南', '网络优化'],
    description: desc || `${title} 深入实战与配置指引。`,
    content: `
# ${title}

${desc || '本文为梯子避坑社知识库整理的技术实践与原理解析。'}

> [!NOTE]
> 本文属于 **【${category}】** 专题模块。建议结合上下文相关知识与实际网络环境进行操作与配置。

---

## 一、概述与核心原理

在当前的分布式网络拓扑与代理技术演进中，**${title}** 扮演着至关重要的角色。无论是提升传输稳定性，还是优化多端规则分流，理解其底层工作模式是保障网络体验的基础。

- **适用场景**：日常学习、跨国开发协作、跨境电商、远程服务器管理。
- **核心价值**：降低延迟抖动、规避网络干扰、实现无感智能分流。

---

## 二、关键配置要点与步骤

### 1. 环境准备与前提条件
在进行配置或部署前，请确保：
- 系统版本或客户端内核已更新至最新稳定版。
- 检查本地网络状态，确认端口占用情况。
- 确认相关配置文件格式规范，遵循 YAML 或 JSON 语法结构。

\`\`\`yaml
# 核心参考配置结构示例
routing:
  domainStrategy: IPIfNonMatch
  rules:
    - type: field
      outboundTag: direct
      domain:
        - "geosite:cn"
    - type: field
      outboundTag: proxy
      domain:
        - "geosite:geolocation-!cn"
\`\`\`

### 2. 详细配置流程
1. **下载并载入基础规则集**：保持 GEOIP 与 GEOSITE 规则库定期更新，以获得精准的国内外分流体验。
2. **连接性验证**：先通过单个节点进行网络往返时间（RTT）与 TLS 握手测试，避免批量超时引起混淆。
3. **开启持久化运行**：配置开机随系统自启，并设置合理的保活（Keep-Alive）与重连机制。

---

## 三、常见问题与注意事项

> [!WARNING]
> 切勿随意从未知第三方下载经过二次打包的二进制程序，务必通过官方开源仓库或签名合法的发布源安装。

1. **分流不生效怎么办？**
   - 检查 DNS 设置是否发生泄漏。优先启用 Fake-IP 模式或由客户端代理接管上游 DNS 查询。
2. **出现偶发性断流？**
   - 检查本地运营商是否开启了 UDP QoS 限速，或者排查是否触发了机房防护阈值。
3. **如何获得更低的端到端延迟？**
   - 优先选择具备 BGP 优质入口或直连优化线路（如 CN2 GIA / 9929 / CMI）的节点。

---

## 四、延伸阅读与相关指引

- 查看本站同系列教程，全面掌握协议与客户端组合方案。
- 如遇疑难杂症，可前往 **「排障手册」** 或 **「常见问答 FAQ」** 寻找针对性解决方案。
`
  }
}

function generateBuyingContent(): string {
  return `
# 机场与节点选购指南：避坑与深度横评

面对市面上琳琅满目的服务商，新手往往容易被低价诱惑陷入「月抛跑路」、「高峰期卡成 PPT」的陷阱。本文总结了专业玩家评测的核心维度。

---

## 一、核心评测维度与避坑标准

### 1. 线路类型辨析
- **直连机场**：单价极低（¥5-10/月），但晚高峰卡顿率高达 50% 以上，封锁期易失联。
- **公网中转**：性价比最高，日常看 4K 流媒体流畅，适合 80% 的普通用户。
- **IPLC/IEPL 专线**：不经防火墙，全年 99.9% 稳定，跨国路由震荡期依然丝滑，适合办公、外贸与高净值用户。

### 2. 警惕「一次性超长大额套餐」
> [!CAUTION]
> 绝不建议新手首次购买就选择年付甚至两年付！许多不良商家以超低年付为噱头圈钱后跑路。**务必先月付体验**，验证晚高峰实际表现后再考虑长期订阅。

---

## 二、常见应用场景推荐配置

| 需求画像 | 关键诉求 | 推荐配置 |
| :--- | :--- | :--- |
| **轻度办公 / 查资料** | 稳定、不掉线、价格实惠 | 中小规模 BGP 中转月付套餐 |
| **重度追剧 (Netflix/Disney+)** | 大流量、原生住宅 IP 解锁 | 具备专属流媒体解锁节点的大带宽服务商 |
| **远程协作 / 证券交易** | 极低抖动、跨国路由震荡期零失联 | **纯血 IPLC / IEPL 专线** |
`
}

function generateToolsContent(): string {
  return `
# 实用工具箱：订阅转换与在线检测集合

收录网络工程师与极客常用的高效检测与转换工具，助你快速排查环境与配置。

---

## 一、订阅格式在线转换工具

支持在 Clash、V2Ray、Sing-Box、Surge、Quantumult X 等不同格式间相互转换。

> [!TIP]
> 针对高隐私要求的用户，推荐使用本地 Docker 部署 Subconverter，避免将私有订阅链接上传至公共第三方解析服务器。

\`\`\`bash
# 本地 Docker 快速启动 subconverter 转换后端
docker run -d --name subconverter --restart=always -p 25500:25500 tindy2013/subconverter:latest
\`\`\`

---

## 二、在线网络隐私与泄漏检测

1. **IP 纯净度与欺诈分检测**：检测当前节点 IP 是机房广播 IP 还是原生住宅 IP，评估风险值。
2. **WebRTC 真实 IP 泄漏测试**：防止浏览器在开启代理后通过 WebRTC API 暴露真实家庭公网 IP。
3. **DNS 泄漏检测**：验证当前 DNS 解析是否被本地运营商（电信/联通/移动）污染或劫持。
`
}

function generateTroubleshootContent(): string {
  return `
# 综合故障排查手册：从断连到慢速全场景诊断

遇到无法连接或网页加载缓慢？请按照本结构化流程图进行分层排查。

---

## 一、故障定位第一步：分层排除法

\`\`\`text
[本地物理网络] ──> [本地系统代理/端口] ──> [客户端配置与内核] ──> [节点服务器与线路] ──> [目标网站]
\`\`\`

1. **第一层：排查直连网站**
   - 打开 [百度](https://www.baidu.com) 或 [B站](https://www.bilibili.com)。如果打不开，说明是你家 Wi-Fi 或本地宽带断网，与代理无关。
2. **第二层：排查本地系统代理端口**
   - 检查浏览器代理插件（如 SwitchyOmega）是否配置正确，或 Windows 代理端口（默认 7890）是否被其他程序占用。
3. **第三层：排查时间同步**
   - 打开系统设置，确认「自动设置时间」已开启，并手动点击一次「立即同步」。

---

## 二、典型错误代码对照速查

| 错误代码 / 现象 | 根本原因 | 对应解决办法 |
| :--- | :--- | :--- |
| **ERR_CONNECTION_REFUSED** | 本地代理软件未运行或端口关闭 | 启动客户端或关闭系统代理开关 |
| **ERR_CERT_COMMON_NAME_INVALID** | HTTPS 证书劫持或被防火墙拦截 | 检查节点 TLS 配置，关闭杀毒软件 SSL 扫描 |
| **DNS_PROBE_FINISHED_BAD_CONFIG** | 本地 DNS 服务器配置错误 | 设置为 223.5.5.5 或客户端内置 Fake-IP |
`
}

import React, { useState } from 'react'
import {
  Wrench,
  Globe,
  Shield,
  Zap,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Terminal,
  Activity,
  Laptop,
  Smartphone,
  Apple,
  Layers,
  AlertTriangle,
  FileCode,
  WifiOff,
  Bot,
  TrendingUp,
  Lock,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react'

export const ToolsPage: React.FC = () => {
  const [subUrl, setSubUrl] = useState('')
  const [targetClient, setTargetClient] = useState('clash')
  const [includeEmoji, setIncludeEmoji] = useState(true)
  const [enableUdp, setEnableUdp] = useState(true)
  const [convertedUrl, setConvertedUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subUrl.trim()) return

    // Standard robust subconverter backend format
    const backend = 'https://sub.xeton.dev/sub'
    const params = new URLSearchParams({
      target: targetClient,
      url: subUrl.trim(),
      insert: 'false',
      emoji: includeEmoji ? 'true' : 'false',
      list: 'false',
      udp: enableUdp ? 'true' : 'false',
      scv: 'true'
    })
    setConvertedUrl(`${backend}?${params.toString()}`)
  }

  const handleCopy = () => {
    if (!convertedUrl) return
    navigator.clipboard.writeText(convertedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* 顶部面包屑导航 */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-8 overflow-x-auto pb-1" aria-label="Breadcrumb">
        <a href="/" className="hover:text-emerald-500 transition-colors flex-shrink-0">首页</a>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
        <span className="text-zinc-700 dark:text-zinc-300 font-medium flex-shrink-0">工具中心</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
        <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate" aria-current="page">订阅转换与全端配置工具箱</span>
      </nav>

      {/* 页面主标题区 */}
      <div className="max-w-4xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-3 shadow-sm">
          <Wrench className="w-3.5 h-3.5 text-emerald-500" />
          <span>全能网络工具箱 & 客户端教程中心</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
          通用订阅格式转换、多端客户端选型与网络诊断中心
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          集成在线订阅格式转换引擎、全平台开源客户端保姆级教程、网络环境与 IP 纯净度检测，以及基于真实故障场景的秒级排障决策矩阵。
        </p>
      </div>

      {/* ======================================================== */}
      {/* 板块 1：【核心交互区】在线订阅格式转换与解析生成器 + 检测站 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* 左侧：通用订阅转换器 (占 7 列) */}
        <div id="converter" className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden scroll-mt-24">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                <RefreshCw className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  通用订阅格式转换引擎
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  支持 V2Ray / SS / SSR 一键转 Clash Verge / sing-box / Surge / QuanX
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
              即时解析
            </span>
          </div>

          <form onSubmit={handleConvert} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                原始订阅链接或节点 URL：
              </label>
              <input
                type="text"
                value={subUrl}
                onChange={(e) => setSubUrl(e.target.value)}
                placeholder="粘贴你的服务商订阅链接（https://...）或节点 URL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                目标客户端格式：
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'clash', label: 'Clash Verge Rev', desc: 'Mihomo 核心' },
                  { id: 'singbox', label: 'sing-box', desc: '新一代内核' },
                  { id: 'surge', label: 'Surge 4/5', desc: 'Apple 旗舰' },
                  { id: 'quanx', label: 'Quantumult X', desc: 'iOS 全能分流' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTargetClient(item.id)}
                    className={`py-2 px-2.5 rounded-xl text-left border transition-all ${
                      targetClient === item.id
                        ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{item.label}</div>
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 附加参数控制 */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-200">
                <input
                  type="checkbox"
                  checked={includeEmoji}
                  onChange={(e) => setIncludeEmoji(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 border-zinc-300 dark:border-zinc-700"
                />
                <span>自动追加国旗 Emoji</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-200">
                <input
                  type="checkbox"
                  checked={enableUdp}
                  onChange={(e) => setEnableUdp(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 border-zinc-300 dark:border-zinc-700"
                />
                <span>启用 UDP 转发支持</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>生成转换订阅链接</span>
            </button>
          </form>

          {convertedUrl && (
            <div className="mt-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  转换完成！可在目标客户端中直接导入：
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已复制到剪贴板' : '复制链接'}</span>
                </button>
              </div>
              <p className="text-[11px] font-mono break-all text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 select-all">
                {convertedUrl}
              </p>
              <p className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
                <span>💡 提示：若导入提示连接超时，请参考下方故障诊断矩阵中的</span>
                <a href="/buying/subscription-issues/" className="text-emerald-600 dark:text-emerald-400 underline font-medium">订阅更新失败排查</a>。
              </p>
            </div>
          )}
        </div>

        {/* 右侧：在线检测与隐私测试站 (占 5 列) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex-1">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                在线检测与隐私测试站
              </h3>
              <span className="text-[10px] text-zinc-400">权威第三方工具</span>
            </div>

            <div className="space-y-3">
              <a
                id="ip-check"
                href="https://ipinfo.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all scroll-mt-24"
              >
                <div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                    <span>IP 纯净度与欺诈分检测</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    ipinfo.io / whoer.net：检测是否为机房广播 IP、双 ISP 属性及欺诈分
                  </p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-emerald-500">
                  ipinfo
                </span>
              </a>

              <a
                href="https://browserleaks.com/webrtc"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                    <span>WebRTC 真实 IP 侧漏测试</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    browserleaks.com/webrtc：防止 STUN 穿透向目标网站暴露真实家庭公网 IP
                  </p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-emerald-500">
                  webrtc
                </span>
              </a>

              <a
                id="dns-leak"
                href="https://www.dnsleaktest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all scroll-mt-24"
              >
                <div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                    <span>DNS 污染与泄漏排查</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    dnsleaktest.com：验证 DNS 解析是否经过境外加密通道，杜绝运营商挟持
                  </p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-emerald-500">
                  dnsleak
                </span>
              </a>

              <a
                href="/rankings/speed-test-logs/"
                className="group flex items-start justify-between p-3 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-400 hover:bg-amber-50/80 dark:hover:bg-amber-950/40 transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-300 group-hover:text-amber-600 flex items-center gap-1.5">
                    <span>三网晚高峰回国拓扑证据库</span>
                    <ArrowRight className="w-3 h-3 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-0.5">
                    查看电信/联通/移动晚高峰 MTR 链路跳数与真实 4K 测速报告
                  </p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-semibold">
                  实测证据
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 板块 2：【01 选择工具与客户端】主流第三方开源客户端与配置教程库 */}
      {/* ======================================================== */}
      <div id="clients" className="mb-16 scroll-mt-24">
        {/* 全平台实战教程库导航横幅 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/10 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold">全平台客户端实战高清配置教程库</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/25 text-white">
                  6 大平台 · 16 款客户端
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                支持 Windows、macOS、iOS、Android、Apple TV 及软路由，单个客户端平滑下滑展开保姆级步骤
              </p>
            </div>
          </div>
          <a
            href="/tools/tutorials/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm flex-shrink-0"
          >
            <span>进入图文配置中心</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 gap-2">
          <div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>01 / CLIENT TUTORIALS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              主流第三方开源客户端与配置教程库
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-right max-w-sm">
            杜绝机场私有打包软件，使用全球审计的开源纯净客户端，支持多服务商节点自由迁移。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Clash Verge Rev */}
          <a
            href="/tools/tutorials/#clash-verge-windows"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 hover:shadow-lg dark:hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                <Laptop className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                Windows / macOS 推荐
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Clash Verge Rev
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              基于 Tauri + Mihomo (Meta) 核心，完美支持 VLESS Reality、Hysteria2 与 TUN 模式虚拟网卡，内存占用低至 60MB。
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">TUN虚拟网卡</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Mihomo内核</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">规则分流</span>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>查看配置教程</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 2: Shadowrocket */}
          <a
            href="/tools/tutorials/#shadowrocket-ios"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 hover:shadow-lg dark:hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                <Apple className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold">
                iOS 必备首选
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Shadowrocket（小火箭）
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              iOS 生态经典全能代理客户端。支持扫码一键导入、自动定时测速、按场景策略分流与免配置后台长效保活。
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">扫码导入</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">美区ID</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">全协议支持</span>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>查看配置教程</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 3: Sing-Box */}
          <a
            href="/tools/tutorials/#singbox-windows"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 hover:shadow-lg dark:hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50">
                <Cpu className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-100/80 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-semibold">
                全平台极客
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Sing-Box 通用网络箱
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              下一代高性能代理核心框架。极低内存与 CPU 开销，支持跨 Windows、macOS、iOS、Android 全端一致的现代化 JSON 规则配置。
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">原生跨平台</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">极致低延迟</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">JSON配置</span>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>查看配置教程</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 4: v2rayNG / FlClash */}
          <a
            href="/tools/tutorials/#clash-meta-android"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 hover:shadow-lg dark:hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/50">
                <Smartphone className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-100/80 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-semibold">
                Android 首选
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              FlClash / v2rayNG
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              安卓端最稳定的分流组合。FlClash 界面现代遵循 Material You 设计，v2rayNG 极其轻量省电，完美支持分应用代理机制。
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">分应用代理</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">后台保活</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">开源轻量</span>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span>查看配置教程</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 板块 3：【02 按症状排查与选工具】故障场景导向决策矩阵 */}
      {/* ======================================================== */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 gap-2">
          <div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>02 / DIAGNOSTIC MATRIX</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              按故障症状快速排查与决策矩阵
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-right max-w-sm">
            以实际使用中的报错现象为切入点，定位故障真因并秒级跳转至专属解决方案。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Diagnostic Card 1: 订阅导入失败 */}
          <a
            href="/buying/subscription-issues/"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/50">
                <WifiOff className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-semibold">
                高频报错
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              订阅导入失败 / 无法更新 / 无节点
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              排查订阅链接格式不匹配、Token 关键凭据损坏、服务商域名遭本地运营商 DNS 污染，或客户端未开启代理导致订阅死锁。
            </p>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>阅读排错指南</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Diagnostic Card 2: 配置文件报错 */}
          <a
            href="/troubleshooting/connected-no-internet/"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
                <FileCode className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
                配置语法
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              配置文件报错 / YAML 语法解析失败
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              排查冒号后缺失空格、全角符号、多级缩进格式错误，或缺少 proxies/rules 关键节点字段导致内核崩溃。
            </p>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>语法错误修复</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Diagnostic Card 3: 节点超时 / Ping 通无网 */}
          <a
            href="/troubleshooting/timeout/"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-red-50 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-800/50">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-semibold">
                断网急救
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              节点全部超时 / Ping 得通但打不开网页
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              定位电脑系统时间偏差超标（大于 90 秒触发 TLS 熔断）、Windows 系统代理端口残留劫持、TUN 虚拟网卡驱动冲突。
            </p>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>排障急救手册</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Diagnostic Card 4: 大模型被拒 / ChatGPT 403 */}
          <a
            href="/rankings/ai-services/"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50">
                <Bot className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-semibold">
                AI风控
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              大模型被拒 / ChatGPT 403 / Claude 封号
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              排查 Cloudflare Error 1020 阻断，告别公共机房高危脏 IP，切换纯血原生双 ISP 家庭住宅低风控节点。
            </p>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>AI 专线横评</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Diagnostic Card 5: 线路看懂与晚高峰卡顿 */}
          <a
            href="/rankings/iplc-iepl/"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                <TrendingUp className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                专线验伪
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              线路看懂：真假专线与晚高峰卡顿排查
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              识别公网 163 贴牌假专线，解析 MTR 链路跳数与晚高峰国际出口拥堵骨干丢包，选型真二层物理内网专线。
            </p>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>晚高峰专线实测</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Diagnostic Card 6: 保护订阅凭证隐私 */}
          <a
            href="/buying/free-risks/"
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <Lock className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">
                隐私安全
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              纯本地检测：保护私有订阅凭证隐私
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4 flex-1 leading-relaxed">
              严防公共转换平台中间人截取私有 Token 盗刷流量，遵守数据脱敏规范，防范自建节点核心私钥泄露风险。
            </p>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>安全防坑防范</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 板块 4：【03 深度 SEO/GEO 知识库正文】 */}
      {/* ======================================================== */}
      <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
        <div className="max-w-4xl space-y-10">
          {/* Direct Answer 核心答案卡片 */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                【Direct Answer / 订阅转换与工具选型核心答案】
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
              <strong>什么是网络订阅转换？</strong> 订阅转换（Subconverter）是一个将网络服务商下发的底层节点数据（如 Shadowsocks、V2Ray VMess、Trojan 或原始 Base64 编码字符串）解析重构为目标客户端专用配置（如 Clash 的 YAML 树形配置、Sing-Box 的 JSON 路由抽象表、Surge 的段落规则）的自动化处理服务。它的核心价值在于<strong>统一多协议、自动载入国内外分流策略组，并实现全平台无缝迁移</strong>。
            </p>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>第三方开源客户端与机场定制客户端的区别是什么？</strong> 强烈建议优先使用第三方开源客户端（如 Clash Verge Rev、Shadowrocket、Sing-Box）。开源客户端由全球极客社区持续审计，无任何私有数据后门，支持同时导入多家服务商订阅进行容灾互备；而机场“一键登录定制客户端”多为商业闭源打包程序，往往强制绑定单一商家、内置私有流量规则，且一旦服务商跑路客户端立即瘫痪。
            </p>
          </div>

          {/* 深度科普一：开源客户端 vs 机场定制客户端横向解剖 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-emerald-500" />
              一、第三方开源客户端 vs 机场定制客户端：安全性与自由度全面对比
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              在刚接触科学网络时，许多新手图省事，直接下载服务商官网提供的“一键安装客户端”。但从长远来看，这隐藏着巨大的安全与资产风险。下表详细拆解两者在关键指标上的差异：
            </p>

            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 mb-6">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-bold border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">评估对比维度</th>
                    <th className="py-3 px-4">第三方开源客户端 (Clash Verge / 小火箭 / Sing-box)</th>
                    <th className="py-3 px-4">机场定制一键客户端 (闭源 Electron / 定制版)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-zinc-800 dark:text-zinc-200">代码透明度与安全性</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">✅ 100% 开源，经全球开发者安全审计，绝无私有后门</td>
                    <td className="py-2.5 px-4 text-rose-500 font-medium">❌ 100% 闭源，可能内置行为上报、挖矿或广告劫持插件</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-zinc-800 dark:text-zinc-200">多服务商自由切换</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">✅ 支持同时导入数十家服务商，支持节点混合分流与测速</td>
                    <td className="py-2.5 px-4 text-rose-500 font-medium">❌ 深度硬编码绑定单一商户，无法添加备用节点</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-zinc-800 dark:text-zinc-200">规则分流灵活性</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">✅ 支持 ACL4SSR、GeoIP 精准分流，国内流量绝对直连</td>
                    <td className="py-2.5 px-4 text-zinc-500 font-medium">⚠️ 分流规则粗糙，易导致国内银行/微信访问异常或封号</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-zinc-800 dark:text-zinc-200">商户跑路抗风险</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">✅ 服务商跑路只需换一个订阅，客户端软件无需重装</td>
                    <td className="py-2.5 px-4 text-rose-500 font-medium">❌ 商家域名跑路后软件彻底沦为废铁，甚至无法卸载</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-zinc-800 dark:text-zinc-200">前沿现代协议支持</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">✅ 第一时间跟进 VLESS Reality、Hysteria2、TUIC v5</td>
                    <td className="py-2.5 px-4 text-zinc-500 font-medium">⚠️ 通常仅支持陈旧的 SS/VMess，跨国路由震荡期极易大面积阻断</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 深度科普二：安全准则 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              二、安全防线：为什么严禁随意使用来路不明的公共 Web 订阅转换平台？
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              在互联网上搜索“订阅转换”，会跳出数十个声称完全免费的公共转换网站。然而许多用户不知道，<strong>订阅链接中的 URL 参数包含着你账户的私有鉴权 Token</strong>。一旦通过公共服务器发起转换，以下安全隐患便不可避免：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Token 遭截获与流量盗刷
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  公共转换站后端会无感知记录所有经过的 HTTP 请求。恶意的网站搭建者会定期导出其中的订阅 URL，并在境外服务器上滥用盗刷你的付费流量。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  中间人规则篡改与劫持
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  第三方后端可在生成的 YAML/JSON 配置文件中暗中插入劫持规则：强制将你的部分访问流量重定向到暗网代理节点，甚至实施 DNS 钓鱼攻击。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  自建 VPS 私有凭证裸奔
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  如果你是将自己购买的 VPS 节点链接（如包含服务器真实公网 IP、UUID、私钥）送入公共转换站，等同于向陌生人直接交出机房服务器的完全访问凭据。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>【安全操作法则】</strong>：
              1. 优先使用客户端自带的“原生订阅解析”功能；
              2. 若必须转换格式，优先选用我们集成的可信开源后端（代码完全托管于 GitHub），或利用 Docker 自建私有内网转换容器（`tindy2013/subconverter`）；
              3. 无论任何情况下，切勿在来历不明的论坛小网站提交包含高额余额的年付订阅链接。选型时坚守资金安全，详见 <a href="/buying/payment-risk/" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">订阅周期与月付防坑策略</a>。
            </div>
          </div>

          {/* 深度科普三：高频 FAQ 痛点问答 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              三、常见配置与工具使用痛点解答 (FAQ)
            </h3>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                  Q1：订阅转换后的链接导入客户端，为什么节点列表全为空，或者提示 Network Error？
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>答：这通常有 3 种可能原因：</strong><br />
                  1. <strong>原始订阅链接本身已被运营商阻断</strong>：转换后端服务器部署在境外，如果服务商下发的原始订阅域名被 国际网络出口网关 列入黑名单，转换后端去抓取时同样会发生超时断流。可尝试在浏览器中直接打开原始订阅链接，看能否下载出 Base64 文本；<br />
                  2. <strong>订阅链接中包含特殊转义字符</strong>：部分服务商在 Token 中使用了未编码的 `|` 或 `&` 符号，导致 URL 截断，请手动将参数进行 URLEncode 编码后再试；<br />
                  3. <strong>本地客户端死锁</strong>：如果你的代理客户端之前开启了系统代理，但此时没有任何节点处于连通状态，本地客户端在拉取新订阅时会尝试走已经失效的本地代理，造成“鸡生蛋蛋生鸡”的死锁。解决办法是：<strong>先临时彻底关闭客户端的系统代理开关，更新成功后再重新开启</strong>。
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                  Q2：导入 Clash Verge Rev 时提示 “yaml: unmarshal errors” 或语法错误，该怎么修复？
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>答：这是标准的 YAML 缩进格式损坏报错。</strong><br />
                  1. <strong>节点名称中包含非法字符</strong>：部分服务商在节点名称中加入了未经转义的双引号 `"`、单引号 `'` 或特殊的非标准表情符号，破坏了 YAML 键值对解析；<br />
                  2. <strong>内核版本过旧</strong>：如果节点配置中使用了最新的 Hysteria2 或 VLESS Reality 协议，而你的客户端使用的是老旧的开源 Clash 基础核心，内核无法识别新协议字段，便会抛出语法错误。请在 Clash Verge Rev 设置中将内核切换为最新的 **Mihomo (Clash.Meta)** 核心即可迎刃而解。
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                  Q3：既然使用订阅转换有潜在风险，为什么不直接使用服务商下发的原始配置？
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>答：原始配置往往无法适配前沿客户端，且缺少分流策略组。</strong><br />
                  绝大多数老牌中小型服务商后台仅支持生成单一的 Shadowsocks 或 V2Ray 单节点列表。如果直接导入现代分流客户端，你将无法享受到“国内网站秒级直连不走代理”、“海外流媒体自动分流至原生住宅节点”、“广告域名本地自动黑洞拦截”等高级特性。订阅转换的真正价值是<strong>为这些简陋的原始节点披上强大的 ACL4SSR 企业级分流规则护甲</strong>。
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                  Q4：Clash Verge Rev、Sing-Box 和 Shadowrocket 到底该如何抉择？
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong>答：遵循“设备平台专精”原则即可：</strong><br />
                  - <strong>电脑办公与开发者（Windows / macOS）</strong>：毫无悬念首选 <strong>Clash Verge Rev</strong>，其自带的 TUN 虚拟网卡功能可以一键接管终端 Git、PowerShell 与跨国外服电竞游戏；<br />
                  - <strong>苹果手机与平板（iOS / iPadOS）</strong>：首选 <strong>Shadowrocket（小火箭）</strong>，功能极度成熟且扫码秒配；追求极致规则美学的进阶用户可选用 Surge；<br />
                  - <strong>安卓生态与极客跨平台（Android / Linux）</strong>：首选 <strong>FlClash</strong> 或 <strong>Sing-Box</strong>，资源开销极小且后台常驻保活极其稳健。详细配置与客户端安装包获取入口，请查阅 <a href="/guide/clients/" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">多端客户端选型与专属配置指南</a>。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

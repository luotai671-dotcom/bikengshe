import React from 'react'
import {
  Trophy,
  Wrench,
  Compass,
  ArrowUp,
  Scale,
  Sparkles,
  Zap,
  BookOpen,
  ChevronRight
} from 'lucide-react'

// 1. 核心横评与选购直通车 (Rankings & Buying)
const rankingsLinks = [
  { title: '2026 稳定节点综合推荐榜', href: '/rankings/best/', hot: true },
  { title: '晚高峰抗封锁专线评测榜', href: '/rankings/iplc-iepl/' },
  { title: 'AI 生产力大模型推荐 (ChatGPT/Claude)', href: '/rankings/ai-services/' },
  { title: '4K/8K 流媒体解锁榜 (双 ISP 住宅)', href: '/rankings/streaming/' },
  { title: '高性价比轻量月付榜', href: '/rankings/budget/', budget: true },
  { title: '新手选购 8 大避坑法则', href: '/buying/traps/', trap: true },
]

// 2. 排障急救与协议 (Troubleshooting & Protocols & Wiki)
const troubleshootLinks = [
  { title: '排障总览与故障诊断决策树', href: '/troubleshooting/', hot: true },
  { title: '节点全红 Timeout 与 0ms 诊断', href: '/troubleshooting/timeout/' },
  { title: '连通成功但打不开网页排查', href: '/troubleshooting/connected-no-internet/' },
  { title: 'TUN 虚拟网卡模式启动断网修复', href: '/troubleshooting/tun-failure/' },
  { title: '全景百科与高频 FAQ 矩阵 (55问)', href: '/wiki/', wiki: true },
]

// 3. 工具箱、方法论与关于 (Tools, Methodology & About)
const toolsLinks = [
  { title: '实用网络与通用订阅转换工具箱', href: '/tools/', hot: true },
  { title: '全平台客户端实战教程 (Windows/Mac/iOS/Android)', href: '/tools/tutorials/', tutorial: true },
  { title: '第三方独立测速与回国拓扑证据库', href: '/rankings/speed-test-logs/' },
  { title: '科学网络选型评估方法论 (E-E-A-T)', href: '/buying/methodology/' },
  { title: '关于我们与独立实测准则 (About Us)', href: '/about/', about: true },
  { title: '官方 Telegram 实时预警频道', href: 'https://t.me/shandianjiaoliu', tg: true, external: true },
]

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md mt-24 text-zinc-600 dark:text-zinc-400 relative z-10" aria-label="全站页脚导航与合规信息">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* 4-Column Core Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1: 品牌定位与核心准则 (Brand & Mission) */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/30 flex-shrink-0">
                <svg 
                  className="w-5 h-5 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M7 3v18" />
                  <path d="M17 3v18" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                  <path d="M13 2l-4 8h5l-2 10" stroke="#fef08a" strokeWidth="2" fill="#fef08a" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
                    梯子避坑社
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                    EscapeTrap
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
              拒绝年付被割 · 专测晚高峰丢包 · 极客网络排障库
            </p>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              专注出海办公与科研极客的网络选型指引，提供三网晚高峰真实链路压测与故障自救决策树。
            </p>

            {/* About Us & Telegram Direct CTA Buttons */}
            <div className="space-y-2">
              <a
                href="/about/"
                className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-200 text-xs font-semibold shadow-sm transition-all group"
              >
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  <span>了解避坑社理念与实测方法论</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
              <a
                href="https://t.me/shandianjiaoliu"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-transparent border border-sky-500/30 hover:border-sky-500/60 text-sky-800 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 text-xs font-semibold shadow-sm transition-all group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold">TG</span>
                  <span>加入官方 Telegram 避坑社群</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300 shadow-sm">
                <span className="text-sm">🛡️</span>
                <span className="font-medium">保持 100% 独立实测 · 坚守小额月付原则</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300 shadow-sm">
                <span className="text-sm">⚡</span>
                <span className="font-medium">纯静态 SSG 架构渲染 · 毫秒级加载</span>
              </div>
            </div>
          </div>

          {/* Col 2: 核心横评与选购直通车 (Rankings & Buying) */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <Trophy className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                核心横评与选购直通车
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                RANKINGS
              </span>
            </div>
            <ul className="space-y-2.5">
              {rankingsLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-relaxed"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all mt-0.5 flex-shrink-0" />
                    <span className="group-hover:underline decoration-emerald-500/30 underline-offset-4">
                      {item.title}
                    </span>
                    {item.hot && (
                      <span className="text-[9px] font-mono px-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold flex-shrink-0">
                        TOP
                      </span>
                    )}
                    {item.budget && (
                      <span className="text-[9px] font-mono px-1 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-semibold flex-shrink-0">
                        月付推荐
                      </span>
                    )}
                    {item.trap && (
                      <span className="text-[9px] font-mono px-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-semibold flex-shrink-0">
                        必读
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: 排障急救与协议 (Troubleshooting & Protocols) */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <Wrench className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                排障急救与协议
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                RESCUE
              </span>
            </div>
            <ul className="space-y-2.5">
              {troubleshootLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-relaxed"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all mt-0.5 flex-shrink-0" />
                    <span className="group-hover:underline decoration-emerald-500/30 underline-offset-4">
                      {item.title}
                    </span>
                    {item.hot && (
                      <span className="text-[9px] font-mono px-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold flex-shrink-0">
                        决策树
                      </span>
                    )}
                    {item.wiki && (
                      <span className="text-[9px] font-mono px-1 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-semibold flex-shrink-0">
                        55问
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: 工具箱、方法论与关于 (Tools, Methodology & About) */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <Compass className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                工具箱与方法论
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                E-E-A-T
              </span>
            </div>
            <ul className="space-y-2.5">
              {toolsLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer nofollow" : undefined}
                    className="group flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-relaxed"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all mt-0.5 flex-shrink-0" />
                    <span className="group-hover:underline decoration-emerald-500/30 underline-offset-4">
                      {item.title}
                    </span>
                    {item.hot && (
                      <span className="text-[9px] font-mono px-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold flex-shrink-0">
                        在线转换
                      </span>
                    )}
                    {item.tutorial && (
                      <span className="text-[9px] font-mono px-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-semibold flex-shrink-0">
                        全端实战
                      </span>
                    )}
                    {item.about && (
                      <span className="text-[9px] font-mono px-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-semibold flex-shrink-0">
                        关于社群
                      </span>
                    )}
                    {item.tg && (
                      <span className="text-[9px] font-mono px-1 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 font-semibold flex-shrink-0">
                        实时预警
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: 免责声明与版权信息 */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 space-y-6">
          
          {/* 1. 免责与学术合规声明 (E-E-A-T Compliance Card) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex items-start gap-3.5 shadow-sm">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 flex-shrink-0 mt-0.5">
              <Scale className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <span>免责与学术合规声明</span>
                <span className="text-[10px] font-mono font-normal px-2 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                  LEGAL & ETHICAL DISCLAIMER
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                本站所有测速日志与路由拓扑均基于独立测试环境获取，仅供网络工程学术研究、跨国合法外贸与办公技术交流。本站不提供任何节点销售与境外接入服务，倡导用户遵守当地法律法规。
              </p>
            </div>
          </div>

          {/* 2. 版权、关于入口、状态徽章与回到顶部 */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-4 pt-1">
            {/* Copyright & About & Community Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5">
              <span>© 2026 梯子避坑社 (EscapeTrap). 保留所有权利。</span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="/about/"
                className="text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold underline underline-offset-4 decoration-emerald-500/40 transition-colors"
              >
                关于我们与独立实测准则
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="/buying/methodology/"
                className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                E-E-A-T 测评方法论
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="https://t.me/shandianjiaoliu"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold transition-colors"
              >
                加入官方 Telegram 避坑社群
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="/robots.txt"
                target="_blank"
                className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                Robots 索引
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                Sitemap 地图
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                保持中立测评 · 坚守资金安全
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>纯静态 SSG 架构渲染</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-medium border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all group cursor-pointer"
              aria-label="回到顶部"
            >
              <span>回到顶部</span>
              <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  )
}

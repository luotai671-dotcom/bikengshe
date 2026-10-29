import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Laptop,
  Apple,
  Smartphone,
  Tv,
  Server,
  Bot,
  Search,
  ChevronDown,
  Star,
  ShieldCheck,
  Download,
  ExternalLink,
  RefreshCw,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
  Info,
  ShieldAlert,
  Cpu,
  Terminal,
  Layers,
  Wrench
} from 'lucide-react'
import {
  PLATFORM_TABS,
  CLIENT_TUTORIALS,
  type PlatformTab,
  type ClientTutorial
} from '../../data/clientTutorials'

export const ClientTutorialsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('windows')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'clash-verge-windows': true // 默认展开 Windows 推荐第 1 款
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const isInitialMount = useRef(true)

  // 处理 URL Hash 初始加载与锚点定位（如 #windows, #macos, #clash-verge-windows）
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      // 1. 若 hash 是平台类别名
      const isPlatform = PLATFORM_TABS.some(t => t.id === hash)
      if (isPlatform) {
        setActiveTab(hash)
        return
      }

      // 特殊别名映射
      if (hash === 'router-tv' || hash === 'tv') {
        setActiveTab('tv')
        return
      }
      if (hash === 'router' || hash === 'linux') {
        setActiveTab('router-linux')
        return
      }

      // 2. 若 hash 是客户端 ID，切换到该客户端所属平台并展开该卡片
      const matchedClient = CLIENT_TUTORIALS.find(c => c.id === hash)
      if (matchedClient) {
        setActiveTab(matchedClient.platform)
        setExpandedCards(prev => ({ ...prev, [matchedClient.id]: true }))
        setTimeout(() => {
          const el = document.getElementById(matchedClient.id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 150)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // 切换展开/折叠状态
  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const nextState = !prev[id]
      return {
        ...prev,
        [id]: nextState
      }
    })
  }

  // 全部展开 / 全部收起
  const expandAllInTab = () => {
    const newExpanded = { ...expandedCards }
    currentList.forEach(client => {
      newExpanded[client.id] = true
    })
    setExpandedCards(newExpanded)
  }

  const collapseAllInTab = () => {
    const newExpanded = { ...expandedCards }
    currentList.forEach(client => {
      newExpanded[client.id] = false
    })
    setExpandedCards(newExpanded)
  }

  // 复制文字辅助
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // 过滤后的客户端列表
  const currentList = useMemo(() => {
    let list = CLIENT_TUTORIALS
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      return list.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.platformName.toLowerCase().includes(q) ||
        item.coreEngine.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return list.filter(item => item.platform === activeTab)
  }, [activeTab, searchQuery])

  // 渲染平台图标
  const renderPlatformIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Laptop': return <Laptop className={className} />
      case 'Apple': return <Apple className={className} />
      case 'Smartphone': return <Smartphone className={className} />
      case 'Bot': return <Bot className={className} />
      case 'Tv': return <Tv className={className} />
      case 'Server': return <Server className={className} />
      default: return <Cpu className={className} />
    }
  }

  // 渲染星级推荐指数
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-500" title={`推荐指数: ${rating} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
          />
        ))}
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-1 font-mono">
          {rating}.0
        </span>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* 顶部主视觉横幅 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 text-white p-6 sm:p-8 lg:p-10 mb-8 border border-zinc-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>全网主流科学上网客户端 · 2026 高清实战教程库</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            全平台客户端保姆级图文配置指南
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 max-w-3xl">
            涵盖 Windows、macOS、iOS、Android、Apple TV 及 OpenWrt 软路由 6 大终端生态。
            坚决杜绝带有后门风险的机场私有打包客户端，全量采用经过全球极客安全审计的纯净开源核心。
            每个客户端均提供“官方安全下载 → 一键订阅导入 → 核心开关设置 → 常见故障秒查”四步闭环。
          </p>

          {/* 快捷跳转指引胶囊 */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-300">
            <span className="text-zinc-400">⚡ 常用快捷导航：</span>
            <a
              href="/rankings/best/"
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>获取稳定节点订阅直通车</span>
            </a>
            <a
              href="/rankings/budget/"
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-amber-950/80 text-amber-300 border border-amber-700/50 transition-colors flex items-center gap-1"
            >
              <span>轻量月付防坑榜</span>
            </a>
            <a
              href="/troubleshooting/"
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1"
            >
              <Wrench className="w-3.5 h-3.5 text-zinc-400" />
              <span>网络排障全景决策树</span>
            </a>
          </div>
        </div>
      </div>

      {/* 搜索与快捷操作区 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索客户端名称、内核（如 Mihomo、小火箭、TUN、Apple TV）..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-1"
            >
              清除
            </button>
          )}
        </div>

        {/* 展开/折叠全部按钮 */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={expandAllInTab}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            全部展开
          </button>
          <button
            onClick={collapseAllInTab}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            全部收起
          </button>
        </div>
      </div>

      {/* All Client Anchor Targets for Static Deep-Linking & Crawlers */}
      <div className="sr-only" aria-hidden="true">
        {CLIENT_TUTORIALS.map(c => (
          <div key={`anchor-${c.id}`} id={c.id} />
        ))}
      </div>

      {/* 平台快速切换 Tab 栏 (Platform Filter Tabs) */}
      {!searchQuery && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-8">
          {PLATFORM_TABS.map((tab) => {
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                id={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, '', `#${tab.id}`)
                  }
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 relative group ${
                  isSelected
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/70 border-emerald-500/80 text-emerald-900 dark:text-emerald-100 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-zinc-900/90 border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <div className={`p-2 rounded-xl mb-1.5 transition-transform group-hover:scale-105 ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}>
                  {renderPlatformIcon(tab.iconName, 'w-5 h-5')}
                </div>
                <span className="text-xs sm:text-sm font-bold truncate max-w-full">
                  {tab.name}
                </span>
                <span className={`text-[10px] font-mono mt-0.5 px-1.5 py-0.2 rounded ${
                  isSelected
                    ? 'bg-emerald-200/60 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}>
                  {tab.badge} ({tab.count})
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* 搜索提示或当前分类标题 */}
      {searchQuery ? (
        <div className="mb-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
          <span>
            搜索关键词 “<strong className="text-emerald-600 dark:text-emerald-400">{searchQuery}</strong>” 共找到 <strong>{currentList.length}</strong> 款客户端教程：
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-emerald-600 dark:text-emerald-400 underline font-medium"
          >
            返回平台分类
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-emerald-500 rounded-sm inline-block" />
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span>{PLATFORM_TABS.find(t => t.id === activeTab)?.name} 客户端精选矩阵</span>
              <span className="text-xs font-mono font-normal text-zinc-400">
                (共 {currentList.length} 款)
              </span>
            </h2>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">
            点击卡片任意位置，平滑下滑展开超详细配置实操
          </span>
        </div>
      )}

      {/* 客户端抽屉列表 (Slide-Down Accordion Cards) */}
      <div className="space-y-4 mb-16">
        {currentList.map((client) => {
          const isExpanded = !!expandedCards[client.id]

          return (
            <div
              key={client.id}
              id={client.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-zinc-900 border-emerald-500/60 dark:border-emerald-500/60 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                  : 'bg-white dark:bg-zinc-900/90 border-zinc-200/90 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md'
              }`}
            >
              {/* 卡片头部（未展开与展开时均展示，支持点击整行展开/收起） */}
              <div
                onClick={() => toggleCard(client.id)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors group"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleCard(client.id)
                  }
                }}
              >
                {/* 左侧：图标 + 名称 + 核心 + 适用人群 */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isExpanded
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                  }`}>
                    {renderPlatformIcon(
                      PLATFORM_TABS.find(t => t.id === client.platform)?.iconName || 'Cpu',
                      'w-6 h-6'
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {client.name}
                      </h3>

                      {/* 适合人群标签 */}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                        {client.audienceBadge}
                      </span>

                      {/* 内核徽章 */}
                      <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60 hidden sm:inline-block">
                        内核: {client.coreEngine}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                      {client.tagline}
                    </p>

                    {/* 标签列表 */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {client.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 右侧：推荐星级 + 展开指示箭头 */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-[10.5px] text-zinc-400 uppercase tracking-wider mb-0.5">
                      推荐指数
                    </span>
                    {renderStars(client.rating)}
                  </div>

                  <div className="flex items-center gap-1.5 pl-2 sm:border-l border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="hidden md:inline">
                      {isExpanded ? '收起配置步骤' : '展开配置教程'}
                    </span>
                    <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 transition-colors`}>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-500 group-hover:text-emerald-500 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-emerald-500' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* 卡片展开详情抽屉（Slide-down Drawer 内容） */}
              {/* ======================================================== */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-[3500px] opacity-100 border-t border-zinc-200/80 dark:border-zinc-800/80' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="p-4 sm:p-6 lg:p-7 bg-zinc-50/60 dark:bg-zinc-950/50 space-y-6">

                  {/* 第一步：官方安全下载直达 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold font-mono">
                          01
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                          <Download className="w-4 h-4 text-emerald-500" />
                          <span>{client.step1Download.title}</span>
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                        官方正版源
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                      {client.step1Download.desc}
                    </p>

                    {/* 下载按钮与哈希防伪提示 */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href={client.officialDownload.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all group"
                      >
                        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        <span>前往 GitHub 官方 Release 安全下载</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>

                      <div className="flex-1 text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-zinc-700 dark:text-zinc-200">防伪防钓鱼提示：</strong>
                          <span>{client.officialDownload.hint}（{client.officialDownload.versionTip}）</span>
                        </div>
                      </div>
                    </div>

                    {client.step1Download.notes && client.step1Download.notes.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap gap-2 text-[11px] text-zinc-500">
                        {client.step1Download.notes.map((note, idx) => (
                          <span key={idx} className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            <span>{note}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 第二步：一键导入订阅/手动配置 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold font-mono">
                          02
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-teal-500" />
                          <span>{client.step2Import.title}</span>
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800/60">
                        核心操作步骤
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                      {client.step2Import.desc}
                    </p>

                    {/* 详细步骤列表 */}
                    <div className="space-y-2.5 mb-4">
                      {client.step2Import.subSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 节点订阅推荐与站内直通车引导 */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs text-zinc-700 dark:text-zinc-200">
                          {client.step2Import.recommendedProviderText}：还未持有可用订阅？推荐先在直通车中选购。
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href="/rankings/best/"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
                        >
                          <span>2026 稳定梯子选购直通车</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                        <a
                          href="/rankings/budget/"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-white font-semibold text-xs transition-colors shadow-sm"
                        >
                          <span>轻量月付榜</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 第三步：推荐核心开关设置 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-bold font-mono">
                          03
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-amber-500" />
                          <span>{client.step3Settings.title}</span>
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
                        避免侧漏与断流
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                      {client.step3Settings.desc}
                    </p>

                    {/* 开关表格/列表 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {client.step3Settings.switches.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{item.name}</span>
                            </span>
                            <span className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded ${
                              item.action === '必开'
                                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                                : item.action === '推荐'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                            }`}>
                              {item.action}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-snug">
                            {item.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 第四步：常见突发问题秒查 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-bold font-mono">
                          04
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-500" />
                          <span>{client.step4Troubleshooting.title}</span>
                        </h4>
                      </div>
                      <a
                        href="/troubleshooting/"
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <span>完整排障诊断树 →</span>
                      </a>
                    </div>

                    {/* 问题与对策列表 */}
                    <div className="space-y-3">
                      {client.step4Troubleshooting.items.map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-start gap-1.5">
                              <span className="text-rose-500 font-mono font-bold">Q{idx + 1}:</span>
                              <span>{faq.q}</span>
                            </span>
                            {faq.link && (
                              <a
                                href={faq.link}
                                className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 flex-shrink-0"
                              >
                                <span>诊断专栏 →</span>
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 卡片底栏辅助操作 */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>本教程已验证适配当前 2026 最新官方内核与主流协议规则</span>
                    </span>
                    <button
                      onClick={() => toggleCard(client.id)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      ▲ 收起该客户端教程
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 底部全景内链与延伸指南引导矩阵 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>下一步行动建议</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2">
            客户端已安装完成？配置优质线路与防封策略
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            科学上网客户端仅为底层数据转发引擎，连接质量、流媒体能否 4K 播放以及 ChatGPT/Claude 是否被拒，取决于所选服务商的物理链路。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/rankings/best/"
            className="group p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 hover:border-emerald-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                年度总榜
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              2026 稳定节点综合推荐榜
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              主打高权重年度核心总榜，兼顾速度与稳定性，杜绝年付被割风险。
            </p>
          </a>

          <a
            href="/rankings/iplc-iepl/"
            className="group p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 hover:border-amber-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Zap className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
                晚高峰合规跨国专线传输
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              晚高峰抗封锁专线评测榜
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              深耕真实内网 IPLC/IEPL 物理专线与晚高峰不限速真实压测场景。
            </p>
          </a>

          <a
            href="/troubleshooting/"
            className="group p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 hover:border-teal-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                <Wrench className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300">
                9大场景
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              排障总览与故障诊断树
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              遇到节点超时、TUN 驱动报错或打不开网页？按图索骥秒级定位修复。
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}

function Zap(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

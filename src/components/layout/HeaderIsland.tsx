import React, { useState, useRef, useEffect } from 'react'
import {
  Compass,
  ShieldCheck,
  ChevronDown,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  BookMarked,
  Activity,
  Wrench,
  RefreshCw,
  WifiOff,
  AlertTriangle,
  ShieldAlert,
  Terminal,
  Zap,
  Bot,
  Laptop,
  Apple,
  Smartphone,
  Tv,
  ArrowRight
} from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { MobileDrawer } from './MobileDrawer'
import { SearchModal } from '../search/SearchModal'
import {
  BUYING_GUIDE_ITEMS,
  BUYING_RANKING_ITEMS,
  TROUBLESHOOTING_MENU_ITEMS,
  TOOLS_TUTORIAL_ITEMS,
  TOOLS_UTILITY_ITEMS
} from '../../data/navigation'

interface HeaderIslandProps {
  currentPath?: string
}

export const HeaderIsland: React.FC<HeaderIslandProps> = ({ currentPath = '' }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isBuyingDropdownOpen, setIsBuyingDropdownOpen] = useState(false)
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false)
  const [isTroubleshootDropdownOpen, setIsTroubleshootDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isDark, setIsDark] = useState<boolean>(true)
  const [pathname, setPathname] = useState(currentPath)

  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const buyingDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const toolsDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const troubleshootDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize theme from localStorage or document class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
      const saved = localStorage.getItem('mofa_theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDarkMode = saved ? saved === 'dark' : true
      setIsDark(isDarkMode)
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Global Ctrl+K and custom open-search-modal listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      }
    }
    const handleOpenSearch = () => {
      setIsSearchOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-search-modal', handleOpenSearch)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-search-modal', handleOpenSearch)
    }
  }, [])

  // Close mega menu / dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#mega-menu-trigger') && !target.closest('#mega-menu-panel')) {
        setIsMegaMenuOpen(false)
      }
      if (!target.closest('#buying-dropdown-trigger') && !target.closest('#buying-dropdown-panel')) {
        setIsBuyingDropdownOpen(false)
      }
      if (!target.closest('#tools-dropdown-trigger') && !target.closest('#tools-dropdown-panel')) {
        setIsToolsDropdownOpen(false)
      }
      if (!target.closest('#troubleshoot-dropdown-trigger') && !target.closest('#troubleshoot-dropdown-panel')) {
        setIsTroubleshootDropdownOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false)
        setIsBuyingDropdownOpen(false)
        setIsToolsDropdownOpen(false)
        setIsTroubleshootDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('mofa_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('mofa_theme', 'light')
    }
  }

  const handleMegaMenuMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
      megaMenuTimeoutRef.current = null
    }
    setIsMegaMenuOpen(true)
  }

  const handleMegaMenuMouseLeave = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
    }
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false)
    }, 220)
  }

  const handleMegaMenuClose = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
      megaMenuTimeoutRef.current = null
    }
    setIsMegaMenuOpen(false)
  }

  const handleBuyingMouseEnter = () => {
    if (buyingDropdownTimeoutRef.current) clearTimeout(buyingDropdownTimeoutRef.current)
    setIsBuyingDropdownOpen(true)
  }

  const handleBuyingMouseLeave = () => {
    buyingDropdownTimeoutRef.current = setTimeout(() => {
      setIsBuyingDropdownOpen(false)
    }, 200)
  }

  const handleTroubleshootMouseEnter = () => {
    if (troubleshootDropdownTimeoutRef.current) clearTimeout(troubleshootDropdownTimeoutRef.current)
    setIsTroubleshootDropdownOpen(true)
  }

  const handleTroubleshootMouseLeave = () => {
    troubleshootDropdownTimeoutRef.current = setTimeout(() => {
      setIsTroubleshootDropdownOpen(false)
    }, 200)
  }

  const handleToolsMouseEnter = () => {
    if (toolsDropdownTimeoutRef.current) clearTimeout(toolsDropdownTimeoutRef.current)
    setIsToolsDropdownOpen(true)
  }

  const handleToolsMouseLeave = () => {
    toolsDropdownTimeoutRef.current = setTimeout(() => {
      setIsToolsDropdownOpen(false)
    }, 200)
  }

  const renderToolsIcon = (name?: string) => {
    switch (name) {
      case 'Laptop': return <Laptop className="w-4 h-4 text-emerald-500" />
      case 'Apple': return <Apple className="w-4 h-4 text-blue-500" />
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-indigo-500" />
      case 'Bot': return <Bot className="w-4 h-4 text-teal-500" />
      case 'Tv': return <Tv className="w-4 h-4 text-amber-500" />
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-teal-500" />
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-blue-500" />
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-rose-500" />
      default: return <Wrench className="w-4 h-4 text-emerald-500" />
    }
  }

  const renderTroubleshootIcon = (name?: string) => {
    switch (name) {
      case 'Activity': return <Activity className="w-4 h-4 text-emerald-500" />
      case 'Wrench': return <Wrench className="w-4 h-4 text-emerald-500" />
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-teal-500" />
      case 'WifiOff': return <WifiOff className="w-4 h-4 text-rose-500" />
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4 text-amber-500" />
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-blue-500" />
      case 'Terminal': return <Terminal className="w-4 h-4 text-purple-500" />
      case 'Zap': return <Zap className="w-4 h-4 text-yellow-500" />
      case 'Bot': return <Bot className="w-4 h-4 text-indigo-500" />
      default: return <Wrench className="w-4 h-4 text-emerald-500" />
    }
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === ''
    return pathname.startsWith(path)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/30 group-hover:scale-105 transition-transform">
                  {/* 极客阶梯 + 穿透光束矢量图 */}
                  <svg 
                    className="w-5 h-5 text-white transition-transform duration-500 group-hover:scale-110" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {/* 双侧梯轨 */}
                    <path d="M7 3v18" />
                    <path d="M17 3v18" />
                    {/* 梯级横档 */}
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                    {/* 斜向穿透破障闪电 */}
                    <path d="M13 2l-4 8h5l-2 10" stroke="#fef08a" strokeWidth="2" fill="#fef08a" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
                      梯子避坑社
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      EscapeTrap
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:block -mt-0.5">
                    拒绝年付被割 · 专测晚高峰丢包 · 极客网络排障库
                  </span>
                </div>
              </a>

              {/* Main Nav Items (Desktop) */}
              <nav className="hidden md:flex items-center gap-1 ml-4">
                {/* 1. 新手入门 */}
                <a
                  href="/getting-started"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/getting-started')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  新手入门
                </a>

                {/* 2. 选购 (Dropdown) */}
                <div
                  id="buying-dropdown-trigger"
                  className="relative"
                  onMouseEnter={handleBuyingMouseEnter}
                  onMouseLeave={handleBuyingMouseLeave}
                >
                  <a
                    href="/buying"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsBuyingDropdownOpen(prev => !prev)
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive('/buying') || isActive('/rankings') || isBuyingDropdownOpen
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>选购</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isBuyingDropdownOpen ? 'rotate-180 text-emerald-500' : 'text-zinc-400'
                      }`}
                    />
                  </a>

                  {/* Dual-Column Mega Menu (高对比度、100%纯色不透底、字体加深清晰优化) */}
                  {isBuyingDropdownOpen && (
                    <div
                      id="buying-dropdown-panel"
                      className="absolute top-full left-0 sm:-left-24 w-[660px] sm:w-[720px] pt-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
                      onMouseEnter={handleBuyingMouseEnter}
                      onMouseLeave={handleBuyingMouseLeave}
                    >
                      {/* 透明安全连接桥，防止鼠标下移闪烁 */}
                      <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent pointer-events-auto" />
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xl bg-white dark:bg-zinc-950 ring-1 ring-black/5 dark:ring-white/10">
                        <div className="grid grid-cols-2 gap-5">
                          {/* 左列：【选购指南与避坑手册】（聚焦用户决策、资金安全与真实排障） */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/80 px-1">
                              <span className="text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <span className="w-2 h-4 bg-emerald-500 rounded-sm inline-block" />
                                选购指南与避坑手册
                              </span>
                              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50">
                                决策·避坑
                              </span>
                            </div>
                            {Array.isArray(BUYING_GUIDE_ITEMS) && BUYING_GUIDE_ITEMS.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsBuyingDropdownOpen(false)}
                                className="group flex flex-col p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800 transition-all duration-150 no-underline"
                              >
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                                    {String(item.title || '')}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex-shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60 transition-colors">
                                      {String(item.badge)}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <span className="text-xs text-zinc-600 dark:text-zinc-300 font-normal mt-1 line-clamp-1 leading-relaxed">
                                    {String(item.description)}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>

                          {/* 右列：【稳定梯子选购直通车】（聚焦商业转化与即时在售指引） */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/80 px-1">
                              <span className="text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <span className="w-2 h-4 bg-amber-500 rounded-sm inline-block" />
                                稳定梯子选购直通车
                              </span>
                              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/60 shadow-sm shadow-amber-500/5">
                                支持月付·在售
                              </span>
                            </div>
                            {Array.isArray(BUYING_RANKING_ITEMS) && BUYING_RANKING_ITEMS.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsBuyingDropdownOpen(false)}
                                className="group flex flex-col p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800 transition-all duration-150 no-underline"
                              >
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                    {String(item.title || '')}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex-shrink-0 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/60 transition-colors">
                                      {String(item.badge)}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <span className="text-xs text-zinc-600 dark:text-zinc-300 font-normal mt-1 line-clamp-1 leading-relaxed">
                                    {String(item.description)}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* 底部全景指引栏 */}
                        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 px-1 flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
                          <span className="flex items-center gap-1.5 font-medium">
                            <span className="text-amber-500">💡</span>
                            <span>恪守小额月付原则，拒绝大额年付与虚标专线</span>
                          </span>
                          <a
                            href="/buying"
                            onClick={() => setIsBuyingDropdownOpen(false)}
                            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <span>选购总览中心 →</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. 工具与教程 (Dropdown) */}
                <div
                  id="tools-dropdown-trigger"
                  className="relative"
                  onMouseEnter={handleToolsMouseEnter}
                  onMouseLeave={handleToolsMouseLeave}
                >
                  <a
                    href="/tools"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsToolsDropdownOpen(prev => !prev)
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive('/tools') || isToolsDropdownOpen
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>工具</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isToolsDropdownOpen ? 'rotate-180 text-emerald-500' : 'text-zinc-400'
                      }`}
                    />
                  </a>

                  {/* Dual-Column Tools Dropdown Panel */}
                  {isToolsDropdownOpen && (
                    <div
                      id="tools-dropdown-panel"
                      className="absolute top-full left-1/2 -translate-x-1/2 sm:-translate-x-1/3 w-[660px] sm:w-[720px] pt-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
                      onMouseEnter={handleToolsMouseEnter}
                      onMouseLeave={handleToolsMouseLeave}
                    >
                      {/* 透明安全连接桥，防止鼠标下移闪烁 */}
                      <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent pointer-events-auto" />
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xl bg-white dark:bg-zinc-950 ring-1 ring-black/5 dark:ring-white/10">
                        <div className="grid grid-cols-12 gap-5">
                          {/* 左侧列：全平台新手配置教程（直达各下滑锚点） 占 7 列 */}
                          <div className="col-span-7 space-y-1">
                            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/80 px-1">
                              <span className="text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <span className="w-2 h-4 bg-emerald-500 rounded-sm inline-block" />
                                全平台新手配置教程
                              </span>
                              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50">
                                6大平台·16款客户端
                              </span>
                            </div>

                            <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                              {Array.isArray(TOOLS_TUTORIAL_ITEMS) && TOOLS_TUTORIAL_ITEMS.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsToolsDropdownOpen(false)}
                                  className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800 transition-all duration-150 no-underline"
                                >
                                  <div className="p-2 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                    {renderToolsIcon(item.iconName)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1.5">
                                      <span className="text-[12.5px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                                        {String(item.title || '')}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex-shrink-0">
                                          {String(item.badge)}
                                        </span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal line-clamp-1 leading-snug mt-0.5">
                                        {String(item.description)}
                                      </span>
                                    )}
                                  </div>
                                </a>
                              ))}
                            </div>

                            {/* 左侧列底部：教程库总入口 */}
                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 px-1">
                              <a
                                href="/tools/tutorials/"
                                onClick={() => setIsToolsDropdownOpen(false)}
                                className="group flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 py-1"
                              >
                                <span>进入全平台高清图文配置中心（平滑展开）</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                          </div>

                          {/* 右侧列：实用网络检测工具箱 占 5 列 */}
                          <div className="col-span-5 space-y-1 pl-4 border-l border-zinc-100 dark:border-zinc-800/80 flex flex-col justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/80 px-1">
                                <span className="text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                  <span className="w-2 h-4 bg-teal-500 rounded-sm inline-block" />
                                  实用网络检测工具箱
                                </span>
                                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/50">
                                  在线即时
                                </span>
                              </div>

                              {Array.isArray(TOOLS_UTILITY_ITEMS) && TOOLS_UTILITY_ITEMS.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsToolsDropdownOpen(false)}
                                  className="group flex flex-col p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800 transition-all duration-150 no-underline"
                                >
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="text-[12.5px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                                      {String(item.title || '')}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-teal-200 dark:border-teal-800/80 bg-teal-50/80 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex-shrink-0">
                                        {String(item.badge)}
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal mt-0.5 line-clamp-2 leading-relaxed">
                                      {String(item.description)}
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>

                            {/* 右侧列底部：工具中心总入口 */}
                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 px-1 mt-2">
                              <a
                                href="/tools"
                                onClick={() => setIsToolsDropdownOpen(false)}
                                className="group flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 py-1"
                              >
                                <span>打开全功能实用工具中心</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. 排障 (Dropdown) */}
                <div
                  id="troubleshoot-dropdown-trigger"
                  className="relative"
                  onMouseEnter={handleTroubleshootMouseEnter}
                  onMouseLeave={handleTroubleshootMouseLeave}
                >
                  <a
                    href="/troubleshooting/"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsTroubleshootDropdownOpen(prev => !prev)
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive('/troubleshoot') || isActive('/troubleshooting') || isTroubleshootDropdownOpen
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>排障</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isTroubleshootDropdownOpen ? 'rotate-180 text-emerald-500' : 'text-zinc-400'
                      }`}
                    />
                  </a>

                  {/* Single-Column Troubleshooting Dropdown Menu */}
                  {isTroubleshootDropdownOpen && (
                    <div
                      id="troubleshoot-dropdown-panel"
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[390px] sm:w-[430px] pt-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
                      onMouseEnter={handleTroubleshootMouseEnter}
                      onMouseLeave={handleTroubleshootMouseLeave}
                    >
                      {/* 透明安全连接桥，防止鼠标下移闪烁 */}
                      <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent pointer-events-auto" />
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3.5 shadow-2xl bg-white dark:bg-zinc-950 ring-1 ring-black/5 dark:ring-white/10">
                        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/80 px-2">
                          <span className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <span className="w-2 h-4 bg-amber-500 rounded-sm inline-block" />
                            故障排查与场景诊断库
                          </span>
                          <span className="text-[10.5px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
                            9 大高频分类
                          </span>
                        </div>

                        <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
                          {Array.isArray(TROUBLESHOOTING_MENU_ITEMS) && TROUBLESHOOTING_MENU_ITEMS.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsTroubleshootDropdownOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800 transition-all duration-150 no-underline"
                            >
                              <div className="p-2 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                {renderTroubleshootIcon(item.iconName)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="text-[12.5px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                    {String(item.title || '')}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-amber-200/70 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex-shrink-0">
                                      {String(item.badge)}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal line-clamp-1 leading-snug mt-0.5">
                                    {String(item.description)}
                                  </span>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* 底部全景指引 */}
                        <div className="mt-2.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 px-2 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                          <span className="text-[11px]">💡 遇到疑难杂症？先断开代理验证直连网络</span>
                          <a
                            href="/troubleshooting/"
                            onClick={() => setIsTroubleshootDropdownOpen(false)}
                            className="text-[11.5px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>排障决策全景树 →</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. 知识库 (Triggers Mega Menu on Hover & Click) */}
                <div
                  id="mega-menu-trigger"
                  className="relative"
                  onMouseEnter={handleMegaMenuMouseEnter}
                  onMouseLeave={handleMegaMenuMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (megaMenuTimeoutRef.current) {
                        clearTimeout(megaMenuTimeoutRef.current)
                        megaMenuTimeoutRef.current = null
                      }
                      setIsMegaMenuOpen(prev => !prev)
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/kb') || isMegaMenuOpen
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                    aria-expanded={isMegaMenuOpen}
                    aria-haspopup="true"
                  >
                    <BookMarked className="w-4 h-4 text-emerald-500" />
                    <span>知识库</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono">
                      4列
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isMegaMenuOpen ? 'rotate-180 text-emerald-500' : 'text-zinc-400'
                      }`}
                    />
                  </button>
                </div>
              </nav>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2">
              {/* Search shortcut button */}
              <button
                id="global-search-trigger"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs transition-colors border border-zinc-200 dark:border-zinc-800"
                title="搜索文档与教程 (Ctrl+K / ⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">搜索指南与文档...</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400">
                  ⌘K
                </kbd>
              </button>

              {/* Dark/Light mode toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title={isDark ? '切换至亮色模式' : '切换至暗色模式'}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile drawer toggle */}
              <button
                onClick={() => setIsMobileDrawerOpen(prev => !prev)}
                className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Toggle mobile menu"
              >
                {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Render 4-Column Mega Menu */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={handleMegaMenuClose}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        />
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  AlignLeft,
  ArrowUp,
  Compass,
  Laptop,
  ShoppingBag,
  Award,
  Lightbulb,
  Bot,
  Tv,
  Server,
  Activity,
  Layers
} from 'lucide-react'
import { DOC_NAV_CATEGORIES, DocNavCategory } from '../../data/docNavTree'

export interface HeadingItem {
  id: string
  text: string
  level: number
}

interface DocSidebarProps {
  currentPath: string
  headings?: HeadingItem[]
  className?: string
  isMobileDrawer?: boolean
  onCloseDrawer?: () => void
}

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-3.5 h-3.5 text-emerald-500" />,
  Laptop: <Laptop className="w-3.5 h-3.5 text-teal-500" />,
  ShoppingBag: <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />,
  Award: <Award className="w-3.5 h-3.5 text-yellow-500" />,
  Lightbulb: <Lightbulb className="w-3.5 h-3.5 text-cyan-500" />,
  Bot: <Bot className="w-3.5 h-3.5 text-indigo-500" />,
  Tv: <Tv className="w-3.5 h-3.5 text-rose-500" />,
  Server: <Server className="w-3.5 h-3.5 text-blue-500" />,
  Activity: <Activity className="w-3.5 h-3.5 text-emerald-500" />,
  BookOpen: <BookOpen className="w-3.5 h-3.5 text-purple-500" />
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  currentPath,
  headings = [],
  className = '',
  isMobileDrawer = false,
  onCloseDrawer
}) => {
  const normalize = (path: string) => path.replace(/\/$/, '').toLowerCase()
  const activeNormalizedPath = normalize(currentPath)

  // Initialize expanded state: the category containing the active article is expanded by default
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {}
    for (const cat of DOC_NAV_CATEGORIES) {
      const hasActive = cat.items.some(item => normalize(item.href) === activeNormalizedPath)
      initialState[cat.id] = hasActive
    }
    return initialState
  })

  // Active tab state: 'nav' (文档大纲/分类树) or 'toc' (本文目录)
  const [activeTab, setActiveTab] = useState<'nav' | 'toc'>('nav')
  const [activeHeadingId, setActiveHeadingId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const activeItemRef = useRef<HTMLAnchorElement | null>(null)

  // Update expanded category when path changes
  useEffect(() => {
    for (const cat of DOC_NAV_CATEGORIES) {
      const hasActive = cat.items.some(item => normalize(item.href) === activeNormalizedPath)
      if (hasActive) {
        setExpandedCategories(prev => ({ ...prev, [cat.id]: true }))
      }
    }
  }, [activeNormalizedPath])

  // Auto-scroll the sidebar to make the active article item visible
  useEffect(() => {
    if (activeTab === 'nav' && activeItemRef.current) {
      const timer = setTimeout(() => {
        activeItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [activeTab, activeNormalizedPath])

  // Scrollspy & progress calculation for the TOC tab
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100))
        setProgress(currentProgress)
      }

      const headingElements = headings
        .map(h => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null)

      const scrollPosition = window.scrollY + 120

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i]
        if (el.offsetTop <= scrollPosition) {
          setActiveHeadingId(headings[i].id)
          return
        }
      }

      if (headings.length > 0) {
        setActiveHeadingId(headings[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }))
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveHeadingId(id)
      if (onCloseDrawer) onCloseDrawer()
    }
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Top Header / Tab Switcher (全站文档 / 本文目录) */}
      <div className="pb-3 mb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-1 flex-shrink-0">
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-0.5 rounded-lg w-full text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('nav')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all ${
              activeTab === 'nav'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>全站导航</span>
          </button>

          {headings.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('toc')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all ${
                activeTab === 'toc'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />
              <span>本文大纲</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pr-1.5 custom-scrollbar space-y-4 max-h-[calc(100vh-160px)]">
        {/* Tab 1: 全站多级分类导航树 (Image 2 style) */}
        {activeTab === 'nav' && (
          <nav className="space-y-1.5 pb-8" aria-label="全站文档多级目录">
            {DOC_NAV_CATEGORIES.map((category) => {
              const isExpanded = !!expandedCategories[category.id]
              const hasActiveChild = category.items.some(
                item => normalize(item.href) === activeNormalizedPath
              )
              const icon = CATEGORY_ICON_MAP[category.iconName || ''] || (
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              )

              return (
                <div key={category.id} className="select-none">
                  {/* Category Header Row */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-left text-xs transition-colors group ${
                      hasActiveChild
                        ? 'text-zinc-900 dark:text-zinc-100 font-bold bg-zinc-100/70 dark:bg-zinc-800/40'
                        : 'text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                        {icon}
                      </span>
                      <span className="truncate tracking-tight">{category.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 text-zinc-400">
                      <span className="text-[10px] font-mono opacity-60">
                        {category.items.length}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 transition-transform duration-150" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-transform duration-150" />
                      )}
                    </div>
                  </button>

                  {/* Level 2: Articles Sub-list */}
                  {isExpanded && (
                    <div className="mt-1 pl-3.5 space-y-0.5 border-l border-zinc-200/80 dark:border-zinc-800/80 ml-3">
                      {category.items.map((item) => {
                        const isActive = normalize(item.href) === activeNormalizedPath

                        return (
                          <a
                            key={item.href}
                            ref={isActive ? activeItemRef : null}
                            href={item.href}
                            onClick={onCloseDrawer}
                            className={`group relative flex items-center justify-between text-xs transition-all ${
                              isActive
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold pl-2.5 pr-2 py-1.5 rounded-r-md border-l-[3px] border-emerald-500 shadow-sm'
                                : 'text-zinc-700 dark:text-zinc-300 font-medium hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 px-2 py-1.5 rounded-md'
                            }`}
                          >
                            <span className="truncate pr-1">{item.title}</span>

                            {item.badge && (
                              <span
                                className={`text-[9.5px] px-1 py-0.2 rounded font-normal flex-shrink-0 ml-1.5 ${
                                  isActive
                                    ? 'bg-emerald-200/60 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200'
                                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        )}

        {/* Tab 2: 本文大纲 / 目录 (TOC) */}
        {activeTab === 'toc' && headings.length > 0 && (
          <div className="space-y-3 pt-1 pb-8">
            {/* Reading progress */}
            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />
                  阅读进度
                </span>
                <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Headings List */}
            <nav className="space-y-1">
              {headings.map((item) => {
                const isHeadingActive = activeHeadingId === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left py-1 text-xs transition-colors flex items-center gap-1.5 truncate ${
                      item.level === 3 ? 'pl-4' : 'pl-0'
                    } ${
                      isHeadingActive
                        ? 'font-bold text-emerald-600 dark:text-emerald-400'
                        : 'text-zinc-700 dark:text-zinc-300 font-medium hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isHeadingActive
                          ? 'bg-emerald-500'
                          : 'bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-500'
                      }`}
                    />
                    <span className="truncate">{item.text}</span>
                  </button>
                )
              })}
            </nav>

            {/* Back to top */}
            <div className="pt-4 mt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  if (onCloseDrawer) onCloseDrawer()
                }}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                回到顶部
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import {
  ChevronDown,
  X,
  Compass,
  ShieldCheck,
  Shield,
  Network,
  Bot,
  HelpCircle,
  BookOpen,
  Search
} from 'lucide-react'
import {
  KNOWLEDGE_BASE_COLUMNS,
  BUYING_GUIDE_ITEMS,
  BUYING_RANKING_ITEMS,
  TROUBLESHOOTING_MENU_ITEMS,
  TOOLS_TUTORIAL_ITEMS,
  TOOLS_UTILITY_ITEMS
} from '../../data/navigation'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenSearch: () => void
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-4 h-4 text-emerald-500" />,
  Network: <Network className="w-4 h-4 text-blue-500" />,
  Bot: <Bot className="w-4 h-4 text-purple-500" />,
  HelpCircle: <HelpCircle className="w-4 h-4 text-amber-500" />,
  BookOpen: <BookOpen className="w-4 h-4 text-emerald-500" />,
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    kb: true,
    buying: false,
    tools: false,
    troubleshooting: false,
    protocols: true,
    routes: false,
    unblocking: false,
    faq: false,
    handbook: false
  })

  if (!isOpen) return null

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSearchClick = () => {
    onClose()
    onOpenSearch()
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 shadow-sm ring-1 ring-emerald-400/30">
              <svg 
                className="w-4 h-4 text-white" 
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
            <span className="font-bold text-sm text-zinc-900 dark:text-white">梯子避坑社 导航</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search button in mobile */}
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-xs text-left"
          >
            <Search className="w-4 h-4 text-zinc-400" />
            <span>搜索 29 篇指南与文档...</span>
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {/* Main 1: 新手入门 */}
          <a
            href="/getting-started"
            onClick={onClose}
            className="flex items-center justify-between p-2.5 rounded-lg font-medium text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <span>新手入门</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              必看
            </span>
          </a>

          {/* Main 2: 选购 (Accordion) */}
          <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('buying')}
              className="w-full flex items-center justify-between p-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <span>选购与横评中心</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  openSections.buying ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSections.buying && (
              <div className="p-2 pt-0 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs">
                {/* 选购指南与避坑手册 */}
                <div className="pt-2">
                  <div className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400 px-2 pb-1 uppercase tracking-wider">
                    选购指南与避坑手册
                  </div>
                  <div className="space-y-1">
                    {Array.isArray(BUYING_GUIDE_ITEMS) && BUYING_GUIDE_ITEMS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="block p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{String(item.title || '')}</span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                              {String(item.badge)}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 稳定梯子选购直通车 */}
                <div className="pt-1 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="font-bold text-[11px] text-amber-600 dark:text-amber-400 px-2 pb-1 uppercase tracking-wider flex items-center justify-between">
                    <span>稳定梯子选购直通车</span>
                    <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
                      支持月付·在售
                    </span>
                  </div>
                  <div className="space-y-1">
                    {Array.isArray(BUYING_RANKING_ITEMS) && BUYING_RANKING_ITEMS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="block p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{String(item.title || '')}</span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                              {String(item.badge)}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main 3: 工具与实战教程 (Accordion) */}
          <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('tools')}
              className="w-full flex items-center justify-between p-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">工具与教程</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                  全端教程
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  openSections.tools ? 'rotate-180 text-emerald-500' : ''
                }`}
              />
            </button>

            {openSections.tools && (
              <div className="p-2 pt-0 space-y-2 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
                {/* 客户端教程大项 */}
                <div className="space-y-1">
                  <div className="px-2 pt-2 pb-1 font-bold text-zinc-900 dark:text-white flex items-center justify-between">
                    <span>全平台客户端图文教程</span>
                    <a
                      href="/tools/tutorials/"
                      onClick={onClose}
                      className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      进入教程库 →
                    </a>
                  </div>
                  {Array.isArray(TOOLS_TUTORIAL_ITEMS) && TOOLS_TUTORIAL_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{String(item.title || '')}</span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-1">
                            {String(item.badge)}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>

                {/* 在线检测与实用工具 */}
                <div className="space-y-1 pt-1 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="px-2 pt-1.5 pb-1 font-bold text-zinc-900 dark:text-white flex items-center justify-between">
                    <span>实用网络自检工具</span>
                    <a
                      href="/tools"
                      onClick={onClose}
                      className="text-[10.5px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      工具首页 →
                    </a>
                  </div>
                  {Array.isArray(TOOLS_UTILITY_ITEMS) && TOOLS_UTILITY_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{String(item.title || '')}</span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex-shrink-0 ml-1">
                            {String(item.badge)}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main 4: 排障 (Accordion) */}
          <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('troubleshooting')}
              className="w-full flex items-center justify-between p-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">排障诊断</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-medium">
                  9大排错
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  openSections.troubleshooting ? 'rotate-180 text-amber-500' : ''
                }`}
              />
            </button>

            {openSections.troubleshooting && (
              <div className="p-2 pt-0 space-y-1 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/60">
                <a
                  href="/troubleshooting/"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-white dark:hover:bg-zinc-800"
                >
                  <span>排障总览与故障决策树 →</span>
                  <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    全景
                  </span>
                </a>
                {Array.isArray(TROUBLESHOOTING_MENU_ITEMS) && TROUBLESHOOTING_MENU_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block p-2 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{String(item.title || '')}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex-shrink-0 ml-1">
                          {String(item.badge)}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Main 5: 知识库 (4 列全集 / 50 篇极客百科) */}
          <div className="pt-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
              <a href="/wiki/" onClick={onClose} className="hover:text-emerald-500 transition-colors">
                极客百科与 FAQ 矩阵 (4 大类)
              </a>
              <span className="font-mono text-[11px] text-emerald-500">50 篇深度</span>
            </div>

            <div className="space-y-2">
              {KNOWLEDGE_BASE_COLUMNS.map((col) => {
                const isOpen = openSections[col.id]
                const icon = ICON_MAP[col.iconName] || <BookOpen className="w-4 h-4 text-emerald-500" />

                return (
                  <div
                    key={col.id}
                    className="border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(col.id)}
                      className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span>【{col.title}】</span>
                        <span className="text-[10px] text-zinc-400 font-normal">({col.items.length})</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-2 pt-0 space-y-1 bg-zinc-50/50 dark:bg-zinc-900/40">
                        {col.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                          >
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span className="text-[10px] px-1 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                {item.badge}
                              </span>
                            )}
                          </a>
                        ))}

                        {col.bottomLink && (
                          <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                            <a
                              href={col.bottomLink.href}
                              onClick={onClose}
                              className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                            >
                              <span>{col.bottomLink.title}</span>
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400 text-center">
          梯子避坑社 (EscapeTrap) · 拒绝年付被割 · 专测晚高峰丢包
        </div>
      </div>
    </div>
  )
}

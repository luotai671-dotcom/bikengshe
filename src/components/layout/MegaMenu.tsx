import React from 'react'
import { Shield, Network, Bot, HelpCircle, BookOpen, ChevronRight, Sparkles } from 'lucide-react'
import { KNOWLEDGE_BASE_COLUMNS } from '../../data/navigation'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-4 h-4 text-emerald-500" />,
  Network: <Network className="w-4 h-4 text-blue-500" />,
  Bot: <Bot className="w-4 h-4 text-purple-500" />,
  HelpCircle: <HelpCircle className="w-4 h-4 text-amber-500" />,
  BookOpen: <BookOpen className="w-4 h-4 text-emerald-500" />,
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      id="mega-menu-panel"
      className={`absolute top-full left-0 right-0 z-50 pt-2.5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-200 ease-out ${
        isOpen
          ? 'opacity-100 visible translate-y-0 pointer-events-auto'
          : 'opacity-0 invisible translate-y-2 pointer-events-none'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 透明安全连接桥（Bridge）：填补 header 下边框与下拉面板之间的微隙，避免鼠标下移时闪烁失焦 */}
      <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent pointer-events-auto" />
      <div className="bg-white dark:bg-zinc-950 mega-menu-shadow rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-7 overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-2xl">
        {/* Top summary banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800/80 gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              极客百科与常见高频 FAQ 矩阵
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              · 5 大垂直类目 / 50 篇硬核原理解析
            </span>
          </div>
          <a
            href="/wiki/"
            onClick={onClose}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 group self-start sm:self-auto"
          >
            🔥 全景极客百科与 FAQ 索引库
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {KNOWLEDGE_BASE_COLUMNS.map((column) => {
            const icon = ICON_MAP[column.iconName] || <BookOpen className="w-4 h-4 text-emerald-500" />

            return (
              <div key={column.id} className="flex flex-col h-full">
                {/* Column Header - Standardized Height */}
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/80 min-h-[44px] h-[44px]">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 flex-shrink-0">
                      {icon}
                    </span>
                    <h3 className="font-extrabold text-[14px] text-zinc-950 dark:text-white tracking-tight truncate">
                      【{column.title}】
                    </h3>
                  </div>
                  {column.badgeText && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 font-semibold flex-shrink-0 ml-1.5">
                      {column.badgeText}
                    </span>
                  )}
                </div>

                {/* Subtitle - Standardized Height */}
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-3 truncate leading-relaxed min-h-[20px] h-5">
                  {column.description}
                </p>

                {/* Items List - Flexible fill with uniform item heights */}
                <div className="flex-1 flex flex-col space-y-1.5 overflow-y-auto max-h-[380px] pr-1 custom-scrollbar">
                  {column.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="group relative flex flex-col p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800 transition-all duration-150 no-underline"
                    >
                      <div className="flex items-center justify-between w-full gap-1.5 min-w-0">
                        <span className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate min-w-0 flex-1">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold font-mono flex-shrink-0 border ${
                              item.badge === '推荐' || item.badge === '核心推荐'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                                : item.badge === '热门' || item.badge === '合规跨国专线传输' || item.badge === '三网选路'
                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                                : item.badge === '必读' || item.badge === '403急救' || item.badge === '全红急救'
                                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'
                                : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200/80 dark:border-zinc-700/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <span className="block text-xs font-normal text-zinc-600 dark:text-zinc-300 truncate mt-1 leading-relaxed">
                          {item.description}
                        </span>
                      )}
                    </a>
                  ))}
                </div>

                {/* Column Bottom Link - Locked to bottom with mt-auto */}
                {column.bottomLink && (
                  <div className="pt-2.5 mt-auto border-t border-zinc-100 dark:border-zinc-800/80">
                    <a
                      href={column.bottomLink.href}
                      onClick={onClose}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center justify-between group p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60 transition-colors h-9"
                    >
                      <span className="truncate">{column.bottomLink.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-1.5" />
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

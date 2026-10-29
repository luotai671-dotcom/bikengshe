import React, { useState, useEffect, useRef } from 'react'
import { Search, X, ChevronRight, FileText } from 'lucide-react'
import { KNOWLEDGE_BASE_COLUMNS, BUYING_DROPDOWN_ITEMS } from '../../data/navigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchItem {
  title: string
  href: string
  category: string
  description?: string
  badge?: string
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Collect all searchable items
  const allItems: SearchItem[] = [
    {
      title: '新手入门：从零开始配置科学上网',
      href: '/getting-started',
      category: '新手指南',
      description: '面向零基础读者的极简上手指引，理清订阅、客户端与网络分流',
      badge: '必读'
    },
    {
      title: '选购指南：机场与节点深度横评',
      href: '/buying',
      category: '选购',
      description: '客观公正的节点服务商评测指标与选购建议'
    },
    {
      title: '实用工具箱：订阅转换与在线检测',
      href: '/tools',
      category: '网络工具',
      description: '订阅转换、DNS泄漏检测、IP归属与测速工具'
    },
    {
      title: '综合排障手册：断连与慢速诊断',
      href: '/troubleshoot',
      category: '排障',
      description: '节点超时、DNS污染、端口冲突全场景排查'
    },
    ...BUYING_DROPDOWN_ITEMS.map(i => ({
      title: i.title,
      href: i.href,
      category: '选购专题',
      description: i.description,
      badge: i.badge
    })),
    ...KNOWLEDGE_BASE_COLUMNS.flatMap(col =>
      col.items.map(item => ({
        title: item.title,
        href: item.href,
        category: col.title,
        description: item.description,
        badge: item.badge
      }))
    )
  ]

  // Filter based on query
  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 10)
    : allItems.filter(item => {
        const q = query.toLowerCase()
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
        )
      })

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          window.location.href = filteredItems[selectedIndex].href
          onClose()
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative mx-auto max-w-2xl transform rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-all overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="搜索全站文档、客户端、自建协议或故障排查..."
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-400">
              未找到与 “<span className="text-zinc-200 font-medium">{query}</span>” 相关的文档
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.href + index}
                  onClick={() => {
                    window.location.href = item.href
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-100'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isSelected
                          ? 'bg-emerald-500 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {item.category}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'translate-x-0.5 text-emerald-500' : 'text-zinc-400'
                      }`}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Modal Footer Hotkeys */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono">
                ↓
              </kbd>
              切换
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono">
                ↵
              </kbd>
              选择
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono">
                ESC
              </kbd>
              关闭
            </span>
          </div>
          <span className="hidden sm:inline">共索引 29 篇技术指南</span>
        </div>
      </div>
    </div>
  )
}

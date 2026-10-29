import React, { useState, useEffect } from 'react'
import { Layers, X, Compass } from 'lucide-react'
import { DocSidebar, HeadingItem } from './DocSidebar'

interface MobileDocDrawerProps {
  currentPath: string
  headings?: HeadingItem[]
}

export const MobileDocDrawer: React.FC<MobileDocDrawerProps> = ({ currentPath, headings = [] }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Trigger Button (Mobile only) */}
      <div className="fixed bottom-6 left-6 z-30 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 text-xs font-semibold transition-all active:scale-95 border border-emerald-400/30"
          aria-label="打开文档导航目录"
        >
          <Layers className="w-4 h-4" />
          <span>文档导航</span>
        </button>
      </div>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-zinc-950 p-4 shadow-2xl flex flex-col border-r border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                  全站知识库导航
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="关闭侧边栏"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-hidden">
              <DocSidebar
                currentPath={currentPath}
                headings={headings}
                isMobileDrawer={true}
                onCloseDrawer={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

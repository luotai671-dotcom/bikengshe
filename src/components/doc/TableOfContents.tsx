import React, { useEffect, useState } from 'react'
import { AlignLeft, ArrowUp, Hash } from 'lucide-react'
import { TOCItem } from '../../types/navigation'

interface TableOfContentsProps {
  content: string
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState(0)

  // Parse markdown headings
  useEffect(() => {
    const lines = content.split('\n')
    const extracted: TOCItem[] = []
    const seenIds = new Map<string, number>()

    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        let text = match[2].trim()
        // strip any markdown links or styling inside heading
        text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').replace(/[*_`]/g, '')

        let id = text
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5\-_]+/g, '-')
          .replace(/^-+|-+$/g, '')

        if (!id) id = `heading-${extracted.length}`

        // ensure unique id
        const count = seenIds.get(id) || 0
        seenIds.set(id, count + 1)
        if (count > 0) {
          id = `${id}-${count}`
        }

        extracted.push({ id, text, level })
      }
    }

    setHeadings(extracted)
    if (extracted.length > 0) {
      setActiveId(extracted[0].id)
    }
  }, [content])

  // Scrollspy and reading progress
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100))
        setProgress(currentProgress)
      }

      // Determine active heading
      const headingElements = headings
        .map(h => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null)

      const scrollPosition = window.scrollY + 120

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i]
        if (el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          return
        }
      }

      if (headings.length > 0) {
        setActiveId(headings[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -90 // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveId(id)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="w-64 flex-shrink-0 hidden xl:block">
      <div className="sticky top-24 pl-6 border-l border-zinc-200 dark:border-zinc-800 text-sm">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
              <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />
              本文目录
            </span>
            <span className="font-mono text-[11px]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Headings list */}
        <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
          {headings.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`group w-full text-left py-1 text-xs transition-colors flex items-center gap-1.5 ${
                  item.level === 3 ? 'pl-4' : 'pl-0'
                } ${
                  isActive
                    ? 'font-medium text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                <Hash
                  className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                    isActive ? 'opacity-100 text-emerald-500' : 'opacity-0 group-hover:opacity-40'
                  }`}
                />
                <span className="truncate">{item.text}</span>
              </button>
            )
          })}
        </nav>

        {/* Back to top */}
        <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            回到顶部
          </button>
        </div>
      </div>
    </div>
  )
}

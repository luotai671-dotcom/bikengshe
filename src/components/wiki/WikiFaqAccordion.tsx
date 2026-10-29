import React, { useState, useEffect, useMemo } from 'react'
import {
  Globe,
  Bot,
  Cpu,
  Network,
  Tv,
  Search,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Share2,
  BookOpen,
  Filter,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react'
import {
  WIKI_FAQ_CATEGORIES,
  WIKI_FAQ_MATRIX,
  type WikiFaqItem,
  type WikiFaqCategory
} from '../../data/wikiFaqMatrix'

interface WikiFaqAccordionProps {
  initialCategory?: string
  title?: string
  subtitle?: string
}

export const WikiFaqAccordion: React.FC<WikiFaqAccordionProps> = ({
  initialCategory = 'all',
  title = '55 道高权重热搜问答矩阵',
  subtitle = '开门见山直给硬核排障方案 · 结构化 GEO 权威引用标准'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({
    'faq-01': true,
    'faq-12': true,
    'faq-26': true
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sharedId, setSharedId] = useState<string | null>(null)

  // 处理 URL Hash 深度定位与锚点联动
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      // 若 hash 匹配分类 ID
      const matchedCat = WIKI_FAQ_CATEGORIES.find(c => c.id === hash)
      if (matchedCat) {
        setSelectedCategory(matchedCat.id)
        return
      }

      // 若 hash 匹配具体 FAQ ID（如 #faq-26）
      const matchedFaq = WIKI_FAQ_MATRIX.find(f => f.id === hash)
      if (matchedFaq) {
        setSelectedCategory('all')
        setExpandedFaqs(prev => ({ ...prev, [matchedFaq.id]: true }))
        setTimeout(() => {
          const el = document.getElementById(matchedFaq.id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 150)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // 展开/收起单个 FAQ
  const toggleFaq = (id: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // 全部展开
  const expandAll = () => {
    const nextState: Record<string, boolean> = {}
    filteredFaqs.forEach(item => {
      nextState[item.id] = true
    })
    setExpandedFaqs(nextState)
  }

  // 全部收起
  const collapseAll = () => {
    const nextState: Record<string, boolean> = {}
    filteredFaqs.forEach(item => {
      nextState[item.id] = false
    })
    setExpandedFaqs(nextState)
  }

  // 复制文本
  const copyAnswer = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // 分享锚点链接
  const copyShareLink = (id: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}#${id}`
      navigator.clipboard.writeText(url)
      setSharedId(id)
      setTimeout(() => setSharedId(null), 2000)
    }
  }

  // 渲染图标
  const renderCategoryIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Globe': return <Globe className={className} />
      case 'Bot': return <Bot className={className} />
      case 'Cpu': return <Cpu className={className} />
      case 'Network': return <Network className={className} />
      case 'Tv': return <Tv className={className} />
      default: return <HelpCircle className={className} />
    }
  }

  // 筛选问答列表
  const filteredFaqs = useMemo(() => {
    let list = WIKI_FAQ_MATRIX

    if (selectedCategory !== 'all') {
      list = list.filter(item => item.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(item =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      )
    }

    return list
  }, [selectedCategory, searchQuery])

  return (
    <div id="faq-matrix" className="w-full scroll-mt-24">
      {/* 顶部标题区 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>GEO 结构化热搜问答矩阵 · 55 题全景库</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            {subtitle}。杜绝一切黑话与多余拼音 ID，每题严格按 200 字直接交付可执行的解决方案。
          </p>
        </div>

        {/* 展开/收起辅助控制 */}
        <div className="flex items-center gap-2 self-start sm:self-end">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            全部展开
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            全部收起
          </button>
        </div>
      </div>

      {/* 搜索过滤框 */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索 55 道高频问答（如：WhatsApp被封、PayPal漂移、ChatGPT空白、休眠断网、QoS限速、奈飞代理）..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-1"
          >
            清除
          </button>
        )}
      </div>

      {/* 5 大分类切换 Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
            selectedCategory === 'all'
              ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
          }`}
        >
          <div className={`p-2 rounded-xl mb-1 ${
            selectedCategory === 'all'
              ? 'bg-emerald-500 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold">全部问答</span>
          <span className="text-[10px] font-mono mt-0.5 text-zinc-400">共 55 题</span>
        </button>

        {WIKI_FAQ_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                if (typeof window !== 'undefined') {
                  window.history.replaceState(null, '', `#${cat.id}`)
                }
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
              }`}
            >
              <div className={`p-2 rounded-xl mb-1 ${
                isSelected
                  ? 'bg-emerald-500 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}>
                {renderCategoryIcon(cat.iconName, 'w-4 h-4')}
              </div>
              <span className="text-xs font-bold truncate max-w-full">{cat.shortName}</span>
              <span className="text-[10px] font-mono mt-0.5 text-zinc-400">{cat.badge}</span>
            </button>
          )
        })}
      </div>

      {/* 搜索提示状态 */}
      {searchQuery && (
        <div className="mb-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
          <span>
            关键词 “<strong className="text-emerald-600 dark:text-emerald-400">{searchQuery}</strong>” 匹配到 <strong>{filteredFaqs.length}</strong> 道问答：
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-emerald-600 dark:text-emerald-400 underline font-medium"
          >
            返回分类全量视图
          </button>
        </div>
      )}

      {/* FAQ 手风琴列表 (Accordion List) */}
      <div className="space-y-3.5 mb-12">
        {filteredFaqs.map((faq, index) => {
          const isExpanded = !!expandedFaqs[faq.id]

          return (
            <div
              key={faq.id}
              id={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-zinc-900 border-emerald-500/60 dark:border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                  : 'bg-white dark:bg-zinc-900/90 border-zinc-200/90 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm'
              }`}
            >
              {/* 手风琴头部（标题行） */}
              <div
                onClick={() => toggleFaq(faq.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none group"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleFaq(faq.id)
                  }
                }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 transition-colors ${
                    isExpanded
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                  }`}>
                    {faq.id.replace('faq-', 'Q')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {faq.categoryName}
                      </span>
                      {faq.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 border border-zinc-200/50 dark:border-zinc-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 group-hover:text-emerald-500 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-emerald-500' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 手风琴展开内容抽屉 (Slide-down Content) */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-[800px] opacity-100 border-t border-zinc-100 dark:border-zinc-800/80' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="p-4 sm:p-5 bg-zinc-50/70 dark:bg-zinc-950/60 space-y-4">
                  {/* 核心答案正文（180-220字精校直答） */}
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>硬核解析与解决方案：</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed indent-0">
                      {faq.answer}
                    </p>
                  </div>

                  {/* 底部操作行：复制答案 + 复制直达锚点 + 精准内链 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyAnswer(faq.answer, faq.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                      >
                        {copiedId === faq.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === faq.id ? '已复制解答' : '复制答案'}</span>
                      </button>

                      <button
                        onClick={() => copyShareLink(faq.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                      >
                        {sharedId === faq.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{sharedId === faq.id ? '锚点已复制' : '分享此题'}</span>
                      </button>
                    </div>

                    {/* 精准内链引导卡 */}
                    <a
                      href={faq.internalLink.href}
                      className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>{faq.internalLink.ctaText}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 5 大类目专属精准内链导流卡片矩阵 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>避坑指引 · 站内全景专栏闭环</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            根据你的排障场景，查阅对应的评测专栏与直通车
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            问答库提供的是紧急定位方法，若根本原因是服务商节点遭受严重超售、跨网 QoS 丢包或机房 ASN 被全网污染，建议直接查阅以下对应榜单。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <a
            href="/rankings/best/"
            className="group p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 hover:border-emerald-500 hover:bg-zinc-800 transition-all"
          >
            <div className="text-xs font-mono text-emerald-400 mb-1">出海/外贸/企业办公</div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>2026 稳定梯子选购直通车</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              主打高权重年度核心总榜，兼顾速度与稳定性，杜绝年付被割。
            </p>
          </a>

          <a
            href="/rankings/ai-services/"
            className="group p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 hover:border-purple-500 hover:bg-zinc-800 transition-all"
          >
            <div className="text-xs font-mono text-purple-400 mb-1">ChatGPT/Claude 解锁</div>
            <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors flex items-center justify-between">
              <span>AI 生产力大模型推荐榜</span>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              精准覆盖大模型访问报错 1020/403 的高频痛点词与双 ISP 纯净节点。
            </p>
          </a>

          <a
            href="/troubleshooting/"
            className="group p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 hover:border-amber-500 hover:bg-zinc-800 transition-all"
          >
            <div className="text-xs font-mono text-amber-400 mb-1">客户端/断网/超时排错</div>
            <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
              <span>排障总览与故障诊断树</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              9 大常见高频故障决策树，按设备与客户端图文排障。
            </p>
          </a>

          <a
            href="/rankings/iplc-iepl/"
            className="group p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 hover:border-teal-500 hover:bg-zinc-800 transition-all"
          >
            <div className="text-xs font-mono text-teal-400 mb-1">物理光缆/合规跨国专线传输专线</div>
            <div className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors flex items-center justify-between">
              <span>晚高峰抗封锁专线评测榜</span>
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              深耕真实专线与晚高峰不限速真实场景，全时段丢包率小于 0.1%。
            </p>
          </a>

          <a
            href="/rankings/streaming/"
            className="group p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 hover:border-rose-500 hover:bg-zinc-800 transition-all"
          >
            <div className="text-xs font-mono text-rose-400 mb-1">4K/8K 奈飞/Disney+</div>
            <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors flex items-center justify-between">
              <span>4K/8K 流媒体解锁榜</span>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              突出原生家庭宽带住宅 IP 解锁能力，秒开超高清非自制剧。
            </p>
          </a>

          <a
            href="/tools/tutorials/"
            className="group p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 hover:border-blue-500 hover:bg-zinc-800 transition-all"
          >
            <div className="text-xs font-mono text-blue-400 mb-1">全平台图文保姆级教程</div>
            <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>全平台客户端实战教程库</span>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              涵盖 Windows、macOS、iOS、Android、TV 及软路由 16 款客户端下滑教程。
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}

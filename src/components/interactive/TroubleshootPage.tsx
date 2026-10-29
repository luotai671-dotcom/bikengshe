import React, { useState } from 'react'
import {
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronDown,
  Terminal,
  ShieldAlert,
  ArrowRight
} from 'lucide-react'

interface IssueItem {
  id: string
  title: string
  symptom: string
  severity: 'high' | 'medium' | 'low'
  reasons: string[]
  solutionSteps: string[]
  command?: string
}

const ISSUES: IssueItem[] = [
  {
    id: 'all-timeout',
    title: '所有节点突然全部变红 / 报错 Timeout',
    symptom: '昨天还能正常使用，今天打开客户端测速所有节点全红，无法打开 Google。',
    severity: 'high',
    reasons: [
      '本机系统时间与标准北京时间偏差超过 90 秒（占高频原因 80%）',
      '服务商套餐流量耗尽或订阅已到期',
      '服务商迁移了国内中转入口，未及时刷新配置',
      '本地 Wi-Fi 路由器拦截了代理端口或 UDP 流量'
    ],
    solutionSteps: [
      '在 Windows 或手机设置中打开「自动设置时间」，点击「立即同步」按钮',
      '登录服务商后台确认套餐剩余流量与有效期',
      '在客户端订阅页面右键点击「更新/刷新配置」',
      '断开当前 Wi-Fi，切换为手机热点进行测试以排查路由器拦截'
    ]
  },
  {
    id: 'ping-ok-web-fail',
    title: '节点测速延迟正常，但浏览器就是打不开网页',
    symptom: '客户端测速显示 50ms 绿色，但 Chrome 提示 ERR_PROXY_CONNECTION_FAILED 或加载圈长转。',
    severity: 'high',
    reasons: [
      'Windows 系统代理端口被残留旧配置锁定或 SwitchyOmega 插件冲突',
      '客户端内核由于异常崩溃退出，但系统代理开关未复位',
      '本地杀毒软件拦截了 127.0.0.1 本地回环端口'
    ],
    solutionSteps: [
      '打开 Windows 设置 -> 网络和 Internet -> 代理，关闭「使用代理服务器」',
      '在 Clash Verge Rev 中关闭「系统代理」开关，等待 3 秒后再重新开启',
      '关闭浏览器中的第三方代理插件，或者启用客户端的 TUN 模式完全绕过系统代理'
    ]
  },
  {
    id: 'tun-fail',
    title: '开启 TUN 模式报错或无网络',
    symptom: '点击开启 TUN 模式提示需要管理员权限，或者开启后电脑彻底断网。',
    severity: 'medium',
    reasons: [
      '未安装或未启动客户端的 Service Mode 服务组件',
      '第三方杀毒软件（360 / 火绒 / 腾讯管家）拦截了虚拟网卡 TAP/TUN 驱动注入',
      '存在多个 VPN 虚拟网卡冲突'
    ],
    solutionSteps: [
      '在设置中先点击「服务模式 (Service Mode)」安装服务驱动并重启软件',
      '以管理员身份右键运行客户端主程序',
      '在设备管理器中检查并清理过期的网络适配器驱动'
    ]
  },
  {
    id: 'dns-leak',
    title: 'DNS 污染与流媒体提示使用代理检测',
    symptom: '访问海外网站被运营商跳转到了反诈或拦截页面，或者 Netflix 提示禁止代理。',
    severity: 'medium',
    reasons: [
      '客户端上游 DNS 未配置加密 DoH 或误走了国内三大运营商 114 / 本地 DNS',
      '节点落地 IP 被流媒体服务商列入了 IDC 机房黑名单'
    ],
    solutionSteps: [
      '在客户端配置中将 DNS 模式设置为 Fake-IP，并将海外 DNS 设置为 1.1.1.1 或 8.8.8.8',
      '在节点列表中切换后缀带有「原生/住宅/NF/Disney」标识的解锁专用节点',
      '使用无痕窗口访问，或清除浏览器 Cookie 缓存'
    ]
  }
]

export const TroubleshootPage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<string>(ISSUES[0].id)

  const active = ISSUES.find(i => i.id === selectedIssue) || ISSUES[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 mb-3">
          <Wrench className="w-3.5 h-3.5 text-amber-500" />
          <span>故障定位与排查手册</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
          网络连接与客户端异常排查
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          按照常见故障现象快速匹配根因，四步定位并解决 95% 的网络断连与配置问题。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Issue List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            选择你遇到的故障现象：
          </h2>
          {ISSUES.map((issue) => {
            const isSelected = selectedIssue === issue.id
            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      issue.severity === 'high'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                    }`}
                  >
                    {issue.severity === 'high' ? '高发故障' : '进阶问题'}
                  </span>
                </div>
                <h3 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                  {issue.title}
                </h3>
              </button>
            )
          })}

          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 mt-6">
            仍未解决？前往查阅{' '}
            <a
              href="/guide/faq/"
              className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center gap-1"
            >
              完整常见问答 FAQ <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right: Detailed Diagnostic Steps */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{active.title}</h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <strong>现象特征：</strong> {active.symptom}
          </p>

          {/* Likely Causes */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              根本原因分析（按概率排序）：
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              {active.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step by step solution */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              推荐标准解决流程：
            </h3>
            <div className="space-y-3">
              {active.solutionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

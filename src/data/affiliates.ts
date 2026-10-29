export interface AffiliateConfig {
  id: string
  name: string
  targetUrl: string
  goPath: string
  aliases?: string[]
}

export const AFFILIATES: AffiliateConfig[] = [
  {
    id: 'sds',
    name: '闪电鼠',
    targetUrl: 'https://chenpin.shandianshuaff.com/#/?code=m28TvPVX',
    goPath: '/go/sds',
    aliases: ['shandianshu']
  },
  {
    id: 'dalaoyun',
    name: '大佬云',
    targetUrl: 'https://chenpin01.dalaoyunaff.com/#/?code=GQ6CL6Km',
    goPath: '/go/dalaoyun',
    aliases: ['dly']
  },
  {
    id: 'sxjs',
    name: '神行加速',
    targetUrl: 'https://chenpingan01.shenxingaff.com/#/?code=RZ48f9wP',
    goPath: '/go/sxjs',
    aliases: ['shenxing']
  },
  {
    id: 'lly',
    name: '榴莲云',
    targetUrl: 'https://chenpingan.liulianyunaff.com/#/?code=7pdjs9zt',
    goPath: '/go/lly',
    aliases: ['liulianyun']
  },
  {
    id: 'hqt',
    name: '环球梯',
    targetUrl: 'https://chenpingan01.huanqiutiaff.com/#/?code=FGCcYdFo',
    goPath: '/go/hqt',
    aliases: ['huanqiuti']
  },
  {
    id: 'yjx',
    name: '云界线',
    targetUrl: 'https://chenpingan.yunjiexianaff.com/#/?code=xLJGaIHM',
    goPath: '/go/yjx',
    aliases: ['yunjiexian']
  },
  {
    id: 'jly',
    name: '极连云',
    targetUrl: 'https://haozevpn.jlyvipaff.com/#/?code=6h2TMD5b',
    goPath: '/go/jly',
    aliases: ['jilianyun']
  },
  {
    id: 'gnt',
    name: '光年梯',
    targetUrl: 'https://gnt001.gntvipaff.cc/#/?code=rN3ybxa7',
    goPath: '/go/gnt',
    aliases: ['guangnianti']
  },
  {
    id: 'byjd',
    name: '边缘节点',
    targetUrl: 'https://wep.edgenovaaff.com/#/?code=papME7sh',
    goPath: '/go/byjd',
    aliases: ['edgenova']
  },
  {
    id: 'sj',
    name: '速界',
    targetUrl: 'https://pygllc.speedworldaff.cc/#/?code=ll8LjYBJ',
    goPath: '/go/sj',
    aliases: ['speedworld', 'sujie']
  },
  {
    id: 'kl',
    name: '快狸',
    targetUrl: 'https://fanxiaobin.kuailiaff.com/#/?code=sOX6N4Tp',
    goPath: '/go/kl',
    aliases: ['kuaili']
  },
  {
    id: 'kxy',
    name: '可信云',
    targetUrl: 'https://everett7623.kosingaff.com//#/?code=Jl6dWU0G',
    goPath: '/go/kxy',
    aliases: ['kexinyun']
  },
  {
    id: 'sy',
    name: '瞬云',
    targetUrl: 'https://ddd.jichang.best/#/register?code=weN73kGq',
    goPath: '/go/sy',
    aliases: ['shunyun']
  },
  {
    id: 'yt',
    name: '云图',
    targetUrl: 'https://super.ytjcok.org/#/register?code=BKvuyYJI',
    goPath: '/go/yt',
    aliases: ['yuntu']
  },
  {
    id: 'kpjs',
    name: '鲲鹏加速',
    targetUrl: 'https://kunpengjiasu.com/#/register?code=oBWoiCcv',
    goPath: '/go/kpjs',
    aliases: ['kunpeng']
  }
]

export const AFFILIATE_BY_ID: Record<string, AffiliateConfig> = {}
export const AFFILIATE_BY_URL: Record<string, AffiliateConfig> = {}

for (const aff of AFFILIATES) {
  AFFILIATE_BY_ID[aff.id.toLowerCase()] = aff
  if (aff.aliases) {
    for (const a of aff.aliases) {
      AFFILIATE_BY_ID[a.toLowerCase()] = aff
    }
  }
  AFFILIATE_BY_URL[aff.targetUrl] = aff
  // Also register with normalized single/double slash
  const altUrl = aff.targetUrl.replace('.com//#/', '.com/#/')
  if (altUrl !== aff.targetUrl) {
    AFFILIATE_BY_URL[altUrl] = aff
  }
}

export function getAffiliateRedirect(idOrUrl: string): AffiliateConfig | undefined {
  if (!idOrUrl) return undefined
  const cleaned = idOrUrl.trim().toLowerCase()
  if (AFFILIATE_BY_ID[cleaned]) return AFFILIATE_BY_ID[cleaned]
  return AFFILIATE_BY_URL[idOrUrl.trim()]
}

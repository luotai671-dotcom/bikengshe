export interface NavItem {
  title: string
  href: string
  description?: string
  badge?: string
  isExternal?: boolean
}

export interface MegaMenuColumn {
  id: string
  title: string
  badgeText?: string
  description: string
  iconName: string
  bottomLink?: {
    title: string
    href: string
  }
  items: NavItem[]
}

export interface DropdownItem {
  title: string
  href: string
  description?: string
  badge?: string
}

export interface TOCItem {
  id: string
  text: string
  level: number
}

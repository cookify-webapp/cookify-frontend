export type primaryButtonType = {
  title: string
  onClick: void
  disabled?: boolean
}

export type secondaryButtonType = {
  title: string
  onClick: void
}

export type secondaryMiniButtonType = {
  icon: string
  onClick: void
}

export type tertiaryButtonType = {
  title: string
  textColor: string
  borderColor: string
  hoverBgColor: string
  textHoverColor: string
  icon?: string
  onClick: void
}

export type tertiaryMiniButtonType = {
  icon: string
  onClick: void
  iconColor: string
  borderColor: string
  hoverBgColor: string
  iconHoverColor: string
}

export type sidebarType = {
  role: "" | "client" | "admin",
  notiCount: number
}
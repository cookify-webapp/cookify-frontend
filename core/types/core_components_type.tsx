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
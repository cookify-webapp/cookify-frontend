export type primaryButtonType = {
  title: string
  onClick: Function
  disabled?: boolean
}

export type secondaryButtonType = {
  title: string
  onClick: Function
}

export type secondaryMiniButtonType = {
  icon: string
  onClick: Function
}

export type tertiaryButtonType = {
  title: string
  textColor: string
  borderColor: string
  hoverBgColor: string
  textHoverColor: string
  icon?: string
  onClick: Function
}

export type tertiaryMiniButtonType = {
  icon: string
  onClick: Function
  iconColor: string
  borderColor: string
  hoverBgColor: string
  iconHoverColor: string
}

export type sidebarType = {
  role: "" | "user" | "admin"
  notiCount: number
}

export type userAccountType = {
  src: string
  userName: string
  role: "user" | "admin"
}

export type searchBoxType = {
  isBorder?: boolean
  onChange: Function
  placeholder: string
  value: string
  isButton?: boolean
  buttonOnClick?: Function
  isShowClearValue?: boolean
}

export type recipePropType = {
  recipe: {
    id: string
    src: string
    rating: number
    rating_count: number
    title: string
    description: string
    created_by: string
    created_at: string
    tags: []
  } | null
  role: "" | "user" | "admin"
  isBookmark: boolean
  onClick: Function
}
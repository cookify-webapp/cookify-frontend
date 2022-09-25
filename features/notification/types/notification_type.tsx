export type notificationListType = {
  _id: string
  type: 'comment' | 'complaint' | 'follow'
  caption: string
  link: string
  reciever: string
  read: boolean
  craetedAt: string
}
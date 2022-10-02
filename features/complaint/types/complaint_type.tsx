export type complaintListType = {
  _id: string
  type: 'Recipe' | 'Snapshot'
  post: string
  reporter: {
    _id: string
    username: string
  }
  remarks: string[]
  detail: string
  status: 'filed' | 'examining' | 'in progress' | 'verifying' | 'completed' | 'deleted' | 'rejected'
  createdAt: string
  moderator?: {
    _id: string
    username: string
  }
  isMe?: boolean
}
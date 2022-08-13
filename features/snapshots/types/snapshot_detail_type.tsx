export type snapshotDetailType = {
  _id: string
  caption: string
  image: string
  author: {
    _id: string
    username: string
    image: string
  }
  recipe: {
    _id: string
    name: string
  }
  createdAt: string
  isMe: boolean
}

export type commentListType = {
  _id: string
  type: string
  post: string
  author: {
    _id: string
    username: string
    image: string
  }
  comment: string
  rating: number
  createdAt: string
  isMe: boolean
}
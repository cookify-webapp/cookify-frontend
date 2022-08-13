export type followingListType = {
  _id: string
  name?: string
  desc: string
  image: string
  author: {
    _id: string
    username: string
    image: string
  }
  recipe?: {
    _id: string
    name: string
  }
  createdAt: string
  type: 'recipe' | 'snapshot'
}
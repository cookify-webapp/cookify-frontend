export type followingListType = {
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
  type: 'recipe' | 'snapshot'
}
export type recipesListType = {
  _id: string
  name: string
  method: {
    _id: string
    name: string
  }
  image: string
  author: {
    _id: string
    username: string
  }
  createdAt: string
  averageRating: number
  bookmarked: boolean
}
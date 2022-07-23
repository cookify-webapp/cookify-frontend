export type userDetailType = {
  _id: string
  username: string
  email: string
  accountType: 'user' | 'admin'
  image: string
  allergy: string[]
  bookmark: []
}

export type userType = {
  _id: string
  username: string
  email: string
  image: string
}

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
    name: string
  }
  createdAt: string
  averageRating: number
}
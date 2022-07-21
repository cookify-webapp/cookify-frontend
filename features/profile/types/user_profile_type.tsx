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
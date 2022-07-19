export type userDetailType = {
  _id: string
  username: string
  email: string
  accountType: 'user' | 'admin'
  image: string
  allergy: string[]
  bookmark: []
}
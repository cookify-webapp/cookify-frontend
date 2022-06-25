import { nutritionType } from "core/types/core_components_type"

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

export type unitType = {
  _id: string
  name: string
  queryKey: string
}

export type ingredientType = {
  _id: string
  name: string
  unit: unitType
  type: {
    _id: string
    name: string
  }
  image: string
}

export type recipeDetailType = {
  _id: string
  name: string
  desc: string
  serving: number
  ingredients: {
    ingredient: ingredientType
    quantity: number
    _id: string
  }[]
  subIngredients: ingredientType[]
  method: {
    _id: string
    name: string
  }
  steps: string[]
  image: string
  author: {
    _id: string
    username: string
    image: string
  }
  nutritionalDetail: nutritionType
  createdAt: string
  averageRating: number
  isMe: boolean
  bookmarked: boolean
}
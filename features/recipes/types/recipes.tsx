import { nutritionLabelType } from "core/types/core_components_type"

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
  subIngredients: []
  method: {
    _id: string
    name: string
  }
  step: string[]
  image: string
  author: {
    _id: string
    username: string
    image: string
  }
  nutritionalDetail: nutritionLabelType
  createdAt: string
  averageRating: number
  isMe: boolean
  bookmarked: boolean
}
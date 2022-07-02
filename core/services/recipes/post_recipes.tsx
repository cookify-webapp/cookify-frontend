import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const addRecipe = (formData, token) => {
  return axios.post(`${publicRuntimeConfig.CKF_RECIPE_API}/create`, formData, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data' 
    }
  })
} 

export const addRecipeComment = (recipeId, comment, token) => {
  return axios.post(`${publicRuntimeConfig.CKF_COMMENT_API}/recipe/${recipeId}/create`, comment, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
}
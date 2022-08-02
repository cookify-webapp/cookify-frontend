import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const setBookmark = (recipeId, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_RECIPE_API}/${recipeId}/bookmark`, '', { 
    headers: { 
      Authorization: `Bearer ${token}`
    }
  })
}
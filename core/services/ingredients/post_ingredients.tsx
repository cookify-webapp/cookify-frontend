import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()


export const addIngredient = (ingredient, token) => {
  return axios.post(`${publicRuntimeConfig.CKF_INGREDIENT_API}/create`, ingredient, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data' 
    }
  })
} 
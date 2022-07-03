import axios from "axios";
import getConfig from 'next/config'
import Cookies from "js-cookie";

const { publicRuntimeConfig } = getConfig()

export const editIngredient = (id, ingredient, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_INGREDIENT_API}/${id}/edit`, ingredient, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data' 
    }
  })
} 
import axios from "axios";
import getConfig from 'next/config'
import Cookies from "js-cookie";

const { publicRuntimeConfig } = getConfig()
const token = Cookies.get("token")

export const addIngredient = (ingredient) => {
  return axios.post(`${publicRuntimeConfig.CKF_INGREDIENT_API}/create`, ingredient, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data' 
    }
  })
} 
import axios from "axios";
import getConfig from 'next/config'
import Cookies from "js-cookie";

const { publicRuntimeConfig } = getConfig()
const token = Cookies.get("token")

export const editIngredient = (id,ingredient) => {
  return axios.put(`${publicRuntimeConfig.CKF_INGREDIENT_API}/${id}/edit`, ingredient, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data' 
    }
  })
} 
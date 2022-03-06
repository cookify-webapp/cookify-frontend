import axios from "axios";

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const getRecipes = () => {
  return axios.get(`${publicRuntimeConfig.CKF_RECIPES_API}`)
}
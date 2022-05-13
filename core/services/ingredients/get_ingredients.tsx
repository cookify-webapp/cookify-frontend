import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const querystring = require('querystring')

export const getIngredientTypes = () => {
  return axios.get(`${publicRuntimeConfig.CKF_INGREDIENT_API}/types`, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getIngredientsList = (params) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_INGREDIENT_API}/list?${query}`, {
    headers: {
      "content-type": "application/json",
    },
  })
}

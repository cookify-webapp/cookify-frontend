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

export const getIngredientUnits = () => {
  return axios.get(`${publicRuntimeConfig.CKF_INGREDIENT_API}/units`, {
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

export const getIngredientDetail = (id) => {
  return axios.get(`${publicRuntimeConfig.CKF_INGREDIENT_API}/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  })
}

export const getSampleIngredients = (id) => {
  return axios.get(`${publicRuntimeConfig.CKF_INGREDIENT_API}/${id}/sample`, {
    headers: {
      "content-type": "application/json",
    },
  })
}
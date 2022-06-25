import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const querystring = require('querystring')

export const getCookingMethods = () => {
  return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/methods`, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getRecipesList = (params) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/list?${query}`, {
    headers: {
      "content-type": "application/json",
    },
  })
}

export const getRecipeDetail = (id, token?) => {
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/${id}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "content-type": "application/json" 
      },
    });
  } else {
    return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/${id}`, {
      headers: { 
        "content-type": "application/json" 
      },
    });
  }
} 

export const getRecipeComments = (id, params, token?, ) => {
  const query = querystring.stringify(params)
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_COMMENT_API}/recipe/${id}/list?${query}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "content-type": "application/json" 
      },
    });
  } else {
    return axios.get(`${publicRuntimeConfig.CKF_COMMENT_API}/recipe/${id}/list?${query}`, {
      headers: { 
        "content-type": "application/json" 
      },
    });
  }
} 
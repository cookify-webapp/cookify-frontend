import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const getRandomRecipe = (token?) => {
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/randomize`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  } else {
    return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/randomize`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
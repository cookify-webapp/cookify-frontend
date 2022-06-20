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
import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const querystring = require('querystring')

export const getBookmarkList = (params, token) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_RECIPE_API}/bookmark?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  })
}
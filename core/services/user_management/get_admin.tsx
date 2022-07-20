import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const querystring = require("querystring");

export const getAdminList = (params, token) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_ACCOUNT_API}/admin/list?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

export const getPendingList = (params, token) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_ACCOUNT_API}/admin/pending/list?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

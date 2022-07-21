import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const querystring = require("querystring");

export const getMe = (token) => {
  return axios.get(`${publicRuntimeConfig.CKF_API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

export const getUserDetail = (id) => {
  return axios.get(`${publicRuntimeConfig.CKF_ACCOUNT_API}/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getFollowingList = (params, userId) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_ACCOUNT_API}/${userId}/following?${query}`, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getFollowerList = (params, userId) => {
  const query = querystring.stringify(params)
  return axios.get(`${publicRuntimeConfig.CKF_ACCOUNT_API}/${userId}/follower?${query}`, {
    headers: {
      "content-type": "application/json",
    },
  });
};
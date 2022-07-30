import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const querystring = require("querystring");

export const getSnapshotList = (params, token?) => {
  const query = querystring.stringify(params)
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/list?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  }
  else {
    return axios.get(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/list?${query}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const querystring = require("querystring");

export const getSnapshotList = (params, token?) => {
  const query = querystring.stringify(params);
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/list?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  } else {
    return axios.get(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/list?${query}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

export const getSnapshotDetail = (id, token?) => {
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  } else {
    return axios.get(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

export const getSnapshotCommentsList = (params, id, token?) => {
  const query = querystring.stringify(params);
  if (token) {
    return axios.get(`${publicRuntimeConfig.CKF_COMMENT_API}/snapshot/${id}/list?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  } else {
    return axios.get(`${publicRuntimeConfig.CKF_COMMENT_API}/snapshot/${id}/list?${query}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

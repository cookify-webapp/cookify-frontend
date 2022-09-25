import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const getNotificationList = (token) => {
  return axios.get(`${publicRuntimeConfig.CKF_NOTIFICATION_API}/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

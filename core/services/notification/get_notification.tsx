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

export const readOneNotification = (notificationId, token) => {
  return axios.get(`${publicRuntimeConfig.CKF_NOTIFICATION_API}/read/${notificationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

export const readAllNotification = (token) => {
  return axios.get(`${publicRuntimeConfig.CKF_NOTIFICATION_API}/read`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
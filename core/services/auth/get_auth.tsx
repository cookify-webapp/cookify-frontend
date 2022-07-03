import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const getMe = (token) => {
  return axios.get(`${publicRuntimeConfig.CKF_API}/me`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "content-type": "application/json" 
    },
  });
} 
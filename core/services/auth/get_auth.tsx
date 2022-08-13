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

export const verifyUniqueKey = (key) => {
  return axios.get(`${publicRuntimeConfig.CKF_ACCOUNT_API}/admin/${key}/verify`, { headers: { 'content-type': 'application/json' }})
}
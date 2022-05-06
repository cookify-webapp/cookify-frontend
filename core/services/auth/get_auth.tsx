import axios from "axios";
import getConfig from 'next/config'
import Cookies from 'js-cookie'

const { publicRuntimeConfig } = getConfig()

const token = Cookies.get('token')

export const getMe = () => {
  return axios.get(`${publicRuntimeConfig.CKF_API}/me`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "content-type": "application/json" 
    },
  });
} 
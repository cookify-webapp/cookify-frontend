import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const editProfile = (data, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_ACCOUNT_API}/edit`, data, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
} 
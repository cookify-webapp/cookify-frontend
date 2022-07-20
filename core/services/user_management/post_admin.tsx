import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const inviteAdmin = (data, token) => {
  return axios.post(`${publicRuntimeConfig.CKF_ACCOUNT_API}/admin/add`, data, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
} 
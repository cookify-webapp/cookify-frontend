import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const sendComplaint = (data, token) => {
  return axios.post(`${publicRuntimeConfig.CKF_COMPLAINT_API}/create`, data, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
} 
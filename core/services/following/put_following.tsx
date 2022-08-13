import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const setFollowing = (userId, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_ACCOUNT_API}/follow/${userId}`, '', { 
    headers: { 
      Authorization: `Bearer ${token}`
    }
  })
}
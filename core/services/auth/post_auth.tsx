import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const register = (user) => {
  return axios.post(`${publicRuntimeConfig.CKF_API}/register`, user, { headers: { 'content-type': 'application/json' }})
} 

export const login = (user) => {
  return axios.post(`${publicRuntimeConfig.CKF_API}/login`, user, { headers: { 'content-type': 'application/json' }})
}
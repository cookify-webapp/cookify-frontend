import axios from "axios";

export const getProfileName = () => {
  return axios.get(`https://cookify-backend/api/profile`)
}
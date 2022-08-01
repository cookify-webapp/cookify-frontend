import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const addSnapshotComment = (snapshotId, comment, token) => {
  return axios.post(`${publicRuntimeConfig.CKF_COMMENT_API}/snapshot/${snapshotId}/create`, comment, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
}
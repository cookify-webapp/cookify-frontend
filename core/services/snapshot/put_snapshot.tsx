import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const editSnapshotComment = (commentId, comment, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_COMMENT_API}/${commentId}/edit`, comment, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
} 

export const editSnapshot = (id, formData, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/${id}/edit`, formData, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data' 
    }
  })
}
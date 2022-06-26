import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const editRecipeComment = (commentId, comment, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_COMMENT_API}/${commentId}/edit`, comment, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
} 
import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const editComplaintStatus = (complaintId, data, token) => {
  return axios.put(`${publicRuntimeConfig.CKF_COMPLAINT_API}/${complaintId}/update`, data, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json' 
    }
  })
}
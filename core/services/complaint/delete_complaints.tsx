import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const deleteComplaint = (complaintId, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_COMPLAINT_API}/${complaintId}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
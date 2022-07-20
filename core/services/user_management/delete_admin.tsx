import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const deleteAdmin = (id, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_ACCOUNT_API}/admin/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

export const deletePending = (email, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_ACCOUNT_API}/admin/${email}/revoke`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
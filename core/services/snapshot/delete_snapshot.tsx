import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const deleteSnapshotComment = (commentId, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_COMMENT_API}/${commentId}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

export const deleteSnapshot = (id, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_SNAPSHOT_API}/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
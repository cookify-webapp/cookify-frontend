import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const deleteRecipe = (id, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_RECIPE_API}/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};

export const deleteRecipeComment = (commentId, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_COMMENT_API}/${commentId}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
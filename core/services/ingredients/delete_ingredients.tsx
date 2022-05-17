import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const deleteIngredient = (id, token) => {
  return axios.delete(`${publicRuntimeConfig.CKF_INGREDIENT_API}/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
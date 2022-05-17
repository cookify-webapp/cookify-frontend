import axios from "axios";
import getConfig from "next/config";
import Cookies from "js-cookie";

const { publicRuntimeConfig } = getConfig();
const token = Cookies.get("token")

export const deleteIngredient = (id) => {
  return axios.delete(`${publicRuntimeConfig.CKF_INGREDIENT_API}/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
};
import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { randomRecipeType } from "../types/random_type";
import Cookies from 'js-cookie'
import { AxiosResponse } from "axios";
import { getRandomRecipe } from "@core/services/random/get_random";

class RandomRecipe {
  randomRecipe: randomRecipeType
  loading: boolean
  modal

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.randomRecipe = null
    this.loading = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  onHandleRandomRecipe = async (isLogin) => {
    try {
      this.loading = true
      let resp: AxiosResponse<any>
      if (isLogin) {
        const token = Cookies.get("token");
        resp = await getRandomRecipe(token)
      } else {
        resp = await getRandomRecipe()
      }
      if (resp.status === 200) {
        this.randomRecipe = resp.data?.recipes[0]
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการสุ่มสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.loading = false
    }
  }
}
export const RandomRecipeContext = createContext(new RandomRecipe());

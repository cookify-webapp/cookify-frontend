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

 currentRandomStatus: 'wait' | 'inprogress' | 'show' 

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.randomRecipe = null
    this.loading = false
    this.currentRandomStatus = 'wait'
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
      this.currentRandomStatus = 'inprogress'
      let resp: AxiosResponse<any>
      if (isLogin) {
        const token = Cookies.get("token");
        resp = await getRandomRecipe(token)
      } else {
        resp = await getRandomRecipe()
      }
      if (resp.status === 200) {
        this.randomRecipe = resp.data?.recipes[0]
        setTimeout(() => {
          this.currentRandomStatus = 'show'
          this.loading = false
        }, 5000)
      }
    } catch (error) {
      this.currentRandomStatus = 'wait'
      this.loading = false
      this.modal.openModal(
        "มีปัญหาในการสุ่มสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    }
  }
}
export const RandomRecipeContext = createContext(new RandomRecipe());

import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getCookingMethods } from "@core/services/recipes/get_recipes";
import _ from 'lodash'

class RecipesList {
  searchWord: string
  isShowClearValue: boolean
  cookingMethods: {
    name: string
    value: string
    image: string
  }[]
  selectedCookingMethod
  methodImage: string[]
  selectedIngredients

  modal
  isMethodLoaded
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.searchWord = ""
    this.isShowClearValue = false
    this.methodImage = [
      "/images/recipes/methods/all.svg",
      "/images/recipes/methods/boiled.svg",
      "/images/recipes/methods/baked.svg",
      "/images/recipes/methods/fry.svg",
      "/images/recipes/methods/steam.svg",
      "/images/recipes/methods/smoked.svg",
      "/images/recipes/methods/stewed.svg",
      "/images/recipes/methods/scald.svg",
      "/images/recipes/methods/pad.svg",
      "/images/recipes/methods/grill.svg",
      "/images/recipes/methods/yum.svg",
      "/images/recipes/methods/cooled.svg"
    ]
    this.selectedCookingMethod = 'all'
    this.isMethodLoaded = false
    this.selectedIngredients = []
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareCookingMethods = async () => {
    try {
      this.isMethodLoaded = false
      let methods = []
      const resp = await getCookingMethods();
      if (resp.status === 200) {
        methods = _.map(resp.data?.cookingMethods, (method) => ({
          name: method.name,
          value: method._id,
        }));
        methods = [
          { name: "ทั้งหมด", value: "all" },
          ...methods,
        ];
        _.forEach(methods, (method, index) => {
          method.image = this.methodImage[index]
        })
        this.cookingMethods = methods
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการวิธีการประกอบอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.isMethodLoaded =  true
    }
  }
}
export const RecipesListContext = createContext(new RecipesList());

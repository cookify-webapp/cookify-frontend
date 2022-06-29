import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { recipeDetailType } from "../types/recipes";
import { recipeInitialValues } from '../forms/recipe_form'
import { getCookingMethods } from "@core/services/recipes/get_recipes";
import _ from 'lodash'

class RecipeForm {
  recipeDetail: recipeDetailType
  initValue = recipeInitialValues()
  cookingMethods: {name: string; value: string}[]
  selectedMainIngredient
  selectedSubIngredient
  quantity

  modal
  isMethodLoaded: boolean;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.selectedMainIngredient = []
    this.quantity = []
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
export const RecipeFormContext = createContext(new RecipeForm());

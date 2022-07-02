import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { recipeDetailType } from "../types/recipes";
import { createRecipeFormData, recipeInitialValues } from '../forms/recipe_form'
import { getCookingMethods } from "@core/services/recipes/get_recipes";
import _ from 'lodash'
import Cookies from "js-cookie";
import { addRecipe } from "@core/services/recipes/post_recipes";
import { FormikContextType } from "formik";

class RecipeForm {
  recipeDetail: recipeDetailType
  initValue = recipeInitialValues()
  cookingMethods: {name: string; value: string}[]
  selectedMainIngredient
  selectedSubIngredient
  quantity

  modal
  router
  isMethodLoaded: boolean;
  isAddEditRecipe: boolean
  formik: FormikContextType<any>
  flashMessageContext
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.selectedMainIngredient = []
    this.selectedSubIngredient = []
    this.quantity = []
    this.isAddEditRecipe = false
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

  addRecipe = async (value) => {
    try {
      this.isAddEditRecipe = true
      const formData = createRecipeFormData(value)
      const token = Cookies.get("token")
      const resp = await addRecipe(formData, token)
      if (resp.status === 200) {
        this.formik?.resetForm()
        this.router.push(`/recipes/${resp.data?.id}`)
        this.flashMessageContext.handleShow('เพิ่มสำเร็จ', 'เพิ่มสูตรอาหารสำเร็จ')
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการเพิ่มสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.isAddEditRecipe = false
    }
  }
}
export const RecipeFormContext = createContext(new RecipeForm());

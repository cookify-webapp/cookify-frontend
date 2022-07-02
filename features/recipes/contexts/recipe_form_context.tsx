import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { recipeDetailType } from "../types/recipes";
import {
  createRecipeFormData,
  recipeInitialValues,
} from "../forms/recipe_form";
import {
  getCookingMethods,
  getRecipeDetail,
} from "@core/services/recipes/get_recipes";
import _ from "lodash";
import Cookies from "js-cookie";
import { addRecipe } from "@core/services/recipes/post_recipes";
import { FormikContextType } from "formik";

class RecipeForm {
  recipeDetail: recipeDetailType;
  initValue = recipeInitialValues();
  cookingMethods: { name: string; value: string }[];
  selectedMainIngredient;
  selectedSubIngredient;
  quantity;

  modal;
  router;
  isMethodLoaded: boolean;
  isAddEditRecipe: boolean;
  formik: FormikContextType<any>;
  flashMessageContext;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.selectedMainIngredient = [];
    this.selectedSubIngredient = [];
    this.quantity = [];
    this.isAddEditRecipe = false;
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareRecipeDetail = async (id) => {
    try {
      const token = Cookies.get("token");
      const resp = await getRecipeDetail(id, token);
      if (resp.status === 200) {
        this.recipeDetail = resp.data?.recipe;
        let ingredients = [];
        let ingredientsId = [];
        let unitsId = [];
        let quantity = [];
        _.forEach(this.recipeDetail?.ingredients, (ingredient, index) => {
          ingredients.push({
            _id: ingredient.ingredient._id,
            name: ingredient.ingredient.name,
            type: ingredient.ingredient.type,
            image: ingredient.ingredient.image,
            unit: ingredient.unit,
          });
          ingredientsId.push(ingredient.ingredient._id);
          unitsId.push(ingredient.unit._id);
          quantity.push(ingredient.quantity);
        });
        this.selectedMainIngredient = ingredients;
        this.selectedSubIngredient = this.recipeDetail?.subIngredients;
        let subIngredientsId = [];
        _.forEach(this.recipeDetail?.subIngredients, (ingredient, index) => {
          subIngredientsId.push(ingredient._id);
        });
        const data = {
          name: this.recipeDetail?.name,
          desc: this.recipeDetail?.desc,
          method: this.recipeDetail?.method,
          serving: this.recipeDetail?.serving,
          ingredientsId: ingredientsId,
          unitsId: unitsId,
          quantity: quantity,
          subIngredientsId: subIngredientsId,
          steps: this.recipeDetail?.steps,
          image: this.recipeDetail?.image,
        };
        this.initValue = recipeInitialValues(data);
        this.formik.setValues(this.initValue);
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  prepareCookingMethods = async () => {
    try {
      this.isMethodLoaded = false;
      let methods = [];
      const resp = await getCookingMethods();
      if (resp.status === 200) {
        methods = _.map(resp.data?.cookingMethods, (method) => ({
          name: method.name,
          value: method._id,
        }));
        this.cookingMethods = methods;
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
      this.isMethodLoaded = true;
    }
  };

  addRecipe = async (value) => {
    try {
      this.isAddEditRecipe = true;
      const formData = createRecipeFormData(value);
      const token = Cookies.get("token");
      const resp = await addRecipe(formData, token);
      if (resp.status === 200) {
        this.formik?.resetForm();
        this.router.push(`/recipes/${resp.data?.id}`);
        this.flashMessageContext.handleShow(
          "เพิ่มสำเร็จ",
          "เพิ่มสูตรอาหารสำเร็จ"
        );
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
      this.isAddEditRecipe = false;
    }
  };
}
export const RecipeFormContext = createContext(new RecipeForm());

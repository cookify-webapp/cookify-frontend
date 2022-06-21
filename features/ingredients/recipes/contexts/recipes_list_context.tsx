import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getCookingMethods, getRecipesList } from "@core/services/recipes/get_recipes";
import _ from 'lodash'
import { recipesListType } from "@features/ingredients/types/recipes";

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

  recipesList: recipesListType[]

  modal
  isMethodLoaded: boolean
  loading: boolean
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.searchWord = ""
    this.isShowClearValue = false
    this.loading = false
    this.methodImage = [
      "/images/recipes/methods/all.svg",
      "/images/recipes/methods/baked.svg",
      "/images/recipes/methods/boiled.svg",
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
    this.selectedCookingMethod = 'ทั้งหมด'
    this.isMethodLoaded = false
    this.selectedIngredients = []
    this.page = 1
    this.perPage = 18
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

  valueFinder = (name) => {
    let value = ''
    _.forEach(this.cookingMethods, (method) => {
      if (method.name === name) {
        value = method.value
      }
    })
    return value
  }

  prepareRecipesList = async () => {
    try {
      if (this.page === 1) {
        this.loading = true
      }
      let ingredientId = []
      if (_.size(this.selectedIngredients) > 0) {
        _.forEach(this.selectedIngredients, (ingredient) => {
          ingredientId.push(ingredient._id)
        })
      }
      console.log(ingredientId)
      const resp = await getRecipesList({
        searchWord: this.searchWord,
        methodId: this.selectedCookingMethod === 'ทั้งหมด' ? '' : this.valueFinder(this.selectedCookingMethod),
        ingredientId: (_.size(ingredientId) > 0) ? ingredientId : "",
        page: this.page,
        perPage: this.perPage,
      })
      if (resp.status === 200) {
        this.recipesList = [...this.recipesList, ...resp.data?.recipes] 
        this.page = resp.data?.page
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.recipesList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }
}
export const RecipesListContext = createContext(new RecipesList());

import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getIngredientsList } from "@core/services/ingredients/get_ingredients";
import { getRecipesList } from "@core/services/recipes/get_recipes";
import { getSnapshotList } from "@core/services/snapshot/get_snapshot";
import { snapshotPropType } from "core/types/core_components_type";

class HomePage {
  recipes;
  snapshots: snapshotPropType[];
  ingredients;
  nutrition;
  ingredient
  modalContext: any;

  loading
  loadingRecipe: boolean;
  loadingSnapshot: boolean
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.loading = true
    this.loadingRecipe = false
    this.loadingSnapshot = false
    this.recipes = []
    this.snapshots = []

    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareIngredient = async () => {
    try {
      const resp = await getIngredientsList({
        searchWord: "",
        typeId: "",
        page: 1,
        perPage: 4,
      })
      if (resp.status === 200) {
        this.ingredients = resp.data?.ingredients
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }

  prepareRecipesList = async () => {
    try {
      this.loadingRecipe = true
      const resp = await getRecipesList({
        searchWord: '',
        methodId: '',
        ingredientId: "",
        page: 1,
        perPage: 6
      })
      if (resp.status === 200) {
        this.recipes = resp.data?.recipes
      } else if (resp.status === 204) {
        this.recipes = []
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการสูตรอาหาร",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingRecipe = false
    }
  }

  prepareSnapshotList = async () => {
    try {
      this.loadingSnapshot = true
      const resp = await getSnapshotList({
        page: 1,
        perPage: 6
      })
      if (resp.status === 200) {
        this.snapshots = resp.data?.snapshots
      } else if (resp.status === 204) {
        this.snapshots = []
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการ Snapshot",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingSnapshot = false
    }
  }
}
export const HomePageContext = createContext(new HomePage());

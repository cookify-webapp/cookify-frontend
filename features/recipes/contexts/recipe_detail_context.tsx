import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { recipeDetailType } from "../types/recipes";
import { getRecipeDetail } from "@core/services/recipes/get_recipes";
import Cookies from "js-cookie";
import { deleteRecipe } from "@core/services/recipes/delete_recipes";

class RecipeDetail {
  recipeDetail: recipeDetailType;
  loading: boolean;
  modal;
  activeTab;
  flashMessageContext: any;
  router: any;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.loading = false;
    this.activeTab = "วัตถุดิบหลัก";
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareRecipeDetail = async (id, isLogin) => {
    try {
      this.loading = true;
      if (isLogin) {
        const token = Cookies.get("token");
        const resp = await getRecipeDetail(id, token);
        if (resp.status === 200) {
          this.recipeDetail = resp.data?.recipe;
        }
      } else {
        const resp = await getRecipeDetail(id);
        if (resp.status === 200) {
          this.recipeDetail = resp.data?.recipe;
        }
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false;
    }
  };

  deleteRecipe = async (id) => {
    try {
      const token = Cookies.get("token");
      const resp = await deleteRecipe(id, token);
      if (resp.status === 200) {
        this.modal.closeModal();
        this.flashMessageContext.handleShow("ลบสำเร็จ", "ลบสูตรอาหารสำเร็จ");
        this.router.back()
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการลบสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };
}
export const RecipeDetailContext = createContext(new RecipeDetail());

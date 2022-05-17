import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ingredientDetailType, sampleIngredientType } from "../types/ingredient_detail_type";
import { getIngredientDetail, getSampleIngredients } from "@core/services/ingredients/get_ingredients";

class IngredientDetail {
  isOpen
  loading

  ingredientDetail: ingredientDetailType
  sampleIngredients: sampleIngredientType[]

  modalContext
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isOpen = false
    this.loading = true
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareIngredientDetail = async (id) => {
    try {
      this.loading = true
      const resp = await getIngredientDetail(id)
      if (resp.status === 200) {
        this.ingredientDetail = resp.data?.ingredient
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงข้อมูลวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }

  prepareSampleIngredients = async (id) => {
    try {
      const resp = await getSampleIngredients(id)
      if (resp.status === 200) {
        this.sampleIngredients = resp.data?.ingredients
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการรายการวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  }
}
export const IngredientDetailContext = createContext(new IngredientDetail());

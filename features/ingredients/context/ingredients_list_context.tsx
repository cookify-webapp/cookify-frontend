import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import _ from "lodash";
import { Router } from "next/router";
import { getIngredientTypes } from "@core/services/ingredients/get_ingredients";

class IngredientsList {
  searchWord;
  isShowClearValue;
  typeSelected;
  ingredientTypes;
  ingredients;

  modalContext;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.typeSelected = "";
    this.searchWord = "";
    this.isShowClearValue = false;
    this.ingredientTypes = [];
    this.ingredients = [];
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareIngredientTypes = async () => {
    try {
      const resp = await getIngredientTypes();
      if (resp.status === 200) {
        this.ingredientTypes = _.map(resp.data?.ingredientTypes, (type) => ({
          name: type.name,
          value: type.name,
        }));
        this.ingredientTypes = [
          { name: "ทั้งหมด", value: "all" },
          ...this.ingredientTypes,
        ];
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการประเภทวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };
}
export const IngredientsListContext = createContext(new IngredientsList());

import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import _ from "lodash";
import { Router } from "next/router";
import { getIngredientsList, getIngredientTypes } from "@core/services/ingredients/get_ingredients";

class IngredientsList {
  searchWord;
  isShowClearValue;
  typeSelected;
  ingredientTypes;
  ingredientsList;
  itemsToShow

  isOpen:boolean

  page
  perPage
  totalCount
  totalPages

  modalContext;

  loading
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isOpen = false
    this.typeSelected = "";
    this.searchWord = "";
    this.isShowClearValue = false;
    this.ingredientTypes = [];
    this.ingredientsList = [];
    this.itemsToShow = []
    this.page = 1
    this.perPage = 40
    this.totalCount = 0
    this.totalPages = 1
    this.loading = true
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
          value: type._id,
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

  prepareIngredientsList = async () => {
    try {
      const resp = await getIngredientsList({
        searchWord: this.searchWord,
        typeId: this.typeSelected === 'all' ? '' : this.typeSelected,
        page: this.page,
        perPage: this.perPage,
      })
      if (resp.status === 200) {
        this.ingredientsList = resp.data?.ingredients
        this.itemsToShow = [...this.itemsToShow, ...this.ingredientsList]
        this.page = resp.data?.page
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.ingredientsList = []
        this.page = 0
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
}
export const IngredientsListContext = createContext(new IngredientsList());

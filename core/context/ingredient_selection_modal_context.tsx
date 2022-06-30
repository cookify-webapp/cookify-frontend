import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import _ from "lodash";
import { getIngredientsList, getIngredientTypes } from "@core/services/ingredients/get_ingredients";

class ingredientSelectionModal {
  isOpen: boolean;
  searchWord: string;
  isShowClearValue: boolean;
  page
  perPage

  ingredients;
  itemsToShow: any[];
  selectedIngredients;

  onChange: Function;
  onCancel: () => void
  onSubmit: () => void

  activeTab: string;
  totalCount
  totalPages
  modalContext
  loading: boolean;
  ingredientTypes: { name: any; value: any; }[];
  typeSelected
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.activeTab = "เนื้อสัตว์";
    this.isOpen = false;
    this.searchWord = "";
    this.selectedIngredients = []
    this.itemsToShow = []
    this.ingredients = []
    this.page = 1
    this.totalPages = 1
    this.loading = true
    this.perPage = 40
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  openModal = (onSubmit, onCancel) => {
    this.isOpen = true;
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.prepareIngredientTypes()
    this.prepareIngredient();
  };

  closeModal = () => {
    this.isOpen = false
    this.searchWord = ''
    this.activeTab = 'เนื้อสัตว์'
    this.typeSelected = this.ingredientTypes[0].value
    this.itemsToShow = []
    this.ingredients = []
    this.page = 1
  }

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
        this.typeSelected = this.ingredientTypes[0].value
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

  prepareIngredient = async () => {
    try {
      if (this.page === 1) {
        this.loading = true
      }
      const resp = await getIngredientsList({
        searchWord: this.searchWord,
        typeId: this.typeSelected,
        page: this.page,
        perPage: this.perPage,
      })
      if (resp.status === 200) {
        this.ingredients = resp.data?.ingredients
        this.itemsToShow = [...this.itemsToShow, ...this.ingredients]
        this.page = resp.data?.page
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.ingredients = []
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
export const IngredientSelectionModalContext = createContext(
  new ingredientSelectionModal()
);
export const SubIngredientSelectionModalContext = createContext(
  new ingredientSelectionModal()
)

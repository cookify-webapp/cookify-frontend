import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class ingredientSelectionModal {
  isOpen: boolean;
  searchWord: string;
  isShowClearValue: boolean;
  hasIsCheckedAll: boolean;
  checkAllValue: string;

  ingredients;
  selectedIngredients;

  onChange: Function;

  activeTab: string;
  formik;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.activeTab = "เนื้อสัตว์";
    this.isOpen = false;
    this.searchWord = "";
    this.selectedIngredients = []
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  openModal = (hasIsCheckAll, formik) => {
    this.isOpen = true;
    this.hasIsCheckedAll = hasIsCheckAll;
    this.formik = formik;
  };

  closeModal = (clearValue) => {
    this.isOpen = false
    this.hasIsCheckedAll = false
    this.searchWord = ''
    if (clearValue) {
      this.selectedIngredients = []
    } else {
      this.formik?.setFieldValue('ingredients', this.selectedIngredients)
    }
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareIngredient = () => {
    if (this.activeTab === "เนื้อสัตว์") {
      this.ingredients = [
        {
          id: "1",
          name: "เนื้อหมู1",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "2",
          name: "เนื้อหมู2",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "3",
          name: "เนื้อหมู3",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "4",
          name: "เนื้อหมู4",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "5",
          name: "เนื้อหมู5",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "6",
          name: "เนื้อหมู6",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "7",
          name: "เนื้อหมู7",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "8",
          name: "เนื้อหมู8",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "9",
          name: "เนื้อหมู9",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "10",
          name: "เนื้อหมู10",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "11",
          name: "เนื้อหมู11",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "12",
          name: "เนื้อหมู12",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "13",
          name: "เนื้อหมู13",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "14",
          name: "เนื้อหมู14",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "15",
          name: "เนื้อหมู15",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
        {
          id: "16",
          name: "เนื้อหมู16",
          src: "/images/core/Item_Raw_Meat.png",
          type: "เนื้อสัตว์",
        },
      ];
    } else {
      this.ingredients = []
    }
  };
}
export const IngredientSelectionModalContext = createContext(
  new ingredientSelectionModal()
);

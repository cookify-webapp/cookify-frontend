import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class IngredientsList {
  searchWord
  isShowClearValue
  typeSelected
  options
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.typeSelected = ''
    this.searchWord = ''
    this.isShowClearValue = false
    this.options = [
      {
        name: "ทั้งหมด",
        value: "all"
      },
      {
        name: "เนื้อสัตว์",
        value: "เนื้อสัตว์"
      },
      {
        name: "ผักและผลไม้",
        value: "ผักและผลไม้"
      },
      {
        name: "ปลาและอาหารทะเล",
        value: "ปลาและอาหารทะเล"
      },
      {
        name: "ไข่และผลิตภัณฑ์จากนม",
        value: "ไข่และผลืตภัณฑ์จากนม"
      },
    ]
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const IngredientsListContext = createContext(new IngredientsList());

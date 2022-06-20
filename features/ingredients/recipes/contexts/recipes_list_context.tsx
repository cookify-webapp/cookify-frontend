import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class RecipesList {
  searchWord: string
  isShowClearValue: boolean
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.searchWord = ""
    this.isShowClearValue = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };
}
export const RecipesListContext = createContext(new RecipesList());

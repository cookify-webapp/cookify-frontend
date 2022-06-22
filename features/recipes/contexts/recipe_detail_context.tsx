import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class RecipeDetail {
  recipeDetail
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };
}
export const RecipeDetailContext = createContext(new RecipeDetail());

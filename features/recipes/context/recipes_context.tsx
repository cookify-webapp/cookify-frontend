import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { recipesType } from "../types/recipes_type";
import { getRecipes } from "@core/services/recipes/get_recipes";

class Recipes {
  recipes: recipesType[]
  isLoaded: boolean

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isLoaded = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareRecipes = async () => {
    try {
      const resp = await getRecipes()
      console.log(resp)
      if (resp.status === 200) {
        this.recipes = resp.data?.recipes
        console.log(this.recipes)
        this.isLoaded = true
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const RecipesContext = createContext(new Recipes());

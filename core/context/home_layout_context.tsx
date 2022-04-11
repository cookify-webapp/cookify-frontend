import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class HomeLayout {
  searchWord: string
  isShowClearValue: boolean
  isShowSidebar: boolean
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.searchWord = ''
    this.isShowClearValue = false
    this.isShowSidebar = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

}
export const HomeLayoutContext = createContext(new HomeLayout());

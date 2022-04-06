import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class HomePage {
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

}
export const HomePageContext = createContext(new HomePage());

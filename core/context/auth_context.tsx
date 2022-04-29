import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Auth {
  user
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.user = null
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const AuthContext = createContext(new Auth());

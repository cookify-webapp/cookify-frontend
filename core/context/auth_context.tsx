import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Auth {
  user
  initValue
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.user = null
    this.initValue = {
      username: "",
      password: ""
    }
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

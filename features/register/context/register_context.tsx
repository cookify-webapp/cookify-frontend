import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Register {
  stepForm
  initValue
  isAllergic
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.stepForm = 1
    this.isAllergic = false
    this.initValue = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAllergic: false,
      ingredients: []
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
export const RegisterContext = createContext(new Register());

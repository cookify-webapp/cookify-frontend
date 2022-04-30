import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Register {
  stepForm
  initValue
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.stepForm = 1
    this.initValue = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      allergy: []
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

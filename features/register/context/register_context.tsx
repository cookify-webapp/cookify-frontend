import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import router from "next/router";

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
      ingredients: [],
      stepForm: 1
    }
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  register = () => {
    setTimeout(() => {
      router.push('/')
    }, 5000)
    router.push('/register/success')
  }
}
export const RegisterContext = createContext(new Register());

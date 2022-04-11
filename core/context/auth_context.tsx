import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Auth {
  user
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.user = {
      role: 'admin',
      src: '/images/core/paimon.jpg',
      userName: 'paimon'
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

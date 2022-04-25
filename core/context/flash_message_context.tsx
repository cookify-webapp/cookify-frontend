import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class FlashMessage {
  isShow
  title
  detail
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isShow = false
    this.title = 'ลบสำเร็จ'
    this.detail = 'ลบวัตถุดิบสำเร็จ'
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  handleShow = (title, detail) => {
    this.title = title
    this.detail = detail
    this.isShow = true
    setTimeout(() => {
      this.isShow = false
    }, 3000)
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const FlashMessageContext = createContext(new FlashMessage());

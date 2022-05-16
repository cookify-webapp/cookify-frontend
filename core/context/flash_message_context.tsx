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

  handleShowFlashMessageAfterRedirect() {
    const flashMessageCase = localStorage.getItem('flashMessage')
    localStorage.removeItem('flashMessage')
    const flashMessage = {
      create_ingredient: { title: 'เพิ่มสำเร็จ',detail: 'เพิ่มวัตถุดิบสำเร็จ'},
    }

    const messageSelected = flashMessage[flashMessageCase]
    if (messageSelected) {
      return this.handleShow(messageSelected?.title, messageSelected?.message)
    }
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const FlashMessageContext = createContext(new FlashMessage());

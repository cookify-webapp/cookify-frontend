import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class Modal {
  isOpen
  title
  detail
  onConfirm
  buttonTextOnClose
  buttonTextOnConfirm
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isOpen = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  openModal = (title, detail, onConfirm, buttonTextOnClose, buttonTextOnConfirm) => {
    this.title = title
    this.detail = detail
    this.onConfirm = onConfirm
    this.buttonTextOnClose = buttonTextOnClose
    this.buttonTextOnConfirm = buttonTextOnConfirm
    this.isOpen = true
  }

  closeModal = () => {
    this.title = ''
    this.detail = ''
    this.onConfirm = () => null
    this.buttonTextOnClose = ''
    this.buttonTextOnConfirm = ''
    this.isOpen = false
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const ModalContext = createContext(new Modal());

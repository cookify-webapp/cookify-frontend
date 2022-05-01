import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import router from "next/router";
import _ from "lodash";
import { register } from "@core/services/auth/post_auth";

class Register {
  stepForm
  initValue
  isAllergic
  modalContext
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

  register = async (value) => {
    try {
      let allergy = []
      if (_.size(value.allergic) > 0) {
        _.forEach(value.ingredients, (item) => {
          allergy.push(item.name)
        })        
      }

      const user = {
        username: value.username,
        email: value.email,
        password: value.password,
        allergy: allergy
      }

      const data = {
        data: user
      }
      
      const resp = await register(JSON.stringify(data))
      if (resp.status === 200) {
        setTimeout(() => {
          router.push('/')
        }, 5000)
        router.push('/register/success')
      }
    } catch (error) {
      this.modalContext.openModal(
        'เกิดข้อผิดพลาด',
        error.message,
        () => this.modalContext.closeModal(),
        'ปิด',
        'ตกลง'
      )
    }
  }
}
export const RegisterContext = createContext(new Register());

import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import router from "next/router";
import _ from "lodash";
import { register, registerAdmin } from "@core/services/auth/post_auth";
import { verifyUniqueKey } from "@core/services/auth/get_auth";

class Register {
  stepForm;
  initValue;
  isAllergic;
  modalContext;
  uniqueKey;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.stepForm = 1;
    this.isAllergic = false;
    this.initValue = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAllergic: false,
      ingredients: [],
      stepForm: 1,
    };
    this.uniqueKey = "";
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  checkUniqueKeyValidation = async (key) => {
    try {
      const resp = await verifyUniqueKey(key);
    } catch (error) {
      if (error?.response?.status === 404) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
        this.modalContext.openModal(
          "ไม่สามารถลงทะเบียนเป็นผู้ดูแลระบบได้",
          "เนื่องจากคุณได้ถูกยกเลิกคำเชิญการเป็นผู้ดูแลระบบแล้ว",
          () => {
            this.modalContext.closeModal();
            router.push("/");
          },
          "ปิด",
          "ตกลง"
        );
      }
    }
  };

  register = async (value) => {
    try {
      let allergy = [];
      if (_.size(value.allergic) > 0) {
        _.forEach(value.ingredients, (item) => {
          allergy.push(item._id);
        });
      }

      const user = {
        username: value.username,
        email: value.email,
        password: value.password,
        allergy: allergy,
      };

      const data = {
        data: user,
      };
      if (this.uniqueKey) {
        const resp = await registerAdmin(this.uniqueKey, JSON.stringify(data));
        if (resp.status === 200) {
          setTimeout(() => {
            router.push("/");
          }, 5000);
          router.push("/register/success");
        }
      } else {
        const resp = await register(JSON.stringify(data));
        if (resp.status === 200) {
          setTimeout(() => {
            router.push("/");
          }, 5000);
          router.push("/register/success");
        }
      }
    } catch (error) {
      if (error?.response?.status === 500) {
        if (
          error?.response?.data?.errors?.username?.message ===
          "Expected username to be unique"
        ) {
          this.modalContext.openModal(
            "ไม่สามารถลงทะเบียนได้",
            "เนื่องจากชื่อผู้ใช้งานซ้ำกับที่มีอยู่แล้วในระบบ",
            () => this.modalContext.closeModal(),
            "ปิด",
            "ตกลง"
          );
        }
        if (
          error?.response?.data?.errors?.email?.message ===
          "Expected email to be unique"
        ) {
          this.modalContext.openModal(
            "ไม่สามารถลงทะเบียนได้",
            "เนื่องจากอีเมลซ้ำกับที่มีอยู่แล้วในระบบ",
            () => this.modalContext.closeModal(),
            "ปิด",
            "ตกลง"
          );
        }
      } else {
        this.modalContext.openModal(
          "เกิดข้อผิดพลาด",
          error.message,
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    }
  };
}
export const RegisterContext = createContext(new Register());

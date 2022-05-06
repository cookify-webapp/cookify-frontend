import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { login } from "@core/services/auth/post_auth";
import Cookies from "js-cookie";
import { getMe } from "@core/services/auth/get_auth";
import { userType } from "core/types/auth_type";
import Router from "next/router";

class Auth {
  user: userType;
  initValue;
  isLogIn;

  modal;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.initValue = {
      username: "",
      password: "",
    };
    this.isLogIn = false;
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  login = async (value) => {
    try {
      const data = {
        data: value
      };
      const resp = await login(JSON.stringify(data));
      if (resp.status === 200) {
        const token = resp.data?.token;
        Cookies.set("token", token, { expires: 1 });
        this.fetchMe();
      }
    } catch (error) {
      if (error.status === 403) {
        this.modal.openModal(
          "ไม่สามารถเข้าสู่ระบบได้",
          "เนื่องจากชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
          () => this.modal.closeModal(),
          "ปิด",
          "ตกลง"
        );
      } else {
        this.modal.openModal(
          "เกิดปัญหาในการเข้าสู่ระบบ",
          error.message,
          () => this.modal.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    }
  };

  fetchMe = async () => {
    try {
      let noCookie = Cookies.get("token") === undefined;
      if (noCookie) {
        this.user = null
      } else {
        const token = Cookies.get("token")
        const resp = await getMe(token);
        if (resp.status === 200) {
          this.user = resp.data?.account;
          this.isLogIn = true;
          Router.back();
        }
      }
    } catch (error) {
      this.modal.openModal(
        "เกิดปัญหาในการดึงข้อมูลผู้ใช้งาน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  logout = () => {
    this.user = null
    Cookies.remove('token')
    location.reload()
  }
}
export const AuthContext = createContext(new Auth());

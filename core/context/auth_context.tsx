import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { login } from "@core/services/auth/post_auth";
import Cookies from "js-cookie";
import { getMe, getUnreadNotification } from "@core/services/auth/get_auth";
import { userType } from "core/types/auth_type";
import Router from "next/router";

class Auth {
  user: userType;
  initValue;
  isLogIn;

  unreadNotification: number = 0

  modal;

  router
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.initValue = {
      username: "",
      password: "",
    };
    this.isLogIn = false;
    if (typeof window !== 'undefined') {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
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
        await this.fetchMe();
        Router.back();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
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

  prepareUnreadNotification = async () => {
    try {
      const token = Cookies.get("token")
      const resp = await getUnreadNotification(token)
      if (resp.status === 200) {
        this.unreadNotification = resp.data?.count
      }
    } catch (error) {
      this.modal.openModal(
        "เกิดปัญหาในการดึงข้อมูลจำนวนการแจ้งเตือน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  }

  fetchMe = async () => {
    try {
      let noCookie = Cookies.get("token") === undefined;
      if (noCookie) {
        this.user = null
        this.unreadNotification = 0
        this.isLogIn = false
        localStorage.setItem('user', null)
      } else {
        const token = Cookies.get("token")
        const resp = await getMe(token);
        if (resp.status === 200) {
          this.user = resp.data?.account;
          this.prepareUnreadNotification()
          this.isLogIn = true;
          localStorage.setItem('user', JSON.stringify(this.user))
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
    this.unreadNotification = 0
    this.isLogIn = false
    Cookies.remove('token')
    localStorage.setItem('user', null)
    this.modal.closeModal()
    this.router.push('/')
  }
}
export const AuthContext = createContext(new Auth());

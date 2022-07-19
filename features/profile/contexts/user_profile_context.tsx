import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import Cookies from 'js-cookie'
import { getMe, getUserDetail } from "@core/services/profile/get_profile";
import { userDetailType } from "../types/user_profile_type";

class UserProfile {
  userDetail: userDetailType

  followingCount: number
  followerCount: number
  isFollowing: boolean

  loading: boolean
  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.userDetail = null
    this.loading = true
    this.followerCount = 0
    this.followingCount = 0
    this.isFollowing = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareMyDetail = async () => {
    try {
      this.loading = true
      const token = Cookies.get("token");
      const resp = await getMe(token)
      if (resp.status === 200) {
        this.userDetail = resp.data?.account
        this.followerCount = resp.data?.followerCount
        this.followingCount = resp.data?.followingCount
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลผู้ใช้งาน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.loading = false
    }
  }

  prepareUserDetail = async (id) => {
    try {
      this.loading = true
      const resp = await getUserDetail(id)
      if (resp.status === 200) {
        this.userDetail = resp.data?.account
        this.followerCount = resp.data?.followerCount
        this.followingCount = resp.data?.followingCount
        this.isFollowing = resp.data?.isFollowing
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลผู้ใช้งาน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.loading = false
    }
  }
}
export const UserProfileContext = createContext(new UserProfile());

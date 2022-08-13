import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { followingListType } from "../types/following_list_type";
import Cookies from "js-cookie";
import { getFollowingList } from "@core/services/following/get_following";

class FollowingList {
  followingList: followingListType[]
  loading: boolean
  page: number
  perPage: number
  totalPages: number
  totalCount: number
  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.followingList = []
    this.page = 1
    this.perPage = 8
    this.loading = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareFollowingList = async () => {
    try {
      if (this.page === 1) {
        this.loading = true
      }
      const token = Cookies.get("token");
      const resp = await getFollowingList({
        page: this.page,
        perPage: this.perPage
      }, token)
      if (resp.status === 200) {
        this.followingList = [...this.followingList, ...resp.data?.docs] 
        this.page = resp.data?.page
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.followingList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการการติดตาม",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }
}
export const FollowingListContext = createContext(new FollowingList());

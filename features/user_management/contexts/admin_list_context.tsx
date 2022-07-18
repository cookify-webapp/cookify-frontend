import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { adminListType } from "../types/admin_list_type";
import { getAdminList } from "@core/services/user_management/get_admin";
import Cookies from "js-cookie";

class AdminList {
  adminList: adminListType[]
  page: number
  perPage: number
  totalCount: number
  totalPages: number

  searchWord
  activeTab

  isShowClearValue: boolean

  loading: boolean
  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.adminList = []
    this.loading = false
    this.page = 1
    this.perPage = 18
    this.activeTab = 'ผู้ดูแลระบบ'
    this.totalCount = 0
    this.isShowClearValue = false
    this.searchWord = ''
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareAdminList = async () => {
    try {
      const token = Cookies.get("token");
      const resp = await getAdminList({
        page: this.page,
        perPage: this.perPage,
        searchWord: this.searchWord
      }, token)
      if (resp.status === 200) {
        this.adminList = [...this.adminList, ...resp.data?.accounts] 
        this.page = resp.data?.page
        this.perPage = resp.data?.perPage
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.adminList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการผู้ดูแลระบบ",
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
export const AdminListContext = createContext(new AdminList());

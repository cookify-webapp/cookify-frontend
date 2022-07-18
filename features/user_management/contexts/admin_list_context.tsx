import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { adminListType } from "../types/admin_list_type";
import { getAdminList } from "@core/services/user_management/get_admin";
import Cookies from "js-cookie";
import _ from "lodash";

class AdminList {
  adminList: adminListType[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;

  pendingList: string[];
  pagePending: number;
  perPagePending: number;
  totalCountPending: number;
  totalPagesPending: number;

  searchWord;
  activeTab;

  isShowClearValue: boolean;

  loading: boolean;
  loadingPending: boolean
  modal;

  initValue
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.adminList = [];
    this.initValue = {
      email: ''
    }
    this.loading = false;
    this.loadingPending = false
    this.page = 1;
    this.perPage = 18;
    this.activeTab = "ผู้ดูแลระบบ";
    this.totalCount = 0;
    this.isShowClearValue = false;
    this.searchWord = "";
    this.pendingList = [
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
      "zenos.ayumu@gmail.com",
    ];
    this.pagePending = 1
    this.perPagePending = 10
    this.totalCountPending = 10
    this.totalPagesPending = 4
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
      const resp = await getAdminList(
        {
          page: this.page,
          perPage: this.perPage,
          searchWord: this.searchWord,
        },
        token
      );
      if (resp.status === 200) {
        this.adminList = [...this.adminList, ...resp.data?.accounts];
        this.page = resp.data?.page;
        this.perPage = resp.data?.perPage;
        this.totalCount = resp.data?.totalCount;
        this.totalPages = resp.data?.totalPages;
      } else if (resp.status === 204) {
        this.adminList = [];
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
      this.loading = false;
    }
  };

  preparePendingList = () => {
    for (let index = 0; index < 10; index++) {
      this.pendingList.push('zenos.ayumu@gmail.com')
    }
  }
}
export const AdminListContext = createContext(new AdminList());

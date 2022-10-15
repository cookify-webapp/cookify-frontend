import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { adminListType } from "../types/admin_list_type";
import {
  getAdminList,
  getPendingList,
} from "@core/services/user_management/get_admin";
import Cookies from "js-cookie";
import _ from "lodash";
import { inviteAdmin } from "@core/services/user_management/post_admin";
import {
  deleteAdmin,
  deletePending,
} from "@core/services/user_management/delete_admin";

class AdminList {
  adminList: adminListType[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;

  pendingList: {
    uniqueKey: string;
    email: string;
  }[];
  pagePending: number;
  perPagePending: number;
  totalCountPending: number;
  totalPagesPending: number;

  searchWord;
  activeTab;

  isShowClearValue: boolean;

  loading: boolean;
  loadingPending: boolean;
  modal;
  flashMessageContext;
  formik;

  buttonLoading: boolean;

  initValue: {
    email: string;
  };

  router
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.adminList = [];
    this.initValue = {
      email: "",
    };
    this.loading = false;
    this.loadingPending = false;
    this.page = 1;
    this.perPage = 18;
    this.activeTab = "ผู้ดูแลระบบ";
    this.totalCount = 0;
    this.isShowClearValue = false;
    this.searchWord = "";
    this.pendingList = [];
    this.pagePending = 1;
    this.perPagePending = 10;
    this.totalCountPending = 10;
    this.totalPagesPending = 4;
    this.buttonLoading = false;
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
      if (this.page === 1) {
        this.loading = true;
      }
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
      if (error?.response?.status === 403) {
        setTimeout(() => {
          this.router.push("/");
        }, 3000);
        this.modal.openModal(
          "ไม่สามารถเข้าถึงหน้าดังกล่าวได้",
          "เนื่องจากคุณไม่ใช่ผู้ดูแลระบบ",
          () => {
            this.modal.closeModal();
            this.router.push("/");
          },
          "ปิด",
          "ตกลง"
        );
      } else {
        this.modal.openModal(
          "มีปัญหาในการดึงรายการผู้ดูแลระบบ",
          error.message,
          () => this.modal.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    } finally {
      this.loading = false;
    }
  };

  preparePendingList = async () => {
    try {
      if (this.page === 1) {
        this.loadingPending = true;
      }
      const token = Cookies.get("token");
      const resp = await getPendingList(
        {
          page: this.page,
          perPage: this.perPage,
        },
        token
      );
      if (resp.status === 200) {
        this.pendingList = [...this.pendingList, ...resp.data?.accounts];
        this.pagePending = resp.data?.page;
        this.perPagePending = resp.data?.perPage;
        this.totalCountPending = resp.data?.totalCount;
        this.totalPagesPending = resp.data?.totalPages;
      } else if (resp.status === 204) {
        this.adminList = [];
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการผู้ดูแลระบบที่อยู่ระหว่างการเชิญ",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingPending = false;
    }
  };

  inviteAdmin = async (value) => {
    try {
      this.buttonLoading = true;
      const token = Cookies.get("token");
      const data = {
        data: {
          email: value.email,
        },
      };
      const resp = await inviteAdmin(JSON.stringify(data), token);
      if (resp.status === 200) {
        this.formik.resetForm();
        this.flashMessageContext.handleShow("ส่งสำเร็จ", "ส่งคำเชิญสำเร็จ");
        this.preparePendingList();
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการส่งอีเมลคำเชิญ",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.buttonLoading = false;
    }
  };

  deleteAdmin = async (id) => {
    try {
      const token = Cookies.get("token");
      const resp = await deleteAdmin(id, token);
      if (resp.status === 200) {
        this.modal.closeModal();
        this.flashMessageContext.handleShow("ลบสำเร็จ", "ลบผู้ดูแลระบบสำเร็จ");
        this.loading = true;
        this.adminList = [];
        this.prepareAdminList();
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการลบผู้ดูแลระบบ",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  deletePending = async (email) => {
    try {
      const token = Cookies.get("token");
      const resp = await deletePending(email, token);
      if (resp.status === 200) {
        this.modal.closeModal();
        this.flashMessageContext.handleShow(
          "ยกเลิกสำเร็จ",
          "ยกเลิกคำเชิญผู้ดูแลระบบสำเร็จ"
        );
        this.loadingPending = true;
        this.pendingList = [];
        this.preparePendingList();
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการยกเลิกคำเชิญผู้ดูแลระบบ",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };
}
export const AdminListContext = createContext(new AdminList());

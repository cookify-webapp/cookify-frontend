import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { complaintListType } from "../types/complaint_type";
import Cookies from "js-cookie";
import { getComplaintList } from "@core/services/complaint/get_complaints";

class ComplaintList {
  complaintList: complaintListType[]

  tabType: 'new' | 'inprogress' | 'completed' | string
  searchWord: string

  page: number
  perPage: number
  totalPages: number
  totalCount: number

  loading: boolean

  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.complaintList = []
    this.tabType = 'new'
    this.searchWord = ''
    this.page = 1
    this.perPage = 10
    this.loading = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  convertTabType = () => {
    let status = {
      new: 'new',
      inprogress: 'processing',
      completed: 'done'
    }
    return status[this.tabType]
  }

  prepareComplaintList = async () => {
    try {
      if (this.page === 1) {
        this.loading = true
      }
      const token = Cookies.get("token");
      const resp = await getComplaintList({
        page: this.page,
        perPage: this.perPage,
        searchWord: this.searchWord,
        status: this.convertTabType()
      }, token)
      if (resp.status === 200) {
        this.complaintList = [...this.complaintList, resp.data?.complaints]
        this.page = resp.data?.page
        this.perPage = resp.data?.perPage
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.complaintList = []
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
export const ComplaintListContext = createContext(new ComplaintList());

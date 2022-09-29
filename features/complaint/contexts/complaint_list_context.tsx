import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { complaintListType } from "../types/complaint_type";
import Cookies from "js-cookie";
import { getComplaintList } from "@core/services/complaint/get_complaints";
import { editComplaintStatus } from "@core/services/complaint/put_complaints";

class ComplaintList {
  complaintList: complaintListType[]

  tabType: 'new' | 'inprogress' | 'completed' | string
  searchWord: string

  isShowClearValue: boolean

  page: number
  perPage: number
  totalPages: number
  totalCount: number

  loading: boolean

  modal
  flashMessageContext
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
    this.isShowClearValue = false
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
        this.complaintList = [...this.complaintList, ...resp.data?.complaints]
        console.log(this.complaintList)
        this.page = resp.data?.page
        this.perPage = resp.data?.perPage
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.complaintList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการเรื่องร้องเรียน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }

  editComplaintStatus = async (complaintId: string, status: 'examining' | 'rejected' | 'completed', setHasMore) => {
    try {
      this.modal.closeModal()
      const token = Cookies.get("token");
      const data = {
        data: {
          status: status
        }
      }
      const resp = await editComplaintStatus(complaintId, JSON.stringify(data), token)
      if (resp.status === 200) {
        this.modal.closeModal()
        setHasMore(true)
        this.page = 1
        this.complaintList = []
        this.prepareComplaintList()
        this.flashMessageContext.handleShow('เปลี่ยนสถานะสำเร็จ', 'เปลี่ยนสถานะเรื่องร้องเรียนสำเร็จ')
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        this.modal.openModal(
          "ไม่สามารถดำเนินการได้",
          "เนื่องจากมีผู้รับผิดชอบเรื่องร้องเรียนของโพสต์ดังกล่าวแล้ว",
          () => {
            this.modal.closeModal()
          },
          "ปิด",
          "ตกลง"
        );
      } else {
        this.modal.openModal(
          "มีปัญหาในการจัดการเรื่องร้องเรียน",
          error.message,
          () => this.modal.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    }
  }
}
export const ComplaintListContext = createContext(new ComplaintList());

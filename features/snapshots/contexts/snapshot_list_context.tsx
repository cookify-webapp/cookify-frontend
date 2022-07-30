import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { snapshotPropType } from "core/types/core_components_type";
import { getSnapshotList } from "@core/services/snapshot/get_snapshot";

class SnapshotList {
  snapshotsList: snapshotPropType[]
  page: number
  perPage: number
  totalCount: number
  totalPages: number
  loading: boolean 

  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.snapshotsList = []
    this.page = 1
    this.perPage = 18
    this.loading = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareSnapshotList = async () => {
    try {
      if (this.page === 1) {
        this.loading= true
      }
      const resp = await getSnapshotList({
        page: this.page,
        perPage: this.perPage
      })
      if (resp.status === 200) {
        this.snapshotsList = [...this.snapshotsList, ...resp.data?.snapshots]
        this.page = resp.data?.page
        this.perPage = resp.data?.perPage
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.snapshotsList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการ Snapshot",
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
export const SnapshotListContext = createContext(new SnapshotList());

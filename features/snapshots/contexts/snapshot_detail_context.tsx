import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { snapshotDetailType } from "../types/snapshot_detail_type";
import { getSnapshotDetail } from "@core/services/snapshot/get_snapshot";
import Cookies from "js-cookie";

class SnapshotDetail {
  snapshotDetail: snapshotDetailType
  loadingDetail: boolean

  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.snapshotDetail = null
    this.loadingDetail = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareSnapshotDetail = async (id, isLogin) => {
    try {
      this.loadingDetail = true
      if (isLogin) {
        const token = Cookies.get("token");
        const resp = await getSnapshotDetail(id, token)
        if (resp.status === 200) {
          this.snapshotDetail = resp.data?.snapshot
        }
      } else {
        const resp = await getSnapshotDetail(id)
        if (resp.status === 200) {
          this.snapshotDetail = resp.data?.snapshot
        }
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูล Snapshot",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingDetail = false
    }
  }
}
export const SnapshotDetailContext = createContext(new SnapshotDetail());

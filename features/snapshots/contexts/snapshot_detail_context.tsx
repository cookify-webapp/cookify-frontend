import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import {
  commentListType,
  snapshotDetailType,
} from "../types/snapshot_detail_type";
import {
  getSnapshotCommentsList,
  getSnapshotDetail,
} from "@core/services/snapshot/get_snapshot";
import Cookies from "js-cookie";

class SnapshotDetail {
  snapshotDetail: snapshotDetailType;
  loadingDetail: boolean;

  commentList: commentListType[];

  modal;
  page: number;
  loading: boolean;
  perPage: number;
  totalCount: number;
  totalPages: number;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.snapshotDetail = null;
    this.loadingDetail = false;
    this.commentList = [];
    this.page = 1
    this.perPage = 5
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
      this.loadingDetail = true;
      if (isLogin) {
        const token = Cookies.get("token");
        const resp = await getSnapshotDetail(id, token);
        if (resp.status === 200) {
          this.snapshotDetail = resp.data?.snapshot;
        }
      } else {
        const resp = await getSnapshotDetail(id);
        if (resp.status === 200) {
          this.snapshotDetail = resp.data?.snapshot;
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
      this.loadingDetail = false;
    }
  };

  prepareSnapshotCommentsList = async (id, isLogin) => {
    try {
      if (this.page === 1) {
        this.loading = true;
      }
      if (isLogin) {
        const token = Cookies.get("token");
        const resp = await getSnapshotCommentsList(
          {
            page: this.page,
            perPage: this.perPage,
          },
          id, token
        );
        if (resp.status === 200) {
          this.commentList = [...this.commentList, ...resp.data?.comments];
          this.page = resp.data?.page;
          this.perPage = resp.data?.perPage;
          this.totalCount = resp.data?.totalCount;
          this.totalPages = resp.data?.totalPages;
        } else if (resp.status === 204) {
          this.commentList = [];
        }
      } else {
        const resp = await getSnapshotCommentsList(
          {
            page: this.page,
            perPage: this.perPage,
          },
          id
        );
        if (resp.status === 200) {
          this.commentList = [...this.commentList, ...resp.data?.comments];
          this.page = resp.data?.page;
          this.perPage = resp.data?.perPage;
          this.totalCount = resp.data?.totalCount;
          this.totalPages = resp.data?.totalPages;
        } else if (resp.status === 204) {
          this.commentList = [];
        }
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการความคิดเห็น",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false;
    }
  };
}
export const SnapshotDetailContext = createContext(new SnapshotDetail());

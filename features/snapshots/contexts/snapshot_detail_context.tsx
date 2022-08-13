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
import { addSnapshotComment } from "@core/services/snapshot/post_snapshot";
import { editSnapshotComment } from "@core/services/snapshot/put_snapshot";
import { deleteSnapshot, deleteSnapshotComment } from "@core/services/snapshot/delete_snapshot";

class SnapshotDetail {
  snapshotDetail: snapshotDetailType;
  loadingDetail: boolean;

  commentList: commentListType[];

  initValue: {
    comment: string
  }

  isEditIndex: number

  modal;
  page: number;
  loading: boolean;
  perPage: number;
  totalCount: number;
  totalPages: number;
  formik: any;
  flashMessageContext: any;
  router
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.initValue = {
      comment: ''
    }
    this.snapshotDetail = null;
    this.loadingDetail = false;
    this.commentList = [];
    this.page = 1
    this.perPage = 5
    this.loading = true
    this.isEditIndex = -1
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

  addComment = async (snapshotId, value) => {
    try {
      const data = {
        comment: value.comment,
        rating: 0,
      };
      const comment = {
        data: data,
      };
      const token = Cookies.get("token");
      const resp = await addSnapshotComment(
        snapshotId,
        JSON.stringify(comment),
        token
      );
      if (resp.status === 200) {
        this.formik?.resetForm();
        this.commentList = []
        this.prepareSnapshotCommentsList(snapshotId, true)
        this.flashMessageContext.handleShow(
          "เพิ่มสำเร็จ",
          "เพิ่มความคิดเห็นสำเร็จ"
        );
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการเพิ่มความคิดเห็น",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  editComment = async (snapshotId, commentId, value) => {
    try {
      const data = {
        comment: value.comment,
        rating: 0,
      };
      const comment = {
        data: data,
      };
      const token = Cookies.get("token");
      const resp = await editSnapshotComment(
        commentId,
        JSON.stringify(comment),
        token
      );
      if (resp.status === 200) {
        this.formik?.resetForm();
        this.isEditIndex = -1
        this.commentList = []
        this.prepareSnapshotCommentsList(snapshotId, true)
        this.flashMessageContext.handleShow(
          "แก้ไขสำเร็จ",
          "แก้ไขความคิดเห็นสำเร็จ"
        );
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการแก้ไขความคิดเห็น",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  deleteComment = async (commentId, snapshotId) => {
    try {
      const token = Cookies.get("token");
      const resp = await deleteSnapshotComment(commentId, token);
      if (resp.status === 200) {
        this.modal.closeModal();
        this.formik?.resetForm()
        this.flashMessageContext.handleShow("ลบสำเร็จ", "ลบความคิดเห็นสำเร็จ");
        this.commentList = []
        this.prepareSnapshotCommentsList(snapshotId, true)
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการลบความคิดเห็น",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  deleteSnapshot = async (id) => {
    try {
      const token = Cookies.get("token");
      const resp = await deleteSnapshot(id, token);
      if (resp.status === 200) {
        this.modal.closeModal();
        this.flashMessageContext.handleShow("ลบสำเร็จ", "ลบ Snapshot สำเร็จ");
        this.router.push('/snapshots')
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการลบ Snapshot",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };
}
export const SnapshotDetailContext = createContext(new SnapshotDetail());

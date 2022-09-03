import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import {
  getMyComment,
  getRecipeComments,
} from "@core/services/recipes/get_recipes";
import { recipeCommentType } from "../types/recipes";
import { addRecipeComment } from "@core/services/recipes/post_recipes";
import { FormikContextType } from "formik";
import { editRecipeComment } from "@core/services/recipes/put_recipes";
import { deleteRecipeComment } from "@core/services/recipes/delete_recipes";

class RecipeComment {
  isCommentLoading: boolean;
  isMyCommentLoading: boolean;
  isAlreadyComment: boolean;
  page: number;
  perPage: number;
  commentsList: recipeCommentType[];
  totalPages: number;
  totalRow: number;
  modal;
  initValue;
  isEdit;
  myComment: recipeCommentType;
  formik: FormikContextType<any>;
  flashMessageContext;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.commentsList = [];
    this.myComment = null;
    this.isEdit = false;
    this.page = 1;
    this.perPage = 5;
    this.isCommentLoading = false;
    this.isMyCommentLoading = false;
    this.initValue = {
      rating: 0,
      comment: "",
    };
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareMyComment = async (id) => {
    try {
      this.isMyCommentLoading = true;
      const token = Cookies.get("token");
      const resp = await getMyComment(id, token);
      if (resp.status === 200) {
        this.myComment = resp.data?.comment;
        this.initValue = {
          rating: this.myComment?.rating,
          comment: this.myComment?.comment,
        };
        this.formik?.setValues(this.initValue)
        this.isAlreadyComment = true;
      } else if (resp.status === 204) {
        this.myComment = null;
        this.isAlreadyComment = false;
        this.formik?.resetForm()
        this.initValue = {
          rating: 0,
          comment: ''
        }
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลความคิดเห็นของฉัน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.isMyCommentLoading = false;
    }
  };

  prepareCommentsList = async (id, isLogin) => {
    try {
      this.isCommentLoading = true;
      if (isLogin) {
        const token = Cookies.get("token");
        const resp = await getRecipeComments(
          id,
          {
            page: this.page,
            perPage: this.perPage,
          },
          token
        );
        if (resp.status === 200) {
          this.commentsList = [...this.commentsList, ...resp.data?.comments];
          this.page = resp.data?.page;
          this.perPage = resp.data?.perPage;
          this.totalPages = resp.data?.totalPages;
          this.totalRow = resp.data?.totalCount;
        } else if (resp.status === 204) {
          this.commentsList = [];
        }
      } else {
        const resp = await getRecipeComments(id, {
          page: this.page,
          perPage: this.perPage,
        });
        if (resp.status === 200) {
          this.commentsList = resp.data?.comments;
          this.page = resp.data?.page;
          this.perPage = resp.data?.perPage;
          this.totalPages = resp.data?.totalPages;
          this.totalRow = resp.data?.totalCount;
        } else if (resp.status === 204) {
          this.commentsList = [];
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
      this.isCommentLoading = false;
    }
  };

  addComment = async (recipeId, value, onSuccess) => {
    try {
      const data = {
        comment: value.comment,
        rating: value.rating,
      };
      const comment = {
        data: data,
      };
      const token = Cookies.get("token");
      const resp = await addRecipeComment(
        recipeId,
        JSON.stringify(comment),
        token
      );
      if (resp.status === 200) {
        this.formik?.resetForm();
        onSuccess();
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

  editComment = async (commentId, value, onSuccess) => {
    try {
      const data = {
        comment: value.comment,
        rating: value.rating,
      };
      const comment = {
        data: data,
      };
      const token = Cookies.get("token");
      const resp = await editRecipeComment(
        commentId,
        JSON.stringify(comment),
        token
      );
      if (resp.status === 200) {
        this.formik?.resetForm();
        onSuccess();
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

  deleteComment = async (commentId, onSuccess) => {
    try {
      const token = Cookies.get("token");
      const resp = await deleteRecipeComment(commentId, token);
      if (resp.status === 200) {
        this.modal.closeModal();
        this.initValue = {
          rating: 0,
          comment: "",
        };
        this.formik?.resetForm()
        this.flashMessageContext.handleShow("ลบสำเร็จ", "ลบความคิดเห็นสำเร็จ");
        onSuccess();
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
}
export const RecipeCommentContext = createContext(new RecipeComment());

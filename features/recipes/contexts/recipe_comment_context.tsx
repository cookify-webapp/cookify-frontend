import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import { getMyComment, getRecipeComments } from "@core/services/recipes/get_recipes";
import { recipeCommentType } from "../types/recipes";
import { addRecipeComment } from "@core/services/recipes/post_recipes";
import { FormikContextType } from "formik";

class RecipeComment {
  isCommentLoading: boolean;
  isMyCommentLoading: boolean
  page: number
  perPage: number
  commentsList: recipeCommentType[];
  totalPages: number;
  totalRow: number;
  modal
  initValue
  isEdit
  myComment: recipeCommentType
  formik: FormikContextType<any>;
  flashMessageContext
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.commentsList = []
    this.isEdit = false
    this.page = 1
    this.perPage = 5
    this.isCommentLoading = false
    this.isMyCommentLoading = false
    this.initValue = {
      rating: 0,
      comment: ''
    }
    this.myComment = null
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
      this.isMyCommentLoading = true
      const token = Cookies.get("token");
      const resp = await getMyComment(id, token) 
      if (resp.status === 200) {
        this.myComment = resp.data?.comment
        console.log(this.myComment)
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
      this.isMyCommentLoading = false
    }
  }

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
      this.isCommentLoading = false
    }
  };

  addComment = async (id, value, onSuccess) => {
    try {
      const data = {
        comment: value.comment,
        rating: value.rating
      }
      const comment = {
        data: data
      }
      const token = Cookies.get("token");
      const resp = await addRecipeComment(id, JSON.stringify(comment), token)
      if (resp.status === 200) {
        this.formik?.resetForm()
        onSuccess()
        this.flashMessageContext.handleShow('เพิ่มสำเร็จ', 'เพิ่มความคิดเห็นสำเร็จ')
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
  }
}
export const RecipeCommentContext = createContext(new RecipeComment());

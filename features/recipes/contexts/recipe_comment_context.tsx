import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import { getRecipeComments } from "@core/services/recipes/get_recipes";
import { recipeCommentType } from "../types/recipes";

class RecipeComment {
  isCommentLoading: boolean;
  page: number
  perPage: number
  commentsList: recipeCommentType[];
  totalPages: number;
  totalRow: number;
  modal
  initValue
  isEdit
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isEdit = false
    this.page = 1
    this.perPage = 5
    this.isCommentLoading = false
    this.initValue = {
      rating: 0,
      comment: ''
    }
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
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
      this.isCommentLoading = false
    }
  };
}
export const RecipeCommentContext = createContext(new RecipeComment());

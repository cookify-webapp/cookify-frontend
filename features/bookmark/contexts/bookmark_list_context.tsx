import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { recipesListType } from "@features/recipes/types/recipes";
import { getBookmarkList } from "@core/services/bookmark/get_bookmark";
import Cookies from "js-cookie";

class BookmarkList {
  bookmarkList: recipesListType[]
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
    this.bookmarkList = []
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

  prepareBookmarkList = async () => {
    try {
      if (this.page === 1) {
        this.loading = true
      }
      const token = Cookies.get("token");
      const resp = await getBookmarkList({
        page: this.page,
        perPage: this.perPage
      }, token)
      if (resp.status === 200) {
        this.bookmarkList = [...this.bookmarkList, ...resp.data?.recipes] 
        this.page = resp.data?.page
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.bookmarkList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการสูตรอาหาร",
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
export const BookmarkListContext = createContext(new BookmarkList());

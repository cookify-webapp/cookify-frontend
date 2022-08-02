import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import Cookies from 'js-cookie'
import { getFollowerList, getFollowingList, getMe, getUserDetail, getUserRecipeList, getUserSnapshotList } from "@core/services/profile/get_profile";
import { userDetailType, userType } from "../types/user_profile_type";
import { recipesListType } from "@features/recipes/types/recipes";
import { snapshotPropType } from "core/types/core_components_type";

class UserProfile {
  userDetail: userDetailType

  followingList: userType[]
  followerList: userType[]

  recipesList: recipesListType[]
  snapshotsList: snapshotPropType[]

  followingCount: number
  followerCount: number
  isFollowing: boolean

  loading: boolean
  modal

  page: number
  perPage: number
  totalCount: number
  totalPages: number

  followLoading: boolean

  recipeLoading: boolean
  pageRecipe: number
  perPageRecipe: number
  totalCountRecipe: number
  totalPagesRecipe: number

  snapshotLoading: boolean
  pageSnapshot: number
  perPageSnapshot: number
  totalCountSnapshot: number
  totalPagesSnapshot: number

  activeTab
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.userDetail = null
    this.loading = true
    this.followLoading = true
    this.followerCount = 0
    this.followingCount = 0
    this.isFollowing = false
    this.page = 1
    this.perPage = 10
    this.followerList = []
    this.followingList = []
    this.recipeLoading = false
    this.pageRecipe = 1
    this.perPageRecipe = 18
    this.snapshotLoading = false
    this.pageSnapshot = 1
    this.perPageSnapshot = 18
    this.recipesList = []
    this.snapshotsList = []
    this.activeTab = 'สูตรอาหาร'
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareMyDetail = async () => {
    try {
      this.loading = true
      const token = Cookies.get("token");
      const resp = await getMe(token)
      if (resp.status === 200) {
        this.userDetail = resp.data?.account
        this.followerCount = resp.data?.followerCount
        this.followingCount = resp.data?.followingCount
        this.prepareUserRecipe(this.userDetail?.username)
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลผู้ใช้งาน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.loading = false
    }
  }

  prepareUserDetail = async (id) => {
    try {
      this.loading = true
      const resp = await getUserDetail(id)
      if (resp.status === 200) {
        this.userDetail = resp.data?.account
        this.followerCount = resp.data?.followerCount
        this.followingCount = resp.data?.followingCount
        this.isFollowing = resp.data?.isFollowing
        this.prepareUserRecipe(this.userDetail?.username)
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงข้อมูลผู้ใช้งาน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.loading = false
    }
  }

  prepareFollowingList = async (id) => {
    try {
      if (this.page === 1) {
        this.followLoading = true
      }
      const resp = await getFollowingList({
        page: this.page,
        perPage: this.perPage
      }, id)
      if (resp.status === 200) {
        this.followingList = [...this.followingList, ...resp.data?.following]
        this.page = resp.data?.page
        this.perPage = resp.data?.perPage
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.followerList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการผู้ใช้ที่กำลังติดตาม",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.followLoading = false
    }
  }

  prepareFollowerList = async (id) => {
    try {
      if (this.page === 1) {
        this.followLoading = true
      }
      const resp = await getFollowerList({
        page: this.page,
        perPage: this.perPage
      }, id)
      if (resp.status === 200) {
        this.followerList = [...this.followerList, ...resp.data?.follower]
        this.page = resp.data?.page
        this.perPage = resp.data?.perPage
        this.totalCount = resp.data?.totalCount
        this.totalPages = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.followerList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการผู้ใช้ที่กำลังติดตาม",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.followLoading = false
    }
  }

  prepareUserRecipe = async (username) => {
    try {
      if (this.page === 1) {
        this.recipeLoading = true
      }
      const token = Cookies.get("token");
      const resp = await getUserRecipeList({
        page: this.pageRecipe,
        perPage: this.perPageRecipe
      }, username, token)
      if (resp.status === 200) {
        this.recipesList = [...this.recipesList, ...resp.data?.recipes]
        this.pageRecipe = resp.data?.page
        this.perPageRecipe = resp.data?.perPage
        this.totalCountRecipe = resp.data?.totalCount
        this.totalPagesRecipe = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.recipesList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการสูตรอาหาร",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.recipeLoading = false
    }
  }

  prepareUserSnapshot = async (username) => {
    try {
      if (this.page === 1) {
        this.snapshotLoading = true
      }
      const token = Cookies.get("token");
      const resp = await getUserSnapshotList({
        page: this.pageSnapshot,
        perPage: this.perPageSnapshot
      }, username, token)
      if (resp.status === 200) {
        this.snapshotsList = [...this.snapshotsList, ...resp.data?.snapshots]
        this.pageSnapshot = resp.data?.page
        this.perPageSnapshot = resp.data?.perPage
        this.totalCountSnapshot = resp.data?.totalCount
        this.totalPagesSnapshot = resp.data?.totalPages
      } else if (resp.status === 204) {
        this.recipesList = []
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการดึงรายการ Snapshot",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.snapshotLoading = false
    }
  }
}
export const UserProfileContext = createContext(new UserProfile());

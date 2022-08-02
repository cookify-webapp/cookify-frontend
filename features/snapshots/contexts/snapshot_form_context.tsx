import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { snapshotInitialValues } from "../forms/snapshot_form";
import { snapshotDetailType } from "../types/snapshot_detail_type";
import { getRecipesList } from "@core/services/recipes/get_recipes";
import { recipesListType } from "@features/recipes/types/recipes";
import Cookies from "js-cookie";
import { getSnapshotDetail } from "@core/services/snapshot/get_snapshot";

class SnapshotForm {
  initValue = snapshotInitialValues();
  modal;
  flashMessageContext;
  router;
  formik;
  snapshotDetail: snapshotDetailType;

  loadingRecipe: boolean;
  recipesList: recipesListType[];

  searchWord;

  loadingAddEdit: boolean;

  loading: boolean;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.recipesList = [];
    this.snapshotDetail = null;
    this.loadingRecipe = true;
    this.searchWord = "";
    this.loading = false;
    this.loadingAddEdit = false;
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  handleResetForm = () => {
    this.formik.resetForm();
    this.initValue = snapshotInitialValues();
  };

  prepareRecipesList = async () => {
    try {
      this.loadingRecipe = true;
      const resp = await getRecipesList({
        searchWord: this.searchWord,
        methodId: "",
        ingredientId: "",
        page: 1,
        perPage: 10,
      });
      if (resp.status === 200) {
        this.recipesList = [...this.recipesList, ...resp.data?.recipes];
      } else if (resp.status === 204) {
        this.recipesList = [];
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
      this.loadingRecipe = false;
    }
  };

  prepareSnapshotDetail = async (id) => {
    try {
      this.loading = true;
      const token = Cookies.get("token");
      const resp = await getSnapshotDetail(id, token);
      if (resp.status === 200) {
        this.snapshotDetail = resp.data?.snapshot;
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
      this.loading = false;
    }
  };
}
export const SnapshotFormContext = createContext(new SnapshotForm());

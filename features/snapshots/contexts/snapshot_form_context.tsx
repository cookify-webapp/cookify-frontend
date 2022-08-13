import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { createSnapshotFormData, snapshotInitialValues } from "../forms/snapshot_form";
import { snapshotDetailType } from "../types/snapshot_detail_type";
import { getRecipesList } from "@core/services/recipes/get_recipes";
import { recipesListType } from "@features/recipes/types/recipes";
import Cookies from "js-cookie";
import { getSnapshotDetail } from "@core/services/snapshot/get_snapshot";
import { addSnapshot } from "@core/services/snapshot/post_snapshot";
import { editSnapshot } from "@core/services/snapshot/put_snapshot";

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
        this.initValue = snapshotInitialValues(this.snapshotDetail)
        console.log(this.initValue)
        this.formik.setValues(this.initValue)
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

  addSnapshot = async (value) => {
    try {
      this.loadingAddEdit = true;
      const formData = createSnapshotFormData(value);
      const token = Cookies.get("token");
      const resp = await addSnapshot(formData, token);
      if (resp.status === 200) {
        this.handleResetForm()
        this.router.push(`/snapshots/${resp.data?.id}`);
        this.flashMessageContext.handleShow(
          "เพิ่มสำเร็จ",
          "เพิ่ม Snapshot สำเร็จ"
        );
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการเพิ่ม Snapshot",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingAddEdit = false;
    }
  };

  editSnapshot = async (id, value) => {
    try {
      this.loadingAddEdit = true;
      const formData = createSnapshotFormData(value);
      const token = Cookies.get("token");
      const resp = await editSnapshot(id, formData, token);
      if (resp.status === 200) {
        this.handleResetForm()
        this.router.push(`/snapshots/${id}`);
        this.flashMessageContext.handleShow(
          "แก้ไขสำเร็จ",
          "แก้ไข Snapshot สำเร็จ"
        );
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการแก้ไข Snapshot",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingAddEdit = false;
    }
  };
}
export const SnapshotFormContext = createContext(new SnapshotForm());

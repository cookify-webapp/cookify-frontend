import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import {
  ingredientDetailType,
  sampleIngredientType,
} from "../types/ingredient_detail_type";
import {
  getIngredientDetail,
  getSampleIngredients,
} from "@core/services/ingredients/get_ingredients";
import { deleteIngredient } from "@core/services/ingredients/delete_ingredients";
import Cookies from "js-cookie";

class IngredientDetail {
  isOpen;
  loading;
  loadingSample;

  ingredientDetail: ingredientDetailType;
  sampleIngredients: sampleIngredientType[];

  modalContext;
  flashMessageContext;
  router;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isOpen = false;
    this.loading = true;
    this.loadingSample = true;
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareIngredientDetail = async (id) => {
    try {
      this.loading = true;
      const resp = await getIngredientDetail(id);
      if (resp.status === 200) {
        this.ingredientDetail = resp.data?.ingredient;
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        this.router.replace("/404");
      } else {
        this.modalContext.openModal(
          "มีปัญหาในการดึงข้อมูลวัตถุดิบ",
          error.message,
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    } finally {
      this.loading = false;
    }
  };

  prepareSampleIngredients = async (id) => {
    try {
      this.loadingSample = true;
      const resp = await getSampleIngredients(id);
      if (resp.status === 200) {
        this.sampleIngredients = resp.data?.ingredients;
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        console.log(error);
      } else {
        this.modalContext.openModal(
          "มีปัญหาในการดึงรายการวัตถุดิบ",
          error.message,
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    } finally {
      this.loadingSample = false;
    }
  };

  deleteIngredient = async (id) => {
    try {
      const token = Cookies.get("token");
      const resp = await deleteIngredient(id, token);
      if (resp.status === 200) {
        this.modalContext.closeModal();
        this.flashMessageContext.handleShow("ลบสำเร็จ", "ลบวัตถุดิบสำเร็จ");
        this.router.push("/ingredients");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        this.modalContext.openModal(
          "ไม่สามารถลบวัตถุดิบได้",
          "เนื่องจากมีสูตรอาหารในระบบที่มีวัตถุดิบนี้เป็นส่วนประกอบอยู่",
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        );
      } else {
        this.modalContext.openModal(
          "มีปัญหาในการลบวัตถุดิบ",
          error.message,
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        );
      }
    }
  };
}
export const IngredientDetailContext = createContext(new IngredientDetail());

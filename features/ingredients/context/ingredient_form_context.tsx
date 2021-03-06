import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { createIngredientFormData, ingredientInitialValues } from "../forms/ingredient_form";
import { getIngredientDetail, getIngredientTypes, getIngredientUnits } from "@core/services/ingredients/get_ingredients";
import _ from 'lodash'
import Cookies from "js-cookie";
import { addIngredient } from "@core/services/ingredients/post_ingredients";
import { editIngredient } from "@core/services/ingredients/put_ingredients";

class IngredientForm {
  initValue = ingredientInitialValues()
  loading: boolean

  loadingAddEdit: boolean

  formik
  modalContext
  flashMessageContext

  ingredientTypes
  ingredientUnits
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.loadingAddEdit = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  handlerResetInitValue = () => {
    this.initValue = ingredientInitialValues()
  }

  prepareIngredientTypes = async () => {
    try {
      const resp = await getIngredientTypes();
      if (resp.status === 200) {
        this.ingredientTypes = _.map(resp.data?.ingredientTypes, (type) => ({
          name: type.name,
          value: type._id,
        }));
        this.formik?.setFieldValue('type', this.ingredientTypes[0].value)
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการประเภทวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  prepareIngredientUnits = async () => {
    try {
      const resp = await getIngredientUnits();
      if (resp.status === 200) {
        this.ingredientUnits = _.map(resp.data?.units, (unit) => ({
          name: unit.name,
          value: unit._id,
        }));
        this.formik?.setFieldValue('unit', this.ingredientUnits[0].value)
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการประเภทวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };

  preparation = async (id: string) => {
    try {
      this.loading = true
      const resp = await getIngredientDetail(id)
      if (resp.status === 200) {
        this.initValue = ingredientInitialValues(resp.data?.ingredient)
        this.formik.setValues(this.initValue)
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงข้อมูลวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }

  addIngredient = async (value, onSuccess) => {
    try {
      this.loadingAddEdit = true
      const formData = createIngredientFormData(value)
      const token = Cookies.get("token")
      const response = await addIngredient(formData, token)
      if (response.status === 200) {
        this.formik?.resetForm()
        onSuccess()
        this.flashMessageContext.handleShow('เพิ่มสำเร็จ', 'เพิ่มวัตถุดิบสำเร็จ')
      }
    } catch (error) {
      if (error?.response?.message.includes("Ingredient validation failed")) {
        this.modalContext.openModal(
          "ไม่สามารถเพิ่มวัตถุดิบได้",
          "เนื่องจากมีวัตถุดิบที่ใช้ชื่อนี้อยู่ในระบบแล้ว",
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        ) 
      } else (
        this.modalContext.openModal(
          "มีปัญหาในการเพิ่มวัตถุดิบ",
          error.message,
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        )        
      )
    } finally {
      this.loadingAddEdit = false
    }
  }

  editIngredient = async (value, id, onSuccess) => {
    try {
      this.loadingAddEdit = true
      const formData = createIngredientFormData(value)
      const token = Cookies.get("token")
      const response = await editIngredient(id, formData, token)
      if (response.status === 200) {
        this.formik?.resetForm()
        onSuccess()
        this.flashMessageContext.handleShow('แก้ไขสำเร็จ', 'แก้ไขวัตถุดิบสำเร็จ')
      }
    } catch (error) {
      if (error?.response?.message.includes("Ingredient validation failed")) {
        this.modalContext.openModal(
          "ไม่สามารถแก้ไขวัตถุดิบได้",
          "เนื่องจากมีวัตถุดิบที่ใช้ชื่อนี้อยู่ในระบบแล้ว",
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        ) 
      } else (
        this.modalContext.openModal(
          "มีปัญหาในการแก้ไขวัตถุดิบ",
          error.message,
          () => this.modalContext.closeModal(),
          "ปิด",
          "ตกลง"
        )        
      )
    } finally {
      this.loadingAddEdit = false
    }
  }
}
export const IngredientFormContext = createContext(new IngredientForm());

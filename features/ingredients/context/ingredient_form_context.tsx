import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { createIngredientFormData, ingredientInitialValues } from "../forms/ingredient_form";
import { getIngredientDetail, getIngredientTypes, getIngredientUnits } from "@core/services/ingredients/get_ingredients";
import _ from 'lodash'
import { Router } from "next/router";
import { addIngredient } from "@core/services/ingredients/post_ingredients";

class IngredientForm {
  initValue = ingredientInitialValues()
  loading: boolean

  formik
  modalContext
  flashMessageContext

  ingredientTypes
  ingredientUnits
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    
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
        this.initValue = ingredientInitialValues(resp.data?.area)
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
      const formData = createIngredientFormData(value)
      const response = await addIngredient(formData)
      if (response.status === 200) {
        this.formik?.resetForm()
        onSuccess()
        this.flashMessageContext.handleShow('เพิ่มสำเร็จ', 'เพิ่มวัตถุดิบสำเร็จ')
      }
    } catch (error) {
      if (error.message.includes("Ingredient validation failed")) {
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
    }
  }

  editIngredient = async (value, id) => {

  }
}
export const IngredientFormContext = createContext(new IngredientForm());

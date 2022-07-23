import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import Cookies from 'js-cookie'
import { getMe } from "@core/services/profile/get_profile";
import { userDetailType } from "../types/user_profile_type";
import { ingredientType } from "@features/recipes/types/recipes";
import { createProfileFormData } from "../forms/edit_profile_form";
import { editProfile } from "@core/services/profile/put_profile";

class EditProfile {
  userDetail: userDetailType
  loading: boolean
  modal
  formik
  initValue: {
    email: string
    allergy: ingredientType[]
    imageFileName: string,
    profileImage: Object,
  }
  router
  flashMessageContext
  editProfileLoading
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.loading = true
    this.editProfileLoading = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareMyProfile = async () => {
    try {
      this.loading = true
      const token = Cookies.get("token");
      const resp = await getMe(token)
      if (resp.status === 200) {
        this.userDetail = resp.data?.account
        this.initValue = {
          email: this.userDetail?.email,
          allergy: this.userDetail?.allergy,
          imageFileName: this.userDetail?.image,
          profileImage: null
        }
        this.formik.setValues(this.initValue);
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

  editProfile = async (value) => {
    try {
      this.editProfileLoading = true
      const formData = createProfileFormData(value);
      const token = Cookies.get("token");
      const resp = await editProfile(formData, token);
      if (resp.status === 200) {
        this.formik?.resetForm()
        this.router.push(`/me`);
        this.flashMessageContext.handleShow(
          "แก้ไขสำเร็จ",
          "แก้ไขข้อมูลผู้ใช้งานสำเร็จ"
        );
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการแก้ไขข้อมูลผู้ใช้งาน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      )
    } finally {
      this.editProfileLoading = false
    }
  }
}
export const EditProfileContext = createContext(new EditProfile());

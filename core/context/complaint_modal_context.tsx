import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { FormikContextType } from "formik";
import { sendComplaint } from "@core/services/complaint/post_complaints";
import Cookies from "js-cookie";

class ComplaintModal {
  isOpen: boolean;

  complaintType: "recipe" | "snapshot";

  postId: string;
  recipeName: string;
  author: string;
  date: string;

  formik: FormikContextType<any>;

  modal;
  flashMessageContext;

  initValue;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.initValue = {
      detail: "",
    };
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  openModal = (complaintType, recipeName, author, date, postId) => {
    this.isOpen = true;
    this.author = author;
    this.recipeName = recipeName;
    this.complaintType = complaintType;
    this.date = date;
    this.postId = postId;
  };

  closeModal = () => {
    this.isOpen = false;
    this.initValue = {
      detail: "",
    };
    this.formik.resetForm();
  };

  sendComplaint = async (value) => {
    try {
      const data = {
        data: {
          type: this.complaintType,
          post: this.postId,
          detail: value.detail,
        },
      };
      const token = Cookies.get("token");
      const resp = await sendComplaint(JSON.stringify(data), token);
      if (resp.status === 200) {
        this.isOpen = false;
        this.initValue = {
          detail: "",
        };
        this.formik.resetForm();
        this.flashMessageContext.handleShow(
          "ส่งสำเร็จ",
          "ส่งคำร้องเรียนสำเร็จ"
        );
      }
    } catch (error) {
      this.modal.openModal(
        "มีปัญหาในการส่งเรื่องร้องเรียน",
        error.message,
        () => this.modal.closeModal(),
        "ปิด",
        "ตกลง"
      );
    }
  };
}
export const ComplaintModalContext = createContext(new ComplaintModal());

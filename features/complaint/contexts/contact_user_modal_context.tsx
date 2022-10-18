import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { FormikContextType } from "formik";
import { sendComplaint } from "@core/services/complaint/post_complaints";
import Cookies from "js-cookie";
import { contactUser } from "@core/services/complaint/put_complaints";

class ContactUserModal {
  isOpen: boolean;

  complaintType: "Recipe" | "Snapshot";

  complaintId: string;

  formik: FormikContextType<any>;

  onSucess: Function

  modal;
  flashMessageContext;

  initValue;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isOpen = false
    this.initValue = {
      remark: "",
    };
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  openModal = (complaintType, complaintId, onSucess) => {
    this.isOpen = true;
    this.complaintType = complaintType;
    this.complaintId = complaintId
    this.onSucess = onSucess
  };

  closeModal = () => {
    this.isOpen = false;
    this.initValue = {
      remark: "",
    };
    this.formik.resetForm();
  };

  contactUser = async (value) => {
    try {
      const data = {
        data: {
          remark: `เราได้รับข้อร้องเรียนเกี่ยวกับ ${
            this.complaintType === "Recipe" ? "สูตรอาหาร" : "Snapshot"
          } ของคุณ "${
            value.remark
          }" จึงร้องขอให้ทำการแก้ไขหรือลบโพสต์ดังกล่าว โดยระหว่างนี้โพสต์ของคุณจะถูกจำกัดการมองเห็นจนกว่าจะได้รับการแก้ไข`,
        },
      };
      const token = Cookies.get("token");
      const resp = await contactUser(this.complaintId, JSON.stringify(data), token);
      if (resp.status === 200) {
        this.isOpen = false;
        this.initValue = {
          remark: "",
        };
        this.formik.resetForm();
        this.onSucess()
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
export const ContactUserModalContext = createContext(new ContactUserModal());

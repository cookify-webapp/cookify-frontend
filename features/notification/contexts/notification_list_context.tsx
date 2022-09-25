import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { notificationListType } from "../types/notification_type";
import Cookies from "js-cookie";
import { getNotificationList } from "@core/services/notification/get_notification";

class NotificationList {
  notificationList: notificationListType[]
  loading: boolean
  modal
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.notificationList = []
    this.loading = false
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value;
  };

  prepareNotificationList = async () => {
    try {
      this.loading = true
      const token = Cookies.get("token");
      const resp = await getNotificationList(token)
      if (resp.status === 200) {
        this.notificationList = resp.data?.notifications
      } else if (resp.status === 204) {
        this.notificationList = []
      }
    } catch (error) {
      this.modal.openModal(
        "เกิดปัญหาในการดึงรายการการแจ้งเตือน",
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
export const NotificationListContext = createContext(new NotificationList());

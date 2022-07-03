import React from "react";
import { Observer } from "mobx-react-lite";
import { RegisterLoginBgCard } from "@core/components/register_login_bg_card/register_login_bg_card";

export const RegisterSuccessPage = () => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <RegisterLoginBgCard>
          <div>
            <p className="headlineM text-center lg:text-left">ลงทะเบียนสำเร็จ!</p>
            <p className="bodyM text-gray-50 mt-4 text-center lg:text-left">
              กรุณารอสักครู่ ระบบจะพาคุณกลับไปยังหน้าแรก
            </p>
            <i className="w-6 h-6 mt-6 mx-auto lg:mx-0 text-[24px] leading-6 fas fa-circle-notch fa-spin"></i>
          </div>
        </RegisterLoginBgCard>
      )}
    </Observer>
  );
};

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
            <p className="headlineM">ลงทะเบียนสำเร็จ!</p>
            <p className="bodyM text-gray-50 mt-4">
              กรุณารอสักครู่ ระบบจะพาคุณกลับไปยังหน้าแรก
            </p>
            <img
              src="/images/core/loading.gif"
              className="w-6 h-6 mt-6"
              alt="loading animation"
            />
          </div>
        </RegisterLoginBgCard>
      )}
    </Observer>
  );
};

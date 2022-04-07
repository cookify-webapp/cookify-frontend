import React, { useState, createRef } from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import router from "next/router";

export const UserAccount = ({ src, userName, role }) => {
  //---------------------
  // HOOKS
  //---------------------
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  //---------------------
  //   REF
  //---------------------
  const ref: any = createRef();

  // FUNCTION
  //---------------------
  useOnClickOutside(ref, () => {
    setIsShowDropdown(false);
  });

  const onHandleLogOut = () => {
    alert('logout')
  }

  //---------------------
  // VARIABLE
  //---------------------
  const convertRole = () => {
    let roleName = "ผู้ใช้ทั่วไป";
    if (role === "admin") {
      roleName = "ผู้ดูแลระบบ";
    }
    return roleName;
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          <div
            ref={ref}
            className="bg-white w-[201px] h-[52px] sm:w-[250px] sm:h-[64px] flex items-center px-4 rounded-[12px] card-shadow cursor-pointer"
            onClick={() => setIsShowDropdown(!isShowDropdown)}
          >
            <div className="flex items-center">
              <div className="border border-gray-10 w-[36px] sm:w-[48px] h-[36px] sm:h-[48px] shrink-0">
                <ImageWithFallback
                  src={src}
                  alt="user profile image"
                  classStyle="rounded-full"
                />
              </div>
              <div className="ml-3 shrink-0 w-[85px] sm:w-[123px]">
                <p className="text-[14px] font-medium sm:titleS line-clamp-1 truncate">
                  {userName}
                </p>
                <p className="bodyXS sm:bodyS text-gray-50">{convertRole()}</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-[5px] bg-beige-20 flex items-center shrink-0">
              <i className="fas fa-caret-down text-[12px] h-3 text-center"></i>
            </div>
          </div>
          {isShowDropdown && (
            <>
              <div className="bg-white mt-3 w-[201px] h-[52px] sm:w-[250px] sm:h-[64px] rounded-[12px] card-shadow cursor-pointer bodyM absolute z-10">
                <div
                  className="bg-white hover:bg-gray-20 border-b border-b-gray-30 rounded-t-[12px] flex items-center p-4"
                  onClick={() => router.push("/profile")}
                >
                  <i className="fas fa-user w-4 h-4"></i>
                  <p className="ml-4">ข้อมูลบัญชีผู้ใช้</p>
                </div>
                <div
                  className="bg-white hover:bg-gray-20 border-b border-b-gray-30 rounded-b-[12px] flex items-center p-4"
                  onClick={() => onHandleLogOut()}
                >
                  <i className="fas fa-sign-out-alt w-4 h-4"></i>
                  <p className="ml-4">ออกจากระบบ</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Observer>
  );
};

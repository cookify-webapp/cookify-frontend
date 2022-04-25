import React, { useState, createRef } from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import router from "next/router";
import { userAccountType } from "core/types/core_components_type";
import Link from "next/link";

export const UserAccount = ({ src, userName, role }: userAccountType) => {
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
    alert("logout");
  };

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
        <div className="w-[201px] sm:w-[250px]">
          <div
            ref={ref}
            className="w-[201px] sm:w-[250px] relative bg-white h-[52px] sm:h-[64px] flex items-center px-4 rounded-[12px] card-shadow cursor-pointer"
            onClick={() => setIsShowDropdown(!isShowDropdown)}
          >
            <div className="flex items-center">
              <div className="w-[36px] sm:w-[48px] h-[36px] sm:h-[48px]">
                <ImageWithFallback
                  src={src}
                  alt="user profile image"
                  classStyle="rounded-full border border-gray-10 w-[36px] sm:w-[48px] h-[36px] sm:h-[48px]"
                />
              </div>
              <div className="shrink-0 w-[85px] sm:w-[123px] ml-3">
                <p className="titleS text-[14px] font-medium sm:titleS line-clamp-1 truncate">
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
              <div className="bg-white mt-2 sm:mt-3 w-[201px] h-[52px] sm:w-[250px] sm:h-[64px] rounded-[12px] card-shadow cursor-pointer bodyM absolute z-10">
                <Link href={"/profile"}>
                  <a className="bg-white hover:bg-gray-20 border-b border-b-gray-30 rounded-t-[12px] flex items-center p-3 sm:p-4">
                    <i className="fas fa-user w-3 h-3 sm:w-4 sm:h-4"></i>
                    <p className="ml-4 bodyS sm:bodyM">ข้อมูลบัญชีผู้ใช้</p>
                  </a>
                </Link>
                <div
                  className="bg-white hover:bg-gray-20 border-b border-b-gray-30 rounded-b-[12px] flex items-center p-3 sm:p-4"
                  onClick={() => onHandleLogOut()}
                >
                  <i className="fas fa-sign-out-alt w-3 h-3 sm:w-4 sm:h-4"></i>
                  <p className="ml-4 bodyS sm:bodyM">ออกจากระบบ</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Observer>
  );
};

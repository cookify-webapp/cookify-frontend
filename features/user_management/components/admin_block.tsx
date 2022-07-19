import React, { createRef, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import Link from "next/link";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import { ModalContext } from "core/context/modal_context";

const { publicRuntimeConfig } = getConfig();

interface adminBlockPropsType {
  id: string;
  image: string;
  name: string;
  email: string;
  isMe: boolean;
}

export const AdminBlock = ({
  id,
  image,
  name,
  email,
  isMe,
}: adminBlockPropsType) => {
  //---------------------
  // STATE
  //---------------------
  const [open, setOpen] = useState(false);

  //---------------------
  // CONTEXT
  //---------------------
  const modal = useContext(ModalContext);

  //---------------------
  //   REF
  //---------------------
  const ref: any = createRef();

  //  USE CLICK OUTSIDE
  //---------------------
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <Link href={isMe ? '/me' : `/users/${id}`} passHref>
          <a>
            <div className="w-full border border-gray-40 rounded-[12px] bg-white p-4 flex justify-between space-x-3 cursor-pointer">
              <div className="flex space-x-3 items-center">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${image}`}
                    alt="recipe image cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-auto">
                  <p className="titleM">{name}</p>
                  <p className="bodyS text-gray-60 mt-[2px]">{email}</p>
                </div>
              </div>
              {!isMe && (
                <div className="relative w-auto">
                  <div
                    ref={ref}
                    className="cursor-pointer w-auto flex items-center justify-center text-center rounded-full shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(!open);
                    }}
                  >
                    <i className=" text-[16px] leading-[16px] fas fa-ellipsis-v"></i>
                  </div>
                  {open && (
                    <div className="flex justify-end">
                      <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                        <div
                          className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                          onClick={(e) => {
                            e.preventDefault();
                            modal.openModal(
                              "ลบผู้ดูแลระบบ",
                              "เมื่อลบผู้ดูแลระบบรายนี้ บัญชีของผู้ดูแลระบบรายนี้จะไม่สามารถใช้งานได้อีก และระบบจะส่งอีเมลเพื่อแจ้งเรื่องการถอดถอนสิทธิ์ผู้ดูแลระบบ",
                              () => null,
                              "ยกเลิก",
                              "ลบ"
                            );
                          }}
                        >
                          <i className="fas fa-trash w-auto"></i>
                          <p className="ml-3 w-auto">ลบผู้ดูแลระบบ</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </a>
        </Link>
      )}
    </Observer>
  );
};

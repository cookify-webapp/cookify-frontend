import React, { createRef, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { commentListType } from "../types/snapshot_detail_type";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import Link from "next/link";
import { AuthContext } from "core/context/auth_context";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import { useRouter } from "next/router";
import { ModalContext } from "core/context/modal_context";
import dayjs from "dayjs";
import "dayjs/locale/th";
import classNames from "classnames";
import { SnapshotDetailContext } from "../contexts/snapshot_detail_context";
const { publicRuntimeConfig } = getConfig();

interface commentBlockPropType {
  comment: commentListType;
  isEdit: boolean;
  index: number;
  formik: any
}

export const CommentBlock = ({
  comment,
  isEdit,
  index,
  formik
}: commentBlockPropType) => {
  //---------------------
  // STATE
  //---------------------
  const [open, setOpen] = useState(false);

  //---------------------
  // CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);
  const modal = useContext(ModalContext);
  const context = useContext(SnapshotDetailContext);

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
        <div>
          <div className="flex justify-between space-x-6 items-center">
            <Link
              href={
                authContext.user?.username === comment?.author?.username
                  ? "/me"
                  : `/users/${comment?.author?._id}`
              }
            >
              <a>
                <div className="flex items-center flex-shrink-0 space-x-3">
                  <div className="w-[48px] h-[48px] border border-gray-30 rounded-full overflow-hidden cursor-pointer flex-shrink-0">
                    <ImageWithFallback
                      alt="snapshot cover image"
                      className="w-full h-full object-cover"
                      src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${comment?.author?.image}`}
                    />
                  </div>
                  <div>
                    <p className="titleS">{comment?.author?.username}</p>
                    <p className="bodyS text-gray-50">{`เมื่อ ${dayjs(
                      comment?.createdAt
                    )
                      .locale("th")
                      .add(543, "year")
                      .format("D MMM YY เวลา HH:mm น.")}`}</p>
                  </div>
                </div>
              </a>
            </Link>
            {authContext.user !== null && (
              <div className="w-auto">
                <div
                  ref={ref}
                  className="cursor-pointer w-auto flex items-center justify-center text-center shrink-0"
                  onClick={() => setOpen(!open)}
                >
                  <i className="text-[16px] leading-[16px] fas fa-ellipsis-v"></i>
                </div>
                {open && (
                  <div className="flex justify-end">
                    {comment?.isMe && (
                      <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                        <div
                          className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                          onClick={() => {
                            context.setValue("isEditIndex", index);
                            formik.setFieldValue('comment', comment.comment)
                          }}
                        >
                          <i className="fas fa-pen w-auto"></i>
                          <p className="ml-3 w-auto">แก้ไขความคิดเห็น</p>
                        </div>
                        <div
                          className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                          onClick={() => {
                            modal.openModal(
                              "ลบความคิดเห็น",
                              "ต้องการลบความคิดเห็นใช่หรือไม่",
                              () => {
                                null;
                              },
                              "ยกเลิก",
                              "ลบ"
                            );
                          }}
                        >
                          <i className="fas fa-trash w-auto"></i>
                          <p className="ml-3 w-auto">ลบความคิดเห็น</p>
                        </div>
                      </div>
                    )}
                    {!comment.isMe && (
                      <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                        <div
                          className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                          onClick={() => null}
                        >
                          <i className="fas fa-exclamation-triangle w-auto"></i>
                          <p className="ml-3">รายงานความคิดเห็น</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <p
            className={classNames("mt-2 pl-[60px] text-[14px]", {
              "bg-gray-30": isEdit,
            })}
          >
            {comment.comment}
          </p>
        </div>
      )}
    </Observer>
  );
};

import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import Link from "next/link";
import { complaintListType } from "../types/complaint_type";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { PrimaryButton } from "@core/components/button/primary_button";
import _ from "lodash";
import { ModalContext } from "core/context/modal_context";
import { ComplaintListContext } from "../contexts/complaint_list_context";

interface ComplaintBoxPropsType {
  complaint: complaintListType;
  setHasMore: Function
}

export const ComplaintBox = (props: ComplaintBoxPropsType) => {
  //---------------------
  // CONTEXT
  //---------------------
  const modal = useContext(ModalContext)
  const context = useContext(ComplaintListContext)

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  // HANDLER
  //---------------------
  const convertStatus = () => {
    let status = {
      filed: "ตรวจสอบข้อร้องเรียน",
      examining: "กำลังตรวจสอบ",
      "in progress": "รอดำเนินการ",
      verifying: "ตรวจสอบการแก้ไข",
      completed: "เสร็จสิ้น",
      deleted: "โพสต์ต้นทางถูกลบ",
      rejected: "ปฏิเสธคำร้อง",
    };
    return status[props.complaint?.status];
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="border border-gray-40 rounded-[12px] p-4">
          <p className="bodyL break-all">
            {`คำร้องขอให้ตรวจสอบ ${
              props.complaint?.type === "Recipe" ? "สูตรอาหาร" : "Snapshot"
            } `}
            <Link
              href={`/${
                props.complaint?.type === "Recipe" ? "recipes" : "snapshots"
              }/${props.complaint?.post}`}
              passHref
            >
              <a target="_blank" className="">
                <span className="font-semibold underline w-auto">
                  {`#${props.complaint?.post}`}
                  <i className="fas fa-link text-[20px] leading-[20px] w-[20px] ml-1" />
                </span>
              </a>
            </Link>
          </p>
          <div className="mt-2 flex space-x-2 bodyM">
            <p className="font-semibold w-auto flex-shrink-0">ผู้ร้องขอ:</p>
            <p>{props.complaint?.reporter?.username}</p>
          </div>
          <div className="mt-2 flex space-x-2 bodyM">
            <p className="font-semibold w-auto flex-shrink-0">เวลาที่ร้องขอ:</p>
            <p>{`${dayjs(props.complaint?.createdAt)
              .locale("th")
              .add(543, "year")
              .format("D MMM YY เวลา HH:mm น.")}`}</p>
          </div>
          <div className="mt-2 flex space-x-2 bodyM">
            <p className="font-semibold w-auto flex-shrink-0">เนื้อหาที่ร้องเรียน:</p>
            <p>{props.complaint?.detail}</p>
          </div>
          {props.complaint?.status !== "filed" && (
            <>
              <div className="my-2 flex space-x-2 bodyM">
                <p className="font-semibold w-auto flex-shrink-0">ผู้รับเรื่องดำเนินการ:</p>
                <p>{props.complaint?.moderator?.username}</p>
              </div>
              {_.size(props.complaint?.remarks) > 0 && (
                <div className="mt-2 mb-4 space-y-4">
                  {_.map(props.complaint?.remarks, (remark, index) => (
                    <div
                      className="p-4 bg-gray-30 rounded-[12px] bodyM"
                      key={`${props.complaint?.post}_remark_${index}`}
                    >
                      <p className="font-semibold">{`คำร้องขอแก้ไข#${
                        index + 1
                      }`}</p>
                      <p>{remark}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex space-x-1 bodyM">
                <p className="font-semibold w-auto flex-shrink-0">สถานะคำร้อง:</p>
                <p>{convertStatus()}</p>
              </div>
            </>
          )}
          {(props.complaint?.isMe || props.complaint?.status === 'filed') && (
            <>
              <div className="mt-6 w-full md:w-[500px] flex mx-auto border-t border-t-gray-30" />
              <div className="flex justify-center space-x-4 mt-4 items-center">
                <div className="w-full md:w-[150px]">
                  <PrimaryButton
                    title={
                      props.complaint?.status === "filed"
                        ? "รับเรื่อง"
                        : ["examining", "in progress", "verifying"].includes(
                            props.complaint?.status
                          )
                        ? "ติดต่อผู้ใช้"
                        : "ลบประวัติคำร้อง"
                    }
                    disabled={props.complaint?.status === "in progress"}
                    onClick={() => {
                      if (props.complaint?.status === 'filed') {
                        modal.openModal(
                          "ยืนยันที่จะรับเรื่องหรือไม่",
                          "เมื่อทำการรับเรื่องแล้ว คุณจะเป็นผู้ดำเนินการรับผิดชอบเนื้อหาดังกล่าว",
                          () => context.editComplaintStatus(props.complaint?._id, 'examining', props.setHasMore),
                          "ยกเลิก",
                          "รับเรื่อง"
                        );
                      }
                    }}
                  />
                </div>
                {props.complaint?.status === "filed" && (
                  <div className="w-full md:w-[150px]">
                    <SecondaryButton title="ปฏิเสธ" onClick={() => null} />
                  </div>
                )}
                {["examining", "in progress", "verifying"].includes(
                  props.complaint?.status
                ) && (
                  <div className="w-full md:w-[150px]">
                    <PrimaryButton
                      title='เสร็จสิ้น'
                      disabled={props.complaint?.status !== "verifying"}
                      onClick={() => null}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </Observer>
  );
};

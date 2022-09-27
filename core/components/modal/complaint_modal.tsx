import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { ModalContext } from "core/context/modal_context";
import { ComplaintModalContext } from "core/context/complaint_modal_context";
import classNames from "classnames";
import { SecondaryButton } from "../button/secondary_button";
import { PrimaryButton } from "../button/primary_button";
import { AuthContext } from "core/context/auth_context";
import "dayjs/locale/th";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextAreaInput } from "../input/text_area_input";
import { FlashMessageContext } from "core/context/flash_message_context";

export const ComplaintModal = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const modalContext = useContext(ModalContext);
  const context = useContext(ComplaintModalContext);
  const authContext = useContext(AuthContext);
  const flashMessageContext = useContext(FlashMessageContext)

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => Yup.object({
      detail: Yup.string().required()
    }),
    initialValues: context.initValue,
    onSubmit: (value) => {
      context.sendComplaint(value);
    },
  });

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modalContext);
    context.setValue("formik", formik);
    context.setValue('flashMessageContext', flashMessageContext)
  }, []);

  //---------------------
  // HANDLER
  //---------------------
  const renderCaptionText = () => {
    let title = "";
    if (context.complaintType === "recipe") {
      title = `${authContext.user?.username}: ฉันต้องการร้องเรียนเกี่ยวกับสูตรอาหาร "${context.recipeName}" โดย "${context.author}" เนื่องจาก`;
    } else {
      title = `${
        authContext.user?.username
      }: ฉันต้องการร้องเรียนเกี่ยวกับ Snapshot จากสูตร "${
        context.recipeName
      }" เมื่อวันที่ ${dayjs(context.date)
        .locale("th")
        .add(543, "year")
        .format("D MMM YY เวลา HH:mm น.")} โดย "${context.author}" เนื่องจาก`;
    }
    return title;
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            "top-0 left-0 z-[100] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 px-5 md:px-0",
            { hidden: !context.isOpen },
            { fixed: context.isOpen }
          )}
        >
          <div className="bg-white rounded-[12px] w-full md:w-[500px] card-shadow py-6 animate-fade-in">
            <div className="px-6">
              <h3 className="headlineM">{`ร้องเรียน${
                context.complaintType === "recipe" ? "สูตรอาหาร" : " Snapshot"
              }`}</h3>
              <p className="bodyM mt-6">{renderCaptionText()}</p>
              <div className="mt-4">
                <TextAreaInput
                  onChange={(e) => {
                    formik.setFieldValue('detail', e.target.value)
                  }}
                  value={formik.values?.detail}
                  placeholder='อธิบายข้อร้องเรียน'
                />
              </div>
            </div>
            <div className="mt-6 border-t border-gray-30 pb-6"></div>
            <div className="flex space-x-[16px] px-6 justify-end">
              <div className="w-full md:w-[125px]">
                <SecondaryButton
                  onClick={() => context.closeModal()}
                  title="ยกเลิก"
                />
              </div>
              <div className="w-full md:w-[125px]">
                <PrimaryButton
                  onClick={() => formik.submitForm()}
                  disabled={!formik.dirty || !formik.isValid}
                  title="ส่ง"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

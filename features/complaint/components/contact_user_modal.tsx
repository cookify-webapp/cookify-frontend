import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { ModalContext } from "core/context/modal_context";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FlashMessageContext } from "core/context/flash_message_context";
import { TextAreaInput } from "@core/components/input/text_area_input";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { PrimaryButton } from "@core/components/button/primary_button";
import { ContactUserModalContext } from "../contexts/contact_user_modal_context";

export const ContactUserModal = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const modalContext = useContext(ModalContext);
  const context = useContext(ContactUserModalContext)
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
      remark: Yup.string().required()
    }),
    initialValues: context.initValue,
    onSubmit: (value) => {
      context.contactUser(value);
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
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            "top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 px-5 md:px-0",
            { hidden: !context.isOpen },
            { fixed: context.isOpen }
          )}
        >
          <div className="bg-white rounded-[12px] w-full md:w-[500px] card-shadow py-6 animate-fade-in">
            <div className="px-6">
              <h3 className="headlineM">ติดต่อผู้ใช้</h3>
              <div className="mt-4">
                <TextAreaInput
                  onChange={(e) => {
                    formik.setFieldValue('remark', e.target.value)
                  }}
                  value={formik.values?.remark}
                  placeholder='อธิบายข้อร้องเรียน'
                />
              </div>
            </div>
            <div className="mt-4 border-t border-gray-30 pb-6"></div>
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

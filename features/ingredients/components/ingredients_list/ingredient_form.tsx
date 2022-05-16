import React, { createRef, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { IngredientFormContext } from "@features/ingredients/context/ingredient_form_context";
import classNames from "classnames";
import _ from "lodash";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { IngredientValidateSchema } from "@features/ingredients/forms/ingredient_form";
import { ModalContext } from "core/context/modal_context";
import getConfig from "next/config";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { TextBox } from "@core/components/input/text_box";
import { PrimaryButton } from "@core/components/button/primary_button";
import { SelectInput } from "@core/components/input/select_input";
import { FlashMessageContext } from "core/context/flash_message_context";

const { publicRuntimeConfig } = getConfig();

export const IngredientForm = ({onCancel, onSuccess}) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(IngredientFormContext);
  const modalContext = useContext(ModalContext);
  const flashMessageContext = useContext(FlashMessageContext)

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { ingredientId } = router.query;

  const isEdit = _.includes(router.pathname, ingredientId);

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => IngredientValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      isEdit ? context.editIngredient(value, ingredientId) : context.addIngredient(value, () => onSuccess())
    },
  });

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("formik", formik);
    context.setValue("modalContext", modalContext);
    context.setValue("flashMessageContext", flashMessageContext)
    context.prepareIngredientTypes()
    context.prepareIngredientUnits()
    
    isEdit && context.preparation(ingredientId as string);
    return () => {
      context.handlerResetInitValue()
    }
  }, []);

  //------------------
  //  REF
  //------------------
  const imgRef: any = createRef();

  //---------------------
  // HANDLER
  //---------------------
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      const preview = document.querySelector('img');

      reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result as string;
      }, false)

      reader.readAsDataURL(file);

      formik.setFieldValue("ingredientImage", file);
      formik.setFieldValue("imageFileName", file.name);
    }
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            "fixed top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 px-5 md:px-0",
          )}
        >
          <div className="bg-white rounded-[12px] max-h-[calc(100vh-64px)] md:max-h-min w-full md:w-[564px] card-shadow py-6 animate-fade-in">
            <div className="px-4 md:px-6">
              <h3 className="headlineM">
                {isEdit ? "แก้ไขวัตถุดิบ" : "เพิ่มวัตถุดิบ"}
              </h3>
              <div className="mt-6 grid grid-cols-12 gap-x-6">
                <div className="col-span-12 md:col-span-5">
                  <div className="w-[192px] h-[192px] rounded-[12px] border border-gray-30 mx-auto overflow-hidden">
                    <img
                      src={
                        `${publicRuntimeConfig.CKF_IMAGE_API}/ingredients/${formik.values?.imageFileName}` ? 
                        "/images/core/default.png" : `${publicRuntimeConfig.CKF_IMAGE_API}/ingredients/${formik.values?.imageFileName}`
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[125px] mt-4 mx-auto">
                    <SecondaryButton
                      title="อัปโหลด"
                      onClick={() => imgRef.current?.click()}
                    />
                    <input
                      ref={imgRef}
                      type="file"
                      onChange={(e) => {
                        onFileChange(e);
                        e.target.value = null;
                      }}
                      accept="image/png, image/jpeg"
                      hidden
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7 mt-6 md:mt-0 space-y-4">
                  <TextBox
                    label="ชื่อวัตถุดิบภาษาไทย *"
                    onChange={(e) => {
                      formik.setFieldTouched("name");
                      formik.setFieldValue("name", e.target.value);
                    }}
                    type="text"
                    value={formik.values?.name}
                    error={
                      formik.errors?.name && formik.touched?.name
                        ? formik.errors?.name
                        : ""
                    }
                  />
                  <TextBox
                    label="ชื่อวัตถุดิบภาษาอังกฤษ *"
                    onChange={(e) => {
                      formik.setFieldTouched("queryKey");
                      formik.setFieldValue("queryKey", e.target.value);
                    }}
                    type="text"
                    value={formik.values?.queryKey}
                    error={
                      formik.errors?.queryKey && formik.touched?.queryKey
                        ? formik.errors?.queryKey
                        : ""
                    }
                  />
                  <div>
                    <p className="titleS pb-2">ประเภทของวัตถุดิบ *</p>
                    <SelectInput
                      placeholder="เลือกประเภท"
                      isBorder
                      value={formik.values?.type}
                      options={context.ingredientTypes}
                      onChange={(value) => {
                        formik.setFieldTouched("type");
                        formik.setFieldValue('type', value)
                      }}
                      error={
                        formik.errors?.type && formik.touched?.type
                        ? formik.errors?.type
                        : ""
                      }
                    />
                  </div>
                  <div>
                    <p className="titleS pb-2">หน่วยของวัตถุดิบ *</p>
                    <SelectInput
                      placeholder="เลือกหน่วย"
                      isBorder
                      value={formik.values?.unit}
                      options={context.ingredientUnits}
                      onChange={(value) => {
                        formik.setFieldTouched("unit");
                        formik.setFieldValue('unit', value)
                      }}
                      error={
                        formik.errors?.unit && formik.touched?.unit
                        ? formik.errors?.unit
                        : ""
                      }
                    />
                  </div>
                  <TextBox
                    label="ลิงก์สำหรับสั่งซื้อวัตถุดิบ"
                    onChange={(e) => {
                      formik.setFieldTouched("shopUrl");
                      formik.setFieldValue("shopUrl", e.target.value);
                    }}
                    type="text"
                    value={formik.values?.shopUrl}
                    error={
                      formik.errors?.shopUrl && formik.touched?.shopUrl
                        ? formik.errors?.shopUrl
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-30 pb-6"></div>
            <div className="flex justify-between md:justify-end space-x-4 px-6">
              <div className="w-full md:w-[125px]">
                <SecondaryButton onClick={() => onCancel()} title="ยกเลิก"/>
              </div>
              <div className="w-full md:w-[125px]">
                <PrimaryButton
                  onClick={() => formik.submitForm()} 
                  title="เพิ่ม"
                  disabled={!formik.dirty || !formik.isValid}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
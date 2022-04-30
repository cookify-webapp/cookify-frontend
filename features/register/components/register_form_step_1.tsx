import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { RegisterContext } from "../context/register_context";
import { TextBox } from "@core/components/input/text_box";
import { FormikContextType } from "formik";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { Router } from "next/router";
import { PrimaryButton } from "@core/components/button/primary_button";

export interface FormStep1Props {
  formik: FormikContextType<any>;
}

export const RegisterFormStep1 = ({ formik }: FormStep1Props) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RegisterContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div>
          <h1 className="headlineXL text-black">
            ยินดีต้อนรับสู่ <span className="text-brown-10 headlineXL">COOKIFY</span>
          </h1>
          <p className="mt-2 text-gray-50 text-[14px]">
            เว็บแอปพลิเคชันสำหรับค้นหาสูตรอาหารตามวัตถุดิบที่คุณต้องการ
          </p>
          <div className="mt-8 w-[300px]">
            <TextBox
              label="ชื่อผู้ใช้งาน *"
              onChange={(e) => {
                formik.setFieldTouched("username")
                formik.setFieldValue("username", e.target.value)
              }}
              type="text"
              value={formik.values?.username}
              error={formik.errors?.username && formik.touched?.username ? formik.errors?.username : ''}
            />
          </div>
          <div className="mt-6 w-[300px]">
            <TextBox
              label="อีเมล *"
              onChange={(e) => {
                formik.setFieldTouched("email")
                formik.setFieldValue("email", e.target.value)
              }}
              type="text"
              value={formik.values?.email}
              error={formik.errors?.email && formik.touched?.email ? formik.errors?.email : ''}
            />
          </div>
          <div className="mt-6 w-[300px]">
            <TextBox
              label="รหัสผ่าน *"
              onChange={(e) => {
                formik.setFieldTouched("password")
                formik.setFieldValue("password", e.target.value)
              }}
              type="password"
              value={formik.values?.password}
              error={formik.errors?.password && formik.touched?.password ? formik.errors?.password : ''}
            />
          </div>
          <div className="mt-6 w-[300px]">
            <TextBox
              label="ยืนยันรหัสผ่าน *"
              onChange={(e) => {
                formik.setFieldTouched("confirmPassword")
                formik.setFieldValue("confirmPassword", e.target.value)
              }}
              type="password"
              value={formik.values?.confirmPassword}
              error={formik.errors?.confirmPassword && formik.touched?.confirmPassword ? formik.errors?.confirmPassword : ''}
            />
          </div>
          <div className="flex space-x-2 w-[300px] mt-8">
            <SecondaryButton 
              onClick={() => {
                formik.resetForm()
                Router.prototype.back()
              }}
              title="ยกเลิก"
            />
            <PrimaryButton
              onClick={() => context.setValue('stepForm', 2)}
              title="ถัดไป"
              disabled={!formik.dirty || !formik.isValid}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

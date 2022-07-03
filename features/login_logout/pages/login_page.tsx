import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { AuthContext } from "core/context/auth_context";
import { RegisterLoginBgCard } from "@core/components/register_login_bg_card/register_login_bg_card";
import { TextBox } from "@core/components/input/text_box";
import { useFormik } from "formik";
import { LoginValidateSchema } from "../forms/login_form";
import { PrimaryButton } from "@core/components/button/primary_button";
import { ModalContext } from "core/context/modal_context";

export const LoginPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext)

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    authContext.setValue('modal', modalContext)

    return () => {
      formik.resetForm()
    }
  }, []);

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => LoginValidateSchema,
    initialValues: authContext.initValue,
    onSubmit: (value) => {
      authContext.login(value)
    },
  });
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <RegisterLoginBgCard>
          <div>
            <h1 className="headlineL md:headlineXL text-center lg:text-left">เข้าสู่ระบบ</h1>
            <div className="w-full md:w-[300px] md:mx-auto lg:mx-0 mt-8">
              <TextBox
                label="ชื่อผู้ใช้งาน"
                onChange={(e) => {
                  formik.setFieldTouched("username");
                  formik.setFieldValue("username", e.target.value);
                }}
                type="text"
                value={formik.values?.username}
                error={
                  formik.errors?.username && formik.touched?.username
                    ? formik.errors?.username
                    : ""
                }
              />
            </div>
            <div className="w-full md:w-[300px] md:mx-auto lg:mx-0 mt-6">
              <TextBox
                label="รหัสผ่าน"
                onChange={(e) => {
                  formik.setFieldTouched("password");
                  formik.setFieldValue("password", e.target.value);
                }}
                type="password"
                value={formik.values?.password}
                error={
                  formik.errors?.password && formik.touched?.password
                    ? formik.errors?.password
                    : ""
                }
              />
            </div>
            <div className="mt-8 w-full md:w-[300px] md:mx-auto lg:mx-0">
              <PrimaryButton
                onClick={() => formik.submitForm()}
                title="เข้าสู่ระบบ"
                disabled={!formik.dirty || !formik.isValid}
              />
            </div>
          </div>
        </RegisterLoginBgCard>
      )}
    </Observer>
  );
};

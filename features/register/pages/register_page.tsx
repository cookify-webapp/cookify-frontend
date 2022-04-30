import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import Link from "next/link";
import { RegisterContext } from "../context/register_context";
import { useFormik } from "formik";
import { RegisterFormStep1 } from "../components/register_form_step_1";
import { RegisterValidateSchema } from "../forms/register_form";

export const RegisterPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RegisterContext)

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => RegisterValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      alert(value)
    },
  })

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="bg-gray-10 h-screen max-h-screen relative overflow-hidden">
          <img
            src="/images/register_login/bg_register_login_mobile.png"
            alt="background image"
            className="block md:hidden w-screen h-3/5 absolute bottom-0"
          />
          <img
            src="/images/register_login/bg_register_login_tablet.png"
            alt="background image"
            className="hidden md:block lg:hidden w-screen h-3/5 absolute bottom-0"
          />
          <img
            src="/images/register_login/bg_register_login_desktop.png"
            alt="background image"
            className="hidden lg:block w-screen h-3/5 absolute bottom-0"
          />
          <div className="p-5 md:p-6">
            <Link href="/" passHref>
              <a>
                <img
                  src="/images/core/fullLogoCookify.png"
                  className="w-[100px] md:w-[125px]"
                  alt="Cookify's Logo"
                />
              </a>
            </Link>
            <div className="flex items-center justify-center z-10 h-[calc(100vh-57.84px)] md:h-[calc(100vh-80.76px)]">
              <div className="bg-white rounded-[12px] card-shadow w-full md:w-[500px] xl:w-[1164px] px-[82px] flex items-center h-auto">
                <img src="/images/core/Cooking.gif" alt="cooking animation" className="w-[500px]" />
                <div className="ml-12 border-l border-gray-30 pl-[80px]">
                  {
                    context.stepForm === 1 && (
                      <RegisterFormStep1 formik={formik} />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

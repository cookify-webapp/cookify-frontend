import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import Link from "next/link";
import { RegisterContext } from "../context/register_context";
import { useFormik } from "formik";
import { RegisterFormStep1 } from "../components/register_form_step_1";
import { RegisterValidateSchema } from "../forms/register_form";
import { RegisterLoginBgCard } from "@core/components/register_login_bg_card/register_login_bg_card";
import { RegisterFormStep2 } from "../components/register_form_step_2";

export const RegisterPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RegisterContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    return () => {
      context.setValue("stepForm", 1);
      formik.resetForm();
    };
  }, []);

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
      context.register()
    },
  });

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <RegisterLoginBgCard>
          {context.stepForm === 1 && <RegisterFormStep1 formik={formik} />}
          {context.stepForm === 2 && (
            <RegisterFormStep2 formik={formik} />
          )}
        </RegisterLoginBgCard>
      )}
    </Observer>
  );
};

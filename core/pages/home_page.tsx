import React, { useEffect, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";
import { useFormik } from "formik";
import { onValidation } from "core/forms/home_page_form";
import { useRouter } from "next/router";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    context.prepareAvatar();
  }, []);

  //---------------------
  // FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
    validationSchema: onValidation,
    initialValues: {
      name: "",
    },
    onSubmit: (value) => {
      alert(value.name);
      formik.resetForm();
    },
  });

  //---------------------
  //  RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="text-[20px] text-red text-center">
          <h1>This is home page</h1>
          <p>{context.userProfile.name}</p>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            onChange={(event) => {
              formik.setFieldValue("name", event?.target?.value);
            }}
            className="border"
            value={formik.values?.name}
          />
          <button
            type="submit"
            onClick={() => formik.submitForm()}
            className="border"
          >
            submit
          </button>

          {formik.errors?.name && (
            <p className="text-red-500">this field is required</p>
          )}

          <br />
          <button onClick={() => router.push("/profile")} className="border">
            Go to profile
          </button>
          <button onClick={() => router.push("/recipes")} className="border">
            Go to recipes
          </button>
        </div>
      )}
    </Observer>
  );
}

import React, { useEffect, useContext } from "react";
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";
import { useFormik } from "formik";
import { onValidation } from "core/forms/home_page_form";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);

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
      name: ''
    },
    onSubmit: (value) => {
      alert(value.name);
      formik.resetForm()
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
          />
          <button type="submit" onClick={() => formik.submitForm()} className="border">submit</button>
        </div>
      )}
    </Observer>
  );
}

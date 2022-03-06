import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { RecipesContext } from "../context/recipes_context";
import _ from "lodash";
import { useFormik } from "formik";
import { onValidation } from "../forms/recipes_form";

import { RecipesHeader } from "../components/RecipesHeader";

export const RecipesPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipesContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.prepareRecipes();
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
      recipeName: "",
    },
    onSubmit: (value) => {
      alert(value.recipeName);
      formik.resetForm();
    },
  });

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          <RecipesHeader />
          {context.isLoaded && (
            <>
              {_.map(context.recipes, (recipe, index) => (
                <div key={recipe.name}>
                  <p>name: {recipe.name}</p>
                  <p>type: {recipe.type}</p>
                </div>
              ))}
            </>
          )}
          <input className="border" type="text" id="recipeName" name="recipeName" onChange={(e) => {formik.setFieldValue('recipeName', e?.target?.value)}}/>
          <button type="submit" onClick={() => {formik.submitForm()}}>Submit</button>
          {
            formik.errors?.recipeName && (
              <p className="text-red-500">this field cannot be blank</p>
            )
          }
        </>
      )}
    </Observer>
  );
};

import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import { AuthContext } from "core/context/auth_context";
import { RecipeCommentContext } from "@features/recipes/contexts/recipe_comment_context";
import { useFormik } from "formik";
import { commentValidateSchema } from "@features/recipes/forms/comment_form";
import classNames from "classnames";
const { publicRuntimeConfig } = getConfig();
import _ from 'lodash'

export const CommentInputBlock = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipeCommentContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => commentValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      // isEdit
      //   ? context.editIngredient(value, ingredientId, () => onSuccess())
      //   : context.addIngredient(value, () => onSuccess());
    },
  });

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    return () => {
      formik.resetForm()
    }
  }, [])
  

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-[48px] h-[48px] rounded-full border border-gray-30 flex-shrink-0">
              <ImageWithFallback
                alt="profile image"
                className="w-full h-full object-cover rounded-full"
                src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${authContext.user?.image}`}
              />
            </div>
            <p className="titleS">{authContext.user?.username}</p>
          </div>
          <div className="md:pl-[60px] mt-4 md:flex md:items-center">
            <p className="bodyL w-auto">ให้คะแนนสูตรอาหาร</p>
            <div className="ml-2 space-x-1 flex w-auto">
              {_.map(new Array(5), (item, i) => {
                return (
                  <i
                    key={`${i}_star`}
                    className={classNames("text-[28px] leading-[28px] text-yellow cursor-pointer", {
                      "fas fa-star": formik.values?.rating > i,
                      "far fa-star": formik.values?.rating <= i,
                    })}
                    onClick={() => formik.setFieldValue('rating', i+1)}
                  ></i>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

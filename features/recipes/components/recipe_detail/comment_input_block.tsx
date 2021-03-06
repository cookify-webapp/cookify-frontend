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
import _ from "lodash";
import { TextAreaInput } from "@core/components/input/text_area_input";
import { ModalContext } from "core/context/modal_context";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { PrimaryButton } from "@core/components/button/primary_button";
import { useRouter } from "next/router";
import { FlashMessageContext } from "core/context/flash_message_context";

interface CommentInputBlockProps {
  isEdit: boolean;
}

export const CommentInputBlock = ({ isEdit }: CommentInputBlockProps) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipeCommentContext);
  const authContext = useContext(AuthContext);
  const modal = useContext(ModalContext);
  const flashMessageContext = useContext(FlashMessageContext)

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { recipeId } = router.query;

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
      context.isEdit ? 
      context.editComment(context.myComment?._id, value, () => {
        context.setValue('isEdit', false)
        context.prepareMyComment(recipeId)
        context.setValue('commentsList', [])
        context.prepareCommentsList(recipeId, true)
      })
      :
      context.addComment(recipeId, value, () => {
        context.prepareMyComment(recipeId)
        context.setValue('commentsList', [])
        context.prepareCommentsList(recipeId, true)
      })
    },
  });

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.setValue("flashMessageContext", flashMessageContext)
    context.setValue("isEdit", isEdit);
    context.setValue('formik', formik)
    return () => {
      formik.resetForm();
    };
  }, []);

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
          <div className="md:pl-[60px] mt-2 md:flex md:items-center">
            <p className="bodyM w-auto">???????????????????????????????????????????????????</p>
            <div className="mt-2 md:mt-0 md:ml-2 space-x-1 flex just w-auto">
              {_.map(new Array(5), (item, i) => {
                return (
                  <i
                    key={`${i}_star`}
                    className={classNames(
                      "text-[24px] leading-6 text-yellow cursor-pointer w-auto",
                      {
                        "fas fa-star": formik.values?.rating > i,
                        "far fa-star": formik.values?.rating <= i,
                      }
                    )}
                    onClick={() => formik.setFieldValue("rating", i + 1)}
                  ></i>
                );
              })}
            </div>
          </div>
          <div className="md:pl-[60px] mt-4">
            <TextAreaInput
              onChange={(e) => {
                formik.setFieldValue("comment", e.target.value);
              }}
              value={formik.values?.comment}
              placeholder="???????????????????????????????????????????????????????????????..."
              height={100}
            />
          </div>
          <div className="flex space-x-4 md:justify-end mt-4">
            {context.isEdit && (
              <div className="w-full md:w-[120px]">
                <SecondaryButton
                  onClick={() => {
                    context.setValue("isEdit", false);
                  }}
                  title="??????????????????"
                />
              </div>
            )}
            <div className="w-full md:w-[120px]">
              <PrimaryButton
                onClick={() => {
                  formik.submitForm()
                }}
                disabled={!formik.dirty || !formik.isValid}
                title={context.isEdit ? '??????????????????' : '?????????'}
              />              
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

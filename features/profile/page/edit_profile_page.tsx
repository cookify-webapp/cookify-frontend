import React, { createRef, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { EditProfileContext } from "../contexts/edit_profile_context";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { profileValidateSchema } from "../forms/edit_profile_form";
import { readImageFile } from "core/utils/util_function";
import { ModalContext } from "core/context/modal_context";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";
import { FlashMessageContext } from "core/context/flash_message_context";
import _ from "lodash";
import getConfig from "next/config";
import { SecondaryButton } from "@core/components/button/secondary_button";
const { publicRuntimeConfig } = getConfig();

export const EditProfilePage = () => {
  //---------------------
  // STATE
  //---------------------
  const [cover, setCover] = useState({
    file: null,
    original_filename: "",
  });

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(EditProfileContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modal = useContext(ModalContext);
  const ingredientSelectedModal = useContext(IngredientSelectionModalContext);
  const flashMessageContext = useContext(FlashMessageContext);

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => profileValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      console.log("");
    },
  });

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.setValue("formik", formik);
    context.setValue("router", router);
    context.setValue("flashMessageContext", flashMessageContext);
    context.prepareMyProfile();

    return () => {
      formik.resetForm();
      setCover({
        file: null,
        original_filename: "",
      });
      context.setValue("selectedIngredient", []);
      ingredientSelectedModal.setValue("selectedIngredients", []);
      context.setValue("userDetail", null);
    };
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
      const imageDataUrl = await readImageFile(file);
      setCover({
        file: imageDataUrl,
        original_filename: file.name,
      });
      formik.setFieldValue("profileImage", file);
      formik.setFieldValue("imageFileName", file.name);
    }
  };

  const handleRemoveTag = (ingredient) => {
    let tempSelectedIngredients = _.cloneDeep(formik.values?.allergy);
    let filter = _.filter(tempSelectedIngredients, (item) => {
      return item.name !== ingredient.name;
    });
    formik.setFieldValue("allergy", filter);
    ingredientSelectedModal.setValue("selectedIngredients", filter);
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          <div className="mx-auto xl:max-w-6xl">
            <div className="px-5 w-full block xl:hidden mt-2">
              <SearchBox
                onChange={(value) => {
                  homeLayoutContext.setValue("searchWord", value);
                }}
                height="h-16"
                placeholder="ค้นหาสูตรอาหารได้ที่นี่"
                value={homeLayoutContext.searchWord}
                isButton
                buttonOnClick={() => {
                  router.push("/recipes");
                }}
              />
            </div>
          </div>
          {!context.loading && (
            <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl mb-8 mt-6">
              <h1 className="headlineL">แก้ไขข้อมูลบัญชีผู้ใช้</h1>
              <div className="bg-white mt-6 rounded-[12px] flex justify-center p-6">
                <div>
                  <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full border border-gray-30 mx-auto overflow-hidden">
                    {cover?.file || formik.values?.imageFileName ? (
                      <img
                        id="profileImage"
                        src={
                          cover?.file ||
                          `${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${formik.values?.imageFileName}`
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/images/core/default.png"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="w-[125px] mt-6 mx-auto">
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
              </div>
            </div>
          )}
        </HomeLayout>
      )}
    </Observer>
  );
};

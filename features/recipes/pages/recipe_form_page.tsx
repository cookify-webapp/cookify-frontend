import React, { createRef, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { RecipeFormContext } from "../contexts/recipe_form_context";
import { useRouter } from "next/router";
import { Breadcrumb } from "@core/components/breadcrumb";
import { useFormik } from "formik";
import { recipeValidateSchema } from "../forms/recipe_form";
import { TextBox } from "@core/components/input/text_box";
import { TextAreaInput } from "@core/components/input/text_area_input";
import { ModalContext } from "core/context/modal_context";
import { SelectInput } from "@core/components/input/select_input";
import { SecondaryButton } from "@core/components/button/secondary_button";
import getConfig from "next/config";
import { readImageFile } from "core/utils/util_function";
const { publicRuntimeConfig } = getConfig();

export const RecipeFormPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [cover, setCover] = useState({
    file: null,
    original_filename: '',
  })

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipeFormContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modal = useContext(ModalContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.prepareCookingMethods();
  }, []);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { recipeId } = router.query;

  const isEdit = router.pathname.includes("/edit");

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => recipeValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      // isEdit
      //   ? context.editIngredient(value, ingredientId, () => onSuccess())
      //   : context.addIngredient(value, () => onSuccess());
    },
  });

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
      })
      formik.setFieldValue("recipeImage", file);
      formik.setFieldValue("imageFileName", file.name)
    }
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl pb-8">
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
                  router.push({
                    pathname: "/recipes",
                    query: { searchWord: homeLayoutContext.searchWord },
                  });
                }}
              />
            </div>
            <div className="px-5 2xl:px-0 pt-8 lg:pt-2">
              <Breadcrumb
                routes={
                  isEdit
                    ? [
                        {
                          title: context.recipeDetail?.name,
                          onRoute: `/recipes/${recipeId}`,
                        },
                        {
                          title: "แก้ไขสูตรอาหาร",
                          onRoute: "",
                        },
                      ]
                    : [
                        {
                          title: "สูตรอาหาร",
                          onRoute: "/recipes",
                        },
                        {
                          title: "เพิ่มสูตรอาหาร",
                          onRoute: "",
                        },
                      ]
                }
              />
            </div>
            <div className="px-5 2xl:px-0">
              <h1 className="headlineL py-6">
                {isEdit ? "แก้ไขสูตรอาหาร" : "เพิ่มสูตรอาหาร"}
              </h1>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-7 p-6 bg-white rounded-[12px]">
                  <h3 className="headlineM">รายละเอียดเบื้องต้น</h3>
                  <div className="mt-4">
                    <TextBox
                      label="ชื่อสูตรอาหาร *"
                      onChange={(e) => {
                        formik.setFieldTouched("name");
                        formik.setFieldValue("name", e.target.value);
                      }}
                      type="text"
                      value={formik.values?.name}
                      error={
                        formik.errors?.name && formik.touched?.name
                          ? formik.errors?.name
                          : ""
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <TextAreaInput
                      onChange={(e) => {
                        formik.setFieldValue("desc", e.target.value);
                      }}
                      value={formik.values?.desc}
                      title="คำอธิบายสูตรอาหาร *"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-12 gap-x-4">
                    <div className="col-span-6 md:col-span-8">
                      <p className="titleS pb-2">ประเภทของอาหาร *</p>
                      <SelectInput
                        placeholder="เลือกประเภท"
                        isBorder
                        value={formik.values?.method}
                        options={context.cookingMethods}
                        onChange={(value) => {
                          formik.setFieldTouched("method");
                          formik.setFieldValue("method", value);
                        }}
                        error={
                          formik.errors?.method && formik.touched?.method
                            ? formik.errors?.method
                            : ""
                        }
                      />
                    </div>
                    <div className="col-span-6 md:col-span-4">
                      <TextBox
                        label="จำนวนหน่วยบริโภค *"
                        onChange={(e) => {
                          formik.setFieldTouched("serving");
                          formik.setFieldValue("serving", e.target.value);
                        }}
                        type="number"
                        value={formik.values?.serving}
                        error={
                          formik.errors?.serving && formik.touched?.serving
                            ? formik.errors?.serving
                            : ""
                        }
                        non_negative
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5 bg-white rounded-[12px] p-6">
                  <h3 className="headlineM mb-6">เลือกรูปภาพ</h3>
                  <div className="w-[250px] h-[250px] rounded-[12px] border border-gray-30 mx-auto overflow-hidden">
                    {(cover?.file || formik.values?.imageFileName) ? (
                      <img
                        id="recipeImage"
                        src={cover?.file || `${publicRuntimeConfig.CKF_IMAGE_API}/recipes/${formik.values?.imageFileName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/images/core/default.png"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="w-[125px] mt-4 mx-auto">
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
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

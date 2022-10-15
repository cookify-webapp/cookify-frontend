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
import { SecondaryButton } from "@core/components/button/secondary_button";
import { TextBox } from "@core/components/input/text_box";
import { PrimaryButton } from "@core/components/button/primary_button";
import { Tag } from "@core/components/tag";

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
      context.editProfile(value)
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
                          formik.values?.imageFileName
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
              <div className="grid grid-cols-12 gap-4 bg-white rounded-[12px] p-6 mt-4 md:mt-6">
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[18px]">ชื่อผู้ใช้งาน</p>
                  <p className="mt-2 text-[20px] font-semibold">
                    {context.userDetail?.username}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[18px]">อีเมล *</p>
                  <div className="mt-2">
                    <TextBox
                      onChange={(e) => {
                        formik.setFieldTouched("email");
                        formik.setFieldValue("email", e.target.value);
                      }}
                      type="text"
                      value={formik.values?.email}
                      error={
                        formik.errors?.email && formik.touched?.email
                          ? formik.errors?.email
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[18px]">ระดับบัญชี</p>
                  <p className="mt-2 text-[20px] font-semibold">
                    {context.userDetail?.accountType === "admin"
                      ? "ผู้ดูแลระบบ"
                      : "ผู้ใช้ทั่วไป"}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-[12px] py-6 grid grid-cols-12 gap-x-4 mt-4 md:mt-6">
                <div className="px-6 col-span-12 md:col-span-5 xl:col-span-4">
                  <p className="titleM">เลือกวัตถุดิบที่แพ้</p>
                  <div className="w-full mt-6">
                    <PrimaryButton
                      title="เลือกวัตถุดิบ"
                      onClick={() => {
                        const tempSelectedIngredients = _.cloneDeep(
                          formik.values?.allergy
                        );
                        ingredientSelectedModal.openModal(
                          () => {
                            formik.setFieldValue(
                              "allergy",
                              ingredientSelectedModal.selectedIngredients
                            );
                          },
                          () => {
                            ingredientSelectedModal.setValue(
                              "selectedIngredients",
                              tempSelectedIngredients
                            );
                          }
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="md:border-l md:border-gray-30 col-span-12 md:col-span-7 xl:col-span-8 pr-6 pl-6 md:pl-0 pt-6 md:pt-0">
                  <p className="bodyM pb-4 md:pl-6">วัตถุดิบที่เลือก</p>
                  <div className="md:pl-6 flex flex-wrap space-x-2 mr-2">
                    {_.size(formik.values?.allergy) > 0 && (
                      <>
                        {_.map(
                          formik.values?.allergy,
                          (ingredient, index) => (
                            <div
                              key={`${ingredient.name}_${index}`}
                              className="w-auto"
                            >
                              <Tag
                                label={ingredient.name}
                                onDeleteTag={() => handleRemoveTag(ingredient)}
                              />
                            </div>
                          )
                        )}
                      </>
                    )}
                    {_.size(formik.values?.allergy) === 0 && (
                      <p className="bodyM text-gray-50">
                        ไม่มีรายการวัตถุดิบที่เลือก
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-8 items-center">
                <div className="w-full md:w-[150px]">
                  <SecondaryButton
                    title="ยกเลิก"
                    onClick={() => {
                      if (formik.dirty) {
                        modal.openModal(
                          'ต้องการยกเลิกใช่ไหม ?',
                          'หากยกเลิก ระบบจะไม่บันทึกข้อมูลที่ได้ทำการเปลี่ยนแปลง',
                          () => {
                            modal.closeModal()
                            router.push('/me')
                            formik.resetForm()
                            setCover({
                              file: null,
                              original_filename: "",
                            })
                          },
                          'ไม่',
                          'ต้องการยกเลิก'
                        )
                      } else {
                        router.push('/me')
                        formik.resetForm()
                        setCover({
                          file: null,
                          original_filename: "",
                        })
                      }
                    }}
                  />
                </div>
                <div className="w-full md:w-[150px]">
                  <PrimaryButton
                    title={'บันทึก'}
                    onClick={() => formik.submitForm()}
                    disabled={!formik.dirty || !formik.isValid || context.editProfileLoading}
                    loading={context.editProfileLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </HomeLayout>
      )}
    </Observer>
  );
};

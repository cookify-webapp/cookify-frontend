import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { FlashMessageContext } from "core/context/flash_message_context";
import { ModalContext } from "core/context/modal_context";
import { readImageFile } from "core/utils/util_function";
import { useFormik } from "formik";
import { snapshotValidateSchema } from "../forms/snapshot_form";
import { SnapshotFormContext } from "../contexts/snapshot_form_context";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { TextAreaInput } from "@core/components/input/text_area_input";
const { publicRuntimeConfig } = getConfig();
import _ from "lodash";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import classNames from "classnames";
import { PrimaryButton } from "@core/components/button/primary_button";

export const SnapshotFormPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [cover, setCover] = useState({
    file: null,
    original_filename: "",
  });
  const [open, setOpen] = useState(false);

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const flashMessageContext = useContext(FlashMessageContext);
  const modal = useContext(ModalContext);
  const context = useContext(SnapshotFormContext);

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();
  const { snapshotId } = router.query;

  const isEdit = router.pathname.includes("/edit");

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => snapshotValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      if (isEdit) {
        if (
          context.snapshotDetail?.isHidden &&
          context.snapshotDetail?.remark
        ) {
          modal.openModal(
            "ยืนยันการแก้ไขเรื่องร้องเรียนหรือไม่",
            "ผู้ดูแลจะทำการตรวจสอบการแก้ไขของคุณตามเงื่อนไขข้อร้องเรียนที่ได้รับ คุณยืนยันการแก้ไขหรือไม่",
            () => context.editSnapshot(snapshotId, value),
            "ยกเลิก",
            "ยืนยัน"
          );
        } else if (!context.snapshotDetail?.isHidden) {
          context.editSnapshot(snapshotId, value);
        } else {
          context.editSnapshot(snapshotId, value);
        }
      } else {
        context.addSnapshot(value);
      }
    },
  });

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.setValue("router", router);
    context.setValue("flashMessageContext", flashMessageContext);
    context.setValue("formik", formik);
    context.prepareRecipesList();
    isEdit && context.prepareSnapshotDetail(snapshotId);
    return () => {
      setCover({
        file: null,
        original_filename: "",
      });
      setOpen(false);
      context.setValue("recipesList", []);
      context.setValue("searchWord", "");
      context.handleResetForm();
    };
  }, []);

  //------------------
  //  REF
  //------------------
  const imgRef: any = createRef();
  const ref: any = createRef();

  //  USE CLICK OUTSIDE
  //---------------------
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

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
      formik.setFieldValue("snapshotImage", file);
      formik.setFieldValue("imageFileName", file.name);
    }
  };

  //---------------------
  // Handler
  //---------------------
  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      context.setValue("recipesList", []);
      context.prepareRecipesList();
    }, 500),
    []
  );

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
            {!context.loading && (
              <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl pb-8">
                <h1 className="pt-8 lg:pt-2 headlineL">{`${
                  isEdit ? "แก้ไข" : "เพิ่ม"
                } Snapshot`}</h1>

                <div className="grid grid-cols-12 gap-4 mt-6">
                  <div className="col-span-12 lg:col-span-5 p-6 rounded-[12px] bg-white">
                    <h3 className="headlineM mb-5">เลือกรูปภาพ</h3>
                    <div className="w-[250px] h-[250px] rounded-[12px] border border-gray-30 mx-auto overflow-hidden">
                      {cover?.file || formik.values?.imageFileName ? (
                        <img
                          id="recipeImage"
                          src={cover?.file || formik.values?.imageFileName}
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
                  <div className="col-span-12 lg:col-span-7 p-6 rounded-[12px] bg-white">
                    <h3 className="headlineM mb-5">คำอธิบาย Snapshot</h3>
                    <TextAreaInput
                      onChange={(e) => {
                        formik.setFieldValue("caption", e.target.value);
                      }}
                      value={formik.values?.caption}
                      error={
                        formik.errors?.caption && formik.touched?.caption
                          ? formik.errors?.caption
                          : ""
                      }
                      placeholder="ใส่คำอธิบายที่นี่..."
                      height={300}
                    />
                  </div>
                </div>
                <div className="mt-6 bg-white rounded-[12px] p-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-7">
                      <h3 className="headlineM mb-5">เลือกสูตรอาหาร</h3>
                      <div className="relative">
                        <div
                          className="w-full md:w-[413px]"
                          ref={ref}
                          onClick={() => setOpen(true)}
                        >
                          <SearchBox
                            onChange={(value) => {
                              context.setValue("searchWord", value);
                              handlerSearchAuto();
                            }}
                            placeholder="ค้นหาชื่อสูตรอาหาร"
                            value={context.searchWord}
                            height="h-12"
                            isBorder
                          />
                        </div>
                        {open && !context.loadingRecipe && (
                          <div className="absolute z-10 w-full md:w-[413px] bg-white card-shadow mt-2 rounded-[12px] max-h-[200px] overflow-y-auto">
                            {_.map(context.recipesList, (recipe) => (
                              <p
                                key={`${recipe.name}`}
                                className={classNames(
                                  "flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] h-[40px] hover:bg-gray-20 p-3 sm:p-4",
                                  {
                                    "bg-gray-20":
                                      formik.values?.recipe?._id === recipe._id,
                                  }
                                )}
                                onClick={async () => {
                                  await formik.setFieldValue("recipe", recipe);
                                  context.setValue("searchWord", recipe.name);
                                  setOpen(false);
                                }}
                              >
                                {recipe.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                      <h3 className="headlineM mb-5">สูตรอาหารที่เลือก</h3>
                      {formik.values?.recipe && (
                        <div className="flex space-x-2 items-center py-[5px] px-3 max-w-max bg-beige-20 rounded-[5px]">
                          <i className="fas fa-book text-[14px] leading-[14px] text-brown-10 w-auto" />
                          <p className="line-clamp-1 w-auto">
                            {formik.values?.recipe?.name}
                          </p>
                        </div>
                      )}
                      {!formik.values?.recipe?.name && (
                        <p className="bodyM text-gray-50">
                          คุณยังไม่ได้เลือกสูตรอาหารอ้างอิง
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
                            "ต้องการยกเลิกใช่ไหม ?",
                            "หากยกเลิก ระบบจะไม่บันทึกข้อมูลที่ได้ทำการเปลี่ยนแปลง",
                            () => {
                              modal.closeModal();
                              router.back();
                              formik.resetForm();
                              setCover({
                                file: null,
                                original_filename: "",
                              });
                            },
                            "ไม่",
                            "ต้องการยกเลิก"
                          );
                        } else {
                          router.back();
                          context.handleResetForm();
                          setCover({
                            file: null,
                            original_filename: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="w-full md:w-[150px]">
                    <PrimaryButton
                      title={isEdit ? "บันทึก" : "เพิ่ม"}
                      onClick={() => formik.submitForm()}
                      disabled={!formik.dirty || !formik.isValid}
                      loading={context.loadingAddEdit}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

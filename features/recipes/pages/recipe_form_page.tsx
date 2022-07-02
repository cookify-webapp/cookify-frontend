import React, {
  createRef,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
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
import _ from "lodash";
import {
  IngredientSelectionModalContext,
  SubIngredientSelectionModalContext,
} from "core/context/ingredient_selection_modal_context";
import { Ingredient } from "@core/components/ingredient";
import { ingredientType } from "../types/recipes";
import { SecondaryMiniButton } from "@core/components/button/secondary_mini_button";
import { PrimaryButton } from "@core/components/button/primary_button";
const { publicRuntimeConfig } = getConfig();

export const RecipeFormPage = () => {
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
  const context = useContext(RecipeFormContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modal = useContext(ModalContext);
  const mainIngredientSelectedModal = useContext(
    IngredientSelectionModalContext
  );
  const subIngredientSelectedModal = useContext(
    SubIngredientSelectionModalContext
  );

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.prepareCookingMethods();

    return () => {
      formik.resetForm();
      setCover({
        file: null,
        original_filename: "",
      })
      context.setValue("selectedMainIngredient", []);
      context.setValue("selectedSubIngredient", []);
      mainIngredientSelectedModal.setValue("selectedIngredients", []);
      subIngredientSelectedModal.setValue("selectedIngredients", []);
    };
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
      isEdit
        ? null
        : context.addRecipe(value);
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
      });
      formik.setFieldValue("recipeImage", file);
      formik.setFieldValue("imageFileName", file.name);
    }
  };

  const handleRemoveMainIngredient = async (ingredient, index) => {
    let tempSelectedIngredients = _.cloneDeep(context.selectedMainIngredient);
    let filter = _.filter(tempSelectedIngredients, (item) => {
      return item.name !== ingredient.name;
    });
    let tempQuantity: [] = _.cloneDeep(formik?.values?.quantity);
    tempQuantity.splice(index, 1);
    await formik.setFieldValue("quantity", tempQuantity);
    context.setValue("selectedMainIngredient", filter);
    mainIngredientSelectedModal.setValue("selectedIngredients", filter);
    let ingredientsId = [];
    let unitsId = [];
    _.forEach(context.selectedMainIngredient, (ingredient: ingredientType) => {
      unitsId.push(ingredient?.unit?._id);
    });
    await formik.setFieldValue("ingredientsId", ingredientsId);
    await formik.setFieldValue("unitsId", unitsId);
  };

  const handleRemoveSubIngredient = (ingredient) => {
    let tempSelectedIngredients = _.cloneDeep(context.selectedSubIngredient);
    let filter = _.filter(tempSelectedIngredients, (item) => {
      return item.name !== ingredient.name;
    });
    context.setValue("selectedSubIngredient", filter);
    subIngredientSelectedModal.setValue("selectedIngredients", filter);
    let ingredientsId = [];
    _.forEach(context.selectedSubIngredient, (ingredient: ingredientType) => {
      ingredientsId.push(ingredient._id);
    });
    formik.setFieldValue("subIngredientsId", ingredientsId);
  };

  const handleRemoveStep = (index) => {
    let tempStep = _.cloneDeep(formik.values?.steps);
    tempStep.splice(index, 1);
    formik.setFieldValue("steps", tempStep);
  };

  const checkArrayLength = () => {
    return (
      formik.values?.ingredientsId.length === formik.values?.quantity.length
    );
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
                      error={
                        formik.errors?.desc && formik.touched?.desc
                          ? formik.errors?.desc
                          : ""
                      }
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-12 gap-x-4">
                    <div className="col-span-6 md:col-span-7 xl:col-span-8">
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
                    <div className="col-span-6 md:col-span-5 xl:col-span-4">
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
                    {cover?.file || formik.values?.imageFileName ? (
                      <img
                        id="recipeImage"
                        src={
                          cover?.file ||
                          `${publicRuntimeConfig.CKF_IMAGE_API}/recipes/${formik.values?.imageFileName}`
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
              <div className="mt-4 bg-white rounded-[12px] p-6">
                <h3 className="headlineM">วัตถุดิบ</h3>
                <div className="mt-4 grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7">
                    <p className="text-[18px]">วัตถุดิบหลัก *</p>
                    <div className="border border-gray-40 rounded-[12px] p-4 min-h-[100px] mt-2">
                      {_.size(context.selectedMainIngredient) === 0 && (
                        <p className="text-[18px] text-gray-50">
                          รายการวัตถุดิบที่เลือกจะแสดงที่นี่
                        </p>
                      )}
                      <div className="space-y-4">
                        {_.size(context.selectedMainIngredient) > 0 && (
                          <>
                            {_.map(
                              context.selectedMainIngredient,
                              (ingredient: ingredientType, index) => (
                                <div
                                  className="md:flex md:justify-between md:items-center md:space-x-8"
                                  key={`main_ingredient_${index}`}
                                >
                                  <div className="w-full md:w-1/2 flex-shrink-0">
                                    <Ingredient
                                      ingredient={ingredient}
                                      isBorder
                                    />
                                  </div>
                                  <div className="flex items-center space-x-4 mt-2 md:mt-0 justify-between">
                                    <div className="text-center w-auto flex space-x-4 items-center md:block md:items-baseline md:space-x-0 xl:flex xl:space-x-4 xl:items-center">
                                      <div className="w-[60px] md:w-[80px] text-center flex-shrink-0">
                                        <TextBox
                                          onChange={(e) => {
                                            formik.setFieldTouched("quantity");
                                            formik.setFieldValue(
                                              `quantity[${index}]`,
                                              parseInt(e.target.value)
                                            );
                                          }}
                                          type="number"
                                          value={formik.values?.quantity[index]}
                                        />
                                      </div>
                                      <p className="bodyM">
                                        {ingredient?.unit?.name}
                                      </p>
                                    </div>
                                    <div className="w-auto">
                                      <SecondaryMiniButton
                                        icon="fas fa-trash"
                                        onClick={() => {
                                          handleRemoveMainIngredient(
                                            ingredient,
                                            index
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="w-[125px]">
                        <SecondaryButton
                          title="เลือกวัตถุดิบ"
                          onClick={() => {
                            const tempSelectedIngredients = _.cloneDeep(
                              context.selectedMainIngredient
                            );
                            mainIngredientSelectedModal.openModal(
                              async () => {
                                context.setValue(
                                  "selectedMainIngredient",
                                  mainIngredientSelectedModal.selectedIngredients
                                );
                                let ingredientsId: string[] = [];
                                let unitsId: string[] = []
                                _.forEach(
                                  mainIngredientSelectedModal.selectedIngredients,
                                  (ingredient: ingredientType, index) => {
                                    formik.setFieldValue(
                                      `quantity[${index}]`,
                                      1
                                    );
                                    ingredientsId.push(ingredient._id);
                                    unitsId.push(ingredient.unit?._id)
                                  }
                                );
                                await formik.setFieldValue(
                                  "ingredientsId",
                                  ingredientsId
                                );
                                await formik.setFieldValue(
                                  "unitsId",
                                  unitsId
                                );
                              },
                              () => {
                                mainIngredientSelectedModal.setValue(
                                  "selectedIngredients",
                                  tempSelectedIngredients
                                );
                              }
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <p className="text-[18px]">วัตถุดิบที่สามารถทดแทนได้</p>
                    <div className="border border-gray-40 rounded-[12px] p-4 min-h-[100px] mt-2">
                      {_.size(context.selectedSubIngredient) === 0 && (
                        <p className="text-[18px] text-gray-50">
                          รายการวัตถุดิบที่เลือกจะแสดงที่นี่
                        </p>
                      )}
                      <div className="space-y-4">
                        {_.size(context.selectedSubIngredient) > 0 && (
                          <>
                            {_.map(
                              context.selectedSubIngredient,
                              (ingredient: ingredientType, index) => (
                                <div
                                  className="md:flex md:justify-between md:items-center md:space-x-4 xl:space-x-8"
                                  key={`sub_ingredient_${index}`}
                                >
                                  <div className="w-full md:w-[2/3]">
                                    <Ingredient
                                      ingredient={ingredient}
                                      isBorder
                                    />
                                  </div>
                                  <div className="w-full flex justify-center mt-2 md:w-auto md:block md:justify-start md:mt-0">
                                    <SecondaryMiniButton
                                      icon="fas fa-trash"
                                      onClick={() => {
                                        handleRemoveSubIngredient(ingredient);
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="w-[125px]">
                        <SecondaryButton
                          title="เลือกวัตถุดิบ"
                          onClick={() => {
                            const tempSelectedIngredients = _.cloneDeep(
                              context.selectedSubIngredient
                            );
                            subIngredientSelectedModal.openModal(
                              async () => {
                                context.setValue(
                                  "selectedSubIngredient",
                                  subIngredientSelectedModal.selectedIngredients
                                );
                                let ingredientsId: string[] = [];
                                _.forEach(
                                  subIngredientSelectedModal.selectedIngredients,
                                  (ingredient: ingredientType, index) => {
                                    ingredientsId.push(ingredient._id);
                                  }
                                );
                                await formik.setFieldValue(
                                  "subIngredientsId",
                                  ingredientsId
                                );
                              },
                              () => {
                                subIngredientSelectedModal.setValue(
                                  "selectedIngredients",
                                  tempSelectedIngredients
                                );
                              }
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-white rounded-[12px] p-6">
                <h3 className="headlineM">ขั้นตอนการประกอบอาหาร</h3>
                <p className="text-[18px] mt-4">วิธีการประกอบอาหาร *</p>
                <div className="grid grid-cols-12 gap-4 mt-4">
                  {_.map(formik.values?.steps, (step, index) => (
                    <Fragment key={`step_${index}`}>
                      <div className="col-span-1 flex justify-center">{`${index + 1}.`}</div>
                      <div className="col-span-9 md:col-span-10">
                        <TextAreaInput
                          onChange={(e) => {
                            formik.setFieldValue(
                              `steps[${index}]`,
                              e.target.value
                            );
                          }}
                          value={step}
                          height={50}
                        />
                      </div>
                      {_.size(formik.values?.steps) !== 1 && (
                        <div className="col-span-2 md:col-span-1 flex justify-center">
                          <SecondaryMiniButton
                            icon="fas fa-trash"
                            onClick={() => {
                              handleRemoveStep(index);
                            }}
                          />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="mt-6 w-[125px]">
                  <SecondaryButton
                    title="เพิ่มขั้นตอน"
                    onClick={() => {
                      formik.setFieldValue(`steps[${_.size(formik.values?.steps)}]`, "")
                    }}
                  />
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
                            router.push('/recipes')
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
                        router.push('/recipes')
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
                    title={isEdit ? 'บันทึก': 'เพิ่ม'}
                    onClick={() => formik.submitForm()}
                    disabled={!formik.dirty || (!formik.isValid && checkArrayLength())}
                    loading={context.isAddEditRecipe}
                  />
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

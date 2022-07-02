import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { RegisterContext } from "../context/register_context";
import { FormikContextType } from "formik";
import { RadioInput } from "@core/components/input/radio_input";
import { PrimaryButton } from "@core/components/button/primary_button";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";
import _ from "lodash";
import { Tag } from "@core/components/tag";
import { SecondaryButton } from "@core/components/button/secondary_button";

export interface FormStep2Props {
  formik: FormikContextType<any>;
}

export const RegisterFormStep2 = ({ formik }: FormStep2Props) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RegisterContext);
  const ingredientSelectionModalContext = useContext(
    IngredientSelectionModalContext
  );

  useEffect(() => {
    return () => {
      ingredientSelectionModalContext.setValue("searchWord", "");
      ingredientSelectionModalContext.setValue("activeTab", "เนื้อสัตว์");
      ingredientSelectionModalContext.setValue("selectedIngredients", []);
    };
  }, []);

  //---------------------
  // HANDLER
  //---------------------
  const handleRemoveTag = (ingredient) => {
    let tempSelectedIngredients = _.cloneDeep(formik.values?.ingredients);
    let filter = _.filter(tempSelectedIngredients, (item) => {
      return item.name !== ingredient.name;
    });
    formik.setFieldValue("ingredients", filter);
    ingredientSelectionModalContext.setValue("selectedIngredients", filter);
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div>
          <p className="headlineM">คุณมีอาการแพ้อาหารบางชนิดหรือไม่ *</p>
          <div className="space-y-6 mt-4">
            <RadioInput
              label="ไม่มีอาการแพ้ใด ๆ"
              checked={formik.values.isAllergic === false}
              onClick={() => formik.setFieldValue("isAllergic", false)}
            />
            <RadioInput
              label="มีอาการแพ้อาหารบางชนิด"
              checked={formik.values.isAllergic}
              onClick={() => formik.setFieldValue("isAllergic", true)}
            />
          </div>
          {formik.values.isAllergic && (
            <div className="mt-6">
              <p className="titleM">
                กรุณาระบุวัตถุดิบของอาหารที่คุณไม่สามารถรับประทานได้ *
              </p>
              <p className="text-[14px] text-gray-50 mt-2">
                ระบบจะนำข้อมูลไปใช้กรองผลลัพธ์การค้นหาสูตรอาหาร
                <br />
                (ข้อมูลสามารถปรับเปลี่ยนได้ในภายหลัง)
              </p>
              <div className="w-full lg:w-[300px] mt-6">
                <PrimaryButton
                  title="เลือกวัตถุดิบ"
                  onClick={() => {
                    const tempSelectedIngredients = _.cloneDeep(
                      formik.values?.ingredients
                    );
                    ingredientSelectionModalContext.openModal(
                      () => {
                        formik.setFieldValue(
                          "ingredients",
                          ingredientSelectionModalContext.selectedIngredients
                        );
                      },
                      () => {
                        ingredientSelectionModalContext.setValue(
                          "selectedIngredients",
                          tempSelectedIngredients
                        );
                      }
                    );
                  }}
                />
              </div>
              <div className="mt-4">
                <p className="titleS">รายการวัตถุดิบที่เลือก *</p>
                <div className="flex flex-wrap">
                  {_.size(formik.values?.ingredients) > 0 && (
                    <>
                      {_.map(
                        formik.values?.ingredients,
                        (ingredient, index) => (
                          <div
                            key={`${ingredient.name}_${index}`}
                            className="w-auto mr-2 mt-2"
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
                  {_.size(formik.values?.ingredients) === 0 && (
                    <p className="bodyM mt-2">ไม่มีรายการวัตถุดิบที่เลือก</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="mt-8 flex space-x-4 w-full lg:w-[300px]">
            <SecondaryButton
              onClick={() => {
                formik.setFieldValue("stepForm", 1);
                context.setValue("stepForm", 1);
              }}
              title="ย้อนกลับ"
            />
            <PrimaryButton
              onClick={() => formik.submitForm()}
              title="ลงทะเบียน"
              disabled={!formik.dirty || !formik.isValid}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

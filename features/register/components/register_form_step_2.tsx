import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { RegisterContext } from "../context/register_context";
import { FormikContextType } from "formik";
import { RadioInput } from "@core/components/input/radio_input";
import { PrimaryButton } from "@core/components/button/primary_button";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";

export interface FormStep2Props {
  formik: FormikContextType<any>;
}

export const RegisterFormStep2 = ({formik}: FormStep2Props) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RegisterContext)
  const ingredientSelectionModalContext = useContext(IngredientSelectionModalContext)

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div>
          <p className="headlineM">คุณมีอาการแพ้อาหารบางชนิดหรือไม่ *</p>
          <div className="space-y-6 mt-4">
            <RadioInput label="ไม่มีอาการแพ้ใด ๆ" checked={context.isAllergic === false} onClick={() => context.setValue('isAllergic', false)} />
            <RadioInput label="มีอาการแพ้อาหารบางชนิด" checked={context.isAllergic} onClick={() => context.setValue('isAllergic', true)} />
          </div>
          {
            context.isAllergic && (
              <div className="mt-6">
                <p className="titleM">กรุณาระบุวัตถุดิบของอาหารที่คุณไม่สามารถรับประทานได้ *</p>
                <p className="text-[14px] text-gray-50 mt-2">ระบบจะนำข้อมูลไปใช้กรองผลลัพธ์การค้นหาสูตรอาหาร<br/>(ข้อมูลสามารถปรับเปลี่ยนได้ในภายหลัง)</p>
                <div className="w-[300px] mt-6">
                  <PrimaryButton title="เลือกวัตถุดิบ" onClick={() => ingredientSelectionModalContext.openModal(true, formik)} />
                </div>
              </div>
            )
          }
        </div>
      )}
    </Observer>
  );
};

import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { RegisterContext } from "../context/register_context";
import { TextBox } from "@core/components/input/text_box";
import { FormikContextType } from "formik";

export interface FormStep1Props {
  formik: FormikContextType<any>;
}

export const RegisterFormStep1 = ({ formik }: FormStep1Props) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RegisterContext);

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
          <h1 className="headlineXL text-black">
            ยินดีต้อนรับสู่ <span className="text-brown-10 headlineXL">COOKIFY</span>
          </h1>
          <p className="mt-2 text-gray-50">
            เว็บแอปพลิเคชันสำหรับค้นหาสูตรอาหารตามวัตถุดิบที่คุณต้องการ
          </p>
          <div className="mt-8">
            <TextBox
              label="ชื่อผู้ใช้งาน *"
              onChange={(e) => formik.setFieldValue("username", e.target.value)}
              type="text"
              touched={formik.touched}
              value={formik.values?.username}
              error={formik.errors?.username}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

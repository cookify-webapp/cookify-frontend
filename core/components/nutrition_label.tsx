import React from "react";
import { Observer } from "mobx-react-lite";
import { nutritionLabelType } from "core/types/core_components_type";

export const NutritionLabel = ({
  nutrition,
  type,
  unit,
}: nutritionLabelType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-full bg-white rounded-[12px] card-shadow p-6">
          <div className="sm:flex justify-between items-center">
            <h3 className="headlineM">ข้อมูลทางโภชนาการ</h3>
            <img
              src="/images/core/Edamam_Badge_White.svg"
              alt="Edamam's Badge"
              className="w-[120px] md:w-[150px] mt-2 sm:mt-0"
            />
          </div>
          <div className="mt-4 md:flex bodyS">
            <div className="flex w-auto">
              <p className="font-medium w-auto">หน่วยบริโภค</p>
              {type === "recipe" && <p className="w-auto ml-4">1 จาน</p>}
              {type === "ingredient" && (
                <>
                  {unit === "gram" && (
                    <p className="w-auto ml-4">100 กรัม</p>
                  )}
                  {unit === "milliliter" && (
                    <p className="w-auto ml-4">10 มิลลิลิตร</p>
                  )}
                  {unit === "tablespoon" && (
                    <p className="w-auto ml-4">1 ช้อนโต๊ะ</p>
                  )}
                  {unit === "teaspoon" && (
                    <p className="w-auto ml-4">1 ช้อนชา</p>
                  )}
                  {unit === "cup" && (
                    <p className="w-auto ml-4">1 ถ้วย</p>
                  )}
                  {unit === "piece" && (
                    <p className="w-auto ml-4">1 ชิ้น/กลีบ/อัน</p>
                  )}
                  {unit === "whole" && (
                    <p className="w-auto ml-4">1 ลูก/ผล/ตัว/ฟอง</p>
                  )}
                </>
              )}
            </div>
            <div className="flex md:ml-8 w-auto mt-2 md:mt-0">
              <p className="font-medium w-auto shrink-0">พลังงานทั้งหมด</p>
              <p className="ml-4 w-auto">
                {`${nutrition.calories} กิโลแคลอรี`}
                <br className="sm:hidden" />
                {` (พลังงานจากไขมัน ${nutrition.totalNutrientsKCal.FAT_KCAL.quantity} กิโลแคลอรี)`}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-12 md:gap-x-8 bodyS">
            <div className="col-span-12 md:col-span-6">
              <p className="font-medium">
                คุณค่าทางโภชนาการต่อหนึ่งหน่วยบริโภค
              </p>
              <div className="mt-2 border-t-8 border-brown-20 pb-2"></div>
              <p className="font-medium text-right">
                ร้อยละของปริมาณที่แนะนำต่อวัน *
              </p>
              <div className="mt-2">
                <div className="font-medium flex justify-between">
                  <div className="flex">
                    <p className="w-auto shrink-0 md:shrink">ไขมันทั้งหมด</p>
                    <p className="ml-4 w-auto shrink-0 md:shrink">{`${
                      Math.round(nutrition.totalNutrients.FAT.quantity * 10) /
                      10
                    } กรัม`}</p>
                  </div>
                  <p className="text-right">{`${Math.round(
                    nutrition.totalDaily.FAT.quantity
                  )} %`}</p>
                </div>
                <div className="pl-[18px] mt-2">
                  <div className="flex justify-between">
                    <div className="flex">
                      <p className="w-auto">ไขมันอิ่มตัว</p>
                      <p className="ml-4 w-auto">{`${
                        Math.round(
                          nutrition.totalNutrients.FASAT.quantity * 10
                        ) / 10
                      } กรัม`}</p>
                    </div>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.FASAT.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex mt-2">
                    <p className="w-auto">ไขมันไม่อิ่มตัวเชิงเดี่ยว</p>
                    <p className="ml-4 w-auto">{`${
                      Math.round(nutrition.totalNutrients.FAMS.quantity * 10) /
                      10
                    } กรัม`}</p>
                  </div>
                  <div className="flex mt-2">
                    <p className="w-auto">ไขมันไม่อิ่มตัวเชิงซ้อน</p>
                    <p className="ml-4 w-auto">{`${
                      Math.round(nutrition.totalNutrients.FAPU.quantity * 10) /
                      10
                    } กรัม`}</p>
                  </div>
                </div>
              </div>
              <div className="font-medium flex justify-between mt-2">
                <div className="flex">
                  <p className="w-auto shrink-0 md:shrink">คอเรสเตอรอล</p>
                  <p className="ml-4 w-auto shrink-0 md:shrink">{`${
                    Math.round(nutrition.totalNutrients.CHOLE.quantity * 10) /
                    10
                  } มิลลิกรัม`}</p>
                </div>
                <p className="text-right">{`${Math.round(
                  nutrition.totalDaily.CHOLE.quantity
                )} %`}</p>
              </div>
              <div className="font-medium flex justify-between mt-2">
                <div className="flex">
                  <p className="w-auto">โซเดียม</p>
                  <p className="ml-4 w-auto">{`${
                    Math.round(nutrition.totalNutrients.NA.quantity * 10) / 10
                  } มิลลิกรัม`}</p>
                </div>
                <p className="text-right">{`${Math.round(
                  nutrition.totalDaily.NA.quantity
                )} %`}</p>
              </div>
              <div className="mt-2">
                <div className="font-medium flex justify-between">
                  <div className="flex">
                    <p className="w-auto shrink-0 md:shrink">คาร์โบไฮเดรต</p>
                    <p className="ml-4 w-auto shrink-0 md:shrink">{`${
                      Math.round(
                        nutrition.totalNutrients.CHOCDF.quantity * 10
                      ) / 10
                    } กรัม`}</p>
                  </div>
                  <p className="text-right">{`${Math.round(
                    nutrition.totalDaily.CHOCDF.quantity
                  )} %`}</p>
                </div>
                <div className="mt-2 pl-[18px]">
                  <div className="flex justify-between">
                    <div className="flex">
                      <p className="w-auto">ใยอาหาร</p>
                      <p className="ml-4 w-auto">{`${
                        Math.round(
                          nutrition.totalNutrients.FIBTG.quantity * 10
                        ) / 10
                      } กรัม`}</p>
                    </div>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.FIBTG.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex mt-2">
                    <p className="w-auto">น้ำตาล</p>
                    <p className="ml-4 w-auto">{`${
                      Math.round(nutrition.totalNutrients.SUGAR.quantity * 10) /
                      10
                    } กรัม`}</p>
                  </div>
                </div>
              </div>
              <div className="font-medium flex justify-between mt-2">
                <div className="flex">
                  <p className="w-auto">โปรตีน</p>
                  <p className="ml-4 w-auto">{`${
                    Math.round(nutrition.totalNutrients.PROCNT.quantity * 10) /
                    10
                  } กรัม`}</p>
                </div>
                <p className="text-right">{`${Math.round(
                  nutrition.totalDaily.PROCNT.quantity
                )} %`}</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 bodyS mt-2 md:mt-0">
              <p className="font-medium text-center">
                ร้อยละของปริมาณที่แนะนำต่อวัน *
              </p>
              <div className="mt-2 border-t-8 border-brown-20 pb-2"></div>
              <div className="grid grid-cols-12 gap-x-4">
                <div className="col-span-6">
                  <div className="flex justify-between">
                    <p>วิตามินบี 1</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.THIA.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินบี 2</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.RIBF.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินบี 3</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.NIA.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินบี 6</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.VITB6A.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินบี 9</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.FOLDFE.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินบี 12</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.VITB12.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินซี</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.VITC.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินดี</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.VITD.quantity
                    )} %`}</p>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex justify-between">
                    <p>วิตามินอี</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.TOCPHA.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>วิตามินเค</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.VITK1.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>แคลเซียม</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.CA.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>แมกนีเซียม</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.MG.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>โพแทสเซียม</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.K.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>เหล็ก</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.FE.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>ซิงค์</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.ZN.quantity
                    )} %`}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>ฟอสฟอรัส</p>
                    <p className="text-right">{`${Math.round(
                      nutrition.totalDaily.P.quantity
                    )} %`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 border-t border-black pb-4"></div>
          <p className="bodyS">* ร้อยละของปริมาณที่แนะนำต่อวันคิดจากความต้องการพลังงานวันละ 2,000 กิโลแคลอรี่</p>
        </div>
      )}
    </Observer>
  );
};

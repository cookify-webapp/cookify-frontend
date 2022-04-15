import React, { useCallback, useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";
import classNames from "classnames";
import { SearchBox } from "../input/search_box";
import _ from "lodash";
import { TabFilter } from "../tab_filter";
import { CheckboxInput } from "../input/checkbox";
import { Ingredient } from "../ingredient";
import { Tag } from "../tag";
import { SecondaryButton } from "../button/secondary_button";
import { PrimaryButton } from "../button/primary_button";

export const IngredientsSelectionModal = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(IngredientSelectionModalContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.prepareIngredient();

    return () => {
      context.setValue("searchWord", "");
    };
  }, []);

  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      console.log("");
    }, 500),
    []
  );

  const checkIsCheckedAll = () => {
    let checked = false;
    _.forEach(context.formik?.values?.allergic, (ingredient) => {
      if (context.activeTab === ingredient) {
        checked = true;
      }
    });
    return checked;
  };

  const handleIsCheckedAll = () => {
    console.log();
  };

  const handleIsCheckIngredient = () => {
    console.log();
  };

  const handleRemoveTag = () => {
    console.log();
  };

  //---------------------
  // VARIABLE
  //---------------------
  const tabs = [
    "เนื้อสัตว์",
    "ปลาและอาหารทะเล",
    "ผักและผลไม้",
    "สมุนไพรและเครื่องเทศ",
    "ไข่และผลิตภัณฑ์จากนม",
    "ผลิตภัณฑ์ที่ทำจากแป้ง",
    "ถั่วและธัญพืช",
    "เครื่องปรุงอาหาร",
  ];

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            "top-0 left-0 z-[100] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 px-5 md:px-0",
            { hidden: !context.isOpen },
            { fixed: context.isOpen }
          )}
        >
          <div className="bg-white rounded-[12px] w-full md:w-[706px] xl:w-[1164px] card-shadow py-6">
            <div className="px-6">
              <h3 className="headlineM">เลือกวัตถุดิบ</h3>
              <div className="mt-3 w-full xl:w-[575px]">
                <SearchBox
                  placeholder="ค้นหาชื่อวัตถุดิบ"
                  value={context.searchWord}
                  onChange={(value) => {
                    context.setValue("searchWord", value);
                    context.setValue("isShowClearValue", true);
                    handlerSearchAuto();
                  }}
                  isShowClearValue={context.isShowClearValue}
                  isBorder
                />
              </div>
              <div className="overflow-x-scroll scrollbar-hide mt-4 px-[6px]">
                <TabFilter
                  activeTab={context.activeTab}
                  tabs={tabs}
                  onClick={(value) => {
                    context.setValue("activeTab", value);
                    context.prepareIngredient();
                  }}
                />
              </div>
              <div className="border-t-[1px] border-gray-30 pb-4" />
              {(context.hasIsCheckedAll && _.size(context.ingredients) !== 0) && (
                <div className="flex items-center">
                  <CheckboxInput
                    checkValue={context.activeTab}
                    checked={checkIsCheckedAll()}
                    name={context.checkAllValue}
                    onChange={() => handleIsCheckedAll()}
                  />
                  <label htmlFor={context.activeTab} className="bodyM ml-4">
                    ทั้งหมด
                  </label>
                </div>
              )}
              <div
                className={classNames(
                  "my-4 h-[250px]",
                  {
                    "grid grid-cols-12 gap-4 overflow-y-auto":
                      _.size(context.ingredients) !== 0,
                  },
                  {
                    "flex items-center text-center":
                      _.size(context.ingredients) === 0,
                  }
                )}
              >
                {_.size(context.ingredients) !== 0 && (
                  <>
                    {_.map(context.ingredients, (ingredient, index) => (
                      <div
                        className="col-span-12 md:col-span-6 xl:col-span-3"
                        key={`${ingredient.name}_${index}`}
                      >
                        <Ingredient
                          ingredient={ingredient}
                          isBorder
                          isChecked={_.includes(
                            context.formik?.values?.allergic,
                            ingredient
                          )}
                          hasCheckbox
                          onChange={() => handleIsCheckIngredient()}
                        />
                      </div>
                    ))}
                  </>
                )}
                {_.size(context.ingredients) === 0 && (
                  <div className="text-gray-50">
                    <i className="fas fa-egg text-[48px] w-12 h-12"></i>
                    <p className="titleM mt-4">ไม่มีรายการวัตถุดิบ</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t-[1px] border-gray-30 pb-4" />
            <div className="px-6">
              <p className="titleS">รายการวัตถุดิบที่เลือก *</p>
              <div className="mt-2 flex flex-wrap space-x-[8px] space-y-[8px]">
                {context.formik?.values?.allergic && (
                  <>
                    {_.map(
                      context.formik?.values?.allergic,
                      (ingredient, index) => (
                        <Tag
                          label={ingredient.name}
                          onDeleteTag={() => handleRemoveTag()}
                          key={`${ingredient.name}_${index}`}
                        />
                      )
                    )}
                  </>
                )}
                {
                  !context.formik?.values?.allergic && (
                    <p className="bodyM">ไม่มีรายการวัตถุดิบที่เลือก</p>
                  )
                }
              </div>
              <div className="flex xl:justify-end space-x-[16px] mt-6">
                <div className="w-full xl:w-[142px]">
                  <SecondaryButton title="ยกเลิก" onClick={() => context.closeModal(true)} />
                </div>
                <div className="w-full xl:w-[142px]">
                  <PrimaryButton title="ยืนยัน" onClick={() => context.closeModal(false)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

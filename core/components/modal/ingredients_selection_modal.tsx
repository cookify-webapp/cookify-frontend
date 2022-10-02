import React, { useCallback, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";
import classNames from "classnames";
import { SearchBox } from "../input/search_box";
import _ from "lodash";
import { TabFilter } from "../tab_filter";
import { Ingredient } from "../ingredient";
import { Tag } from "../tag";
import { SecondaryButton } from "../button/secondary_button";
import { PrimaryButton } from "../button/primary_button";
import { ModalContext } from "core/context/modal_context";
import InfiniteScroll from "react-infinite-scroll-component";

export const IngredientsSelectionModal = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(IngredientSelectionModalContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modalContext", modalContext);
    context.prepareIngredientTypes()

    return () => {
      context.setValue("searchWord", "");
      context.setValue("activeTab", "เนื้อสัตว์");
      context.setValue("typeSelected", context.ingredientTypes[0].value)
      context.setValue("selectedIngredients", []);
      context.setValue("ingredients", []);
      context.setValue("itemsToShow", []);
      context.setValue("page", 1);
    };
  }, []);

  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      if (context.searchWord === "") {
        setHasMore(true);
      }
      context.setValue("page", 1);
      context.setValue("ingredientsList", []);
      context.setValue("itemsToShow", []);
      context.prepareIngredient();
    }, 500),
    []
  );

  //---------------------
  // HANDLER
  //---------------------
  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareIngredient();
    if (context.page === context.totalPages) {
      setHasMore(false);
    }
  };

  const checkIsChecked = (ingredient) => {
    let isChecked = false;
    _.forEach(context.selectedIngredients, (item) => {
      if (item.name === ingredient.name) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  const handleIsCheckIngredient = (ingredient) => {
    let ingredientIsChecked = checkIsChecked(ingredient);
    let tempSelectedIngredients = context.selectedIngredients;
    if (ingredientIsChecked) {
      let filter = _.filter(tempSelectedIngredients, (item) => {
        return item.name !== ingredient.name;
      });
      context.setValue("selectedIngredients", filter);
    } else {
      tempSelectedIngredients.push(ingredient);
      context.setValue("selectedIngredients", tempSelectedIngredients);
    }
  };

  const handleRemoveTag = (ingredient) => {
    let tempSelectedIngredients = context.selectedIngredients;
    let filter = _.filter(tempSelectedIngredients, (item) => {
      return item.name !== ingredient.name;
    });
    context.setValue("selectedIngredients", filter);
  };

  //---------------------
  // VARIABLE
  //---------------------
  const tabs = [
    "เนื้อสัตว์",
    "ปลาและอาหารทะเล",
    "ผักและผลไม้",
    "อาหารแปรรูป",
    "ไข่และผลิตภัณฑ์จากนม",
    "ผลิตภัณฑ์จากแป้ง",
    "ข้าว ถั่วและธัญพืช",
    "เครื่องปรุงอาหาร",
  ];

  const handleTypeSelected = () => {
    _.forEach(context.ingredientTypes, (type) => {
      if (context.activeTab === type.name) {
        context.setValue('typeSelected', type.value)
      }
    })
  };

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
          <div className="bg-white rounded-[12px] w-full md:w-[706px] xl:w-[1164px] card-shadow py-6 animate-fade-in">
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
                  height="h-[48px]"
                  isShowClearValue={context.isShowClearValue}
                  isBorder
                />
              </div>
              <div className="overflow-x-scroll scrollbar-hide mt-4 px-[6px]">
                <TabFilter
                  activeTab={context.activeTab}
                  tabs={tabs}
                  onClick={(value) => {
                    setHasMore(true)
                    context.setValue("activeTab", value);
                    context.setValue("itemsToShow", [])
                    context.setValue("page", 1)
                    handleTypeSelected()
                    context.prepareIngredient();
                  }}
                />
              </div>
              <div className="border-t-[1px] border-gray-30 pb-4" />
              <div id="scrollableDiv" className="h-[250px] max-h-[250px] overflow-y-auto scrollbar-hide lg:scrollbar-default">
                <InfiniteScroll
                  dataLength={context.itemsToShow.length}
                  next={preparation}
                  hasMore={hasMore}
                  loader=""
                  scrollableTarget="scrollableDiv"
                >
                  <div
                    className={classNames(
                      "mb-4",
                      {
                        "grid grid-cols-12 gap-4":
                          _.size(context.itemsToShow) !== 0,
                      },
                      {
                        "flex items-center text-center h-[250px]":
                          _.size(context.itemsToShow) === 0,
                      }
                    )}
                  >
                    {_.size(context.itemsToShow) !== 0 && (
                      <>
                        {_.map(context.itemsToShow, (ingredient, index) => (
                          <div
                            className="col-span-12 md:col-span-6 xl:col-span-3"
                            key={`${ingredient.name}_${index}`}
                          >
                            <Ingredient
                              ingredient={ingredient}
                              isBorder
                              isChecked={checkIsChecked(ingredient)}
                              hasCheckbox
                              onChange={() =>
                                handleIsCheckIngredient(ingredient)
                              }
                            />
                          </div>
                        ))}
                      </>
                    )}
                    {(_.size(context.itemsToShow) === 0 && !context.loading) && (
                      <div className="text-gray-50">
                        <i className="fas fa-egg text-[48px] w-12 h-12"></i>
                        <p className="titleM mt-4">ไม่มีรายการวัตถุดิบ</p>
                      </div>
                    )}
                    {
                      context.loading && (
                        <div className="flex justify-center">
                          <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin text-gray-50"></i>
                        </div>
                      )
                    }
                  </div>
                </InfiniteScroll>
              </div>
            </div>
            <div className="border-t-[1px] border-gray-30 pb-4" />
            <div className="px-6">
              <p className="titleS">รายการวัตถุดิบที่เลือก *</p>
              <div className="flex flex-wrap">
                {_.size(context.selectedIngredients) > 0 && (
                  <>
                    {_.map(context.selectedIngredients, (ingredient, index) => (
                      <div
                        key={`${ingredient.name}_${index}`}
                        className="w-auto mr-2 mt-2"
                      >
                        <Tag
                          label={ingredient.name}
                          onDeleteTag={() => handleRemoveTag(ingredient)}
                        />
                      </div>
                    ))}
                  </>
                )}
                {_.size(context.selectedIngredients) === 0 && (
                  <p className="bodyM mt-2">ไม่มีรายการวัตถุดิบที่เลือก</p>
                )}
              </div>
              <div className="flex xl:justify-end space-x-[16px] mt-6">
                <div className="w-full xl:w-[142px]">
                  <SecondaryButton
                    title="ยกเลิก"
                    onClick={() => {
                      context.onCancel();
                      context.closeModal();
                    }}
                  />
                </div>
                <div className="w-full xl:w-[142px]">
                  <PrimaryButton
                    title="ยืนยัน"
                    onClick={() => {
                      context.onSubmit();
                      context.closeModal();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

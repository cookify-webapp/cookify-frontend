import React, { useCallback, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { RecipesListContext } from "../contexts/recipes_list_context";
import _ from "lodash";
import { HomeLayoutContext } from "core/context/home_layout_context";
import classNames from "classnames";
import { ModalContext } from "core/context/modal_context";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";
import { PrimaryButton } from "@core/components/button/primary_button";
import { Tag } from "@core/components/tag";

export const RecipesListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipesListContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modal = useContext(ModalContext);
  const ingredientSelectionModalContext = useContext(
    IngredientSelectionModalContext
  );

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("searchWord", homeLayoutContext.searchWord);
    context.setValue("modal", modal);
    context.prepareCookingMethods();
  }, []);

  //---------------------
  // Handler
  //---------------------
  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      if (context.searchWord === "") {
        setHasMore(true);
      }
      // context.setValue("page", 1);
      // context.setValue("ingredientsList", []);
      // context.setValue("itemsToShow", []);
      // context.prepareIngredientsList();
    }, 500),
    []
  );

  const handleRemoveTag = (ingredient) => {
    let tempSelectedIngredients = _.cloneDeep(context.selectedIngredients);
    let filter = _.filter(tempSelectedIngredients, (item) => {
      return item.name !== ingredient.name;
    });
    context.setValue('selectedIngredients', filter)
    ingredientSelectionModalContext.setValue("selectedIngredients", filter);
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout
          onClickSearch={() => {
            context.setValue("searchWord", homeLayoutContext.searchWord);
            // context.prepare
          }}
        >
          <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl">
            <div className="px-5 w-full block xl:hidden mt-2">
              <SearchBox
                onChange={(value) => {
                  context.setValue("searchWord", value);
                  context.setValue("isShowClearValue", true);
                  handlerSearchAuto();
                }}
                height="h-16"
                placeholder="ค้นหาสูตรอาหารได้ที่นี่"
                value={context.searchWord}
                isButton
                buttonOnClick={() => {
                  // context.prepare
                }}
              />
            </div>
            <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl">
              <h1 className="px-5 2xl:px-0 pt-8 lg:pt-2 headlineL">
                ประเภทอาหาร
              </h1>
            </div>
            {context.isMethodLoaded ? (
              <div className="px-5 mx-auto xl:max-w-6xl 2xl:max-w-7xl flex space-x-[16px] scrollbar-hide md:space-x-0 overflow-x-auto md:grid md:grid-cols-12 md:gap-4 mt-6">
                {_.map(context.cookingMethods, (method, index) => (
                  <div
                    className={classNames(
                      "w-[119px] h-[50px] text-white text-center flex items-center cursor-pointer rounded-[12px] shrink-0 md:shrink md:w-full md:col-span-2",
                      {
                        "border-4 border-black":
                          method.value === context.selectedCookingMethod,
                      }
                    )}
                    style={{
                      background: `url(${method.image}) no-repeat center`,
                      backgroundSize: "cover",
                    }}
                    key={`method_${index}`}
                    onClick={() => {
                      context.setValue("selectedCookingMethod", method.value);
                      //context.prepare
                    }}
                  >
                    <p className="headlineM">{method.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl">
                <i className="w-6 h-6 mt-6 text-center lg:mx-0 text-[24px] leading-6 fas fa-circle-notch fa-spin"></i>
              </div>
            )}
          </div>
          <div className="px-5 mx-auto xl:max-w-6xl 2xl:max-w-7xl mt-6">
            <div className="bg-white rounded-[12px] py-6 grid grid-cols-12 gap-x-4">
              <div className="px-6 col-span-12 md:col-span-5 xl:col-span-4">
                <p className="titleM">ค้นหาสูตรอาหารจากวัตถุดิบ</p>
                <div className="w-full mt-6">
                  <PrimaryButton
                    title="เลือกวัตถุดิบ"
                    onClick={() => {
                      const tempSelectedIngredients = _.cloneDeep(
                        context.selectedIngredients
                      );
                      ingredientSelectionModalContext.openModal(
                        () => {
                          context.setValue(
                            "selectedIngredients",
                            ingredientSelectionModalContext.selectedIngredients
                          );
                          //context.prepare
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
              </div>
              <div className="md:border-l md:border-gray-30 col-span-12 md:col-span-7 xl:col-span-8 pr-6 pl-6 md:pl-0 pt-6 md:pt-0">
                <p className="bodyM pb-4 md:pl-6">วัตถุดิบที่เลือก</p>
                <div className="md:pl-6 flex flex-wrap space-x-2 mr-2">
                  {_.size(context.selectedIngredients) > 0 && (
                    <>
                      {_.map(
                        context.selectedIngredients,
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
                  {_.size(context.selectedIngredients) === 0 && (
                    <p className="bodyM text-gray-50">ไม่มีรายการวัตถุดิบที่เลือก</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

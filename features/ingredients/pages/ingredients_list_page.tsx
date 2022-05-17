import React, { useCallback, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import router from "next/router";
import { AuthContext } from "core/context/auth_context";
import classNames from "classnames";
import { PrimaryButton } from "@core/components/button/primary_button";
import { IngredientsListContext } from "../context/ingredients_list_context";
import { SelectInput } from "@core/components/input/select_input";
import _ from "lodash";
import { ModalContext } from "core/context/modal_context";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { Ingredient } from "@core/components/ingredient";
import { IngredientForm } from "../components/ingredients_list/ingredient_form";

export const IngredientsListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);
  const context = useContext(IngredientsListContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.prepareIngredientsList();
    context.prepareIngredientTypes();
    context.setValue("modalContext", modalContext);
    return () => {
      context.setValue("searchWord", "");
      context.setValue("typeSelected", "");
      context.setValue("page", 1);
      context.setValue("totalPages", 1);
      context.setValue("ingredientsList", []);
      context.setValue("itemsToShow", []);
    };
  }, []);

  //---------------------
  // Handler
  //---------------------
  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      if (context.searchWord === "") {
        setHasMore(true);
      }
      context.setValue("page", 1);
      context.setValue("ingredientsList", []);
      context.setValue("itemsToShow", []);
      context.prepareIngredientsList();
    }, 500),
    []
  );

  //---------------------
  // HANDLER
  //---------------------
  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareIngredientsList();
    if (context.page === context.totalPages) {
      setHasMore(false);
    }
  };
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          {context.isOpen && (
            <IngredientForm
              onCancel={() => context.setValue("isOpen", false)}
              onSuccess={() => {
                context.setValue("isOpen", false);
                context.setValue("searchWord", "");
                context.setValue("typeSelected", "");
                context.setValue("page", 1);
                context.setValue("totalPages", 1);
                context.setValue("ingredientsList", []);
                context.setValue("itemsToShow", []);
                context.prepareIngredientsList();
              }}
            />
          )}
          <HomeLayout>
            <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl h-[calc(100vh-84px)] md:h-[calc(100vh-96px)] lg:h-[calc(100vh-104px)]">
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
              <div
                className={classNames("px-5 2xl:px-0 pt-8 lg:pt-2 sticky", {
                  "flex justify-between items-center":
                    authContext.user?.accountType === "admin",
                })}
              >
                <h1 className="headlineL">รายการวัตถุดิบ</h1>
                {authContext.user?.accountType === "admin" && (
                  <div className="w-[150px]">
                    <PrimaryButton
                      onClick={() => context.setValue("isOpen", true)}
                      title="เพิ่มวัตถุดิบ"
                    />
                  </div>
                )}
              </div>
              <div className="px-5 2xl:px-0 mt-6 flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-[400px] lg:w-[575px]">
                  <SearchBox
                    onChange={(value) => {
                      context.setValue("searchWord", value);
                      context.setValue("isShowClearValue", true);
                      handlerSearchAuto();
                    }}
                    placeholder="ค้นหาชื่อวัตถุดิบ"
                    value={context.searchWord}
                    isShowClearValue={context.isShowClearValue}
                    height="h-12"
                  />
                </div>
                <div className="w-full md:w-[255px] mt-4 md:mt-0">
                  <SelectInput
                    placeholder="เลือกประเภท"
                    value={context.typeSelected}
                    options={context.ingredientTypes}
                    onChange={(value) => {
                      setHasMore(true);
                      context.setValue("typeSelected", value);
                      context.setValue("itemsToShow", []);
                      context.setValue("ingredientsList", []);
                      context.setValue("page", 1);
                      context.prepareIngredientsList();
                    }}
                  />
                </div>
              </div>

              <div className="px-5 2xl:px-0 mt-6 md:mt-8 pb-8">
                {_.size(context.itemsToShow) > 0 && !context.loading ? (
                  <div
                    id="scrollableIngredient"
                    className="max-h-[calc(100vh-318px)] md:max-h-[calc(100vh-378px)] lg:max-h-[calc(100vh-290px)] overflow-y-auto"
                  >
                    <InfiniteScroll
                      dataLength={context.itemsToShow.length}
                      next={preparation}
                      hasMore={hasMore}
                      loader=""
                      scrollableTarget="scrollableIngredient"
                    >
                      <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                        {_.map(context.itemsToShow, (ingredient, index) => (
                          <div
                            className="col-span-12 md:col-span-4 lg:col-span-3 w-auto"
                            key={`ingredients_${index}`}
                          >
                            <Link
                              href={`/ingredients/${ingredient._id}`}
                              passHref
                            >
                              <a>
                                <Ingredient ingredient={ingredient} />
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                ) : (
                  <>
                    {context.loading && (
                      <div className="h-[calc(100vh-422px)] md:h-[calc(100vh-378px)] lg:h-[calc(100vh-290px)] flex items-center justify-center text-center text-gray-50">
                        <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                      </div>
                    )}
                    {!context.loading && _.size(context.itemsToShow) === 0 && (
                      <div className="h-[calc(100vh-422px)] md:h-[calc(100vh-378px)] lg:h-[calc(100vh-290px)] flex items-center text-center text-gray-50">
                        <div>
                          <i className="fas fa-egg text-[48px] w-12 h-12"></i>
                          <p className="titleM mt-4">ไม่มีรายการวัตถุดิบ</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </HomeLayout>
        </>
      )}
    </Observer>
  );
};

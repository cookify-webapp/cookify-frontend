import React, { useCallback, useContext, useEffect } from "react";
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

export const IngredientsListPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);
  const context = useContext(IngredientsListContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  // Handler
  //---------------------
  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      console.log()
    }, 500),
    []
  )
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl h-screen">
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
              className={classNames("px-5 2xl:px-0 pt-8 lg:pt-2", {
                "flex justify-between items-center":
                  authContext.user?.accountType === "admin",
              })}
            >
              <h1 className="headlineL">รายการวัตถุดิบ</h1>
              {authContext.user?.accountType === "admin" && (
                <div className="w-[150px]">
                  <PrimaryButton onClick={null} title="เพิ่มวัตถุดิบ" />
                </div>
              )}
            </div>
            <div className="px-5 2xl:px-0 mt-6 flex flex-col md:flex-row md:justify-between">
              <div className="w-full md:w-[400px] lg:w-[575px]">
                <SearchBox
                  onChange={(value) => {
                    context.setValue("searchWord", value);
                    context.setValue('isShowClearValue', true)
                    handlerSearchAuto()
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
                  options={context.options} 
                  onChange={(value) => {
                    context.setValue('typeSelected', value)
                    //prepareNewArray
                  }}
                />
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

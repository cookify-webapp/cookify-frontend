import React, { useCallback, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { RecipesListContext } from "../contexts/recipes_list_context";
import _ from 'lodash'
import { HomeLayoutContext } from "core/context/home_layout_context";
import router from "next/router";

export const RecipesListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);
  
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipesListContext)
  const homeLayoutContext = useContext(HomeLayoutContext)

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue('searchWord', homeLayoutContext.searchWord)
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

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout onClickSearch={() => {
          context.setValue('searchWord', homeLayoutContext.searchWord)
          // context.prepare
        }}>
          <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl">
            <div className="px-5 w-full block xl:hidden mt-2">
              <SearchBox
                onChange={(value) => {
                  context.setValue("searchWord", value);
                  context.setValue("isShowClearValue", true);
                  handlerSearchAuto()
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
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

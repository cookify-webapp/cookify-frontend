import React, { useEffect, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { HomeLayout } from "@core/components/home_layout";
import { HomePageContext } from "core/context/home_page_context";
import { AuthContext } from "core/context/auth_context";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import Link from "next/link";
import _ from "lodash";
import { Recipe } from "@core/components/recipe";
import { Snapshot } from "@core/components/snapshot";
import { Ingredient } from "@core/components/ingredient";
import { IngredientSelectionModalContext } from "core/context/ingredient_selection_modal_context";
import { NutritionLabel } from "@core/components/nutrition_label";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);
  const authContext = useContext(AuthContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const ingredientSelectionModalContext = useContext(IngredientSelectionModalContext)

  const [allergic, setAllergic] = useState(['เนื้อสัตว์', 'ผักและผลไม้'])

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  //  FUNCTION
  //---------------------
  const checkIsBookmark = (recipeId) => {
    let isBookmark = false;
    for (let i = 0; i < _.size(authContext.user.bookmark); i++) {
      if (recipeId === authContext.user.bookmark[i]) {
        isBookmark = true;
      }
    }
    return isBookmark;
  };

  //---------------------
  //  RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          <div className="xl:px-14 pb-8">
            <div className="px-5 w-full block xl:hidden mt-2">
              <SearchBox
                onChange={(value) => {
                  homeLayoutContext.setValue("searchWord", value);
                }}
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
            <h2 className="px-5 xl:px-0 headlineM sm:headlineL mt-8 xl:mt-4">
              สูตรอาหารใหม่ล่าสุด
              <Link href="/recipes" passHref>
                <a className="text-[14px] text-brown-10 cursor-pointer ml-4">
                  ดูทั้งหมด
                </a>
              </Link>
            </h2>
            <div className="px-5 xl:px-0 flex space-x-[24px] xl:space-x-0 overflow-x-auto xl:grid xl:grid-cols-12 xl:gap-6 mt-6">
              {_.map(context.recipes, (recipe) => (
                <div
                  className="w-[250px] shrink-0 xl:shrink xl:w-full xl:col-span-3"
                  key={recipe.title}
                >
                  <Recipe
                    recipe={recipe}
                    role={authContext.user.role}
                    isBookmark={checkIsBookmark(recipe.id)}
                    onClick={() => console.log('bookmark click')}
                  />
                </div>
              ))}
            </div>
            <h2 className="px-5 xl:px-0 headlineM sm:headlineL mt-8">
              Snapshot ใหม่ล่าสุด
              <Link href="/snapshots" passHref>
                <a className="text-[14px] text-brown-10 cursor-pointer ml-4">
                  ดูทั้งหมด
                </a>
              </Link>
            </h2>
            <div className="px-5 xl:px-0 flex space-x-[24px] xl:space-x-0 overflow-x-auto xl:grid xl:grid-cols-12 xl:gap-6 mt-6">
              {_.map(context.snapshots, (snapshot) => (
                <div
                  className="w-[250px] shrink-0 xl:shrink xl:w-full xl:col-span-3"
                  key={`snapshot_${snapshot.id}`}
                >
                  <Snapshot snapshot={snapshot} />
                </div>
              ))}
            </div>
            <h2 className="px-5 xl:px-0 headlineM sm:headlineL mt-8">
              วัตถุดิบใหม่ล่าสุด
              <Link href="/ingredients" passHref>
                <a className="text-[14px] text-brown-10 cursor-pointer ml-4">
                  ดูทั้งหมด
                </a>
              </Link>
            </h2>
            <div className="px-5 xl:px-0 flex space-x-[24px] xl:space-x-0 overflow-x-auto xl:grid xl:grid-cols-12 xl:gap-6 mt-6">
              {_.map(context.ingredients, (ingredient, index) => (
                <div
                  className="w-[250px] shrink-0 xl:shrink xl:w-full xl:col-span-3"
                  key={`${ingredient.name}_${index}`}
                >
                  <Link href={`/ingredients/${ingredient.id}`} passHref>
                    <a>
                      <Ingredient ingredient={ingredient} />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-12 gap-6 px-5 lg:px-0">
              <div className="col-span-12 lg:col-span-8">
                <NutritionLabel nutrition={context.nutrition} type='ingredient' ingredient={context.ingredient} />
              </div>  
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
}

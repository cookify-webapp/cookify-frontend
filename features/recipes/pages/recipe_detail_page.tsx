import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import { Breadcrumb } from "@core/components/breadcrumb";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { RecipeDetailContext } from "../contexts/recipe_detail_context";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const RecipeDetailPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipeDetailContext);
  const homeLayoutContext = useContext(HomeLayoutContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { recipeId } = router.query;

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
        <HomeLayout>
          <div className="mx-auto xl:max-w-6xl 2xl:max-w-7xl pb-8">
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
            <div className="px-5 2xl:px-0 pt-8 lg:pt-2">
              <Breadcrumb
                routes={[
                  {
                    title: "สูตรอาหาร",
                    onRoute: "/recipes",
                  },
                  {
                    title: context.recipeDetail?.name,
                    onRoute: "",
                  },
                ]}
              />
            </div>
            <div className="mx-5 p-6 2xl:px-0 mt-4 lg:mt-6 bg-white rounded-[12px] flex flex-row md:flex-col space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-full flex justify-center md:justify-start md:w-[247px] md:h-[247px]">
                <ImageWithFallback
                  alt="ingredient cover image"
                  className="w-full h-full border border-gray-30 rounded-[12px]"
                  src={`${publicRuntimeConfig.CKF_IMAGE_API}/ingredients/${context.recipeDetail?.image}`}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="headlineL"></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

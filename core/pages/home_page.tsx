import React, { useEffect, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { HomeLayout } from "@core/components/home_layout";
import { HomePageContext } from "core/context/home_page_context";
import { AuthContext } from "core/context/auth_context";
import classNames from "classnames";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import Link from "next/link";
import _ from "lodash";
import { Recipe } from "@core/components/recipe";
import { Snapshot } from "@core/components/snapshot";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);
  const authContext = useContext(AuthContext);
  const homeLayoutContext = useContext(HomeLayoutContext);

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
          <div className="xl:px-14">
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
              Snapshot ล่าสุด
              <Link href="/snapshot" passHref>
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
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
}

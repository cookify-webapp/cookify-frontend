import React, { useEffect, useContext } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { HomePageContext } from "core/context/home_page_context";
import { AuthContext } from "core/context/auth_context";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import Link from "next/link";
import _ from "lodash";
import { Recipe } from "@core/components/recipe";
import { Snapshot } from "@core/components/snapshot";
import { Ingredient } from "@core/components/ingredient";
import { ModalContext } from "core/context/modal_context";
import { TertiaryButton } from "@core/components/button/tertiary_button";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);
  const authContext = useContext(AuthContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modalContext", modalContext);
    context.prepareIngredient();
    context.prepareRecipesList();
    context.prepareSnapshotList()
  }, []);

  //---------------------
  //  RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          <div className="mx-auto xl:max-w-6xl">
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
                height="h-16"
              />
            </div>
            <h2
              className="px-5 2xl:px-0 headlineM sm:headlineL mt-8 xl:mt-4"
              data-cy="new_recipes"
            >
              สูตรอาหารใหม่ล่าสุด
              <Link href="/recipes" passHref>
                <a className="text-[14px] text-brown-10 cursor-pointer ml-4">
                  ดูทั้งหมด
                </a>
              </Link>
            </h2>
            {!context.loadingRecipe && (
              <div className="px-5 2xl:px-0 flex space-x-[16px] xl:space-x-0 overflow-x-auto xl:grid xl:grid-cols-12 xl:gap-4 mt-6">
                {_.map(context.recipes, (recipe) => (
                  <div
                    className="w-[300px] shrink-0 xl:shrink xl:w-full xl:col-span-4"
                    key={recipe.title}
                  >
                    <Recipe
                      id={recipe._id}
                      author={recipe.author?.username}
                      averageRating={recipe.averageRating}
                      image={recipe.image}
                      method={recipe.method?.name}
                      name={recipe.name}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 px-5 2xl:px-0">
              <div
                className="flex items-center h-[200px] rounded-[12px]"
                style={{
                  background:
                    "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://i.pinimg.com/736x/bd/30/44/bd3044c89507f5890d5aba5a6201e704.jpg') no-repeat center",
                  backgroundSize: "cover",
                }}
              >
                <div>
                  <p className="headlineM text-white text-center">
                    ไม่รู้จะทำเมนูอะไรดีใช่ไหม ?
                    <br />
                    ไปลองสุ่มเมนูเลยตอนนี้!
                  </p>
                  <div className="w-[180px] mt-4 mx-auto">
                    <TertiaryButton
                      borderColor="border-white"
                      hoverBgColor="hover:bg-white"
                      textColor="text-white"
                      textHoverColor="hover:text-black"
                      title="ไปสุ่มสูตรอาหาร"
                      onClick={() => router.push("/random")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="px-5 2xl:px-0 headlineM sm:headlineL mt-8">
              Snapshot ใหม่ล่าสุด
              <Link href="/snapshots" passHref>
                <a className="text-[14px] text-brown-10 cursor-pointer ml-4">
                  ดูทั้งหมด
                </a>
              </Link>
            </h2>
            {!context.loadingSnapshot && (
              <div className="px-5 2xl:px-0 flex space-x-[16px] xl:space-x-0 overflow-x-auto xl:grid xl:grid-cols-12 xl:gap-4 mt-6">
                {_.map(context.snapshots, (snapshot) => (
                  <div
                    className="w-[300px] shrink-0 xl:shrink xl:w-full xl:col-span-4"
                    key={`snapshot_${snapshot._id}`}
                  >
                    <Snapshot
                      _id={snapshot._id}
                      author={snapshot.author}
                      caption={snapshot.caption}
                      createdAt={snapshot.createdAt}
                      image={snapshot.image}
                      recipe={snapshot.recipe}
                    />
                  </div>
                ))}
              </div>
            )}

            <h2 className="px-5 2xl:px-0 headlineM sm:headlineL mt-8">
              วัตถุดิบใหม่ล่าสุด
              <Link href="/ingredients" passHref>
                <a className="text-[14px] text-brown-10 cursor-pointer ml-4">
                  ดูทั้งหมด
                </a>
              </Link>
            </h2>
            {!context.loading && (
              <div className="px-5 2xl:px-0 flex space-x-[24px] xl:space-x-0 overflow-x-auto xl:grid xl:grid-cols-12 xl:gap-4 mt-6 mb-8">
                {_.map(context.ingredients, (ingredient, index) => (
                  <div
                    className="w-[250px] shrink-0 xl:shrink xl:w-full xl:col-span-3"
                    key={`${ingredient.name}_${index}`}
                  >
                    <Link href={`/ingredients/${ingredient._id}`} passHref>
                      <a>
                        <Ingredient ingredient={ingredient} hasArrow />
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
}

import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { ModalContext } from "core/context/modal_context";
import { useRouter } from "next/router";
import { RandomRecipeContext } from "../contexts/random_recipe_context";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { PrimaryButton } from "@core/components/button/primary_button";
import { AuthContext } from "core/context/auth_context";
import { SecondaryButton } from "@core/components/button/secondary_button";
import classNames from "classnames";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import { TertiaryButton } from "@core/components/button/tertiary_button";

export const RandomRecipePage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modal = useContext(ModalContext);
  const context = useContext(RandomRecipeContext);
  const authContext = useContext(AuthContext);

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);

    return () => {
      context.setValue("randomRecipe", null);
      context.setValue("currentRandomStatus", "wait");
    };
  }, []);

  //---------------------
  // HANDLER
  //---------------------
  const onRenderText = () => {
    const text = {
      wait: "คิดเมนูไม่ออกใช่ไหม ลองให้เราช่วยสิ",
      inprogress: "รอสักครู่ สูตรอาหารกำลังมา",
      show: "เมนูที่ได้คือ...!",
    };
    return text[context.currentRandomStatus];
  };

  const onRenderImage = () => {
    const imagesSrc = {
      wait: "/images/core/thinking.gif",
      inprogress: "/images/core/recipe-book.gif",
    };
    return imagesSrc[context.currentRandomStatus];
  };

  //---------------------
  // RENDER
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
                height="h-16"
                placeholder="ค้นหาสูตรอาหารได้ที่นี่"
                value={homeLayoutContext.searchWord}
                isButton
                buttonOnClick={() => {
                  router.push("/recipes");
                }}
              />
            </div>
            <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl pb-8">
              <h1 className="pt-8 lg:pt-2 headlineL w-auto">สุ่มสูตรอาหาร</h1>
              <div className="grid grid-cols-12 gap-4 mt-6">
                <div className="rounded-[12px] col-span-12 lg:col-span-8 p-5 flex justify-center items-center bg-white md:h-[calc(100vh-298px)] lg:h-[calc(100vh-210px)]">
                  <div>
                    <p className="text-center bodyL md:headlineL font-semibold md:font-normal">
                      {onRenderText()}
                    </p>
                    {context.currentRandomStatus !== "show" && (
                      <>
                        <img
                          src={onRenderImage()}
                          className="w-[276px] md:w-[524px] lg:w-[500px] my-5 mx-auto"
                        />
                      </>
                    )}
                    {context.currentRandomStatus === "show" && (
                      <div className="rounded-[12px] my-5 w-[276px] md:w-[524px] lg:w-[500px] border border-gray-40 mx-auto">
                        <div className="w-[276px] h-[276px] md:w-[524px] md:h-[524px] lg:w-[500px] lg:h-[500px]">
                          <ImageWithFallback
                            alt="recipe cover image"
                            className="w-full h-full rounded-t-[12px]"
                            src={context.randomRecipe?.image}
                          />
                        </div>
                        <p className="px-5 text-center bodyS md:bodyL py-2">
                          {context.randomRecipe?.name}
                        </p>
                      </div>
                    )}
                    <div className="flex space-x-4 items-center justify-center">
                      {context.currentRandomStatus === "show" && (
                        <div className="w-full md:w-[150px]">
                          <SecondaryButton
                            title="สุ่มอีกครั้ง"
                            onClick={() => {
                              context.onHandleRandomRecipe(
                                authContext.user !== null
                              );
                            }}
                          />
                        </div>
                      )}
                      <div
                        className={classNames(
                          "md:w-[150px] mx-auto",
                          { "w-full": context.currentRandomStatus === "show" },
                          {
                            "w-[150px]": context.currentRandomStatus !== "show",
                          }
                        )}
                      >
                        <PrimaryButton
                          title={
                            context.currentRandomStatus === "wait"
                              ? "สุ่ม"
                              : "ไปดูสูตร"
                          }
                          onClick={() => {
                            if (context.currentRandomStatus === "wait") {
                              context.onHandleRandomRecipe(
                                authContext.user !== null
                              );
                            } else {
                              router.push(
                                `/recipes/${context.randomRecipe?._id}`
                              );
                            }
                          }}
                          loading={context.loading}
                          disabled={context.loading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block col-span-4">
                  <div
                    className="flex items-center h-[200px] rounded-[12px]"
                    style={{
                      background: `url(/images/snapshots/recipe_banner.svg) no-repeat center`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div>
                      <p className="headlineM text-white text-center">
                        ค้นหาเมนูใหม่ ๆ
                        <br />
                        ที่ใช่กับตัวคุณ
                      </p>
                      <div className="w-[180px] mt-4 mx-auto">
                        <TertiaryButton
                          borderColor="border-white"
                          hoverBgColor="hover:bg-white"
                          textColor="text-white"
                          textHoverColor="hover:text-black"
                          title="ไปหน้ารวมสูตรอาหาร"
                          onClick={() => router.push("/recipes")}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center h-[200px] rounded-[12px] mt-4 w-full"
                    style={{
                      background: `url('https://i.ibb.co/Nj6Nmcd/high-angle-person-taking-photo-food-plate-with-smartphone-4.png') no-repeat center`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div>
                      <p className="headlineM text-white text-center">
                        อยากดูผลงานใหม่ ๆ
                        <br />
                        ของเพื่อน ๆ ไหม ?
                      </p>
                      <div className="w-[180px] mt-4 mx-auto">
                        <TertiaryButton
                          borderColor="border-white"
                          hoverBgColor="hover:bg-white"
                          textColor="text-white"
                          textHoverColor="hover:text-black"
                          title="ไปหน้า Snapshot"
                          onClick={() => router.push("/snapshots")}
                        />
                      </div>
                    </div>
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

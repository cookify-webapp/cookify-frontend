import React, { createRef, Fragment, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import { Breadcrumb } from "@core/components/breadcrumb";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { RecipeDetailContext } from "../contexts/recipe_detail_context";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import "dayjs/locale/th";
import dayjs from "dayjs";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import { AuthContext } from "core/context/auth_context";
import { Rating } from "@core/components/rating";
import { TabFilter } from "@core/components/tab_filter";
import _ from "lodash";
import Link from "next/link";
import { Ingredient } from "@core/components/ingredient";
import { NutritionLabel } from "@core/components/nutrition_label";

const { publicRuntimeConfig } = getConfig();

export const RecipeDetailPage = () => {
  //---------------------
  //   STATE
  //---------------------
  const [open, setOpen] = useState(false);

  //---------------------
  //   REF
  //---------------------
  const ref: any = createRef();

  //  USE CLICK OUTSIDE
  //---------------------
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(RecipeDetailContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { recipeId } = router.query;

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    if (authContext.isLogIn) {
      context.prepareRecipeDetail(recipeId, true);
    } else {
      context.prepareRecipeDetail(recipeId, false);
    }
  }, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          {!context.loading && (
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
                <div className="px-5 2xl:px-0">
                  <div className="p-6 mt-4 lg:mt-6 bg-white rounded-[12px] flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex justify-center md:justify-start md:w-auto">
                      <div className="w-[247px] h-[247px]">
                        <ImageWithFallback
                          alt="ingredient cover image"
                          className="w-full h-full border border-gray-30 rounded-[12px]"
                          src={`${publicRuntimeConfig.CKF_IMAGE_API}/ingredients/${context.recipeDetail?.image}`}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between space-x-3">
                        <div>
                          <h3 className="headlineL">
                            {context.recipeDetail?.name}
                          </h3>
                          <p className="bodyM text-gray-50">{`โดย ${dayjs(
                            context.recipeDetail?.createdAt
                          )
                            .locale("th")
                            .add(543, "year")
                            .format("D MMM YY เวลา HH:mm น.")}`}</p>
                        </div>
                        <div className="w-auto flex space-x-2">
                          {authContext.isLogIn && (
                            <div
                              className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center text-center rounded-full shrink-0 bg-black opacity-75"
                              onClick={() => null}
                            >
                              {context.recipeDetail?.bookmarked ? (
                                <i className=" text-[16px] leading-[16px] fas fa-bookmark text-white"></i>
                              ) : (
                                <i className=" text-[16px] leading-[16px] far fa-bookmark text-white"></i>
                              )}
                            </div>
                          )}
                          <div className="relative">
                            <div
                              ref={ref}
                              className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center text-center rounded-full shrink-0 bg-black opacity-75"
                              onClick={() => setOpen(!open)}
                            >
                              <i className=" text-[16px] leading-[16px] fas fa-ellipsis-v text-white"></i>
                            </div>
                            {open && (
                              <div className="flex justify-end">
                                {context.recipeDetail?.isMe ? (
                                  <div className="absolute z-10 w-[190px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                                    <div
                                      className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] h-[40px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                                      onClick={() =>
                                        router.push(`/recipes/${recipeId}/edit`)
                                      }
                                    >
                                      <i className="fas fa-pen"></i>
                                      <p className="ml-3">แก้ไขสูตรอาหาร</p>
                                    </div>
                                    <div
                                      className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] h-[40px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                                      onClick={() => null}
                                    >
                                      <i className="fas fa-trash"></i>
                                      <p className="ml-3">ลบสูตรอาหาร</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="absolute z-10 w-[190px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                                    <div
                                      className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                                      onClick={() => null}
                                    >
                                      <i className="fas fa-exclamation-triangle w-auto"></i>
                                      <p className="ml-3">รายงานสูตรอาหาร</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <p className="bodyM mr-4 w-auto">{`หน่วยบริโภค: ${context.recipeDetail?.serving}`}</p>
                        <div className="flex items-center w-auto">
                          <div>
                            <Rating
                              rating={context.recipeDetail?.averageRating}
                              spaceX="space-x-2"
                            />
                          </div>
                          <p className="ml-2">
                            {context.recipeDetail?.averageRating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 bodyM text-gray-50">
                        {context.recipeDetail?.desc}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-[12px] mt-4">
                    <div className="px-6 pt-4 pb-2">
                      <h3 className="headlineM mb-4">วัตถุดิบและโภชนาการ</h3>
                      <div className="overflow-x-scroll scrollbar-hide">
                        <TabFilter
                          activeTab={context.activeTab}
                          onClick={(value) => {
                            context.setValue("activeTab", value);
                          }}
                          tabs={["วัตถุดิบหลัก", "วัตถุดิบทดแทน", "โภชนาการ"]}
                        />
                      </div>
                      <div className="border-t-[1px] border-gray-30" />
                    </div>
                    {context.activeTab === "วัตถุดิบหลัก" && (
                      <div className="px-6 pb-6">
                        <div className="flex space-x-3 items-center text-gray-50">
                          <i className="fas fa-info-circle w-auto" />
                          <p>สามารถกดที่วัตถุดิบเพื่อดูรายละเอียดวัตถุดิบได้</p>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-2">
                          {_.map(
                            context.recipeDetail?.ingredients,
                            (ingredient, index) => (
                              <div
                                className="col-span-12 md:col-span-6 xl:col-span-4"
                                key={`ingredient_${index}`}
                              >
                                <Link
                                  href={`/ingredients/${ingredient.ingredient?._id}`}
                                  passHref
                                >
                                  <a>
                                    <div className="flex bg-gray-20 rounded-[10px] border border-gray-30 h-auto items-center pr-2 justify-between">
                                      <div className="w-[200px] md:w-[250px] flex-shrink-0">
                                        <Ingredient
                                          ingredient={ingredient?.ingredient}
                                          isBorder
                                        />
                                      </div>
                                      <div className="w-full text-center">
                                        <p>
                                          {ingredient?.quantity}
                                          <br />
                                          {ingredient?.ingredient?.unit?.name}
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {context.activeTab === "วัตถุดิบทดแทน" && (
                      <div className="px-6 pb-6">
                        <div className="flex space-x-3 items-center text-gray-50">
                          <i className="fas fa-info-circle w-auto" />
                          <p>สามารถกดที่วัตถุดิบเพื่อดูรายละเอียดวัตถุดิบได้</p>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-2">
                          {_.map(
                            context.recipeDetail?.subIngredients,
                            (ingredient, index) => (
                              <div
                                className="col-span-12 md:col-span-4 xl:col-span-3"
                                key={`ingredient_${index}`}
                              >
                                <Link
                                  href={`/ingredients/${ingredient?._id}`}
                                  passHref
                                >
                                  <a>
                                    <Ingredient
                                      ingredient={ingredient}
                                      isBorder
                                    />
                                  </a>
                                </Link>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {
                      context.activeTab === 'โภชนาการ' && (
                        <div className="-mt-2">
                          <NutritionLabel
                            nutrition={context.recipeDetail?.nutritionalDetail}
                            type='recipe'
                            serve={context.recipeDetail?.serving}
                          />
                        </div>
                      )
                    }
                  </div>
                  <div className="bg-white pt-4 px-6 pb-6 mt-4 rounded-[10px]">
                    <h3 className="headlineM">ขั้นตอนการประกอบอาหาร</h3>
                    <div className="mt-3 grid grid-cols-12 gap-3">
                      {
                        _.map(context.recipeDetail?.steps, (step, index) => (
                          <Fragment key={`step_${index}`}>
                            <p>{`${index+1}.`}</p>
                            <p className="col-span-11">{step}</p>
                          </Fragment>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </HomeLayout>
          )}
        </>
      )}
    </Observer>
  );
};

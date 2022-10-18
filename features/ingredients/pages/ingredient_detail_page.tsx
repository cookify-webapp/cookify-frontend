import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { IngredientDetailContext } from "../context/ingredient_detail_context";
import { useRouter } from "next/router";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { IngredientForm } from "../components/ingredients_list/ingredient_form";
import { Breadcrumb } from "@core/components/breadcrumb";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import { SecondaryMiniButton } from "@core/components/button/secondary_mini_button";
import { AuthContext } from "core/context/auth_context";
import { ModalContext } from "core/context/modal_context";
import { TertiaryMiniButton } from "@core/components/button/tertiary_mini_button";
import { TertiaryButton } from "@core/components/button/tertiary_button";
import { NutritionLabel } from "@core/components/nutrition_label";
import _ from "lodash";
import Link from "next/link";
import { Ingredient } from "@core/components/ingredient";
import { FlashMessageContext } from "core/context/flash_message_context";

export const IngredientDetailPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(IngredientDetailContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const flashMessageContext = useContext(FlashMessageContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { ingredientId } = router.query;

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("router", router);
    context.setValue("modalContext", modalContext);
    context.setValue("flashMessageContext", flashMessageContext);
    context.prepareIngredientDetail(ingredientId);
    context.prepareSampleIngredients(ingredientId);

    return () => {
      context.setValue("ingredientDetail", null);
      context.setValue("sampleIngredients", []);
    };
  }, [ingredientId]);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          {context.isOpen && (
            <IngredientForm
              isEdit={true}
              ingredientId={context.ingredientDetail?._id}
              onCancel={() => context.setValue("isOpen", false)}
              onSuccess={() => {
                context.setValue("isOpen", false);
                context.prepareIngredientDetail(ingredientId);
                context.prepareSampleIngredients(ingredientId);
              }}
            />
          )}
          {!context.loading && (
            <HomeLayout>
              <div className="mx-auto xl:max-w-6xl pb-8">
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
                        title: "รายการวัตถุดิบ",
                        onRoute: "/ingredients",
                      },
                      {
                        title: context.ingredientDetail?.name,
                        onRoute: "",
                      },
                    ]}
                  />
                  <div className="grid grid-cols-12 gap-6 mt-6">
                    <div className="col-span-12 lg:col-span-9">
                      <div className="rounded-[12px] h-[100px] md:h-[128px] flex justify-between items-center bg-white p-4 md:p-6">
                        <div className="flex items-center w-auto">
                          <ImageWithFallback
                            alt="ingredient cover image"
                            className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] border border-gray-30 rounded-[12px]"
                            src={context.ingredientDetail?.image}
                          />
                          <div className="w-auto mx-4 md:mx-6">
                            <p className="titleM md:headlineL line-clamp-1">
                              {context.ingredientDetail?.name}
                            </p>
                            <p className="bodyS md:bodyM text-gray-50 line-clamp-1">
                              {context.ingredientDetail?.type?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 w-auto">
                          {authContext.user?.accountType === "admin" && (
                            <>
                              <SecondaryMiniButton
                                icon="fas fa-pen"
                                onClick={() => context.setValue("isOpen", true)}
                              />
                              <SecondaryMiniButton
                                icon="fas fa-trash"
                                onClick={() => {
                                  modalContext.openModal(
                                    "ลบวัตถุดิบ",
                                    "คุณจะไม่สามารถลบวัตถุดิบนี้ได้ ถ้าหากมีสูตรอาหารที่ ใช้วัตถุดิบนี้อยู่",
                                    () =>
                                      context.deleteIngredient(
                                        context.ingredientDetail?._id
                                      ),
                                    "ยกเลิก",
                                    "ลบ"
                                  );
                                }}
                              />
                            </>
                          )}
                          {context.ingredientDetail?.shopUrl && (
                            <>
                              <div className="w-auto md:hidden">
                                <TertiaryMiniButton
                                  icon="fas fa-shopping-basket"
                                  onClick={() => {
                                    window.open(
                                      context.ingredientDetail?.shopUrl,
                                      "_blank"
                                    );
                                  }}
                                  borderColor="border-brown-10"
                                  hoverBgColor="hover:bg-brown-10"
                                  iconColor="text-brown-10"
                                  iconHoverColor="hover:text-white"
                                />
                              </div>
                              <div className="w-[160px] hidden md:block">
                                <TertiaryButton
                                  title="สั่งซื้อวัตถุดิบนี้"
                                  textColor="text-brown-10"
                                  textHoverColor="hover:text-white"
                                  icon="fas fa-shopping-basket"
                                  onClick={() => {
                                    window.open(
                                      context.ingredientDetail?.shopUrl,
                                      "_blank"
                                    );
                                  }}
                                  borderColor="border-brown-10"
                                  hoverBgColor="hover:bg-brown-10"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-6">
                        <NutritionLabel
                          nutrition={
                            context.ingredientDetail?.nutritionalDetail
                          }
                          type="ingredient"
                          unit={context.ingredientDetail?.unit}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-3">
                      <p className="titleM">วัตถุดิบอื่น ๆ ในประเภทเดียวกัน</p>
                      {context.loadingSample && (
                        <div className="h-[calc(100vh-422px)] md:h-[calc(100vh-378px)] lg:h-[calc(100vh-290px)] flex items-center justify-center text-center text-gray-50">
                          <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                        </div>
                      )}
                      {!context.loadingSample &&
                        _.size(context.sampleIngredients) > 0 && (
                          <div className="mt-6 grid grid-cols-2 gap-x-6 lg:gap-x-0 gap-y-4">
                            {_.map(context.sampleIngredients, (ingredient) => (
                              <div
                                key={ingredient._id}
                                className="col-span-2 md:col-span-1 lg:col-span-2"
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
                        )}
                      {!context.loadingSample &&
                        _.size(context.sampleIngredients) === 0 && (
                          <div className="h-[calc(100vh-422px)] md:h-[calc(100vh-378px)] lg:h-[calc(100vh-290px)] flex items-center text-center text-gray-50">
                            <div>
                              <i className="fas fa-egg text-[48px] w-12 h-12"></i>
                              <p className="titleM mt-4">ไม่มีรายการวัตถุดิบ</p>
                            </div>
                          </div>
                        )}
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

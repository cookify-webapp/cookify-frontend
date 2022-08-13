import React, { createRef, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { FollowingListContext } from "../contexts/following_list_context";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { ModalContext } from "core/context/modal_context";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { followingListType } from "../types/following_list_type";
import { TertiaryButton } from "@core/components/button/tertiary_button";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import Link from "next/link";
const { publicRuntimeConfig } = getConfig();
import dayjs from "dayjs";
import "dayjs/locale/th";

export const FollowingListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [open, setOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(FollowingListContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const modal = useContext(ModalContext);

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.prepareFollowingList();

    return () => {
      context.setValue("page", 1);
      context.setValue("followingList", []);
    };
  }, []);

  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareFollowingList();
    if (context.page === context.totalPages) {
      setHasMore(false);
    }
  };

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
            <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl">
              <h1 className="pt-8 lg:pt-2 headlineL">การติดตามของฉัน</h1>
              <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-start-1 lg:col-start-2 col-span-12 lg:col-span-6 lg:col-end-8">
                  {_.size(context.followingList) > 0 && !context.loading && (
                    <InfiniteScroll
                      dataLength={context.followingList.length}
                      next={preparation}
                      hasMore={hasMore}
                      loader={""}
                    >
                      {_.map(
                        context.followingList,
                        (following: followingListType, index) => (
                          <div
                            className="border border-gray-40 rounded-[12px] bg-white py-2 mb-4"
                            key={`following_act_${index}`}
                          >
                            <div className="flex justify-between space-x-3 items-center px-4">
                              <div className="flex items-center space-x-3 w-auto">
                                <div className="w-[48px] h-[48px] border border-gray-30 rounded-full overflow-hidden cursor-pointer flex-shrink-0">
                                  <ImageWithFallback
                                    alt="snapshot cover image"
                                    className="w-full h-full object-cover"
                                    src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${following?.author?.image}`}
                                  />
                                </div>
                                <p className="titleS">
                                  {following?.author?.username}
                                  <span className="bodyM text-gray-60">
                                    {` เพิ่ม${
                                      following.type === "recipe"
                                        ? "สูตรอาหารใหม่"
                                        : " Snapshot ใหม่"
                                    }`}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="border-t border-gray-40 mt-2"></div>
                            <div className="bg-gray-20 w-full flex justify-center">
                              <div className="h-[347px] max-h-[347px] w-full md:w-[347px]">
                                <ImageWithFallback
                                  alt="snapshot cover image"
                                  className="w-full h-full object-cover"
                                  src={`${publicRuntimeConfig.CKF_IMAGE_API}/snapshots/${following?.image}`}
                                />
                              </div>
                            </div>
                            <div className="mt-3 px-4">
                              <Link
                                href={`/recipes/${following?.recipe?._id || following?._id}`}
                                passHref
                              >
                                <a>
                                  <div className="flex space-x-2 items-center py-[5px] px-3 max-w-max bg-beige-20 rounded-[5px]">
                                    <i className="fas fa-book text-[14px] leading-[14px] text-brown-10 w-auto" />
                                    <p className="line-clamp-1 w-auto">
                                      {following?.recipe?.name || following?.name}
                                    </p>
                                  </div>
                                </a>
                              </Link>
                              <p className="my-2 bodyM">{following.caption}</p>
                              <p className="bodyM text-gray-50">{`เมื่อ ${dayjs(
                                following?.createdAt
                              )
                                .locale("th")
                                .add(543, "year")
                                .format("D MMM YY เวลา HH:mm น.")}`}</p>
                            </div>
                          </div>
                        )
                      )}
                    </InfiniteScroll>
                  )}
                  {context.loading && (
                    <div className="py-10 flex items-center justify-center text-center text-gray-50">
                      <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                    </div>
                  )}
                  {!context.loading && _.size(context.followingList) === 0 && (
                    <div className="py-10 flex items-center text-center text-gray-50">
                      <div>
                        <i className="fas fa-user text-[48px] w-12 h-12"></i>
                        <p className="titleM mt-4">ไม่มีรายการการติดตาม</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden lg:block lg:col-start-9 lg:col-span-5">
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
                  <div
                    className="flex items-center h-[200px] rounded-[12px] mt-4"
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
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

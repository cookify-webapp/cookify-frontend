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
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Banners } from "@core/components/banners";

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
          <div className="mx-auto xl:max-w-6xl pb-6">
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
                <div className="col-span-12 lg:col-span-6">
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
                            <div className="flex items-center space-x-3 w-auto px-4">
                              <div className="w-[48px] h-[48px] border border-gray-30 rounded-full overflow-hidden cursor-pointer flex-shrink-0">
                                <Link
                                  href={`/users/${following?.author?._id}`}
                                  passHref
                                >
                                  <a>
                                    <ImageWithFallback
                                      alt="snapshot cover image"
                                      className="w-full h-full object-cover"
                                      src={following?.author?.image}
                                    />
                                  </a>
                                </Link>
                              </div>
                              <p>
                                <Link
                                  href={`/users/${following?.author?._id}`}
                                  passHref
                                >
                                  <a className="titleS">{following?.author?.username}</a>
                                </Link>
                                <span className="bodyM text-gray-60">
                                  {` เพิ่ม${
                                    following.type === "recipe"
                                      ? "สูตรอาหารใหม่"
                                      : " Snapshot ใหม่"
                                  }`}
                                </span>
                              </p>
                            </div>
                            <div className="border-t border-gray-40 mt-2"></div>
                            <div className="bg-gray-20 w-full flex justify-center">
                              <div className="h-[347px] max-h-[347px] w-full md:w-[347px]">
                                <ImageWithFallback
                                  alt="snapshot cover image"
                                  className="w-full h-full object-cover"
                                  src={following?.image}
                                />
                              </div>
                            </div>
                            <div className="mt-3 px-4">
                              <Link
                                href={`/recipes/${
                                  following?.recipe?._id || following?._id
                                }`}
                                passHref
                              >
                                <a>
                                  <div className="flex space-x-2 items-center py-[5px] px-3 max-w-max bg-beige-20 rounded-[5px]">
                                    <i className="fas fa-book text-[14px] leading-[14px] text-brown-10 w-auto" />
                                    <p className="line-clamp-1 w-auto">
                                      {following?.recipe?.name ||
                                        following?.name}
                                    </p>
                                  </div>
                                </a>
                              </Link>
                              <p className="my-2 bodyM">{following.desc}</p>
                              <p className="bodyM text-gray-50">{`เมื่อ ${dayjs(
                                following?.createdAt
                              )
                                .locale("th")
                                .add(543, "year")
                                .format("D MMM YY เวลา HH:mm น.")}`}</p>
                            </div>
                            <div className="border-t border-gray-40 mt-3"></div>
                            <Link
                              href={
                                following.type === "recipe"
                                  ? `/recipes/${following._id}`
                                  : `/snapshots/${following._id}`
                              }
                              passHref
                            >
                              <a target="_blank">
                                <p className="titleS text-gray-60 text-center mt-2">
                                  แสดงความคิดเห็น
                                </p>
                              </a>
                            </Link>
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
                <Banners 
                  className="lg:col-start-8 lg:col-span-5"
                  buttonWidth="w-[180px]"
                  isShowRecipeBanner
                  isShowSnapshotBanner
                  isShowRandomBanner
                />
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/button/primary_button";
import { UserProfileContext } from "../contexts/user_profile_context";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import classNames from "classnames";
import { FollowModal } from "../components/follow_modal";
import { ModalContext } from "core/context/modal_context";
import { AuthContext } from "core/context/auth_context";
import _ from "lodash";
import { TabFilter } from "@core/components/tab_filter";
import InfiniteScroll from "react-infinite-scroll-component";
import { Recipe } from "@core/components/recipe";
import { Snapshot } from "@core/components/snapshot";
import { FlashMessageContext } from "core/context/flash_message_context";
const { publicRuntimeConfig } = getConfig();

export const UserProfilePage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowerClick, setIsFollowerClick] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const context = useContext(UserProfileContext);
  const modal = useContext(ModalContext);
  const auth = useContext(AuthContext);
  const flashMessageContext = useContext(FlashMessageContext)

  const router = useRouter();
  const { userId } = router.query;

  const isMe = router.pathname.includes("/me");

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.setValue('flashMessageContext', flashMessageContext)
    if (isMe) {
      context.prepareMyDetail();
    } else {
      context.prepareUserDetail(userId);
    }

    return () => {
      context.setValue("userDetail", null);
      setIsOpen(false);
      context.setValue("activeTab", "สูตรอาหาร");
      context.setValue("page", 1);
      context.setValue("pageRecipe", 1);
      context.setValue("pageSnapshot", 1);
      context.setValue("recipesList", []);
      context.setValue('snapshotsList', [])
    };
  }, [userId]);

  //---------------------
  // HANDLER
  //---------------------
  const preparationRecipe = async () => {
    setHasMore(true);
    context.setValue("pageRecipe", context.pageRecipe + 1);
    context.prepareUserRecipe(context.userDetail?.username);
    if (context.pageRecipe === context.totalPagesRecipe) {
      setHasMore(false);
    }
  };

  const preparationSnapshot = async () => {
    setHasMore(true);
    context.setValue("pageSnapshot", context.pageSnapshot + 1);
    context.prepareUserSnapshot(context.userDetail?.username);
    if (context.pageSnapshot === context.totalPagesSnapshot) {
      setHasMore(false);
    }
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          {isOpen && (
            <FollowModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={isFollowerClick ? "ผู้ติดตาม" : "กำลังติดตาม"}
            />
          )}
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
              {!context.loading && (
                <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl mb-8 mt-6">
                  <div className="flex items-center justify-between">
                    <h1 className="headlineL">{`ข้อมูล${
                      isMe
                        ? "บัญชีผู้ใช้"
                        : `ของ ${context.userDetail?.username}`
                    }`}</h1>
                    {router.pathname.includes("/me") && (
                      <div className="w-[153px]">
                        <PrimaryButton
                          onClick={() => router.push("/me/edit")}
                          title="แก้ไขข้อมูล"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-12 md:col-span-8 p-4 md:p-6 flex items-center justify-between bg-white rounded-[12px]">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden flex-shrink-0 border border-gray-30">
                          <ImageWithFallback
                            alt="profile cover"
                            className="w-full h-full object-cover"
                            src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${context.userDetail?.image}`}
                          />
                        </div>
                        <div>
                          <p className="headlineM md:headlineL break-words w-11/12">
                            {context.userDetail?.username}
                          </p>
                          <p className="bodyM md:bodyL text-gray-50 break-words w-11/12">
                            {context.userDetail?.email}
                          </p>
                          <p className="bodyS md:bodyM text-gray-50">
                            {context.userDetail?.accountType === "admin"
                              ? "ผู้ดูแลระบบ"
                              : "ผู้ใช้ทั่วไป"}
                          </p>
                        </div>
                      </div>
                      {!isMe && auth.user && (
                        <div
                          className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center text-center rounded-full shrink-0 bg-black opacity-75 ml-3"
                          onClick={() => {
                            context.setFollowing(userId)
                            context.setValue('recipesList', [])
                            context.setValue('snapshotsList', [])
                          }}
                        >
                          <i
                            className={classNames(
                              "text-[16px] leading-[16px] text-white",
                              { "fas fa-user-plus": !context.isFollowing },
                              { "fas fa-user-check": context.isFollowing }
                            )}
                          ></i>
                        </div>
                      )}
                    </div>
                    <div
                      className="p-4 lg:p-6 bg-white rounded-[12px] col-span-6 md:col-span-2 text-center flex items-center cursor-pointer"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setIsFollowerClick(true);
                        context.prepareFollowerList(context.userDetail?._id);
                      }}
                    >
                      <div>
                        <p className="headlineL md:headlineM lg:headlineL">
                          {context.followerCount}
                        </p>
                        <p className="bodyL md:bodyM lg:bodyL text-gray-50">
                          ผู้ติดตาม
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-4 lg:p-6 bg-white rounded-[12px] col-span-6 md:col-span-2 text-center flex items-center cursor-pointer"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setIsFollowerClick(false);
                        context.prepareFollowingList(context.userDetail?._id);
                      }}
                    >
                      <div>
                        <p className="headlineL md:headlineM lg:headlineL">
                          {context.followingCount}
                        </p>
                        <p className="bodyL md:bodyM lg:bodyL text-gray-50">
                          กำลังติดตาม
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-6">
                    {isMe && (
                      <div className="col-span-12 lg:col-span-4">
                        <div className="bg-white rounded-[12px] p-4 md:py-6">
                          <h3 className="headlineM">ข้อมูลการแพ้วัตถุดิบ</h3>
                          {_.size(context.userDetail?.allergy) > 0 && (
                            <div className="flex flex-wrap space-x-4 space-y-4 mt-4">
                              {_.map(
                                context.userDetail?.allergy,
                                (item, index) => (
                                  <div
                                    className="rounded-full bg-beige-20 px-3 py-1 w-auto text-brown-10 text-center bodyM"
                                    key={`allergy_${index}`}
                                  >
                                    {item.name}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          {_.size(context.userDetail?.allergy) === 0 && (
                            <p className="mt-4 bodyM text-gray-50">
                              ไม่มีวัตถุดิบที่แพ้
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      className={classNames(
                        "p-4 md:p-6 col-span-12 bg-white rounded-[12px] mt-2 lg:mt-0",
                        { "lg:col-span-8": isMe }
                      )}
                    >
                      <div className="overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:scrollbar-default">
                        <TabFilter
                          tabs={["สูตรอาหาร", "Snapshot"]}
                          activeTab={context.activeTab}
                          onClick={(value) => {
                            context.setValue("activeTab", value);
                            if (context.activeTab.includes("สูตรอาหาร")) {
                              context.prepareUserRecipe(
                                context.userDetail?.username
                              );
                              context.setValue("pageSnapshot", 1);
                              context.setValue("snapshotsList", []);
                            } else {
                              context.prepareUserSnapshot(context.userDetail?.username);
                              context.setValue("pageRecipe", 1);
                              context.setValue("recipesList", []);
                            }
                          }}
                        />
                      </div>
                      <div className="border-t-[1px] border-gray-30 pb-6" />
                      {context.activeTab === "สูตรอาหาร" && (
                        <>
                          {_.size(context.recipesList) > 0 &&
                            !context.recipeLoading && (
                              <InfiniteScroll
                                dataLength={context.recipesList.length}
                                next={preparationRecipe}
                                hasMore={hasMore}
                                loader={""}
                              >
                                <div className="grid grid-cols-12 gap-4">
                                  {_.map(
                                    context.recipesList,
                                    (recipe, index) => (
                                      <div
                                        className={classNames(
                                          "col-span-12 md:col-span-6",
                                          { "xl:col-span-4": !isMe }
                                        )}
                                        key={`recipe_${index}`}
                                      >
                                        <Recipe
                                          author={recipe.author?.username}
                                          averageRating={recipe.averageRating}
                                          id={recipe._id}
                                          image={recipe.image}
                                          method={recipe.method?.name}
                                          name={recipe.name}
                                          isBorder
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              </InfiniteScroll>
                            )}
                          {context.recipeLoading && (
                            <div className="py-10 flex items-center justify-center text-center text-gray-50">
                              <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                            </div>
                          )}
                          {!context.recipeLoading &&
                            _.size(context.recipesList) === 0 && (
                              <div className="py-10 flex items-center text-center text-gray-50">
                                <div>
                                  <i className="fas fa-book text-[48px] w-12 h-12"></i>
                                  <p className="titleM mt-4">
                                    ไม่มีรายการสูตรอาหาร
                                  </p>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                      {context.activeTab === "Snapshot" && (
                        <>
                          {_.size(context.snapshotsList) > 0 &&
                            !context.snapshotLoading && (
                              <InfiniteScroll
                                dataLength={context.snapshotsList.length}
                                next={preparationSnapshot}
                                hasMore={hasMore}
                                loader={""}
                              >
                                <div className="grid grid-cols-12 gap-4">
                                  {_.map(
                                    context.snapshotsList,
                                    (snapshot, index) => (
                                      <div
                                        className={classNames(
                                          "col-span-12 md:col-span-6",
                                          { "xl:col-span-4": !isMe }
                                        )}
                                        key={`recipe_${index}`}
                                      >
                                        <Snapshot
                                          _id={snapshot._id}
                                          author={snapshot.author}
                                          caption={snapshot.caption}
                                          createdAt={snapshot.createdAt}
                                          image={snapshot.image}
                                          recipe={snapshot.recipe}
                                          isBorder
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              </InfiniteScroll>
                            )}
                          {context.snapshotLoading && (
                            <div className="py-10 flex items-center justify-center text-center text-gray-50">
                              <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                            </div>
                          )}
                          {!context.snapshotLoading &&
                            _.size(context.snapshotsList) === 0 && (
                              <div className="py-10 flex items-center text-center text-gray-50">
                                <div>
                                  <i className="fas fa-camera text-[48px] w-12 h-12"></i>
                                  <p className="titleM mt-4">
                                    ไม่มีรายการ Snapshot
                                  </p>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </HomeLayout>
        </>
      )}
    </Observer>
  );
};

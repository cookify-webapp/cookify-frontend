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
const { publicRuntimeConfig } = getConfig();

export const UserProfilePage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const [open, setOpen] = useState(false)

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const context = useContext(UserProfileContext);

  const router = useRouter();
  const { user_id } = router.query;

  const isMe = router.pathname.includes("/me");

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    if (isMe) {
      context.prepareMyDetail();
    } else {
      context.prepareUserDetail(user_id);
    }

    return () => {
      context.setValue("userDetail", null);
    };
  }, []);

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
            {!context.loading && (
              <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl mb-8 mt-6">
                <div className="flex items-center justify-between">
                  <h1 className="headlineL">{`ข้อมูล${
                    isMe ? "บัญชีผู้ใช้" : `ของ ${context.userDetail?.username}`
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
                    {!isMe && (
                      <div
                        className="cursor-pointer w-[36px] h-[36px] flex items-center justify-center text-center rounded-full shrink-0 bg-black opacity-75 ml-3"
                        onClick={() => alert("follow")}
                      >
                        <i className={classNames("text-[16px] leading-[16px] text-white", {'fas fa-user-plus': !context.isFollowing}, {'fas fa-user-check': context.isFollowing})}></i>
                      </div>
                    )}
                  </div>
                  <div 
                    className="p-4 lg:p-6 bg-white rounded-[12px] col-span-6 md:col-span-2 text-center flex items-center cursor-pointer"
                    onClick={() => {
                      setOpen(!open)
                    }}
                  >
                    <div>
                      <p className="headlineL md:headlineM lg:headlineL">{context.followerCount}</p>
                      <p className="bodyL md:bodyM lg:bodyL text-gray-50">ผู้ติดตาม</p>
                    </div>
                  </div>
                  <div 
                    className="p-4 lg:p-6 bg-white rounded-[12px] col-span-6 md:col-span-2 text-center flex items-center cursor-pointer"
                    onClick={() => {
                      setOpen(!open)
                    }}
                  >
                    <div>
                      <p className="headlineL md:headlineM lg:headlineL">{context.followingCount}</p>
                      <p className="bodyL md:bodyM lg:bodyL text-gray-50">กำลังติดตาม</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

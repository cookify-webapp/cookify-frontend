import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/button/primary_button";
import { UserProfileContext } from "../contexts/user_profile_context";

export const UserProfilePage = () => {
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
              <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl mb-8">
                <div className="flex items-center justify-between">
                  <h1 className="headlineL">{`ข้อมูล${
                    isMe ? "บัญชีผู้ใช้" : `ของ ${context.userDetail?.username}`
                  }`}</h1>
                  {router.pathname.includes("/me") && (
                    <div className="w-[153px]">
                      <PrimaryButton
                        onClick={() => router.push("/me/edit")}
                        title="แก้ไขข้อมูลของฉัน"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

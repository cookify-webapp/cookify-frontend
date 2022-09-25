import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";

export const NotificationListPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext)

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

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
              <div className="flex justify-between items-end">
                <h1 className="pt-8 lg:pt-2 headlineL w-auto">การแจ้งเตือน</h1>
                <p className="bodyM underline cursor-pointer w-auto" onClick={() => null}>เปลี่ยนเป็นอ่านแล้วทั้งหมด</p>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

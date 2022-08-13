import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { FollowingListContext } from "../contexts/following_list_context";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { ModalContext } from "core/context/modal_context";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { useRouter } from "next/router";

export const FollowingListPage = () => {
  //---------------------
  // STATE
  //---------------------
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
                  
                </div>
                <div className="col-start-1 lg:col-start-9 col-span-12 lg:col-span-5">
                  
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

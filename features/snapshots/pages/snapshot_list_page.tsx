import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { SnapshotListContext } from "../contexts/snapshot_list_context";
import { ModalContext } from "core/context/modal_context";
import { useRouter } from "next/router";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthContext } from "core/context/auth_context";
import _ from "lodash";
import { snapshotPropType } from "core/types/core_components_type";
import { Snapshot } from "@core/components/snapshot";
import { TertiaryButton } from "@core/components/button/tertiary_button";

export const SnapshotListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(SnapshotListContext);
  const modal = useContext(ModalContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
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
    context.prepareSnapshotList();

    return () => {
      context.setValue("snapshotsList", []);
    };
  }, []);

  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareSnapshotList();
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
              <h1 className="pt-8 lg:pt-2 headlineL">Snapshot</h1>
              <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-8">
                  {_.size(context.snapshotsList) > 0 && !context.loading && (
                    <InfiniteScroll
                      dataLength={context.snapshotsList.length}
                      next={preparation}
                      hasMore={hasMore}
                      loader={""}
                    >
                      <div className="grid grid-cols-12 gap-4">
                        {authContext.isLogIn && (
                          <div
                            className="text-white h-[120px] text-center flex items-center cursor-pointer rounded-[12px] col-span-12 md:col-span-6"
                            style={{
                              background: `url(/images/snapshots/add_snapshot.svg) no-repeat center`,
                              backgroundSize: "cover",
                            }}
                            onClick={() => router.push("/snapshots/create")}
                          >
                            <p className="headlineM">เพิ่ม Snapshot ที่นี่</p>
                          </div>
                        )}
                        {_.map(
                          context.snapshotsList,
                          (snapshot: snapshotPropType, index) => (
                            <div
                              className="col-span-12 md:col-span-6"
                              key={`snapshot_${index}`}
                            >
                              <Snapshot
                                _id={snapshot._id}
                                author={snapshot.author}
                                caption={snapshot.caption}
                                createdAt={snapshot.createdAt}
                                image={snapshot.image}
                                recipe={snapshot.recipe}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </InfiniteScroll>
                  )}
                  {context.loading && (
                    <div className="py-10 flex items-center justify-center text-center text-gray-50">
                      <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                    </div>
                  )}
                  {!context.loading && _.size(context.snapshotsList) === 0 && (
                    <div className="py-10 flex items-center text-center text-gray-50">
                      <div>
                        <i className="fas fa-camera text-[48px] w-12 h-12"></i>
                        <p className="titleM mt-4">ไม่มีรายการ Snapshot</p>
                      </div>
                    </div>
                  )}
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

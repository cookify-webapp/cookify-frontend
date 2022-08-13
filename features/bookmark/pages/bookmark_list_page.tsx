import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { BookmarkListContext } from "../contexts/bookmark_list_context";
import { ModalContext } from "core/context/modal_context";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash'
import { recipesListType } from "@features/recipes/types/recipes";
import { Recipe } from "@core/components/recipe";
import { TertiaryButton } from "@core/components/button/tertiary_button";

export const BookmarkListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext)
  const modal = useContext(ModalContext);
  const context = useContext(BookmarkListContext)

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue('modal', modal)
    context.prepareBookmarkList()

    return () => {
      context.setValue('page', 1)
      context.setValue('bookmarkList', [])
    }
  }, []);

  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareBookmarkList();
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
              <h1 className="pt-8 lg:pt-2 headlineL">สูตรอาหารที่บันทึก</h1>
              <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-8">
                  {_.size(context.bookmarkList) > 0 && !context.loading && (
                    <InfiniteScroll
                      dataLength={context.bookmarkList.length}
                      next={preparation}
                      hasMore={hasMore}
                      loader={""}
                    >
                      <div className="grid grid-cols-12 gap-4">
                        {_.map(
                          context.bookmarkList,
                          (recipe: recipesListType, index) => (
                            <div
                              className="col-span-12 md:col-span-6"
                              key={`recipe_${index}`}
                            >
                              <Recipe
                                author={recipe.author?.username}
                                averageRating={recipe.averageRating}
                                id={recipe._id}
                                image={recipe.image}
                                method={recipe.method?.name}
                                name={recipe.name}
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
                  {!context.loading && _.size(context.bookmarkList) === 0 && (
                    <div className="py-10 flex items-center text-center text-gray-50">
                      <div>
                        <i className="fas fa-book text-[48px] w-12 h-12"></i>
                        <p className="titleM mt-4">ไม่มีรายการสูตรอาหารที่บันทึกไว้</p>
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

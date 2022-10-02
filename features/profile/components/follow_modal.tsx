import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";
import { UserProfileContext } from "../contexts/user_profile_context";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import Link from "next/link";
import { AuthContext } from "core/context/auth_context";

interface followModalPropType {
  isOpen: boolean;
  setIsOpen: (e?) => void;
  title: "กำลังติดตาม" | "ผู้ติดตาม";
}

export const FollowModal = ({
  isOpen,
  setIsOpen,
  title,
}: followModalPropType) => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(UserProfileContext);
  const auth = useContext(AuthContext);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    return () => {
      context.setValue("followerList", []);
      context.setValue("followingList", []);
      context.setValue("page", 1);
    };
  }, []);

  //---------------------
  // HANDLER
  //---------------------
  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    if (title === "กำลังติดตาม") {
      context.prepareFollowingList(context.userDetail?._id);
    } else {
      context.prepareFollowerList(context.userDetail?._id);
    }
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
        <div
          className={classNames(
            "top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 px-5 md:px-0",
            { hidden: !isOpen },
            { fixed: isOpen }
          )}
        >
          <div className="bg-white rounded-[12px] w-full md:w-[360px] card-shadow p-6 animate-fade-in h-[443px] max-h-[443px]">
            <div className="flex justify-between items-center w-auto">
              <h1 className="headlineM">{title}</h1>
              <i
                className="text-[24px] leading-6 fas fa-times cursor-pointer w-auto"
                onClick={() => {
                  setIsOpen(false);
                  context.setValue("followerList", []);
                  context.setValue("followingList", []);
                  context.setValue("page", 1);
                }}
              />
            </div>
            {_.size(
              title == "กำลังติดตาม"
                ? context.followingList
                : context.followerList
            ) > 0 &&
              !context.followLoading && (
                <div
                  id="scrollableDiv"
                  className="h-[260px] max-h-[360px] overflow-y-auto scrollbar-hide lg:scrollbar-default mt-6"
                >
                  <InfiniteScroll
                    dataLength={
                      title === "กำลังติดตาม"
                        ? context.followingList.length
                        : context.followerList.length
                    }
                    next={preparation}
                    hasMore={hasMore}
                    loader=""
                    scrollableTarget="scrollableDiv"
                  >
                    <div className="grid grid-cols-12 gap-4">
                      {_.map(
                        title === "กำลังติดตาม"
                          ? context.followingList
                          : context.followerList,
                        (user, index) => (
                          <div className="col-span-12" key={`user_${index}`}>
                            <Link
                              href={
                                user.username === auth.user?.username
                                  ? "/me"
                                  : `/users/${user._id}`
                              }
                              passHref
                            >
                              <a>
                                <div className="flex space-x-6 items-center ">
                                  <div className="w-[72px] h-[72px] rounded-full overflow-hidden flex-shrink-0 border border-gray-30">
                                    <ImageWithFallback
                                      alt="profile cover"
                                      className="w-full h-full object-cover"
                                      src={user.image}
                                    />
                                  </div>
                                  <div>
                                    <p className="titleM">{user.username}</p>
                                    <p className="text-[14px] text-gray-50">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </InfiniteScroll>
                </div>
              )}
            {context.followLoading && (
              <div className="py-10 flex items-center justify-center text-center text-gray-50">
                <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
              </div>
            )}
            {!context.followLoading &&
              _.size(
                title == "กำลังติดตาม"
                  ? context.followingList
                  : context.followerList
              ) === 0 && (
                <div className="py-10 flex items-center text-center text-gray-50">
                  <div>
                    <i className="fas fa-user text-[48px] w-12 h-12"></i>
                    <p className="titleM mt-4">{`ไม่มีรายการ${
                      title === "กำลังติดตาม"
                        ? "ผู้ที่กำลังติดตาม"
                        : "ผู้ติดตาม"
                    }`}</p>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </Observer>
  );
};

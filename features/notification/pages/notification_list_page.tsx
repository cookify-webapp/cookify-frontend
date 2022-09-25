import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { NotificationListContext } from "../contexts/notification_list_context";
import { ModalContext } from "core/context/modal_context";
import _ from "lodash";
import classNames from "classnames";
import { notificationListType } from "../types/notification_type";
import Link from "next/link";

export const NotificationListPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const context = useContext(NotificationListContext);
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
    context.prepareNotificationList();
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
            <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl pb-8">
              <div className="flex justify-between pt-8 lg:pt-2 items-center">
                <h1 className="headlineL w-auto">การแจ้งเตือน</h1>
                {_.size(context.notificationList) > 0 && (
                  <p
                    className="bodyM underline cursor-pointer w-auto"
                    onClick={() => null}
                  >
                    เปลี่ยนเป็นอ่านแล้ว
                  </p>
                )}
              </div>
              <div className="mt-6">
                {_.size(context.notificationList) > 0 && (
                  <div className="space-y-2">
                    {_.map(
                      context.notificationList,
                      (notification: notificationListType, index) => (
                        <div>
                          <Link
                            href={notification.link}
                            passHref
                            key={`noti_${index}`}
                          >
                            <a>
                              <div
                                className={classNames(
                                  "rounded-[12px] py-3 md:py-2 cursor-pointer",
                                  { "bg-white": !notification.read },
                                  { "bg-gray-20": notification.read }
                                )}
                                onClick={() => null}
                                onContextMenu={() => null}
                              >
                                <div
                                  className={classNames(
                                    "border-l-2 pl-4 md:pl-6 lg:pl-10 pr-6 flex justify-between items-center space-x-4",
                                    {
                                      "border-l-blue":
                                        notification.type === "comment",
                                    },
                                    {
                                      "border-l-yellow":
                                        notification.type === "follow",
                                    },
                                    {
                                      "border-l-error":
                                        notification.type === "complaint",
                                    }
                                  )}
                                >
                                  <div className=" w-auto">
                                    <i
                                      className={classNames(
                                        "text-brown-10",
                                        {
                                          "fas fa-comment text-[48px] w-12 leading-[48px]":
                                            notification.type === "comment",
                                        },
                                        {
                                          "fas fa-user-friends text-[39px] w-[48px] leading-[48px]":
                                            notification.type === "follow",
                                        },
                                        {
                                          "fas fa-exclamation-triangle text-[48px] leading-[48px]":
                                            notification.type === "complaint",
                                        }
                                      )}
                                    />
                                  </div>
                                  <div className="w-full">
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: notification.caption,
                                      }}
                                    ></p>
                                  </div>
                                  {!notification.read && (
                                    <div
                                      className={classNames(
                                        "w-5 h-5 rounded-full flex-shrink-0",
                                        {
                                          "bg-blue":
                                            notification.type === "comment",
                                        },
                                        {
                                          "bg-yellow":
                                            notification.type === "follow",
                                        },
                                        {
                                          "bg-error":
                                            notification.type === "complaint",
                                        }
                                      )}
                                    />
                                  )}
                                </div>
                              </div>
                            </a>
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

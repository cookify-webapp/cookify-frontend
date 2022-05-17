import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import classNames from "classnames";
import { useRouter } from "next/router";
import { sidebarType } from "core/types/core_components_type";
import { HomeLayoutContext } from "core/context/home_layout_context";
import Link from "next/link";

export const SideBar = ({ role, notiCount }: sidebarType) => {
  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);

  //---------------------
  // VARIABLE
  //---------------------
  const guestMenu = [
    {
      title: "หน้าแรก",
      icon: "fas fa-home",
      link: ["/", "home"],
    },
    {
      title: "สูตรอาหาร",
      icon: "fas fa-book",
      link: ["/recipes"],
    },
    {
      title: "Snapshot",
      icon: "fas fa-camera",
      link: ["/shapshots"],
    },
    {
      title: "สุ่มสูตรอาหาร",
      icon: "fas fa-dice-d6",
      link: ["/random"],
    },
    {
      title: "วัตถุดิบ",
      icon: "fas fa-egg",
      link: ["/ingredients", "/ingredients/[ingredientId]"],
    },
  ];

  const userMenu = [
    {
      title: "ข้อมูลบัญชีผู้ใช้",
      icon: "fas fa-user",
      link: ["/profile"],
    },
    {
      title: "การติดตามของฉัน",
      icon: "fas fa-user-plus",
      link: ["/following"],
    },
    {
      title: "สูตรอาหารที่บันทึก",
      icon: "fas fa-bookmark",
      link: ["/saved"],
    },
    {
      title: "การแจ้งเตือน",
      icon: "fas fa-bell",
      link: ["/notification"],
    },
  ];

  const adminMenu = [
    {
      title: "จัดการเรื่องร้องเรียน",
      icon: "fas fa-comment-alt",
      link: ["/complaints"],
    },
    {
      title: "จัดการบัญชีผู้ใช้",
      icon: "fas fa-user-cog",
      link: ["/users"],
    },
  ];

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="fixed h-screen max-h-screen w-[254px] top-0 left-0 z-40 bg-gray-10 border-r border-beige-10 pt-6 flex flex-col justify-between">
          <div>
            <div className="px-6 mb-[32.24px]">
              <img
                src="/images/core/fullLogoCookify.png"
                alt="cookify full logo"
                className="w-[150px] h-[56.76px]"
              />
            </div>
            <div className="h-[calc(100vh-163px)] overflow-y-auto scrollbar-hide px-6">
              {_.map(guestMenu, (menu) => (
                <Link href={menu.link[0]} passHref key={menu.title}>
                  <a
                    className={classNames(
                      "px-4 text-brown-20 h-10 flex items-center cursor-pointer",
                      {
                        "bg-beige-20 rounded-[12px]": _.includes(
                          menu.link,
                          router.pathname
                        ),
                      },
                      {
                        "bg-transparent hover:bg-beige-10 rounded-[12px]": !(_.includes(menu.link, router.pathname))
                      }
                    )}
                    onClick={() => {
                      homeLayoutContext.setValue("isShowSidebar", false);
                    }}
                  >
                    <i className={`${menu.icon} mr-4 w-4 h-4`}></i>
                    <p className="titleS">{menu.title}</p>
                  </a>
                </Link>
              ))}
              {role === "admin" && (
                <div className="mt-8">
                  <p className="bodyS font-medium text-gray-50 pl-4 pb-5">
                    การจัดการ
                  </p>
                  {_.map(adminMenu, (menu) => (
                    <Link href={menu.link[0]} passHref key={menu.title}>
                      <a
                        className={classNames(
                          "px-4 titleS text-brown-20 h-10 flex items-center cursor-pointer",
                          {
                            "bg-beige-20 rounded-[12px]": _.includes(
                              menu.link,
                              router.pathname
                            ),
                          },
                          {
                            "bg-transparent hover:bg-beige-10 rounded-[12px]": !(_.includes(menu.link, router.pathname))
                          }
                        )}
                      >
                        <i className={`${menu.icon} mr-4 w-4 h-4`}></i>
                        <p className="titleS">{menu.title}</p>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
              {(role === "user" || role === "admin") && (
                <div className="mt-8">
                  <p className="bodyS font-medium text-gray-50 pl-4 pb-5">
                    อื่น ๆ
                  </p>
                  {_.map(userMenu, (menu) => (
                    <Link href={menu.link[0]} key={menu.title}>
                      <a
                        className={classNames(
                          "pl-4 titleS text-brown-20 h-10 flex items-center cursor-pointer",
                          {
                            "bg-beige-20 rounded-[12px]": _.includes(
                              menu.link,
                              router.pathname
                            ),
                          },
                          {
                            "bg-transparent hover:bg-beige-10 rounded-[12px]": !(_.includes(menu.link, router.pathname))
                          }
                        )}
                      >
                        <div className="flex items-center">
                          <i className={`${menu.icon} mr-4 w-4 h-4`}></i>
                          <p className="titleS">{menu.title}</p>
                        </div>
                        {menu.title === "การแจ้งเตือน" &&
                          !_.includes(menu.link, router.pathname) && (
                            <div className="py-1 px-2 w-8 h-8 titleS text-center rounded-full bg-beige-20">
                              <p className="titleS">{notiCount}</p>
                            </div>
                          )}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="h-[50px] border-t border-beige-10 text-center flex items-center">
            <p className="bodyS font-medium text-gray-50">
              © 2022 COOKIFY Web App
            </p>
          </div>
        </div>
      )}
    </Observer>
  );
};

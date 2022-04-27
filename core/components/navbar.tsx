import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { SearchBox } from "./input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import classNames from "classnames";
import { AuthContext } from "core/context/auth_context";
import { UserAccount } from "./user_account";
import { PrimaryButton } from "./button/primary_button";

export const Navbar = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);

  //---------------------
  // CONTEXT
  //---------------------
  const router = useRouter();

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
        <div className="bg-gray-10">
          <div className="w-full xl:w-[calc(100vw-254px)] mx-auto xl:max-w-6xl 2xl:max-w-7xl sticky top-0 z-30">
            <div className="flex items-center justify-between px-5 2xl:px-0 h-[84px] md:h-24 xl:h-[104px]">
              <div>
                <div
                  className={classNames("xl:w-[798px] hidden", {
                    "xl:block": !router.pathname.includes("/recipes"),
                  })}
                >
                  <SearchBox
                    onChange={(value) => {
                      context.setValue("searchWord", value);
                    }}
                    placeholder="ค้นหาสูตรอาหารได้ที่นี่"
                    value={context.searchWord}
                    isButton
                    buttonOnClick={() => {
                      router.push({
                        pathname: "/recipes",
                        query: { searchWord: context.searchWord },
                      });
                    }}
                  />
                </div>
                <div
                  className="block xl:hidden w-[52px] h-[52px] md:w-16 md:h-16 border border-gray-40 rounded-[12px] p-[10.4px] md:p-[12.8px] cursor-pointer"
                  onClick={() => context.setValue("isShowSidebar", true)}
                >
                  <i className="fas fa-bars text-[31.2px] leading-[31.2px] w-[31.2px] h-[31.2px] md:text-[38.4px] md:leading-[38.4px] md:w-[38.4px] md:h-[38.4px]"></i>
                </div>
              </div>
              {authContext.user && (
                <UserAccount
                  role={authContext.user.role}
                  src={authContext.user.src}
                  userName={authContext.user.userName}
                />
              )}
              {!authContext.user && (
                <div className="flex">
                  <p
                    className="titleM text-black"
                    onClick={() => router.push("/login")}
                  >
                    เข้าสู่ระบบ
                  </p>
                  <div className="w-[120px]">
                    <PrimaryButton
                      title="ลงทะเบียน"
                      onClick={() => router.push("/register")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

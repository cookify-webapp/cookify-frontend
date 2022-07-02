import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { SearchBox } from "./input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { AuthContext } from "core/context/auth_context";
import { UserAccount } from "./user_account";
import { PrimaryButton } from "./button/primary_button";

interface NavbarProps {
  onClickSearch?: () => void
}

export const Navbar = ({onClickSearch}: NavbarProps) => {
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
        <div className="bg-gray-10 sticky top-0 z-30">
          <div className="w-full xl:w-[calc(100vw-254px)] mx-auto xl:max-w-6xl 2xl:max-w-7xl">
            <div className="flex items-center justify-between px-5 2xl:px-0 h-[84px] md:h-24 xl:h-[104px]">
              <div>
                <div className="xl:w-[798px] hidden xl:block">
                  <SearchBox
                    onChange={(value) => {
                      context.setValue("searchWord", value);
                    }}
                    placeholder="ค้นหาสูตรอาหารได้ที่นี่"
                    value={context.searchWord}
                    isButton
                    buttonOnClick={() => {
                      if (!router.pathname.includes('recipes')) {
                        router.push({
                          pathname: "/recipes",
                          query: { searchWord: context.searchWord },
                        });                        
                      } else {
                        onClickSearch()
                      }
                    }}
                    height="h-16"
                  />
                </div>
                <div
                  className="block xl:hidden w-[52px] h-[52px] md:w-16 md:h-16 border border-gray-40 rounded-[12px] p-[10.4px] md:p-[12.8px] cursor-pointer"
                  onClick={() => context.setValue("isShowSidebar", true)}
                >
                  <i className="fas fa-bars text-[31.2px] leading-[31.2px] w-[31.2px] h-[31.2px] md:text-[38.4px] md:leading-[38.4px] md:w-[38.4px] md:h-[38.4px]"></i>
                </div>
              </div>
              {authContext.isLogIn && (
                <UserAccount
                  role={authContext.user.accountType}
                  src={authContext.user.image}
                  userName={authContext.user.username}
                />
              )}
              {!authContext.user && (
                <div className="w-auto shrink-0">
                  <div className="flex items-center space-x-4">
                    <p
                      className="titleS text-black w-auto cursor-pointer"
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

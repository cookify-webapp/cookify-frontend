import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { SearchBox } from "./input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import router from "next/router";
import classNames from "classnames";
import { AuthContext } from "core/context/auth_context";
import { UserAccount } from "./user_account";
import { PrimaryButton } from "./button/primary_button";

export const Navbar = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext)

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
        <div className="bg-gray-10 px-5 h-[84px] md:h-24 lg:h-[104px] lg:px-14 flex items-center justify-between w-full sticky top-0">
          <div>
            <div className={classNames("w-[798px] hidden", {'lg:block': !router.pathname.includes('/recipes')})}>
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
              className="block lg:hidden w-[52px] h-[52px] md:w-16 md:h-16 border border-gray-40 rounded-[12px] p-[10.4px] md:p-[12.8px] cursor-pointer"
              onClick={() => context.setValue('isShowSidebar', true)}
              >
              <i className="fas fa-bars text-[31.2px] leading-[31.2px] w-[31.2px] h-[31.2px] md:text-[38.4px] md:leading-[38.4px] md:w-[38.4px] md:h-[38.4px]"></i>
            </div>
          </div>
          <div>
            {
              authContext.user && (
                <UserAccount role={authContext.user.role} src={authContext.user.src} userName={authContext.user.userName} />
              )
            }
            {
              !authContext.user && (
                <div className="flex">
                  <p className="titleM text-black" onClick={() => router.push('/login')}>เข้าสู่ระบบ</p>
                  <div className="w-[120px]">
                    <PrimaryButton title="ลงทะเบียน" onClick={() => router.push('/register')} />
                  </div>
                </div>
              )
            }
          </div>
        </div>
      )}
    </Observer>
  );
};

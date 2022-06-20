import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { SideBar } from "../sidebar";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { AuthContext } from "core/context/auth_context";
import classNames from "classnames";
import { Navbar } from "../navbar";
import router from "next/router";

interface HomeLayoutProps {
  children: ReactNode
  onClickSearch?: () => void
}

export const HomeLayout = ({ children, onClickSearch } : HomeLayoutProps) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);

  //---------------------
  // HOOKS
  //---------------------
  const [isDesktop, setIsDesktop] = useState(false);

  //---------------------
  // FUNCTION
  //---------------------
  const updateDimensions = () => {
    if (window.innerWidth >= 1280) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  };

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
  }, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex">
          <div
            className={classNames(
              "",
              {
                "fixed top-0 left-0 z-50 translate-x-0 transition-all duration-300": context.isShowSidebar,
              },
              { "fixed top-0 left-0 z-50 -translate-x-[254px] transition-all duration-300": !context.isShowSidebar && !isDesktop }
            )}
          >
            <div className="">
              <SideBar notiCount={10} role={authContext.user?.accountType} />
            </div>
          </div>
          {context.isShowSidebar && (
            <div
              className="fixed w-screen h-screen bg-black opacity-25 z-40"
              onClick={() => context.setValue("isShowSidebar", false)}
            ></div>
          )}

          <div className="">
            <Navbar onClickSearch={router.pathname.includes('recipes') ? () => onClickSearch() : null}/>
            <div className="w-full xl:w-[calc(100vw-254px)] bg-gray-10 overflow-y-auto ">
              {children}
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

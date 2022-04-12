import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { SideBar } from "./sidebar";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { AuthContext } from "core/context/auth_context";
import classNames from "classnames";
import { Navbar } from "./navbar";

export const HomeLayout = ({ children }) => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);

  //---------------------
  // HOOKS
  //---------------------
  const [isDesktop, setIsDesktop] = useState(false)

  //---------------------
  // FUNCTION
  //---------------------
  const updateDimensions = () => {
    if (window.innerWidth >= 1280) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    updateDimensions()
  }, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex h-screen overflow-y-auto scrollbar-hide">
          <div className={classNames('', {'hidden': !context.isShowSidebar && !isDesktop}, {'block': context.isShowSidebar})}>
            <div
              className={classNames(
                "",
                {
                  "block absolute top-0 left-0 z-50":
                    context.isShowSidebar,
                },
                { 'hidden': !context.isShowSidebar && !isDesktop }
              )}
            >
              <div className="">
                <SideBar notiCount={10} role={authContext.user?.role} />
              </div>
              
            </div>
            {context.isShowSidebar && (
              <div
                className="absolute w-screen h-screen bg-black opacity-25 z-40"
                onClick={() => context.setValue("isShowSidebar", false)}
              ></div>
            )}
          </div>
          <div className="">
            <Navbar />
            <div className="w-full xl:w-[calc(100vw-254px)] bg-gray-10 overflow-y-auto ">{children}</div>
          </div>
        </div>
      )}
    </Observer>
  );
};

import React from "react";
import { Observer } from "mobx-react-lite";
import Link from "next/link";

export const RegisterLoginBgCard = (props) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="bg-gray-10 h-screen max-h-screen relative overflow-hidden">
          <img
            src="/images/register_login/bg_register_login_mobile.png"
            alt="background image"
            className="block md:hidden w-screen h-3/5 absolute bottom-0"
          />
          <img
            src="/images/register_login/bg_register_login_tablet.png"
            alt="background image"
            className="hidden md:block lg:hidden w-screen h-3/5 absolute bottom-0"
          />
          <img
            src="/images/register_login/bg_register_login_desktop.png"
            alt="background image"
            className="hidden lg:block w-screen h-3/5 absolute bottom-0"
          />
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <Link href="/" passHref>
              <a>
                <img
                  src="/images/core/fullLogoCookify.png"
                  className="w-[100px] md:w-[125px]"
                  alt="Cookify's Logo"
                />
              </a>
            </Link>
            <div className="flex items-center justify-center z-10 h-[calc(100vh-57.84px)] md:h-[calc(100vh-80.76px)]">
              <div className="bg-white rounded-[12px] card-shadow w-full md:w-[500px] xl:w-[1164px] p-6 md:py-[82px] md:px-[60px] lg:px-[82px] lg:py-[50px] flex md:flex-col lg:flex-row items-center h-[578px] md:h-auto">
                <img src="/images/core/Cooking.gif" alt="cooking animation" className="w-[188.57px] lg:w-[500px] hidden md:block" />
                <div className="md:mt-[24.57px] lg:mt-0 lg:ml-12 lg:border-l border-gray-30 lg:pl-[80px] lg:h-[547px] overflow-y-auto scrollbar-hide">
                  <div className="flex items-center lg:h-[547px]">
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

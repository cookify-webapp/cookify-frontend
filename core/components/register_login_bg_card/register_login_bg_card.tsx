import React from "react";
import { Observer } from "mobx-react-lite";
import Link from "next/link";
import { IngredientsSelectionModal } from "../modal/ingredients_selection_modal";

export const RegisterLoginBgCard = (props) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="bg-gray-10 h-screen max-h-screen relative overflow-hidden">
          <IngredientsSelectionModal />
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
              <div className="bg-white rounded-[12px] card-shadow w-full md:w-[500px] lg:w-[1164px] md:py-[82px] md:px-[60px] lg:px-[82px] lg:py-[50px] flex md:flex-col lg:flex-row items-center max-h-[578px] md:max-h-min h-auto">
                <img src="/images/core/Cooking.gif" alt="cooking animation" className="w-[188.57px] lg:w-[500px] hidden md:block" />
                <div className="md:mt-[24.57px] lg:mt-0 lg:ml-12 lg:border-l p-6 md:p-0  border-gray-30 lg:pl-[80px] max-h-[578px] h-auto overflow-y-auto scrollbar-hide lg:scrollbar-default">
                  <div className="flex items-center">
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

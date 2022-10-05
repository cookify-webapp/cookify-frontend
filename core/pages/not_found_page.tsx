import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/button/primary_button";
import { SecondaryButton } from "@core/components/button/secondary_button";

export const NotFound = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          
          <div className="h-[calc(100vh-84px)] md:h-[calc(100vh-96px)] lg:h-[calc(100vh-104px)] max-h-[calc(100vh-84px)] md:max-h-[calc(100vh-96px)] lg:max-h-[calc(100vh-104px)] relative overflow-hidden">
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
              <div className="flex items-center justify-center z-10 h-[calc(100vh-84px-64px)] md:h-[calc(100vh-96px-64px)] lg:h-[calc(100vh-104px-64px)]">
                <div className="bg-white rounded-[12px] card-shadow w-full md:w-[500px] xl:w-[1164px] p-4 lg:p-8 flex flex-col lg:flex-row-reverse items-center max-h-[578px] md:max-h-min h-auto">
                  <img src="/images/core/Cooking.gif" alt="cooking animation" className="w-full lg:w-[500px]" />
                  <div className="text-brown-10 px-5 lg:px-0 lg:ml-14">
                    <h1 className="font-semibold headlineL md:text-5xl">ไม่พบหน้าที่ค้นหา</h1>
                    <p className="bodyM md:headlineM font-semibold mt-2">หน้าที่คุณกำลังมองหาอาจถูกลบไปแล้ว<br/>หรือลิงก์ของคุณไม่ถูกต้อง</p>
                    <div className="mt-6 lg:mt-16 flex space-x-4">
                      <div className="w-full lg:w-[150px] mb-2">
                        <PrimaryButton
                          title="หน้าแรก"
                          onClick={() => router.push('/')}
                        />
                      </div>
                      <div className="w-full lg:w-[150px]">
                        <SecondaryButton
                          title="ย้อนกลับ"
                          onClick={() => router.back()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

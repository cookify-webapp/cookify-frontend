import React from "react";
import { Observer } from "mobx-react-lite";
import { TertiaryButton } from "./button/tertiary_button";
import { useRouter } from "next/router";

interface bannersPropsType {
  className: string;
  buttonWidth: string;
  isShowRecipeBanner?: boolean;
  isShowSnapshotBanner?: boolean;
  isShowRandomBanner?: boolean;
}

export const Banners = ({
  className,
  buttonWidth,
  isShowRecipeBanner,
  isShowSnapshotBanner,
  isShowRandomBanner,
}: bannersPropsType) => {
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
        <div className={`hidden lg:block ${className}`}>
          {isShowRecipeBanner && (
            <div
              className="flex items-center h-[200px] rounded-[12px]"
              style={{
                background: `url(/images/snapshots/recipe_banner.svg) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <p className="headlineM text-white text-center">
                  ค้นหาเมนูใหม่ ๆ
                  <br />
                  ที่ใช่กับตัวคุณ
                </p>
                <div className={`${buttonWidth} mt-4 mx-auto`}>
                  <TertiaryButton
                    borderColor="border-white"
                    hoverBgColor="hover:bg-white"
                    textColor="text-white"
                    textHoverColor="hover:text-black"
                    title="ไปหน้ารวมสูตรอาหาร"
                    onClick={() => router.push("/recipes")}
                  />
                </div>
              </div>
            </div>
          )}
          {isShowSnapshotBanner && (
            <div
              className="flex items-center h-[200px] rounded-[12px] mt-4 w-full"
              style={{
                background: `url('https://i.ibb.co/Nj6Nmcd/high-angle-person-taking-photo-food-plate-with-smartphone-4.png') no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <p className="headlineM text-white text-center">
                  อยากดูผลงานใหม่ ๆ
                  <br />
                  ของเพื่อน ๆ ไหม ?
                </p>
                <div className={`${buttonWidth} mt-4 mx-auto`}>
                  <TertiaryButton
                    borderColor="border-white"
                    hoverBgColor="hover:bg-white"
                    textColor="text-white"
                    textHoverColor="hover:text-black"
                    title="ไปหน้า Snapshot"
                    onClick={() => router.push("/snapshots")}
                  />
                </div>
              </div>
            </div>
          )}
          {isShowRandomBanner && (
            <div
              className="flex items-center h-[200px] rounded-[12px] mt-4"
              style={{
                background:
                  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://i.pinimg.com/736x/bd/30/44/bd3044c89507f5890d5aba5a6201e704.jpg') no-repeat center",
                backgroundSize: "cover",
              }}
            >
              <div>
                <p className="headlineM text-white text-center">
                  ไม่รู้จะทำเมนูอะไรดีใช่ไหม ?
                  <br />
                  ไปลองสุ่มเมนูเลยตอนนี้!
                </p>
                <div className={`${buttonWidth} mt-4 mx-auto`}>
                  <TertiaryButton
                    borderColor="border-white"
                    hoverBgColor="hover:bg-white"
                    textColor="text-white"
                    textHoverColor="hover:text-black"
                    title="ไปสุ่มสูตรอาหาร"
                    onClick={() => router.push("/random")}
                  />
                </div>
              </div>
            </div>
          )}
          <div
              className="flex items-center h-[200px] rounded-[12px] mt-4"
              style={{
                background:
                  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/images/core/feedback.svg') no-repeat center",
                backgroundSize: "cover",
              }}
            >
              <div>
                <p className="headlineM text-white text-center">
                  ร่วมทำแบบสำรวจเพื่อใช้
                  <br />
                  ในการพัฒนา Cookify ได้ที่นี่
                </p>
                <div className={`${buttonWidth} mt-4 mx-auto`}>
                  <TertiaryButton
                    borderColor="border-white"
                    hoverBgColor="hover:bg-white"
                    textColor="text-white"
                    textHoverColor="hover:text-black"
                    title="ไปหน้าแบบสำรวจ"
                    onClick={() => window.open('https://forms.gle/1aEYAQmuNRGHqxzc8', '_blank').focus()}
                  />
                </div>
              </div>
            </div>
        </div>
      )}
    </Observer>
  );
};

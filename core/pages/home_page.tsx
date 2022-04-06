import React, { useEffect, useContext } from "react";
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/primary_button";
import { SecondaryButton } from "@core/components/secondary_button";
import { SecondaryMiniButton } from "@core/components/secondary_mini_button";
import { TertiaryButton } from "@core/components/tertiary_button";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  //  RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="text-center headlineXL">
          This is Home
          <div className="w-[200px] mx-auto">
            <PrimaryButton title="ลงทะเบียน" onClick={null} />
          </div>
          <div className="w-[200px] mx-auto">
            <SecondaryButton title="ยกเลิก" onClick={null} />
          </div>
          <br />
          <SecondaryMiniButton icon="fas fa-pen" onClick={null} />
          {/* <div className="w-[200px] mx-auto">
            <TertiaryButton title="สั่งซื้อวัตถุดิบนี้" onClick={null} color="black"/>
          </div> */}
        </div>
      )}
    </Observer>
  );
}

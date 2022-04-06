import React, { useEffect, useContext } from "react";
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/primary_button";

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
        </div>
      )}
    </Observer>
  );
}

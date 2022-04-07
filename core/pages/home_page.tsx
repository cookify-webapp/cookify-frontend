import React, { useEffect, useContext } from "react";
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/button/primary_button";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { SecondaryMiniButton } from "@core/components/button/secondary_mini_button";
import { TertiaryButton } from "@core/components/button/tertiary_button";
import { TertiaryMiniButton } from "@core/components/button/tertiary_mini_button";
import { SideBar } from "@core/components/sidebar";

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
        <div>
          <SideBar role="admin" notiCOunt={10} />
        </div>
      )}
    </Observer>
  );
}

import React, { useEffect, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";
import { useRouter } from "next/router";
import { PrimaryButton } from "@core/components/button/primary_button";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { SecondaryMiniButton } from "@core/components/button/secondary_mini_button";
import { TertiaryButton } from "@core/components/button/tertiary_button";
import { TertiaryMiniButton } from "@core/components/button/tertiary_mini_button";
import { SideBar } from "@core/components/sidebar";
import { UserAccount } from "@core/components/user_account";
import { SearchBox } from "@core/components/input/search_box";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext);

  const [value, setValue] = useState("");
  const [isShowClearValue, setIsShowClearValue] = useState(false);

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
        <div className="bg-beige-10 p-10">
          <SearchBox
            onChange={(searchValue) => {
              setValue(searchValue);
              setIsShowClearValue(true);
            }}
            placeholder="ค้นหาสูตรอาหารที่นี่"
            value={value}
            isButton
            buttonOnClick={() => alert('yeyyy')}
          />
        </div>
      )}
    </Observer>
  );
}

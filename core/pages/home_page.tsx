import React, { useEffect, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { HomeLayout } from "@core/components/home_layout";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------

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
        <HomeLayout>
          <p>This is Home Page</p>
        </HomeLayout>
      )}
    </Observer>
  );
}

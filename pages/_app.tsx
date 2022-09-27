import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import React, { useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import { IngredientsSelectionModal } from "@core/components/modal/ingredients_selection_modal";
import { FlashMessage } from "@core/components/flash_message";
import { Modal } from "@core/components/modal/modal";
import AuthLayouts from "@core/components/layouts/auth_layout";
import { configure } from 'mobx'
import { SubIngredientsSelectionModal } from "@core/components/modal/sub_ingredients_selection_modal"

configure({
  enforceActions: 'never',
})

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const tx = document.getElementsByClassName("auto-size");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }
    
    function OnInput() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>Cookify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <IngredientsSelectionModal />
      <SubIngredientsSelectionModal />
      <FlashMessage />
      <Modal />
      <AuthLayouts>
        <Component {...pageProps} />        
      </AuthLayouts>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;

import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import React, { useContext, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import { IngredientsSelectionModal } from "@core/components/modal/ingredients_selection_modal";
import { FlashMessage } from "@core/components/flash_message";
import { Modal } from "@core/components/modal/modal";
import AuthLayouts from "@core/components/layouts/auth_layout";
import { FlashMessageContext } from "core/context/flash_message_context";
import { configure } from 'mobx'

configure({
  enforceActions: 'never',
})

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Cookify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <IngredientsSelectionModal />
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

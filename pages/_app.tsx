import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import React from "react";
import App from "next/app";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head
        children={
          <>
            <title>Cookify</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <Script
              src="https://kit.fontawesome.com/9c44f5505c.js"
              crossOrigin="anonymous"
            ></Script>
          </>
        }
      ></Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;

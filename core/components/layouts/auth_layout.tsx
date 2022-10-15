import React, { useContext, Fragment, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import { AuthContext } from "core/context/auth_context";
import { ModalContext } from "core/context/modal_context";

//---------------------
//   INTERFACE
//---------------------
interface AuthLayoutsProps {
  children: React.ReactNode;
}

export default function AuthLayouts({ children }: AuthLayoutsProps) {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(AuthContext);
  const modal = useContext(ModalContext);

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //  HOOKS
  //---------------------
  useEffect(() => {
    context.setValue("router", router);
    context.setValue("user", JSON.parse(localStorage.getItem("user")));
    context.setValue("modal", modal);
    context.fetchMe();
  }, []);

  useEffect(() => {
    if (context.user !== null) {
      context.prepareUnreadNotification();
    }
  }, [router.pathname]);

  //---------------------
  //  RENDER
  //---------------------
  return <Observer>{() => <Fragment>{children}</Fragment>}</Observer>;
}

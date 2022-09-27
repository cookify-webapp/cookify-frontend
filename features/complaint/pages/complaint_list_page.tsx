import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { ComplaintListContext } from "../contexts/complaint_list_context";
import { ModalContext } from "core/context/modal_context";

export const ComplaintListPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext)
  const context = useContext(ComplaintListContext)
  const modal = useContext(ModalContext)

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()
  const {id, tabType} = router.query

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue('modal', modal)
    if (id) {
      context.setValue('searchWord', id as string)
    }
    if (tabType) {
      context.setValue('tabType', tabType as string)
    }
    context.prepareComplaintList()

    return () => {
      context.setValue('complaintList', [])
      context.setValue('page', 1)
      context.setValue('searchWord', '')
      context.setValue('tabType', 'new')
    }
  }, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <HomeLayout>
          <div className="mx-auto xl:max-w-6xl">
            <div className="px-5 w-full block xl:hidden mt-2">
              <SearchBox
                onChange={(value) => {
                  homeLayoutContext.setValue("searchWord", value);
                }}
                height="h-16"
                placeholder="ค้นหาสูตรอาหารได้ที่นี่"
                value={homeLayoutContext.searchWord}
                isButton
                buttonOnClick={() => {
                  router.push("/recipes");
                }}
              />
            </div>
            <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl">
              <h1 className="pt-8 lg:pt-2 headlineL">จัดการเรื่องร้องเรียน</h1>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

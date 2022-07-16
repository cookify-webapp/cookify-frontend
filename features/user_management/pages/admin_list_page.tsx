import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import router from "next/router";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { AdminListContext } from "../contexts/admin_list_context";
import { TabFilter } from "@core/components/tab_filter";
import { ModalContext } from "core/context/modal_context";

export const AdminListPage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const context = useContext(AdminListContext);
  const modal = useContext(ModalContext)

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue('modal', modal)
    context.prepareAdminList();

    return () => {
      context.setValue("searchWord", "");
      context.setValue("page", 1);
      context.setValue("adminList", []);
    };
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
              <h1 className="pt-8 lg:pt-2 headlineL">
                จัดการบัญชีผู้ใช้
              </h1>
              <div className="rounded-[12px] bg-white p-6 mt-6">
                <h3 className="headlineM">{`ผู้ดูแลระบบ (${context.totalCount || '0'})`}</h3>
                <div className="overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:scrollbar-default mt-4">
                  <TabFilter 
                    tabs={['ผู้ดูแลระบบ', 'เพิ่มผู้ดูแล']} 
                    activeTab={context.activeTab}
                    onClick={(value) => {
                      context.setValue("activeTab", value);
                    }}
                  />
                  <div className="border-t-[1px] border-gray-30" />
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { ComplaintListContext } from "../contexts/complaint_list_context";
import { ModalContext } from "core/context/modal_context";
import { TabFilter } from "@core/components/tab_filter";
import _ from "lodash";
import { ComplaintBox } from "../components/complaint_box";

export const ComplaintListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const context = useContext(ComplaintListContext);
  const modal = useContext(ModalContext);

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();
  const { id, tabType } = router.query;

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    if (id) {
      context.setValue("searchWord", id as string);
    }
    if (tabType) {
      context.setValue("tabType", tabType as string);
    }
    context.prepareComplaintList();

    return () => {
      context.setValue("complaintList", []);
      context.setValue("page", 1);
      context.setValue("searchWord", "");
      context.setValue("tabType", "new");
    };
  }, []);

  //---------------------
  // HANDLER
  //---------------------
  const convertTabNameToValue = (value) => {
    let tabValue = {
      คำร้องเรียนใหม่: "new",
      คำร้องเรียนที่กำลังดำเนินการ: "inprogress",
      คำร้องเรียนที่เสร็จสิ้น: "completed",
    };
    return tabValue[value];
  };

  const convertTabValueToName = (value) => {
    let tabName = {
      new: "คำร้องเรียนใหม่",
      inprogress: "คำร้องเรียนที่กำลังดำเนินการ",
      completed: "คำร้องเรียนที่เสร็จสิ้น",
    };
    return tabName[value];
  };

  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      if (context.searchWord === "") {
        setHasMore(true);
      }
      context.setValue("page", 1);
      context.setValue("complaintList", []);
      context.prepareComplaintList();
    }, 500),
    []
  );

  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareComplaintList();
    if (context.page === context.totalPages) {
      setHasMore(false);
    }
  };

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
            <div className="mt-6 overflow-x-auto scrollbar-hide">
              <TabFilter
                activeTab={convertTabValueToName(context.tabType)}
                onClick={(value) => {
                  context.setValue("tabType", convertTabNameToValue(value));
                }}
                tabs={[
                  "คำร้องเรียนใหม่",
                  "คำร้องเรียนที่กำลังดำเนินการ",
                  "คำร้องเรียนที่เสร็จสิ้น",
                ]}
              />
            </div>
            <div className="border-t border-t-gray-30" />
            <div className="w-full md:w-[400px] lg:w-[575px] mt-4">
              <SearchBox
                onChange={(value) => {
                  context.setValue("searchWord", value);
                  context.setValue("isShowClearValue", true);
                  handlerSearchAuto();
                }}
                placeholder="ค้นหาด้วย ID ของสูตรอาหารหรือ Snapshot "
                value={context.searchWord}
                isShowClearValue={context.isShowClearValue}
                height="h-12"
              />
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

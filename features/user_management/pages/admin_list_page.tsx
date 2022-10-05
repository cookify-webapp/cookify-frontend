import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import router, { useRouter } from "next/router";
import { SearchBox } from "@core/components/input/search_box";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { AdminListContext } from "../contexts/admin_list_context";
import { TabFilter } from "@core/components/tab_filter";
import { ModalContext } from "core/context/modal_context";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { adminListType } from "../types/admin_list_type";
import { AdminBlock } from "../components/admin_block";
import { AuthContext } from "core/context/auth_context";
import { TextBox } from "@core/components/input/text_box";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PrimaryButton } from "@core/components/button/primary_button";
import { SecondaryMiniButton } from "@core/components/button/secondary_mini_button";
import { FlashMessageContext } from "core/context/flash_message_context";

export const AdminListPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const homeLayoutContext = useContext(HomeLayoutContext);
  const context = useContext(AdminListContext);
  const modal = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const flashMessageContext = useContext(FlashMessageContext)

  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.setValue('router', router)
    context.setValue('flashMessageContext', flashMessageContext)
    context.setValue('formik', formik)
    context.prepareAdminList();

    return () => {
      context.setValue("searchWord", "");
      context.setValue("page", 1);
      context.setValue("adminList", []);
      context.setValue("isShowClearValue", false);
    };
  }, []);

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () =>
      Yup.object().shape({
        email: Yup.string()
          .email("กรุณากรอกอีเมลให้ถูกต้อง")
          .required("กรุณากรอกอีเมล"),
      }),
    initialValues: context.initValue,
    onSubmit: (value) => {
      context.inviteAdmin(value)
    },
  });

  //---------------------
  // Handler
  //---------------------
  const handlerSearchAuto = useCallback(
    _.debounce(() => {
      if (context.searchWord === "") {
        setHasMore(true);
      }
      context.setValue("page", 1);
      context.setValue("adminList", []);
      context.prepareAdminList();
    }, 500),
    []
  );

  //---------------------
  // HANDLER
  //---------------------
  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    context.prepareAdminList();
    if (context.page === context.totalPages) {
      setHasMore(false);
    }
  };

  //---------------------
  // HANDLER
  //---------------------
  const preparationPending = async () => {
    setHasMore(true);
    context.setValue("page", context.pagePending + 1);
    context.preparePendingList();
    if (context.pagePending === context.totalPagesPending) {
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
            <div className="px-5 2xl:px-0 mx-auto xl:max-w-6xl mb-8">
              <h1 className="pt-8 lg:pt-2 headlineL">จัดการบัญชีผู้ใช้</h1>
              <div className="rounded-[12px] bg-white p-6 mt-6">
                <h3 className="headlineM">{`ผู้ดูแลระบบ (${
                  context.totalCount || "0"
                })`}</h3>
                <div className="overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:scrollbar-default mt-4">
                  <TabFilter
                    tabs={["ผู้ดูแลระบบ", "เพิ่มผู้ดูแล"]}
                    activeTab={context.activeTab}
                    onClick={(value) => {
                      context.setValue("activeTab", value);
                      if (context.activeTab === 'เพิ่มผู้ดูแล') {
                        context.preparePendingList()
                        context.setValue('adminList', [])
                      } else {
                        context.prepareAdminList()
                        context.setValue('pendingList', [])
                      }
                    }}
                  />
                  <div className="border-t-[1px] border-gray-30" />
                </div>
                {context.activeTab === "ผู้ดูแลระบบ" && (
                  <>
                    <div className="my-6 grid grid-cols-2 gap-x-4">
                      <div className="col-span-2 md:col-span-1">
                        <SearchBox
                          onChange={(value) => {
                            context.setValue("searchWord", value);
                            context.setValue("isShowClearValue", true);
                            handlerSearchAuto();
                          }}
                          placeholder="ค้นหาบัญชีจากชื่อผู้ใช้หรืออีเมล"
                          value={context.searchWord}
                          isShowClearValue={context.isShowClearValue}
                          height="h-12"
                          isBorder
                        />
                      </div>
                    </div>
                    {_.size(context.adminList) > 0 && !context.loading && (
                      <InfiniteScroll
                        dataLength={context.adminList.length}
                        next={preparation}
                        hasMore={hasMore}
                        loader={""}
                      >
                        <div className="grid grid-cols-12 gap-4">
                          {_.map(
                            context.adminList,
                            (admin: adminListType, index) => (
                              <div
                                className="col-span-12 md:col-span-6 xl:col-span-4"
                                key={`admin_${index}`}
                              >
                                <AdminBlock
                                  isMe={
                                    authContext.user?.username ===
                                    admin.username
                                  }
                                  id={admin._id}
                                  image={admin.image}
                                  name={admin.username}
                                  email={admin.email}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </InfiniteScroll>
                    )}
                    {context.loading && (
                      <div className="py-10 flex items-center justify-center text-center text-gray-50">
                        <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                      </div>
                    )}
                    {!context.loading && _.size(context.adminList) === 0 && (
                      <div className="py-10 flex items-center text-center text-gray-50">
                        <div>
                          <i className="fas fa-user text-[48px] w-12 h-12"></i>
                          <p className="titleM mt-4">ไม่มีรายการผู้ดูแลระบบ</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {context.activeTab === "เพิ่มผู้ดูแล" && (
                  <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-12 md:col-span-5 bg-white max-h-max">
                      <div className="border border-gray-40 rounded-[12px] p-6">
                        <h4 className="titleM mb-4">เพิ่มผู้ดูแล</h4>
                        <p className="bodyM">กรุณากรอก E-mail เพื่อส่งคำเชิญ</p>
                        <TextBox
                          onChange={async (e) => {
                            formik.setFieldTouched("email");
                            await formik.setFieldValue("email", e.target.value);
                          }}
                          type="text"
                          value={formik.values?.email}
                          error={
                            formik.errors?.email && formik.touched?.email
                              ? formik.errors?.email
                              : ""
                          }
                          placeholder="กรุณากรอกอีเมล"
                        />
                        <div className="w-[153px] mt-6 mx-auto">
                          <PrimaryButton
                            onClick={() => {
                              formik.submitForm();
                            }}
                            disabled={!formik.isValid}
                            title="ส่งคำเชิญ"
                            loading={context.buttonLoading}
                          />
                        </div>
                      </div>
                    </div>
                    {_.size(context.pendingList) > 0 &&
                      !context.loadingPending && (
                        <div className="col-span-12 md:col-span-7">
                          <InfiniteScroll
                            dataLength={context.pendingList.length}
                            next={preparationPending}
                            hasMore={hasMore}
                            loader={""}
                          >
                            <div className="space-y-4">
                              {_.map(
                                context.pendingList,
                                (pendingEmail, index) => (
                                  <div
                                    className="border border-gray-40 rounded-[12px] bg-white p-4 flex space-x-3 items-center justify-between"
                                    key={`pending_email_${index}`}
                                  >
                                    <p className="w-9/12 md:w-10/12 break-words">
                                      {pendingEmail.email}
                                    </p>
                                    <SecondaryMiniButton
                                      icon="fas fa-times"
                                      onClick={() => {
                                        modal.openModal(
                                          "ยกเลิกคำเชิญ",
                                          "เมื่อยกเลิก เจ้าของอีเมลดังกล่าวจะไม่สามารถใช้งานลิงก์ที่อยู่ในอีเมลคำเชิญได้อีกต่อไป",
                                          () => context.deletePending(pendingEmail.email),
                                          "ยกเลิก",
                                          "ลบ"
                                        );
                                      }}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </InfiniteScroll>
                        </div>
                      )}
                    {context.loadingPending && (
                      <div className="col-span-12 lg:col-span-7 py-10 flex items-center justify-center text-center text-gray-50">
                        <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                      </div>
                    )}
                    {!context.loadingPending &&
                      _.size(context.pendingList) === 0 && (
                        <div className="col-span-12 lg:col-span-7 py-10 flex items-center text-center text-gray-50">
                          <div>
                            <i className="fas fa-user text-[48px] w-12 h-12"></i>
                            <p className="titleM mt-4">
                              ไม่มีรายการผู้ดูแลระบบ
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

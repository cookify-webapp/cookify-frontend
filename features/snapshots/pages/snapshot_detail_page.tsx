import React, {
  createRef,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Observer } from "mobx-react-lite";
import { HomeLayout } from "@core/components/layouts/home_layout";
import { SearchBox } from "@core/components/input/search_box";
import { SnapshotDetailContext } from "../contexts/snapshot_detail_context";
import { ModalContext } from "core/context/modal_context";
import { HomeLayoutContext } from "core/context/home_layout_context";
import { useRouter } from "next/router";
import { AuthContext } from "core/context/auth_context";
import getConfig from "next/config";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import Link from "next/link";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import dayjs from "dayjs";
import "dayjs/locale/th";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentBlock } from "../components/comment_block";
import { commentListType } from "../types/snapshot_detail_type";
import { TextAreaInput } from "@core/components/input/text_area_input";
import { useFormik } from "formik";
import { commentValidateSchema } from "../forms/comment_form";
import { SecondaryButton } from "@core/components/button/secondary_button";
import { PrimaryButton } from "@core/components/button/primary_button";
import { FlashMessageContext } from "core/context/flash_message_context";
const { publicRuntimeConfig } = getConfig();

export const SnapshotDetailPage = () => {
  //---------------------
  // STATE
  //---------------------
  const [open, setOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(SnapshotDetailContext);
  const modal = useContext(ModalContext);
  const homeLayoutContext = useContext(HomeLayoutContext);
  const authContext = useContext(AuthContext);
  const flashMessageContext = useContext(FlashMessageContext)

  //---------------------
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { snapshotId } = router.query;

  //---------------------
  //  FORMIK
  //---------------------
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    validationSchema: () => commentValidateSchema,
    initialValues: context.initValue,
    onSubmit: (value) => {
      context.isEditIndex !== -1 ?
      context.editComment(snapshotId, context.commentList[context.isEditIndex]._id, value)
      :
      context.addComment(snapshotId, value)
    },
  });

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    context.setValue("modal", modal);
    context.setValue('formik', formik)
    context.setValue('flashMessageContext', flashMessageContext)
    context.prepareSnapshotDetail(snapshotId, authContext.user !== null);
    context.prepareSnapshotCommentsList(snapshotId, authContext.user !== null);

    return () => {
      context.setValue('initValue', { comment: ''})
      formik.resetForm()
      context.setValue('commentList', [])
    }
  }, []);

  //---------------------
  //   HANDLER
  //---------------------
  const preparation = async () => {
    setHasMore(true);
    context.setValue("page", context.page + 1);
    if (authContext.user) {
      context.prepareSnapshotCommentsList(snapshotId, true);
    } else {
      context.prepareSnapshotCommentsList(snapshotId, false);
    }
    if (context.page === context.totalPages) {
      setHasMore(false);
    }
  };

  //---------------------
  //   REF
  //---------------------
  const ref: any = createRef();

  //  USE CLICK OUTSIDE
  //---------------------
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

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
              <h1 className="pt-8 lg:pt-2 headlineL">Snapshot</h1>
              {!context.loadingDetail && (
                <div className="mt-6 grid grid-cols-12 gap-4">
                  <div
                    className="col-span-12 md:col-span-5 lg:col-span-4"
                    id="snapshotDetail"
                  >
                    <div className="bg-white rounded-[12px]">
                      <div className="flex items-center justify-between py-2 px-4 space-x-6">
                        <Link
                          href={
                            authContext.user?.username ===
                            context.snapshotDetail?.author?.username
                              ? "/me"
                              : `/users/${context.snapshotDetail?.author?._id}`
                          }
                          passHref
                        >
                          <a>
                            <div className="flex items-center space-x-3 w-auto">
                              <div className="w-[48px] h-[48px] border border-gray-30 rounded-full overflow-hidden cursor-pointer flex-shrink-0">
                                <ImageWithFallback
                                  alt="snapshot cover image"
                                  className="w-full h-full object-cover"
                                  src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${context.snapshotDetail?.author?.image}`}
                                />
                              </div>
                              <p className="titleS">
                                {context.snapshotDetail?.author?.username}
                              </p>
                            </div>
                          </a>
                        </Link>
                        {authContext.user !== null && (
                          <div className="relative w-auto">
                            <div
                              ref={ref}
                              className="cursor-pointer w-auto flex items-center justify-center text-center shrink-0"
                              onClick={() => setOpen(!open)}
                            >
                              <i className=" text-[16px] leading-[16px] fas fa-ellipsis-v"></i>
                            </div>
                            {open && (
                              <div className="flex justify-end">
                                {context.snapshotDetail?.isMe && (
                                  <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                                    <div
                                      className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                                      onClick={() =>
                                        router.push(
                                          `/snapshots/${snapshotId}/edit`
                                        )
                                      }
                                    >
                                      <i className="fas fa-pen w-auto"></i>
                                      <p className="ml-3 w-auto">
                                        แก้ไข Snapshot
                                      </p>
                                    </div>
                                    <div
                                      className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                                      onClick={() => {
                                        modal.openModal(
                                          "ลบ Snapshot นี้หรือไม่",
                                          <p>
                                            เมื่อทำการลบ Snapshot แล้ว
                                            จะไม่สามารถกู้คืนได้อีก
                                            ท่านยืนยันที่จะลบหรือไม่ ?
                                          </p>,
                                          () => {
                                            null;
                                          },
                                          "ยกเลิก",
                                          "ลบ"
                                        );
                                      }}
                                    >
                                      <i className="fas fa-trash w-auto"></i>
                                      <p className="ml-3 w-auto">ลบ Snapshot</p>
                                    </div>
                                  </div>
                                )}
                                {!context.snapshotDetail?.isMe && (
                                  <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                                    <div
                                      className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                                      onClick={() => null}
                                    >
                                      <i className="fas fa-exclamation-triangle w-auto"></i>
                                      <p className="ml-3">รายงาน Snapshot</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="h-[347px] max-h-[347px]">
                        <ImageWithFallback
                          alt="snapshot cover image"
                          className="w-full h-full object-cover"
                          src={`${publicRuntimeConfig.CKF_IMAGE_API}/snapshots/${context.snapshotDetail?.image}`}
                        />
                      </div>
                      <div className="py-3 px-4">
                        <Link
                          href={`/recipes/${context.snapshotDetail?.recipe?._id}`}
                          passHref
                        >
                          <a>
                            <div className="flex space-x-2 items-center py-[5px] px-3 max-w-max bg-beige-20 rounded-[5px]">
                              <i className="fas fa-book text-[14px] leading-[14px] text-brown-10 w-auto" />
                              <p className="line-clamp-1 w-auto">
                                {context.snapshotDetail?.recipe?.name}
                              </p>
                            </div>
                          </a>
                        </Link>
                        <p className="my-2 bodyM">
                          {context.snapshotDetail?.caption}
                        </p>
                        <p className="bodyM text-gray-50">{`เมื่อ ${dayjs(
                          context.snapshotDetail?.createdAt
                        )
                          .locale("th")
                          .add(543, "year")
                          .format("D MMM YY เวลา HH:mm น.")}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-7 lg:col-span-8 bg-white rounded-[12px]">
                    <div className="bg-white rounded-[12px] p-4 h-[460px] max-h-[460px] overflow-y-auto scrollbar-hide md:scrollbar-default">
                      {_.size(context.commentList) > 0 && !context.loading && (
                        <div
                          id="scrollableComments"
                        >
                          <InfiniteScroll
                            dataLength={context.commentList.length}
                            next={preparation}
                            hasMore={hasMore}
                            loader=""
                            scrollableTarget="scrollableComments"
                          >
                            <div className="space-y-4">
                              {_.map(
                                context.commentList,
                                (comment: commentListType, index) => (
                                  <Fragment key={`comment_${index}`}>
                                    <CommentBlock comment={comment} isEdit={context.isEditIndex === index} index={index} formik={formik}/>
                                  </Fragment>
                                )
                              )}
                            </div>
                          </InfiniteScroll>
                        </div>
                      )}
                      {_.size(context.commentList) === 0 && !context.loading && (
                        <div className="flex items-center text-center text-gray-50 h-[420px]">
                          <div>
                            <i className="fas fa-comment text-[48px] w-12 h-12"></i>
                            <p className="titleM mt-4">
                              ไม่มีรายการความคิดเห็น
                            </p>
                          </div>
                        </div>
                      )}
                      {context.loading && (
                        <div className="flex items-center justify-center text-center text-gray-50 h-[420px]">
                          <i className="w-9 h-9 text-[36px] leading-9 fas fa-circle-notch fa-spin"></i>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray-40 my-4 " />
                    {!authContext.user && (
                      <div className="bg-white rounded-[12px] pb-4">
                        <p className="bodyL text-center">
                          อยากร่วมแสดงความคิดเห็นกับเราไหม ?
                          <br />
                          <Link href="/login" passHref>
                            <a className="underline text-brown-10">
                              ลงชื่อเข้าสู่ระบบ
                            </a>
                          </Link>
                          <br />
                          {` เพื่อแสดงความคิดเห็นเลย`}
                        </p>
                      </div>
                    )}
                    {authContext.user && (
                      <div className="my-6 px-4">
                        <TextAreaInput
                          onChange={(e) => {
                            formik.setFieldValue("comment", e.target.value);
                          }}
                          value={formik.values?.comment}
                          placeholder="แสดงความคิดเห็นที่นี่..."
                          height={100}
                        />
                        <div className="flex space-x-4 md:justify-end mt-3">
                          {context.isEditIndex !== -1 && (
                            <div className="w-full md:w-[120px]">
                              <SecondaryButton
                                onClick={() => {
                                  context.setValue("isEditIndex", -1);
                                }}
                                title="ยกเลิก"
                              />
                            </div>
                          )}
                          <div className="w-full md:w-[120px]">
                            <PrimaryButton
                              onClick={() => {
                                formik.submitForm();
                              }}
                              disabled={!formik.dirty || !formik.isValid}
                              title={context.isEditIndex !== -1 ? "บันทึก" : "ส่ง"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </HomeLayout>
      )}
    </Observer>
  );
};

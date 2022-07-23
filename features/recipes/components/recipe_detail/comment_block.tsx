import React, { createRef, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { recipeCommentType } from "@features/recipes/types/recipes";
import { ImageWithFallback } from "@core/components/image_with_fallback";
import getConfig from "next/config";
import { Rating } from "@core/components/rating";
import "dayjs/locale/th";
import dayjs from "dayjs";
import { useOnClickOutside } from "core/utils/useOnClickOutside";
import { RecipeCommentContext } from "@features/recipes/contexts/recipe_comment_context";
import { AuthContext } from "core/context/auth_context";
import { ModalContext } from "core/context/modal_context";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();
interface CommentBlocKProps {
  comment: recipeCommentType;
  isShowKebab?: boolean;
}

export const CommentBlock = ({ comment, isShowKebab }: CommentBlocKProps) => {
  //---------------------
  // STATE
  //---------------------
  const [open, setOpen] = useState(false);

  //---------------------
  // CONTEXT
  //---------------------
  const recipeCommentContext = useContext(RecipeCommentContext);
  const authContext = useContext(AuthContext)
  const modal = useContext(ModalContext)

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
  //  ROUTER
  //---------------------
  const router = useRouter();
  const { recipeId } = router.query;

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-[48px] h-[48px] rounded-full border border-gray-30 flex-shrink-0">
              <ImageWithFallback
                alt="profile image"
                className="w-full h-full object-cover rounded-full"
                src={`${publicRuntimeConfig.CKF_IMAGE_API}/accounts/${comment?.author?.image}`}
              />
            </div>
            <div className="w-full flex justify-between space-x-3 items-center">
              <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center">
                  <p className="titleS w-auto">{comment?.author?.username}</p>
                  <div className="flex items-center w-auto md:ml-4">
                    <div className="w-auto">
                      <Rating rating={comment?.rating} spaceX="space-x-2" />
                    </div>
                    <p className="ml-2">{comment?.rating.toFixed(1)}</p>
                  </div>
                </div>
                <p className="bodyM text-gray-50">{`โดย ${dayjs(
                  comment?.createdAt
                )
                  .locale("th")
                  .add(543, "year")
                  .format("D MMM YY เวลา HH:mm น.")}`}</p>
              </div>
              {(((authContext.user?.username !== comment?.author?.username) && authContext.user) || isShowKebab) && (
                <div className="relative w-auto">
                  <div
                    ref={ref}
                    className="cursor-pointer w-auto flex items-center justify-center text-center rounded-full shrink-0"
                    onClick={() => setOpen(!open)}
                  >
                    <i className=" text-[16px] leading-[16px] fas fa-ellipsis-v"></i>
                  </div>
                  {open && (
                    <div className="flex justify-end">
                      {isShowKebab && (
                        <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                          <div
                            className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                            onClick={() =>
                              recipeCommentContext.setValue("isEdit", true)
                            }
                          >
                            <i className="fas fa-pen w-auto"></i>
                            <p className="ml-3 w-auto">แก้ไขความคิดเห็น</p>
                          </div>
                          <div
                            className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                            onClick={() => {
                              modal.openModal(
                                'ลบความคิดเห็น',
                                'คุณต้องการลบความคิดเห็นนี้ใช่หรือไม่',
                                () => recipeCommentContext.deleteComment(comment?._id, () => {
                                  recipeCommentContext.setValue('isAlreadyComment', false)
                                  recipeCommentContext.setValue('commentsList', [])
                                  recipeCommentContext.prepareCommentsList(recipeId, true)
                                }),
                                'ยกเลิก',
                                'ลบ'
                              )
                            }}
                          >
                            <i className="fas fa-trash w-auto"></i>
                            <p className="ml-3 w-auto">ลบความคิดเห็น</p>
                          </div>
                        </div>
                      )}
                      {(authContext.user?.username !== comment?.author?.username) && (
                        <div className="absolute z-10 w-[225px] bg-white card-shadow mt-2 rounded-[12px] overflow-y-auto">
                          <div
                            className="flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] bg-gray-2 hover:bg-gray-20 p-3 sm:p-4"
                            onClick={() => null}
                          >
                            <i className="fas fa-exclamation-triangle w-auto"></i>
                            <p className="ml-3">รายงานความคิดเห็น</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="md:pl-[60px] pt-3">{comment?.comment}</p>
        </div>
      )}
    </Observer>
  );
};

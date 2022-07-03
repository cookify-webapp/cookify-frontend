import React from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import { Rating } from "./rating";
import { recipePropType } from "core/types/core_components_type";
import _ from "lodash";
import Link from "next/link";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const Recipe = ({
  id,
  image,
  author,
  averageRating,
  method,
  name,
}: recipePropType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <>
          <Link href={`/recipes/${id}`} passHref>
            <a>
              <div className="rounded-[12px] bg-white w-full flex justify-center pr-4 space-x-4 h-[120px]">
                <div className="w-[120px] h-[120px] rounded-l-[12px] border-r border-gray-30 shrink-0">
                  <ImageWithFallback
                    src={`${publicRuntimeConfig.CKF_IMAGE_API}/recipes/${image}`}
                    alt="recipe image cover"
                    className="w-full h-full object-cover rounded-l-[12px]"
                  />
                </div>
                <div className="flex flex-col justify-between py-2">
                  <div>
                    <Rating rating={averageRating} spaceX='space-x-2' />
                    <p className="titleS mt-2 line-clamp-1">{name}</p>
                    <p className="bodyS text-gray-50 line-clamp-1">{`โดย ${author}`}</p>
                  </div>
                  <div>
                    <p className="bodyS text-gray-50">{`อาหารประเภท${method}`}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </>
      )}
    </Observer>
  );
};

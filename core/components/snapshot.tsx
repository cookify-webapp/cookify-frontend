import React from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import Link from "next/link";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const Snapshot = ({ snapshot }) => {
  //---------------------
  // RENDER
  //---------------------
  // id src detail created_by recipe.title
  return (
    <Observer>
      {() => (
        <Link href={`/snapshots/${snapshot.id}`} passHref>
          <a>
            <div className="rounded-[12px] bg-white w-full flex justify-center pr-4 space-x-4 h-[120px]">
              <div className="w-[120px] h-[120px] rounded-l-[12px] border-r border-gray-30 shrink-0">
                <ImageWithFallback
                  src={`${publicRuntimeConfig.CKF_IMAGE_API}/snapshots/${snapshot.src}`}
                  alt="recipe image cover"
                  className="w-full h-full object-cover rounded-l-[12px]"
                />
              </div>
              <div className="flex flex-col justify-between py-2">
                <div>
                  <p className="bodyS line-clamp-2">{snapshot.detail}</p>
                  <p className="mt-1 bodyS text-gray-50 line-clamp-1">{`โดย ${snapshot.created_by}`}</p>
                </div>
                <div className="flex space-x-2 items-center">
                  <i className="fas fa-book text-[14px] leading-[14px] w-[14px] text-gray-50"></i>
                  <p className="bodyS text-gray-50 line-clamp-1">{snapshot.recipe?.title}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </Observer>
  );
};

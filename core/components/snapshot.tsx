import React from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import Link from "next/link";

import classNames from "classnames";

interface SnapshotPropType {
  _id: string
  caption: string
  image: string
  author: {
    _id: string
    username: string
    image: string
  }
  recipe: {
    _id: string
    name: string
  }
  createdAt: string
  isBorder?: boolean
}

export const Snapshot = ({ _id, caption, image, author, recipe, isBorder }: SnapshotPropType) => {
  //---------------------
  // RENDER
  //---------------------
  // id src detail created_by recipe.title
  return (
    <Observer>
      {() => (
        <Link href={`/snapshots/${_id}`} passHref>
          <a>
            <div className={classNames("rounded-[12px] bg-white w-full flex justify-center pr-4 space-x-4 h-[120px]", {'ring-1 ring-gray-30 my-[1px]': isBorder})}>
              <div className="w-[120px] h-[120px] rounded-l-[12px] border-r border-gray-30 shrink-0">
                <ImageWithFallback
                  src={image}
                  alt="recipe image cover"
                  className="w-full h-full object-cover rounded-l-[12px]"
                />
              </div>
              <div className="flex flex-col justify-between py-2">
                <div>
                  <p className="bodyS line-clamp-2">{caption}</p>
                  <p className="mt-1 bodyS text-gray-50 line-clamp-1">{`โดย ${author.username}`}</p>
                </div>
                <div className="flex space-x-2 items-center">
                  <i className="fas fa-book text-[14px] leading-[14px] w-[14px] text-gray-50"></i>
                  <p className="bodyS text-gray-50 line-clamp-1">{recipe.name}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </Observer>
  );
};

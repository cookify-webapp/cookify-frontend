import React from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Link from "next/link";

export const Snapshot = ({ snapshot }) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <Link href={`/snapshots/${snapshot.id}`} passHref>
          <a>
            <div className="bg-white rounded-[12px] card-shadow w-full">
              <ImageWithFallback
                alt="recipe cover image"
                src={snapshot.src}
                classStyle="rounded-t-[12px] h-[180px]"
              />
              <div className="mt-2 pb-4 mx-4 w-auto">
                <p className="bodyXS line-clamp-2">{snapshot.detail}</p>
                <p className="bodyXS text-gray-50 my-2">
                  {`โดย ${snapshot.created_by} • ${dayjs(snapshot.created_at)
                    .locale("th")
                    .add(543, "year")
                    .format("D MMM YY เวลา HH:mm น.")}`}
                </p>
                <Link href={`/recipes/${snapshot.recipe.id}`} passHref>
                  <a>
                    <div className="bg-beige-20 hover:bg-beige-30 justify-center text-brown-20 flex items-center rounded-[5px] px-3 py-2">
                      <i className="fas fa-book text-[14px] w-auto"></i>
                      <p className="bodyS w-auto ml-2">{snapshot.recipe.title}</p>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </a>
        </Link>
      )}
    </Observer>
  );
};

import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import { Rating } from "./rating";
import { recipePropType } from "core/types/core_components_type";
import dayjs from "dayjs";
import "dayjs/locale/th";
import _ from "lodash";

export const Recipe = ({ recipe, role, isBookmark }: recipePropType) => {
  //---------------------
  // CONTEXT
  //---------------------

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="rounded-[12px] card-shadow bg-white w-full">
          <div>
            <ImageWithFallback
              alt="recipe cover image"
              src={recipe.src}
              classStyle="rounded-t-[12px] h-[180px]"
            />
            {role && (
              <div className="absolute top-0 right-0 mt-2 mr-2 w-9 h-9 p-[6px] bg-black rounded-full text-center">
                {!isBookmark && (
                  <i className="far fa-bookmark w-6 h-6 text-white"></i>
                )}
                {isBookmark && (
                  <i className="fas fa-bookmark w-6 h-6 text-white"></i>
                )}
              </div>
            )}
          </div>
          <div className="pt-2 px-4 py-4">
            <div className="flex items-center w-auto">
              <div className="">
                <Rating
                  height="h-4 leading-[16px]"
                  width="w-4 bodyM"
                  spaceX=""
                  rating={recipe.rating}
                />
              </div>
              <p className="bodyXS text-gray-50 ml-2">{`(${recipe.rating} คะแนน, ${recipe.rating_count} โหวต)`}</p>
            </div>
            <p className="titleM line-clamp-1 mt-2">{recipe.title}</p>
            <p className="bodyS text-gray-50">
              {`โดย ${recipe.created_by} • ${dayjs(recipe.created_at)
                .locale("th")
                .add(543, "year")
                .format("D MMM YY เวลา HH:mm น.")}`}
            </p>
            <p className="bodyXS line-clamp-2 mt-3">{recipe.description}</p>
            <div className="mt-[14px] flex flex-wrap">
              {_.map(recipe.tags, (tag) => (
                <div 
                  key={`${recipe.title}_${tag}`}
                  className="w-auto bodyXS py-[2px] px-[4px] rounded-full border border-beige-20 text-brown-10 mr-1 mt-2">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

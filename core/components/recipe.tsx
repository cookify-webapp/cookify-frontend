import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { ImageWithFallback } from "./image_with_fallback";
import { Rating } from "./rating";

export const Recipe = ({ recipe, role, isBookmark }) => {
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
        <div className="rounded-[12px] card-shadow bg-white">
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
            <div className="flex items-center">
              <div className="w-[175px]">
                <Rating
                  height="h-4 leading-[16px]"
                  width="w-4 bodyM"
                  spaceX="space-x-[4px]"
                  rating={recipe.rating}
                />                
              </div>
              <p className="bodyXS text-gray-50 ml-2">{`(${recipe.rating} คะแนน, ${recipe.rating_count} โหวต)`}</p>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

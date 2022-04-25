import React from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";
import { ImageWithFallback } from "./image_with_fallback";
import { CheckboxInput } from "./input/checkbox";
import { ingredientPropType } from "core/types/core_components_type";

export const Ingredient = ({
  ingredient,
  isBorder,
  hasCheckbox,
  onChange,
  isChecked,
}: ingredientPropType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            "w-full bg-white flex items-center justify-between rounded-[12px] px-4 h-[84px]",
            { "card-shadow": !isBorder },
            { "border border-gray-30": isBorder }
          )}
        >
          <div className="flex items-center">
            <ImageWithFallback
              alt="ingredient cover image"
              classStyle="w-[52px] h-[52px] border border-gray-30 rounded-[12px]"
              src={ingredient.src}
            />
            <div className="w-auto mx-4 ">
              <p className="titleM line-clamp-1">{ingredient.name}</p>
              <p className="bodyS text-gray-50 line-clamp-1">
                {ingredient.type}
              </p>
            </div>
          </div>
          {!hasCheckbox && (
            <i className="fas fa-chevron-right text-[16px] h-4 w-4"></i>
          )}
          {hasCheckbox && (
            <CheckboxInput
              checkValue={ingredient.id}
              checked={isChecked}
              name={ingredient.name}
              onChange={() => onChange()}
            />
          )}
        </div>
      )}
    </Observer>
  );
};

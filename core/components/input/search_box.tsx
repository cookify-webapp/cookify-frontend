import React, { useState } from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";
import { PrimaryButton } from "../button/primary_button";
import { searchBoxType } from "core/types/core_components_type";

export const SearchBox = ({
  isBorder,
  onChange,
  placeholder,
  value,
  isButton,
  buttonOnClick,
  isShowClearValue,
}: searchBoxType) => {
  const [isShowClear, setIsShowClear] = useState(false);
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            `bg-white rounded-[12px] flex items-center justify-between bodyM px-4 w-full`,
            { "card-shadow h-16": !isBorder },
            { "border border-gray-40 h-12": isBorder }
          )}
        >
          <div className="flex items-center">
            <i className="fas fa-search w-4 h-4 mr-4 text-gray-60"></i>
            <input
              type="text"
              onChange={(event) => {
                if (event.target.value === "") {
                  setIsShowClear(false);
                } else {
                  setIsShowClear(true);
                }
                onChange(event.target.value);
              }}
              placeholder={placeholder}
              value={value}
              className="w-full outline-none placeholder-gray-50"
            />
            {!isButton && (
            <>
              {isShowClear && isShowClearValue && (
                <div
                  className="cursor-pointer text-gray-70 w-4 h-4 flex items-center ml-4"
                  onClick={() => {
                    const clearValue: any = "";
                    onChange(clearValue);
                    setIsShowClear(false);
                  }}
                >
                  <i className="fas fa-times" />
                </div>
              )}
            </>
          )}
          </div>
          {isButton && (
            <div className="ml-4 shrink-0 w-[109px]">
              <PrimaryButton onClick={buttonOnClick} title="ค้นหา" />
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};

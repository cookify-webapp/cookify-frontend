import React, { createRef, ReactNode, useState } from "react";
import { Observer } from "mobx-react-lite";

import _ from "lodash";
import classNames from "classnames";
import { useOnClickOutside } from "../../utils/useOnClickOutside";
import { selectInputType } from "core/types/core_components_type";

export const SelectInput = ({
  title,
  value,
  onChange,
  options,
  disabled,
  error,
  placeholder,
  isBorder
}: selectInputType) => {
  //---------------------
  //   STATE
  //---------------------
  const [open, setOpen] = useState(false);

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
  //   HANDLER
  //---------------------
  const valueFinder = (v: any) => {
    return _.find(options, { value: v });
  };

  const handleOnchange = (v: any) => {
    onChange(v);
    setOpen(false);
  };
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="relative w-full text-left">
          {title && (
            <div className="flex items-center mb-[8px]">
              <p
                className="bodyM"
              >
                {title}
              </p>
            </div>
          )}

          <div
            ref={ref}
            className={classNames(
              "w-full placeholder-gray-50 py-2 px-4 rounded-[12px] bg-white flex justify-between items-center cursor-pointer",
              {"border border-gray-40 text-black h-10": isBorder},
              {"text-black card-shadow h-[48px]": !isBorder},
              {"border border-error h-10": error},
              {"h-10 border bg-gray-20 border-gray-30 text-gray-50 cursor-not-allowed": disabled}
            )}
            onClick={() => !disabled && setOpen(!open)}
          >
            <div
              className={classNames(
                "flex items-center overflow-hidden space-x-2",
                { "text-gray-50": !value && !error },
                { "text-error": error },
                { "text-gray-50": disabled },
                { "text-black": !disabled && open },
                {
                  "text-black":
                    value && !disabled && !error && !open,
                }
              )}
            >
              <p className="truncate">
                {value
                  ? valueFinder(value)?.name 
                  : placeholder}
              </p>
            </div>
            <i
              className={classNames(
                "fas fa-caret-down text-[12px] w-[12px] h-[12px] transition duration-300 text-black",
                {
                  "rotate-180": !disabled && open,
                }
              )}
            />
          </div>

          {open && (
            <div className="absolute z-10 w-full bg-white card-shadow mt-2 rounded-[12px] max-h-[250px] overflow-y-auto">
              {_.map(options, (item: any) => (
                <p
                  key={`${item.name}`}
                  className={classNames(
                    "flex items-center cursor-pointer text-black bodyS sm:bodyM px-[16px] py-[10px] h-[40px] hover:bg-gray-20 p-3 sm:p-4",
                    { "bg-gray-20": value === item.value },
                    { "opacity-50": item.disabled },
                  )}
                  onClick={() => !item.disabled && handleOnchange(item.value)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};

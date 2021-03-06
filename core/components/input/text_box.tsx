import React from "react";
import { Observer } from "mobx-react-lite";
import { textBoxType } from "core/types/core_components_type";
import classNames from "classnames";

export const TextBox = ({
  label,
  type,
  value,
  error,
  placeholder,
  disabled,
  non_negative,
  onChange
}: textBoxType) => {
  
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-full text-left">
          <div className="pb-2">
            <label className="titleS">{label}</label>
          </div>
          <div>
            <input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              onChange={(e) => {
                if (non_negative && type === "number") {
                  if (Number(e.target.value) >= 0) {
                    onChange(e)
                  }
                } else {
                  onChange(e)
                }
              }}
              onBlur={(e) => {
                if (non_negative && type === "number") {
                  if (Number(e.target.value) >= 0) {
                    onChange(e)
                  }
                } else {
                  onChange(e)
                }
              }}
              className={classNames(
                "w-full h-10 placeholder-gray-50 py-2 px-4 border rounded-[12px]",
                {"border-gray-40 text-black": !error},
                {"border-error ": error},
                {"bg-gray-20 border-gray-30 text-gray-50 cursor-not-allowed": disabled}
              )}
            />
          </div>
          {
            error && (
              <p className="bodyS text-error">{error}</p>
            )
          }
        </div>
      )}
    </Observer>
  );
};

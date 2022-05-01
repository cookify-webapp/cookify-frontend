import React from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";
import { primaryButtonType } from "core/types/core_components_type";

export const PrimaryButton = ({ disabled, title, onClick }: primaryButtonType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <button
          className={classNames(
            "text-white w-full rounded-[12px] titleS h-10 text-center",
            { "bg-gray-50 cursor-not-allowed": disabled },
            { "bg-brown-10 hover:bg-brown-20": !disabled }
          )}
          onClick={() => onClick()}
          disabled={disabled}
        >
          {title}
        </button>
      )}
    </Observer>
  );
};

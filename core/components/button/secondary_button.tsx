import React from "react";
import { Observer } from "mobx-react-lite";
import { secondaryButtonType } from "core/types/core_components_type";

export const SecondaryButton = ({ title, onClick }: secondaryButtonType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <button
          className="text-gray-60 w-full rounded-[12px] titleS h-10 text-center bg-gray-20 hover:bg-gray-30 border border-gray-40"
          onClick={() => onClick()}
        >
          <p>{title}</p>
        </button>
      )}
    </Observer>
  );
};

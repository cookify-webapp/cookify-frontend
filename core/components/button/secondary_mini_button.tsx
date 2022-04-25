import React from "react";
import { Observer } from "mobx-react-lite";
import { secondaryMiniButtonType } from "core/types/core_components_type";

export const SecondaryMiniButton = ({ icon, onClick }: secondaryMiniButtonType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <button
        className="text-gray-60 rounded-[8px] titleS w-10 h-10 text-center bg-gray-20 hover:bg-gray-30 border border-gray-40"
        onClick={() => onClick()}
      >
        <i className={icon}></i>
      </button>
      )}
    </Observer>
  );
};

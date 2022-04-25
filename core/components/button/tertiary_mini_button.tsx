import React from "react";
import { Observer } from "mobx-react-lite";
import { tertiaryMiniButtonType } from "core/types/core_components_type";

export const TertiaryMiniButton = ({borderColor, hoverBgColor, icon, iconColor, iconHoverColor, onClick}: tertiaryMiniButtonType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <button
          className={`${iconColor} ${iconHoverColor} ease-in duration-75 rounded-[8px] titleS w-10 h-10 text-center bg-transparent ${hoverBgColor} border ${borderColor}`}
          onClick={() => onClick()}
        >
          <i className={icon}></i>
        </button>
      )}
    </Observer>
  );
};

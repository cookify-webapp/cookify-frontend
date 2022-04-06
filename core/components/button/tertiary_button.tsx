import React from "react";
import { Observer } from "mobx-react-lite";
import { tertiaryButtonType } from "core/types/core_components_type";

export const TertiaryButton = ( { title, onClick, icon, borderColor, hoverBgColor, textColor, textHoverColor} : tertiaryButtonType) => {  
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <button
        className={`${textColor} ${textHoverColor} ease-in duration-75 w-full rounded-[12px] titleS h-10 text-center bg-transparent ${hoverBgColor} border ${borderColor}`}
        onClick={() => onClick}
      >
        {
          icon && (
            <i className={`${icon} mr-4 w-4 h-4`}></i>
          )
        }
        <span>{title}</span>
      </button>
      )}
    </Observer>
  );
};

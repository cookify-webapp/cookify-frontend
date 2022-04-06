import React from "react";
import { Observer } from "mobx-react-lite";
import { tertiaryButtonType } from "core/types/core_components_type";

export const TertiaryButton = ( { title, color, onClick, icon } : tertiaryButtonType) => {
  //---------------------
  // VARIABLE
  //---------------------
  const buttonColor = {
    text: `text-${color}`,
    border: `border-${color}`,
    bg: `bg-${color}`
  }
  
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <button
        className={`${buttonColor.text} w-full rounded-[12px] titleS h-10 text-center bg-transparent hover:${buttonColor.bg} border ${buttonColor.border}`}
        onClick={() => onClick}
      >
        {
          icon && (
            <i className={`${icon} mr-4`}></i>
          )
        }
        <p>{title}</p>
      </button>
      )}
    </Observer>
  );
};

import React from "react";
import { Observer } from "mobx-react-lite";

export const Tag = ({ label, onDeleteTag }) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-auto bg-beige-20 text-brown-20 px-2 py-1 flex items-center rounded-[10px]">
          <p className="text-[14px] w-auto">{label}</p>
          <i className="ml-2 text-[14px] w-[14px] h-[14px] far fa-times-circle cursor-pointer" onClick={() => onDeleteTag()}></i>
        </div>
      )}
    </Observer>
  );
};

import React from "react";
import { Observer } from "mobx-react-lite";
import { radioInputType } from "core/types/core_components_type";
import classNames from "classnames";

export const RadioInput = ({ label, checked, onClick }: radioInputType) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center justify-center w-6 h-6 bg-white border rounded-full cursor-pointer border-gray-40 shrink-0"
            onClick={() => onClick()}
          >
            <div
              className={classNames(
                "w-4 h-4 rounded-full bg-brown-20 block",
                { hidden: !checked }
              )}
            />
          </div>
          {label && <p className="bodyM text-black">{label}</p>}
        </div>
      )}
    </Observer>
  );
};

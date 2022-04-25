import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { FlashMessageContext } from "core/context/flash_message_context";

export const FlashMessage = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(FlashMessageContext);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          style={{ zIndex: 49, transform: `translateX(${context.isShow ? 8 : -100}%)` }}
          className="bottom-6 absolute bg-white w-[250px] sm:w-[300px] transition-all duration-150 flex items-center rounded-[12px] card-shadow px-4 sm:px-6 border border-success h-[80px] sm:h-[98px]"
        >
          <div className="bg-success text-white w-11 h-11 sm:w-[50px] sm:h-[50px] flex items-center justify-center rounded-full shrink-0">
            <i className="fas fa-check text-[25px] w-[25px] h-[25px] leading-[25px]"></i>
          </div>
          <div className="ml-4">
            <p className="titleM">{context.title}</p>
            <p className="bodyS">{context.detail}</p>
          </div>
        </div>
      )}
    </Observer>
  );
};

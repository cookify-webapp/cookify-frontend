import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";
import { ModalContext } from "core/context/modal_context";
import { SecondaryButton } from "../button/secondary_button";
import { PrimaryButton } from "../button/primary_button";

export const Modal = () => {
  //---------------------
  // CONTEXT
  //---------------------
  const context = useContext(ModalContext);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={classNames(
            "top-0 left-0 z-[100] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 px-5 md:px-0",
            { hidden: !context.isOpen },
            { fixed: context.isOpen }
          )}
        >
          <div className="bg-white rounded-[12px] w-full md:w-[500px] card-shadow py-6 animate-fade-in">
            <div className="px-6">
              <h3 className="headlineM">{context.title}</h3>
              <p className="bodyM mt-6">{context.detail}</p>
            </div>
            <div className="mt-6 border-t border-gray-30 pb-6"></div>
            <div className="flex space-x-[16px] px-6 justify-end">
              <div className="w-full md:w-[125px]">
                <SecondaryButton onClick={() => context.closeModal()} title={context.buttonTextOnClose} />
              </div>
              <div className="w-full md:w-[125px]">
                <PrimaryButton onClick={() => context.onConfirm()} title={context.buttonTextOnConfirm} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

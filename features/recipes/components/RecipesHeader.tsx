import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";

export const RecipesHeader = () => {
  //---------------------
  // CONTEXT
  //---------------------

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="bg-red-300 px-[14px] py-[14px]">
          <h1 className="text-[30px]">This is header</h1>
        </div>
      )}
    </Observer>
  );
};

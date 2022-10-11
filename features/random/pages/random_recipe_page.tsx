import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";

export const RandomRecipePage = () => {
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
        <div>
          A<div></div>
        </div>
      )}
    </Observer>
  );
};

import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";

export const ProfilePage = () => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div>
          This is profile page
        </div>
      )}
    </Observer>
  );
};

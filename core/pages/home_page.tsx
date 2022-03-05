import React, { useEffect, useContext } from 'react'
import { Observer } from "mobx-react-lite";
import { HomePageContext } from "core/context/home_page_context";

export default function HomePage() {
  //---------------------
  //  CONTEXT
  //---------------------
  const context = useContext(HomePageContext)

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    context.prepareAvatar()
  }, [])
  

  //---------------------
  //  RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="text-[20px] text-red text-center">
          <h1>This is home page</h1>
          <p>{context.name}</p>
        </div>
      )}
    </Observer>
  )
}

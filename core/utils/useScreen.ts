import { useEffect, useState } from 'react'

//---------------------
//   INTERFACE
//---------------------
interface Size {
  width: number | undefined
  height: number | undefined
}

export const useScreen = (): Size => {
  //---------------------
  //  STATE
  //---------------------
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

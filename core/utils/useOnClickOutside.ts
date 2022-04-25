import { useEffect } from 'react';

export const useOnClickOutside = (ref: any, callback: any) => {
  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  //---------------------
  //   HANDLER
  //---------------------
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
};

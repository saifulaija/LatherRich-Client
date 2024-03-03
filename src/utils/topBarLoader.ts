/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export const useTopBarLoader = (setProgress:any) => {
  useEffect(() => {
    const duration = 1000; 
    const increment = 100 / (duration / 30); 

    const interval = setInterval(() => {
      setProgress((prevProgress:any) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 0;
        }
        return prevProgress + increment;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [setProgress]); 
};

import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

export const useWindowSize = (): WindowSize => {
  const isSsr = typeof window === "undefined";
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isSsr ? 0 : window.innerWidth,
    height: isSsr ? 0 : window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: isSsr ? 0 : window.innerWidth,
        height: isSsr ? 0 : window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

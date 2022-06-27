import * as React from "react";
import { useDebounce } from "./use-debounce";

function useResize(wait: number = 0): { width: number; height: number } {
  const [size, setSize] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const debouncedSize = useDebounce(size, wait);

  React.useEffect(() => {
    const listener = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [size]);

  return debouncedSize;
}

export default useResize;

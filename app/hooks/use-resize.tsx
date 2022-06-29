import * as React from "react";
import { useDebounce } from "./use-debounce";

function useResize(wait: number = 0): { width: number; height: number } {
  const [size, setSize] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [debouncedSize, setDebouncedSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const delayedSize = useDebounce(size, wait);

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

  React.useEffect(() => {
    // NOTE: setting to state prevents hydration issues when using
    // results directly in the consuming component.
    setDebouncedSize(delayedSize);
  }, [delayedSize]);

  return debouncedSize;
}

export default useResize;

// import * as React from "react";
// import { useDebounce } from "./use-debounce";

// function useResize(wait: number = 0): { width: number; height: number } {
//   const [size, setSize] = React.useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 0,
//     height: typeof window !== "undefined" ? window.innerHeight : 0,
//   });
//   const [debouncedSize, setDebouncedSize] = React.useState<{
//     width: number;
//     height: number;
//   }>({ width: 0, height: 0 });
//   const delayedSize = useDebounce(size, wait);

//   React.useEffect(() => {
//     const listener = () =>
//       setSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     window.addEventListener("resize", listener);
//     return () => {
//       window.removeEventListener("resize", listener);
//     };
//   }, [size]);

//   React.useEffect(() => {
//     // NOTE: setting to state prevents hydration issues when using
//     // results directly in the consuming component.
//     setDebouncedSize(delayedSize);
//   }, [delayedSize]);

//   return debouncedSize;
// }

// export default useResize;

import * as React from "react";

export default function useResize(elRef: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const observer = React.useRef<ResizeObserver>();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const newObserver = new ResizeObserver((entries) => {
        // Only care about the first element, expect one element to be watched
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });
      observer.current = newObserver;
    }
  }, []);

  React.useEffect(() => {
    const refVar = elRef;
    const observerVar = observer.current;
    if (elRef.current && observer.current) {
      observer.current.observe(elRef.current);
    }

    return () => {
      if (refVar.current && observerVar) {
        observerVar.unobserve(refVar.current);
      }
    };
  }, [elRef, observer]);

  return size;
}

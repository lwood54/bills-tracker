import * as React from "react";

export const BP_VALUES = [{ sm: 500 }, { md: 800 }, { lg: 1200 }, { xl: 1800 }];

export const BP = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
} as const;
export type bp = typeof BP[keyof typeof BP];

type Breakpoint =
  | { sm: number }
  | { md: number }
  | { lg: number }
  | { xl: number };
type Breakpoints = Breakpoint[];

// Find the largest breakpoint the element is less than
function findBreakPoint(breakpoints: Breakpoints = BP_VALUES, width: number) {
  const breakpointIndex = breakpoints
    .map((x) => Object.values(x)[0])
    .findIndex((x) => width < x);

  // element is larger than every breakpoint so it must be the last breakpoint
  if (breakpointIndex === -1) {
    return Object.keys(breakpoints[breakpoints.length - 1])[0];
  }

  return Object.keys(breakpoints[breakpointIndex])[0];
}

export default function useBreakpoints(
  elRef: React.RefObject<HTMLDivElement>,
  breakpoints: Breakpoints
) {
  const [breakSize, setBreakSize] = React.useState<string>(BP.md);
  const observer = React.useRef<ResizeObserver>();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const newObserver = new ResizeObserver((entries) => {
        // Only care about the first element, expect one element to be watched
        const { width } = entries[0].contentRect;

        setBreakSize(findBreakPoint(breakpoints, width));
      });
      observer.current = newObserver;
    }
  }, [breakpoints]);

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

  return breakSize;
}

export const BREAKPOINT = {
  XS: "xs",
  S: "s",
  M: "m",
  L: "l",
  XL: "xl",
} as const;
export type Breakpoint = typeof BREAKPOINT[keyof typeof BREAKPOINT];

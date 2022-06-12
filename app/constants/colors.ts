export const COL_OFFSET = {
  LT: "400",
  MD: "600",
  DK: "900",
} as const;

export const COL = {
  ACTIVE: `bg-cyan-${COL_OFFSET.MD}`,
  POSITIVE: `bg-emerald-${COL_OFFSET.MD}`,
  POSITIVE_HOVER: `bg-emerald-${COL_OFFSET.DK}`,
  POSITIVE_FOCUS: `bg-emerald-${COL_OFFSET.LT}`,
  NEGATIVE: `bg-red-${COL_OFFSET.MD}`,
} as const;

export const VALIDATION = {
  GREATER_THAN_ZERO: "Should be greater than 0",
  LESS_THAN_32: "Should be less than 32",
  POS_INT: "Should be a positive number",
  REQUIRED: "This is a required field",
} as const;
export type Validation = typeof VALIDATION[keyof typeof VALIDATION];

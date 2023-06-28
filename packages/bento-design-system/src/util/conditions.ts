import { breakpoints } from "./breakpoints";

export const statusPropertiesConditions = {
  default: {},
  hover: { selector: "&:hover:not(:disabled):not([disabled])" },
  focus: { selector: "&:focus:not(:disabled):not([disabled])" },
  active: { selector: "&:active:not(:disabled):not([disabled])" },
  disabled: { selector: "&:disabled, &[disabled], :disabled &, [disabled] &" },
} as const;

export const statusPropertiesDefaultCondition = "default" as const;

export const responsivePropertiesConditions = breakpoints;

export const responsivePropertiesDefaultCondition = "wide" as const;

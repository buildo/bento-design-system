export const statusConditions = {
  default: {},
  hover: { selector: "&:hover:not(:disabled):not([disabled])" },
  focus: { selector: "&:focus:not(:disabled):not([disabled])" },
  active: { selector: "&:active:not(:disabled):not([disabled])" },
  disabled: { selector: "&:disabled, &[disabled], :disabled &, [disabled] &" },
} as const;

export const statusConditions = {
  default: {},
  hover: { selector: "&:hover:not(:disabled)" },
  focus: { selector: "&:focus:not(:disabled)" },
  active: { selector: "&:active:not(:disabled)" },
  disabled: { selector: "&:disabled, &[disabled], :disabled &, [disabled] &" },
} as const;

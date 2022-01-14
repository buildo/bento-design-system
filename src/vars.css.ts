import { createGlobalThemeContract } from "@vanilla-extract/css";

export const vars = createGlobalThemeContract({
  fontFamily: {
    default: "font-family-default",
  },
  space: {
    "0": "space-0",
    "4": "space-4",
    "8": "space-8",
    "16": "space-16",
    "24": "space-24",
    "32": "space-32",
    "40": "space-40",
    "80": "space-80",
  },
  color: {
    primary: "color-primary",
    neutral20: "color-neutral-20",
  },
});

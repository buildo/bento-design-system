import { style } from "@vanilla-extract/css";

export const input = style({
  selectors: {
    [`&::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration`]: {
      WebkitAppearance: "none",
    },
  },
});

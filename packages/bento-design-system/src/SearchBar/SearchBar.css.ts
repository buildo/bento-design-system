import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const input = style([
  bentoSprinkles({
    outline: "none",
  }),
  {
    selectors: {
      [`&::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration`]: {
        WebkitAppearance: "none",
      },
    },
  },
]);

export const inputContainer = style({});
